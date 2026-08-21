import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  Level,
  Presentation,
  Product,
  ProductStatus,
} from './entities/product.entity';
import { Brackets, ILike, In, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/user.entity';
import { PromotionService } from 'src/promotion/promotion.service';
import { MetaParam } from 'src/common/file/interfaces';
import { Status } from 'src/transactions/transactions.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly promotionService: PromotionService,
  ) {}
  async create(user, createProductDto: CreateProductDto) {
    let product: Product = this.classMapper.map(
      createProductDto,
      CreateProductDto,
      Product,
    );
    if (await this.productRepo.findOne({ where: { name: product.name } })) {
      throw new BadRequestException(
        `product with name "${product.name}" already exists`,
      );
    }
    product.createdBy = { id: user.id } as User;

    if (createProductDto.parent?.id) {
      product.parent = { id: createProductDto.parent?.id } as Product;
    } else {
      delete product.parent;
    }
    product.numLeft = product.numAvail;

    product.id = uuidv4();
    await this.productRepo.save(product);
    return { id: product.id };
  }

  mapDao(product: Product) {
    const { id, name, imageUrl, price, unit, description } =
      this.classMapper.map(product, Product, CreateProductDto);
    return { id, name, imageUrl, price, unit, description };
  }

  async search(search: string, category: string = '*') {
    let allProducts = await this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.parent', 'parent')
      .where(`product.level = 'product'`)
      .andWhere(`parent.status = 'active'`)
      .andWhere(`product.status = 'active'`)
      .andWhere(`product.parent = '${category}'`)
      .andWhere(
        new Brackets((qb) => {
          qb.where('product.name like :search', {
            search: `%${search}%`,
          }).orWhere('parent.name like :search', { search: `%${search}%` });
        }),
      )
      .take(50)
      .orderBy('product.createdAt', 'DESC')
      .select([
        'product.name',
        'product.level',
        'product.createdAt',
        'product.id',
        'product.price',
        'product.rewardRatio',
        'product.unit',
        'product.description',
        'product.imageUrl',
        'product.presentation',
        'parent.status',
      ])
      .getMany();

    return allProducts.map((p) =>
      this.classMapper.map(p, Product, CreateProductDto),
    );
  }

  async findMain() {
    let featured = await this.productRepo
      .createQueryBuilder('product')
      .where({
        presentation: Presentation.FEATURED,
      })
      .take(20)
      .orderBy('product.createdAt', 'DESC')
      .select([
        'product.name',
        'product.id',
        'product.price',
        'product.rewardRatio',
        'product.unit',
        'product.description',
        'product.imageUrl',
        'product.presentation',
      ])
      .getMany();
    let categories = await this.productRepo.query(
      'select p.id as id, p.image_url as imageUrl, p.name as name, p.price, p.reward_ratio, p.unit, p.description from product p inner join product child on p.id = child.parent_id where child.level = "product" and child.status ="active" and p.status ="active" group by p.id limit 5',
    );
    return {
      mainProducts: categories.map((p) =>
        this.classMapper.map(p, Product, CreateProductDto),
      ),
      featuredProducts: featured.map((p) =>
        this.classMapper.map(p, Product, CreateProductDto),
      ),
      promotion: await this.promotionService.findMain(),
    };
  }

  async getFeaturedProducts() {
    let product = await this.productRepo.query(
      "select p.id as id, p.name as name, p.price as price, p.reward_ratio as rewardRatio, p.unit as unit, p.image_url as imageUrl, c.name as parent from product p inner join product c on c.id = p.parent_id where p.presentation = 'featured'",
    );
    return product;
  }

  async getActiveProducts() {
    let month1 = moment(new Date()).format('MM');
    let year1 = moment(new Date()).format('yyyy');
    let prevMonth = moment(new Date()).subtract(1, 'month').format('MM');
    let prevYeat = moment(new Date()).subtract(1, 'month').format('yyyy');
    let data = await this.productRepo.query(
      `select p.id, p.name, SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) as "cur" from transactions pr inner join product p on p.id = pr.product_id where pr.status = "${Status.COMPLETED}" and pr.completed_at >= '${year1}-${month1}-01' group by p.id order by SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) desc limit 5`,
    );
    for (const product of data) {
      const entry = await this.productRepo.query(
        `select SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) as quantity from transactions pr inner join product p on p.id = pr.product_id where pr.status = "${Status.COMPLETED}" and pr.completed_at >= '${prevYeat}-${prevMonth}-01' and pr.completed_at < '${year1}-${month1}-01' and p.id = '${product.id}'`,
      );

      product['prev'] = entry[0].quantity || 0;
      delete product.id;
    }
    return data;
  }

  async getRevenueSummary() {
    let month1 = moment(new Date()).format('MM');
    let year1 = moment(new Date()).format('yyyy');
    let data = await this.productRepo.query(
      `select p.name as name, SUM(t.amount * t.quantity + t.fee_1 + t.fee_2 + t.fee_3) as value from transactions as t inner join product p on p.id = t.product_category where t.completed_at >= '${year1}-${month1}-01' AND t.status = "${Status.COMPLETED}" group by t.product_category limit 5`,
    );

    return data;
  }

  async getLast12Months() {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let month1 = moment(new Date()).subtract(11, 'month').format('MM');
    let year1 = moment(new Date()).subtract(11, 'month').format('yyyy');
    if (+moment(new Date()).format('MM') < 12) {
      months = months.concat(
        months.splice(0, +moment(new Date()).format('MM')),
      );
    }

    let month2 = moment(new Date()).subtract(23, 'month').format('MM');
    let year2 = moment(new Date()).subtract(23, 'month').format('yyyy');

    let data = await this.productRepo.query(`
    SELECT 
      DATE_FORMAT(pu.completed_at, "%b") AS name, 
      SUM(pu.amount * pu.quantity + pu.fee_1 + pu.fee_2 + pu.fee_3) AS "cur"
      FROM transactions pu 
      WHERE completed_at >= "${year1}-${month1}-01" AND status = "${Status.COMPLETED}"
      GROUP BY DATE_FORMAT(pu.completed_at, "%b")
    `);

    let data2 = await this.productRepo.query(`
    SELECT 
      DATE_FORMAT(pu.completed_at, "%b") AS name, 
      SUM(pu.amount * pu.quantity + pu.fee_1 + pu.fee_2 + pu.fee_3) AS "prev"
      FROM transactions pu 
      WHERE completed_at < "${year1}-${month1}-01" AND completed_at >= "${year2}-${month2}-01" AND status = "${Status.COMPLETED}"
      GROUP BY DATE_FORMAT(pu.completed_at, "%b")
    `);

    let returnData = [];
    for (let month of months) {
      let entry1 = data.find((d) => d.name == month);
      let entry2 = data2.find((d) => d.name == month);
      returnData.push({
        name: month,
        cur: entry1?.['cur'] || 0,
        prev: entry2?.['prev'] || 0,
      });
    }

    return { data: returnData, thisYear: 'cur', lastYear: 'prev' };
  }

  async getLast10Transactions() {
    let month = moment(new Date()).format('MM');
    let year = moment(new Date()).format('yyyy');
    return await this.productRepo.query(
      `select u.fname as fname, u.lname as lname, p.name as productName, t.completed_at as date from transactions t inner join product p on p.id = t.product_id inner join user u on u.id = t.customer_id where t.status = "${Status.COMPLETED}" and t.completed_at >='${year}-${month}-01'`,
    );
  }

  async addImageToProduct(id: string, userId: string, url: string) {
    let product: Product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw Error('bad resource management');
    }
    product.imageUrl = url;
    this.productRepo.save(product);
  }

  async findAllForUser(filter: string) {
    let where: {
      level: string;
      parent: { id?: string; status: ProductStatus };
      status: ProductStatus;
    } = {
      level: Level.PRODUCT,
      status: ProductStatus.ACTIVE,
      parent: { status: ProductStatus.ACTIVE },
    };
    if (filter) {
      where = { ...where, parent: { ...where.parent, id: filter } };
    }
    let products = await this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.parent', 'parent')
      .where(where)
      .select([
        'product.name',
        'product.id',
        'product.price',
        'product.rewardRatio',
        'product.unit',
        'product.description',
        'product.imageUrl',
      ])
      .getMany();
    let categories = await this.productRepo.query(
      'select p.id as id, p.image_url as imageUrl, p.name as name from product p inner join product child on p.id = child.parent_id where child.level = "product" and child.status ="active" and p.status ="active" group by p.id',
    );
    const returnedProducts = products.map((p) => {
      return this.classMapper.map(p, Product, CreateProductDto);
    });

    return {
      products: returnedProducts,
      categories,
      loadMore: false,
      skip: 1,
    };
  }

  async getCategories(filter: string, parentId?: string, includeSubs = false) {
    const [categories, subCategories] = await Promise.all([
      this.productRepo.query(
        ` Select product.id as id,product.name as name,product.image_url as imageUrl, product.status from product where product.level = "${
          parentId ? 'sub_category' : 'category'
        }"   ${
          filter
            ? filter.includes('_@@')
              ? `and product.status = '${filter.replace('_@@', '')}'`
              : `and product.name like '%${filter}%'`
            : ''
        } ${parentId ? ` and product.parent_id = '${parentId}'` : ''} `,
      ),
      includeSubs
        ? this.productRepo.query(
            ` Select product.id as id,product.name as name,product.image_url as imageUrl, product.status,product.parent_id from product where product.level ="sub_category"`,
          )
        : undefined,
    ]);
    return categories.map((cat) => ({
      ...cat,
      subCategories: subCategories?.filter((p) => p.parent_id == cat.id) || [],
    }));
  }
  async findAll(filter: string, meta: MetaParam) {
    if (meta.rowsPerPage < 0 || meta.page < 0) {
      throw Error('Invalid pagination meta');
    }
    if (filter?.includes('"')) {
      throw new BadRequestException('invalid filter');
    }
    let order: 'ASC' | 'DESC' = 'ASC';
    let field = '';
    if (meta.sortable) {
      field = meta.sortable.field;
      order = meta.sortable.order;
    }

    const [results, count] = await this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.parent', 'parent')
      .orderBy(field, order)
      .skip(meta.rowsPerPage * (meta.page - 1))
      .take(meta.rowsPerPage)

      .select([
        'product.name',
        'product.id',
        'product.price',
        'product.rewardRatio',
        'product.unit',
        'product.status',
        'product.description',
        'product.imageUrl',
        'parent.name',
        'parent.id',
      ])
      .where(
        `product.level = "${Level.PRODUCT}" ${
          filter.includes('_@@')
            ? `and product.status = '${filter.replace('_@@', '')}'`
            : filter
            ? `and (parent.name like "%${filter}%" or product.name like "%${filter}%")`
            : ''
        } `,
      )
      .getManyAndCount();
    let products = results.map((p) => {
      return this.classMapper.map(p, Product, CreateProductDto);
    });
    return { products, count };
  }

  async findOne(id: string) {
    const db = await this.productRepo.findOne(id, {
      relations: ['parent', 'parent.parent'],
    });
    let product = this.classMapper.map(db, Product, CreateProductDto);
    product.longDescription = db.longDescription;
    product.sections = db.sections;
    if (product.parent) {
      product.parent = {
        name: db.parent.name,
        id: db.parent.id,
        parent: { id: db.parent.parent?.id, name: db.parent.parent?.name },
      } as CreateProductDto;
    }
    return {
      product,
    };
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    let product: Product = this.classMapper.map(
      updateProductDto,
      CreateProductDto,
      Product,
    );
    const oldProduct = await this.productRepo.findOne(id);
    product.id = id;
    if (!product.parent?.id) {
      delete product.parent;
    }

    await this.productRepo.save({ ...oldProduct, ...product });
  }

  async remove(id: string) {
    if (
      (
        await this.productRepo.query(
          `Select count(*)  as count from purchase_product where product_id = "${id}"`,
        )
      )[0].count > 0
    ) {
      throw Error("cannot delete a product that's been purchased!");
    }
    await this.productRepo.delete(id);
    return 'deleted';
  }

  async removeBatch(ids: string[]) {
    await Promise.all(ids.map(async (id) => await this.remove(id)));
    return 'deleted';
  }

  async changeStateBatch(ids: string[], state: ProductStatus) {
    if (!Object.values(ProductStatus).includes(state)) {
      throw Error('invalid state change');
    }
    await Promise.all(
      ids.map(
        async (id) => await this.productRepo.update(id, { status: state }),
      ),
    );
    return 'changed';
  }

  async searchCategories(search: string) {
    let allProducts = await this.productRepo
      .createQueryBuilder('product')
      .where(`product.level = 'category'`)
      .andWhere(`product.status = 'active'`)
      .andWhere(
        new Brackets((qb) => {
          qb.where('product.name like :search', {
            search: `%${search}%`,
          });
        }),
      )
      .take(50)
      .orderBy('product.createdAt', 'DESC')
      .select([
        'product.name',
        'product.level',
        'product.createdAt',
        'product.id',
        'product.price',
        'product.rewardRatio',
        'product.unit',
        'product.description',
        'product.imageUrl',
        'product.presentation',
      ])
      .getMany();

    return allProducts.map((p) =>
      this.classMapper.map(p, Product, CreateProductDto),
    );
  }
}
