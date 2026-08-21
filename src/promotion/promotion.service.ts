import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ValidationError } from 'class-validator';
import { Product, ProductStatus } from 'src/product/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/user.entity';
import { RoleEntity } from 'src/roles/role.entity';
import { Role } from 'src/roles/role.service';
import { MetaParam } from 'src/common/file/interfaces';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepo: Repository<Promotion>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create(user, createPromotionDto: CreatePromotionDto) {
    let promotion: Promotion = this.classMapper.map(
      createPromotionDto,
      CreatePromotionDto,
      Promotion,
    );
    promotion.createdBy = { id: user.id } as User;
    promotion.action = 'Apply Now';
    promotion.isFirstPage = true;
    if (!createPromotionDto.product?.id) {
      throw new BadRequestException('you must link a prmotion to a product');
    }

    promotion.product = { id: createPromotionDto.product?.id } as Product;

    promotion.id = uuidv4();
    await this.promotionRepo.save(promotion);
    return { id: promotion.id };
  }

  async getProductForPromotions(filter: string) {
    return await this.promotionRepo.query(
      `select id,name from product where name like '%${filter}%' and parent_id is not null limit 20 `,
    );
  }

  async addImageToPromotion(id: string, userId: string, url: string) {
    let promotion: Promotion = await this.promotionRepo.findOne({
      where: { id },
    });
    if (!promotion) {
      throw Error('bad resource management');
    }
    promotion.imageUrl = url;
    this.promotionRepo.save(promotion);
  }

  async findMain() {
    return this.classMapper.map(
      await this.promotionRepo.findOne({ where: { isFirstPage: true } }),
      Promotion,
      CreatePromotionDto,
    );
  }

  async findAll(filter: string, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }
    const [results, count] = await this.promotionRepo
      .createQueryBuilder('promotion')
      .innerJoin('promotion.product', 'product')
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)
      .select([
        'promotion.id',
        'promotion.name',
        'promotion.imageUrl',
        'promotion.description',
        'promotion.status',
        'promotion.discount',
        'product.id',
        'product.name',
      ])
      .where(
        `${
          filter
            ? filter.includes('_@@')
              ? ` promotion.status = '${filter.replace('_@@', '')}'`
              : ` promotion.name like "%${filter}%" `
            : ''
        } `,
      )
      .getManyAndCount();

    let promotions = results.map((p) => {
      return {
        ...this.classMapper.map(p, Promotion, CreatePromotionDto),
        product: { id: p.product.id, name: p.product.name },
      };
    });
    return { promotions, count };
  }

  async findAllForUser() {
    return (
      await this.promotionRepo.find({
        where: { status: ProductStatus.ACTIVE },
      })
    ).map((p) => this.classMapper.map(p, Promotion, CreatePromotionDto));
  }

  async findOne(id: string) {
    return this.classMapper.map(
      await this.promotionRepo.findOne(id, { relations: ['product'] }),
      Promotion,
      CreatePromotionDto,
    );
  }

  async update(id: string, updateProductDto: CreatePromotionDto) {
    let promotion: Promotion = this.classMapper.map(
      updateProductDto,
      CreatePromotionDto,
      Promotion,
    );
    promotion.id = id;
    const oldProduct = await this.promotionRepo.findOne(id);

    await this.promotionRepo.save({ ...oldProduct, ...promotion });
  }

  async remove(id: string) {
    return await this.promotionRepo.delete(id);
  }
}
