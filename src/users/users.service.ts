import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserDTO, hasLower, hasNumber, hasSpecial, hasUpper } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role, RoleService } from '../roles/role.service';
import { EditUserDTO } from './edit-user.dto';
import { MetaParam, userStatus } from 'src/common/file/interfaces';
import { RoleEntity } from 'src/roles/role.entity';
import { RoleDto } from 'src/roles/role.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as StreamArray from 'stream-json/streamers/StreamArray';
import { LocationEntity } from './location.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}
  async register(user: UserDTO) {
    let entity = this.classMapper.map(user, UserDTO, User);
    entity.id = uuidv4();
    entity.role = await this.roleService.findRole(Role.USER);
    const salt = await bcrypt.genSalt();
    entity.password = await bcrypt.hash(entity.password, salt);
    await this.userRepository.save(entity);
    //add event here

    return entity;
  }

  async getUserForVerification(userId) {
    const user = await this.userRepository.findOne({
      where: { id: userId, verified: false },
    });
    if (!user) {
      throw new BadRequestException('cannot find requested user');
    }
    return {
      email: user.email,
      phone: user.phone,
      fname: user.fname,
      lname: user.lname,
      rewardPoints: user.rewardPoints
    };
  }

  async createUser(user: UserDTO, creatorId) {
    let entity = this.classMapper.map(user, UserDTO, User);
    entity.id = uuidv4();
    entity.role = { id: user.role.id } as unknown as RoleEntity;
    const farmerRole = await this.roleService.findRole(Role.USER);
    if (user.role.id == farmerRole.id) {
      entity.email = `${uuidv4()}@jaabi-sugu.com`;
    }
    entity.verified = user.status == 'active' ? true : false;

    entity.externalId = uuidv4();
    entity.age = moment().diff(entity.dob, `years`);
    entity.rewardPoints = 0;

    entity.createdBy = { id: creatorId } as User;
    const salt = await bcrypt.genSalt();

    entity.password = await bcrypt.hash(uuidv4(), salt);

    entity = await this.userRepository.save(entity);
  }

  async update(user: UserDTO, id) {
    let existingUser = await this.userRepository.findOne(id, {
      relations: ['role'],
    });
    if (!existingUser) {
      throw new BadRequestException(`Cannot find user of id ${id}`);
    }
    delete user.password;
    let entity = this.classMapper.map(user, UserDTO, User);
    entity.id = id;
    entity.role = { id: user.role.id } as unknown as RoleEntity;
    if (
      user.role.id == (await this.roleService.findRole(Role.USER)).id &&
      existingUser.role.name != Role.USER
    ) {
      throw Error('Cannot update role of user with User role');
    }
    entity.verified = user.status == userStatus.ACTIVE;
    entity.age = moment().diff(entity.dob, `years`);
    entity = await this.userRepository.save(entity);
  }

  async getUsers(filter: string, isCustomer: boolean, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }

    const targetRole = isCustomer ? Role.USER : Role.ADMIN;
    const role = await this.roleService.findRole(targetRole);

    if (!role) {
      return { users: [], count: 0 };
    }

    const qb = this.userRepository
      .createQueryBuilder('user')
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)
      .select([
        'user.id',
        'user.roleId',
        'user.fname',
        'user.lname',
        'user.email',
        'user.nina',
        'user.phone',
        'user.rewardPoints',
        'user.verified',
        'user.externalId',
        'user.deletedAt',
      ])
      .where('user.deletedAt is null')
      .andWhere('user.roleId = :roleId', { roleId: role.id });

    if (filter) {
      if (filter.includes('_@@')) {
        qb.andWhere('user.verified = :verified', {
          verified: filter.replace('_@@', '') == userStatus.ACTIVE,
        });
      } else {
        qb.andWhere(
          "(concat(user.fname,' ',user.lname) like :filter or user.phone like :phoneFilter)",
          { filter: `%${filter}`, phoneFilter: `%${filter}%` },
        );
      }
    }

    const [results, count] = await qb.getManyAndCount();

    let users = results.map((p) => {
      return {
        ...this.classMapper.map(p, User, UserDTO),
        role: { name: role.name },
      };
    });
    return { users, count };
  }

  async verifyUser(email: string) {
    let user = await this.userRepository.findOne({
      where: { email, verified: false },
      relations: ['role'],
    });

    await this.userRepository.update(user.id, {
      verified: true,
    });
    user.verified = true;
    return user;
  }

  async verifyAdminUser(id: string, userEdited: User) {
    let user = await this.userRepository.findOne({
      where: { id, verified: false },
      relations: ['role'],
    });
    let editedFields = {};
    if (userEdited) {
      const salt = await bcrypt.genSalt();

      editedFields = {
        email: userEdited.email,
        fname: userEdited.fname,
        lname: userEdited.lname,
        phone: userEdited.phone,
        password: await bcrypt.hash(userEdited.password, salt),
      };
    }
    await this.userRepository.update(user.id, {
      ...editedFields,
    });
    return user;
  }

  async resetPassword(email: string, password: string) {
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw 'Invalid email for user';
    }
    if (
      !(
        password?.length > 7 &&
        hasSpecial(password) &&
        hasUpper(password) &&
        hasLower(password) &&
        hasNumber(password)
      )
    ) {
      throw new BadRequestException('Invalid Password Pattern');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await this.userRepository.save(user);
  }

  async addImage(id: string, name: string) {
    await this.userRepository.update(id, {
      imageUrl: name,
    });
  }

  async deleteCard(existingUser: any, cardId: string) {
    let user = await this.userRepository.findOne({
      where: { email: existingUser.username },
    });

    return await this.getProfile(existingUser.username);
  }

  async updateInfo(email: string, payload: EditUserDTO) {
    let user = await this.userRepository.findOne({ where: { email } });
    user.fname = payload.fname;
    user.lname = payload.lname;
    user.dob = payload.dob;
    user.phone = payload.phone;
    await this.userRepository.save(user);
    return await this.getProfile(email);
  }

  async deleteUser(id: string) {
    let user = await this.userRepository.findOne(id);
    const salt = await bcrypt.genSalt();
    user.email = await bcrypt.hash(user.email, salt);
    user.fname = '';
    user.lname = '';

    user.deletedAt = new Date();
    await this.userRepository.save(user);
    //add event here
    return 'ok';
  }

  async deleteUsers({ ids }: { ids: string[] }) {
    let users = await this.userRepository.find({ id: In(ids) });
    for (const user of users) {
      const salt = await bcrypt.genSalt();
      user.email = await bcrypt.hash(user.email, salt);
      user.fname = '';
      user.lname = '';

      user.deletedAt = new Date();
      await this.userRepository.save(user);
    }
    //add event here
    return 'ok';
  }

  async changeUsersState({ ids, status }: { ids: string[]; status: string }) {
    await this.userRepository.query(
      `update user set verified = ${
        status == 'active' ? true : false
      } where id in (${ids.map((id) => `'${id}'`).join(',')})`,
    );

    //add event here
    return 'ok';
  }
  async checkUser(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { email, verified: true },
      relations: ['role'],
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getProfile(email: string) {
    let user = await this.getUserByEmail(email);

    delete user.password;
    const userDto = await this.classMapper.map(user, User, UserDTO);
    return userDto;
  }

  async getUser(id: string) {
    let user = await this.userRepository.findOne(id, {
      relations: ['role', 'location'],
    });

    delete user.password;
    const userDto = await this.classMapper.map(user, User, UserDTO);
    userDto.role = {
      id: user.role.id,
      name: user.role.name,
    } as unknown as RoleDto;
    return userDto;
  }

  async search(search: string) {
    let results = await this.userRepository
      .createQueryBuilder('user')
      .where(
        'user.deleted_at is null and user.fname like :search or user.lname like :search',
        {
          search: `%${search}%`,
        },
      )
      .take(50)
      .orderBy('user.createdAt', 'DESC')
      .select(['user.id', 'user.fname', 'user.lname', 'user.rewardPoints'])
      .getMany();
    return results.map((p) => this.classMapper.map(p, User, UserDTO));
  }

  async loadDate() {
    const jsonStream = StreamArray.withParser();

    var jsonPath = path.join(__dirname, 'files.json');
    //internal Node readable stream option, pipe to stream-json to convert it for us
    fs.createReadStream(jsonPath).pipe(jsonStream.input);
    const mapping = {
      fname: 'Nom',
      lname: 'Prenom',
      externalId: 'Code_Producteur',
      dob: 'Date_Naissance',
      gender: 'Genre',
      language: 'Langue_Maternelle',
      maritalStatus: 'Situation_Matrimoniale',
      nina: 'Numero_Carte_NINA',
      phone: 'Mobile',
      numOfChildren: 'Nb_Enfants',
      createdAt: 'Date_Creation',
      age: 'age_producteur',
      literacyLevel: 'Niveau_Alphabet',
      location: {
        circle: 'Cercle',
        common: 'Commune',
        village: 'Village',
        region: 'Region',
      },
      mainCrop: 'Champ',
      activities: 'Activity',
      meansOfProduction: 'Moyens_Production',
      totalArea: 'Superficie_Totale',
      totalUsedArea: 'Superficie_Exploitee',
      cultivatedArea: 'Superficie_Cultivee',
      propertyStatus: 'statut',
      longitude: 'Longitude',
      latitude: 'Latitude',
      authorizedSurfaceArea: 'Superficie_Previsionnelle',
    };
    //You'll get json objects here
    //Key is the array-index here
    jsonStream.on('data', async ({ key, value }) => {
      console.log(value['Code_Producteur']);
      try {
        let user = await this.userRepository.findOne({
          where: { externalId: value['Code_Producteur'] },
        });
        if (user) {
          return;
        }
        user = new User();
        user.id = uuidv4();
        for (const key of Object.keys(mapping)) {
          if (key == 'location') {
            const loc = new LocationEntity();
            loc.village = value[mapping.location.village];
            loc.region = value[mapping.location.region];
            loc.common = value[mapping.location.common];
            loc.circle = value[mapping.location.circle];
            loc.country = 'Mali';
            user.location = loc;
          } else {
            user[key] = this.fix(value[mapping[key]]);
          }
        }

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.id, salt);
        user.age = 0;
        user.email = uuidv4();
        if (!user.longitude) {
          user.longitude = 0.0;
        }
        if (!user.latitude) {
          user.latitude = 0.0;
        }
        if (!user.totalArea) {
          user.totalArea = 0;
        }
        user.role = { id: 2 } as RoleEntity;

        await this.userRepository.save(user);
      } catch (error) {
        console.log(error);
      }
      //write code here for creating user.
    });
  }

  fix(val: string) {
    if (!val) {
      return val;
    }
    return val.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
  }
  async adminData() {
    const user = {
      fname: 'Arnav',
      lname: 'Admin',
      externalId: 'ARNAV_ADMIN',
      dob: '1994-01-01',
      gender: 'HOMME',
      language: 'English',
      maritalStatus: '',
      nina: '',
      phone: '',
      numOfChildren: 1,
      createdAt: new Date(),
      age: 30,
      rewardPoints: 0,
      literacyLevel: '',
      location: {
        street: '',
        community: '',
        city: '',
        state: '',
        country: 'mali',
      },
      mainCrop: '',
      activities: '',
      meansOfProduction: '',
      totalArea: 0,
      totalUsedArea: 0,
      cultivatedArea: 0,
      propertyStatus: '',
      longitude: 0,
      latitude: 0,
      authorizedSurfaceArea: 0,
      email: 'admin@limegroup.ca',
      verified: true,
    } as unknown as User;
    user.role = { id: 1 } as RoleEntity;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash('Events1234!', salt);
    user.id = uuidv4();
    await this.userRepository.save(user);
  }
}
