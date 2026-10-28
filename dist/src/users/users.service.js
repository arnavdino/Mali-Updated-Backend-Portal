"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const role_service_1 = require("../roles/role.service");
const interfaces_1 = require("../common/file/interfaces");
const fs = require("fs");
const path = require("path");
const StreamArray = require("stream-json/streamers/StreamArray");
const location_entity_1 = require("./location.entity");
const user_identity_document_entity_1 = require("./user-identity-document.entity");
const files_service_1 = require("../common/file/files.service");
const moment = require("moment-timezone");
const DEFAULT_CREATED_USER_PASSWORD = 'Farmer2026!';
let UsersService = UsersService_1 = class UsersService {
    constructor(classMapper, userRepository, identityDocumentRepository, identityDocumentRemovalAuditRepository, roleService, filesService) {
        this.classMapper = classMapper;
        this.userRepository = userRepository;
        this.identityDocumentRepository = identityDocumentRepository;
        this.identityDocumentRemovalAuditRepository = identityDocumentRemovalAuditRepository;
        this.roleService = roleService;
        this.filesService = filesService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async getIdentityDocuments(userId) {
        await this.ensureUserExists(userId);
        const documents = await this.identityDocumentRepository.find({
            where: { userId, removedAt: (0, typeorm_2.IsNull)() },
            order: { documentType: 'ASC' },
        });
        return documents.map((document) => (Object.assign(Object.assign({}, document), { viewUrl: this.filesService.getPrivateDocumentUrl(document.storageKey) })));
    }
    async addIdentityDocument(userId, documentType, file) {
        if (!Object.values(user_identity_document_entity_1.IdentityDocumentType).includes(documentType)) {
            throw new common_1.BadRequestException('Invalid identity document type');
        }
        await this.ensureUserExists(userId);
        const storageKey = await this.filesService.uploadIdentityDocument(file, userId, documentType);
        const existing = await this.identityDocumentRepository.findOne({
            where: { userId, documentType: documentType },
        });
        const document = this.identityDocumentRepository.create(Object.assign(Object.assign({}, (existing || { id: (0, uuid_1.v4)(), userId })), { documentType: documentType, storageKey, originalFilename: file.originalname.slice(0, 255), mimeType: file.mimetype, fileSize: file.size, status: user_identity_document_entity_1.IdentityDocumentStatus.PENDING, reviewedAt: null, reviewedBy: null, rejectionReason: null, removedAt: null, removedBy: null, removalReason: null }));
        const saved = await this.identityDocumentRepository.save(document);
        return Object.assign(Object.assign({}, saved), { viewUrl: this.filesService.getPrivateDocumentUrl(saved.storageKey) });
    }
    async reviewIdentityDocument(documentId, status, reviewedBy, rejectionReason) {
        if (![user_identity_document_entity_1.IdentityDocumentStatus.APPROVED, user_identity_document_entity_1.IdentityDocumentStatus.REJECTED].includes(status)) {
            throw new common_1.BadRequestException('Identity documents can only be approved or rejected');
        }
        if (status === user_identity_document_entity_1.IdentityDocumentStatus.REJECTED && !(rejectionReason === null || rejectionReason === void 0 ? void 0 : rejectionReason.trim())) {
            throw new common_1.BadRequestException('A rejection reason is required');
        }
        const document = await this.identityDocumentRepository.findOne(documentId);
        if (!document) {
            throw new common_1.BadRequestException('Cannot find identity document');
        }
        document.status = status;
        document.reviewedBy = reviewedBy;
        document.reviewedAt = new Date();
        document.rejectionReason = status === user_identity_document_entity_1.IdentityDocumentStatus.REJECTED ? rejectionReason.trim().slice(0, 500) : null;
        const saved = await this.identityDocumentRepository.save(document);
        return Object.assign(Object.assign({}, saved), { viewUrl: this.filesService.getPrivateDocumentUrl(saved.storageKey) });
    }
    async removeIdentityDocument(documentId, removedBy, removalReason) {
        const document = await this.identityDocumentRepository.findOne(documentId);
        if (!document || document.removedAt) {
            throw new common_1.BadRequestException('Cannot find active identity document');
        }
        await this.filesService.deletePrivateDocument(document.storageKey);
        const removedAt = new Date();
        const reason = (removalReason === null || removalReason === void 0 ? void 0 : removalReason.trim().slice(0, 500)) || null;
        await this.identityDocumentRemovalAuditRepository.save(this.identityDocumentRemovalAuditRepository.create({
            id: (0, uuid_1.v4)(),
            documentId: document.id,
            userId: document.userId,
            documentType: document.documentType,
            storageKey: document.storageKey,
            originalFilename: document.originalFilename,
            mimeType: document.mimeType,
            fileSize: document.fileSize,
            documentStatus: document.status,
            removedBy,
            removedAt,
            removalReason: reason,
        }));
        document.removedBy = removedBy;
        document.removedAt = removedAt;
        document.removalReason = reason;
        await this.identityDocumentRepository.save(document);
        return { id: document.id, removedAt };
    }
    async ensureUserExists(userId) {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new common_1.BadRequestException(`Cannot find user of id ${userId}`);
        }
        return user;
    }
    async register(user) {
        let entity = this.classMapper.map(user, user_dto_1.UserDTO, user_entity_1.User);
        entity.id = (0, uuid_1.v4)();
        entity.role = await this.roleService.findRole(role_service_1.Role.USER);
        const salt = await bcrypt.genSalt();
        entity.password = await bcrypt.hash(entity.password, salt);
        await this.userRepository.save(entity);
        return entity;
    }
    async getUserForVerification(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId, verified: false },
        });
        if (!user) {
            throw new common_1.BadRequestException('cannot find requested user');
        }
        return {
            email: user.email,
            phone: user.phone,
            fname: user.fname,
            lname: user.lname,
            rewardPoints: user.rewardPoints
        };
    }
    async createUser(user, creatorId) {
        let entity = this.classMapper.map(user, user_dto_1.UserDTO, user_entity_1.User);
        entity.id = (0, uuid_1.v4)();
        entity.role = { id: user.role.id };
        const farmerRole = await this.roleService.findRole(role_service_1.Role.USER);
        if (user.role.id == farmerRole.id) {
            entity.email = `${(0, uuid_1.v4)()}@jaabi-sugu.com`;
        }
        entity.verified = user.status == 'active' ? true : false;
        entity.externalId = (0, uuid_1.v4)();
        entity.age = moment().diff(entity.dob, `years`);
        entity.rewardPoints = 0;
        entity.createdBy = { id: creatorId };
        const salt = await bcrypt.genSalt();
        entity.password = await bcrypt.hash(DEFAULT_CREATED_USER_PASSWORD, salt);
        entity = await this.userRepository.save(entity);
        return entity;
    }
    async update(user, id) {
        let existingUser = await this.userRepository.findOne(id, {
            relations: ['role'],
        });
        if (!existingUser) {
            throw new common_1.BadRequestException(`Cannot find user of id ${id}`);
        }
        delete user.password;
        let entity = this.classMapper.map(user, user_dto_1.UserDTO, user_entity_1.User);
        entity.id = id;
        entity.role = { id: user.role.id };
        if (user.role.id == (await this.roleService.findRole(role_service_1.Role.USER)).id &&
            existingUser.role.name != role_service_1.Role.USER) {
            throw Error('Cannot update role of user with User role');
        }
        entity.verified = user.status == interfaces_1.userStatus.ACTIVE;
        entity.age = moment().diff(entity.dob, `years`);
        entity = await this.userRepository.save(entity);
        return entity;
    }
    async getUsers(filter, isCustomer, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
        }
        const targetRole = isCustomer ? role_service_1.Role.USER : role_service_1.Role.ADMIN;
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
                const requestedStatus = filter.replace('_@@', '');
                if (![interfaces_1.userStatus.ACTIVE, interfaces_1.userStatus.INACTIVE, 'pending'].includes(requestedStatus)) {
                    throw new common_1.BadRequestException('invalid filter');
                }
                qb.andWhere('user.verified = :verified', {
                    verified: requestedStatus === interfaces_1.userStatus.ACTIVE,
                });
            }
            else {
                qb.andWhere("(concat(user.fname,' ',user.lname) like :filter or user.phone like :phoneFilter)", { filter: `%${filter}%`, phoneFilter: `%${filter}%` });
            }
        }
        const [results, count] = await qb.getManyAndCount();
        let users = results.map((p) => {
            return Object.assign(Object.assign({}, this.classMapper.map(p, user_entity_1.User, user_dto_1.UserDTO)), { role: { name: role.name } });
        });
        return { users, count };
    }
    async verifyUser(email) {
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
    async verifyAdminUser(id, userEdited) {
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
        await this.userRepository.update(user.id, Object.assign({}, editedFields));
        return user;
    }
    async resetPassword(email, password) {
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw 'Invalid email for user';
        }
        if (!((password === null || password === void 0 ? void 0 : password.length) > 7 &&
            (0, user_dto_1.hasSpecial)(password) &&
            (0, user_dto_1.hasUpper)(password) &&
            (0, user_dto_1.hasLower)(password) &&
            (0, user_dto_1.hasNumber)(password))) {
            throw new common_1.BadRequestException('Invalid Password Pattern');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        await this.userRepository.save(user);
    }
    async changePassword(email, currentPassword, newPassword) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        if (!((newPassword === null || newPassword === void 0 ? void 0 : newPassword.length) > 7 &&
            (0, user_dto_1.hasSpecial)(newPassword) &&
            (0, user_dto_1.hasUpper)(newPassword) &&
            (0, user_dto_1.hasLower)(newPassword) &&
            (0, user_dto_1.hasNumber)(newPassword))) {
            throw new common_1.BadRequestException('Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        await this.userRepository.save(user);
    }
    async addImage(id, name) {
        await this.userRepository.update(id, {
            imageUrl: name,
        });
    }
    async deleteCard(existingUser, cardId) {
        let user = await this.userRepository.findOne({
            where: { email: existingUser.username },
        });
        return await this.getProfile(existingUser.username);
    }
    async updateInfo(email, payload) {
        let user = await this.userRepository.findOne({ where: { email } });
        user.fname = payload.fname;
        user.lname = payload.lname;
        user.dob = payload.dob;
        user.phone = payload.phone;
        await this.userRepository.save(user);
        return await this.getProfile(email);
    }
    async deleteUser(id) {
        let user = await this.userRepository.findOne(id);
        const salt = await bcrypt.genSalt();
        user.email = await bcrypt.hash(user.email, salt);
        user.fname = '';
        user.lname = '';
        user.deletedAt = new Date();
        await this.userRepository.save(user);
        return 'ok';
    }
    async deleteUsers({ ids }) {
        let users = await this.userRepository.find({ id: (0, typeorm_2.In)(ids) });
        for (const user of users) {
            const salt = await bcrypt.genSalt();
            user.email = await bcrypt.hash(user.email, salt);
            user.fname = '';
            user.lname = '';
            user.deletedAt = new Date();
            await this.userRepository.save(user);
        }
        return 'ok';
    }
    async changeUsersState({ ids, status }) {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new common_1.BadRequestException('At least one user id is required');
        }
        if (![interfaces_1.userStatus.ACTIVE, interfaces_1.userStatus.INACTIVE].includes(status)) {
            throw new common_1.BadRequestException('Invalid user status');
        }
        await this.userRepository.update({ id: (0, typeorm_2.In)(ids) }, { verified: status === interfaces_1.userStatus.ACTIVE });
        return 'ok';
    }
    async checkUser(email, pass) {
        const user = await this.userRepository.findOne({
            where: { email, verified: true },
            relations: ['role'],
        });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async getUserByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
        });
    }
    async getProfile(email) {
        let user = await this.getUserByEmail(email);
        delete user.password;
        const userDto = await this.classMapper.map(user, user_entity_1.User, user_dto_1.UserDTO);
        return userDto;
    }
    async getUser(id) {
        let user = await this.userRepository.findOne(id, {
            relations: ['role', 'location'],
        });
        delete user.password;
        const userDto = await this.classMapper.map(user, user_entity_1.User, user_dto_1.UserDTO);
        userDto.role = {
            id: user.role.id,
            name: user.role.name,
        };
        return userDto;
    }
    async search(search) {
        let results = await this.userRepository
            .createQueryBuilder('user')
            .where('user.deleted_at is null')
            .andWhere('(user.fname like :search or user.lname like :search)', {
            search: `%${search}%`,
        })
            .take(50)
            .orderBy('user.createdAt', 'DESC')
            .select(['user.id', 'user.fname', 'user.lname', 'user.rewardPoints'])
            .getMany();
        return results.map((p) => this.classMapper.map(p, user_entity_1.User, user_dto_1.UserDTO));
    }
    async loadDate() {
        const jsonStream = StreamArray.withParser();
        var jsonPath = path.join(__dirname, 'files.json');
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
        jsonStream.on('data', async ({ key, value }) => {
            console.log(value['Code_Producteur']);
            try {
                let user = await this.userRepository.findOne({
                    where: { externalId: value['Code_Producteur'] },
                });
                if (user) {
                    return;
                }
                user = new user_entity_1.User();
                user.id = (0, uuid_1.v4)();
                for (const key of Object.keys(mapping)) {
                    if (key == 'location') {
                        const loc = new location_entity_1.LocationEntity();
                        loc.village = value[mapping.location.village];
                        loc.region = value[mapping.location.region];
                        loc.common = value[mapping.location.common];
                        loc.circle = value[mapping.location.circle];
                        loc.country = 'Mali';
                        user.location = loc;
                    }
                    else {
                        user[key] = this.fix(value[mapping[key]]);
                    }
                }
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.id, salt);
                user.age = 0;
                user.email = (0, uuid_1.v4)();
                if (!user.longitude) {
                    user.longitude = 0.0;
                }
                if (!user.latitude) {
                    user.latitude = 0.0;
                }
                if (!user.totalArea) {
                    user.totalArea = 0;
                }
                user.role = { id: 2 };
                await this.userRepository.save(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fix(val) {
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
        };
        user.role = { id: 1 };
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash('Events1234!', salt);
        user.id = (0, uuid_1.v4)();
        await this.userRepository.save(user);
    }
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_identity_document_entity_1.UserIdentityDocument)),
    __param(3, (0, typeorm_1.InjectRepository)(user_identity_document_entity_1.UserIdentityDocumentRemovalAudit)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        role_service_1.RoleService,
        files_service_1.FilesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map