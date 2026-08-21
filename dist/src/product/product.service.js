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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_entity_1 = require("./entities/product.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_1 = require("@automapper/nestjs");
const uuid_1 = require("uuid");
const promotion_service_1 = require("../promotion/promotion.service");
const transactions_entity_1 = require("../transactions/transactions.entity");
const moment = require("moment-timezone");
let ProductService = class ProductService {
    constructor(productRepo, classMapper, promotionService) {
        this.productRepo = productRepo;
        this.classMapper = classMapper;
        this.promotionService = promotionService;
    }
    async create(user, createProductDto) {
        var _a, _b;
        let product = this.classMapper.map(createProductDto, create_product_dto_1.CreateProductDto, product_entity_1.Product);
        if (await this.productRepo.findOne({ where: { name: product.name } })) {
            throw new common_1.BadRequestException(`product with name "${product.name}" already exists`);
        }
        product.createdBy = { id: user.id };
        if ((_a = createProductDto.parent) === null || _a === void 0 ? void 0 : _a.id) {
            product.parent = { id: (_b = createProductDto.parent) === null || _b === void 0 ? void 0 : _b.id };
        }
        else {
            delete product.parent;
        }
        product.numLeft = product.numAvail;
        product.id = (0, uuid_1.v4)();
        await this.productRepo.save(product);
        return { id: product.id };
    }
    mapDao(product) {
        const { id, name, imageUrl, price, unit, description } = this.classMapper.map(product, product_entity_1.Product, create_product_dto_1.CreateProductDto);
        return { id, name, imageUrl, price, unit, description };
    }
    async search(search, category = '*') {
        let allProducts = await this.productRepo
            .createQueryBuilder('product')
            .innerJoin('product.parent', 'parent')
            .where(`product.level = 'product'`)
            .andWhere(`parent.status = 'active'`)
            .andWhere(`product.status = 'active'`)
            .andWhere(`product.parent = '${category}'`)
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('product.name like :search', {
                search: `%${search}%`,
            }).orWhere('parent.name like :search', { search: `%${search}%` });
        }))
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
        return allProducts.map((p) => this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto));
    }
    async findMain() {
        let featured = await this.productRepo
            .createQueryBuilder('product')
            .where({
            presentation: product_entity_1.Presentation.FEATURED,
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
        let categories = await this.productRepo.query('select p.id as id, p.image_url as imageUrl, p.name as name, p.price, p.reward_ratio, p.unit, p.description from product p inner join product child on p.id = child.parent_id where child.level = "product" and child.status ="active" and p.status ="active" group by p.id limit 5');
        return {
            mainProducts: categories.map((p) => this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto)),
            featuredProducts: featured.map((p) => this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto)),
            promotion: await this.promotionService.findMain(),
        };
    }
    async getFeaturedProducts() {
        let product = await this.productRepo.query("select p.id as id, p.name as name, p.price as price, p.reward_ratio as rewardRatio, p.unit as unit, p.image_url as imageUrl, c.name as parent from product p inner join product c on c.id = p.parent_id where p.presentation = 'featured'");
        return product;
    }
    async getActiveProducts() {
        let month1 = moment(new Date()).format('MM');
        let year1 = moment(new Date()).format('yyyy');
        let prevMonth = moment(new Date()).subtract(1, 'month').format('MM');
        let prevYeat = moment(new Date()).subtract(1, 'month').format('yyyy');
        let data = await this.productRepo.query(`select p.id, p.name, SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) as "cur" from transactions pr inner join product p on p.id = pr.product_id where pr.status = "${transactions_entity_1.Status.COMPLETED}" and pr.completed_at >= '${year1}-${month1}-01' group by p.id order by SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) desc limit 5`);
        for (const product of data) {
            const entry = await this.productRepo.query(`select SUM(pr.amount * pr.quantity + pr.fee_1 + pr.fee_2 + pr.fee_3) as quantity from transactions pr inner join product p on p.id = pr.product_id where pr.status = "${transactions_entity_1.Status.COMPLETED}" and pr.completed_at >= '${prevYeat}-${prevMonth}-01' and pr.completed_at < '${year1}-${month1}-01' and p.id = '${product.id}'`);
            product['prev'] = entry[0].quantity || 0;
            delete product.id;
        }
        return data;
    }
    async getRevenueSummary() {
        let month1 = moment(new Date()).format('MM');
        let year1 = moment(new Date()).format('yyyy');
        let data = await this.productRepo.query(`select p.name as name, SUM(t.amount * t.quantity + t.fee_1 + t.fee_2 + t.fee_3) as value from transactions as t inner join product p on p.id = t.product_category where t.completed_at >= '${year1}-${month1}-01' AND t.status = "${transactions_entity_1.Status.COMPLETED}" group by t.product_category limit 5`);
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
            months = months.concat(months.splice(0, +moment(new Date()).format('MM')));
        }
        let month2 = moment(new Date()).subtract(23, 'month').format('MM');
        let year2 = moment(new Date()).subtract(23, 'month').format('yyyy');
        let data = await this.productRepo.query(`
    SELECT 
      DATE_FORMAT(pu.completed_at, "%b") AS name, 
      SUM(pu.amount * pu.quantity + pu.fee_1 + pu.fee_2 + pu.fee_3) AS "cur"
      FROM transactions pu 
      WHERE completed_at >= "${year1}-${month1}-01" AND status = "${transactions_entity_1.Status.COMPLETED}"
      GROUP BY DATE_FORMAT(pu.completed_at, "%b")
    `);
        let data2 = await this.productRepo.query(`
    SELECT 
      DATE_FORMAT(pu.completed_at, "%b") AS name, 
      SUM(pu.amount * pu.quantity + pu.fee_1 + pu.fee_2 + pu.fee_3) AS "prev"
      FROM transactions pu 
      WHERE completed_at < "${year1}-${month1}-01" AND completed_at >= "${year2}-${month2}-01" AND status = "${transactions_entity_1.Status.COMPLETED}"
      GROUP BY DATE_FORMAT(pu.completed_at, "%b")
    `);
        let returnData = [];
        for (let month of months) {
            let entry1 = data.find((d) => d.name == month);
            let entry2 = data2.find((d) => d.name == month);
            returnData.push({
                name: month,
                cur: (entry1 === null || entry1 === void 0 ? void 0 : entry1['cur']) || 0,
                prev: (entry2 === null || entry2 === void 0 ? void 0 : entry2['prev']) || 0,
            });
        }
        return { data: returnData, thisYear: 'cur', lastYear: 'prev' };
    }
    async getLast10Transactions() {
        let month = moment(new Date()).format('MM');
        let year = moment(new Date()).format('yyyy');
        return await this.productRepo.query(`select u.fname as fname, u.lname as lname, p.name as productName, t.completed_at as date from transactions t inner join product p on p.id = t.product_id inner join user u on u.id = t.customer_id where t.status = "${transactions_entity_1.Status.COMPLETED}" and t.completed_at >='${year}-${month}-01'`);
    }
    async addImageToProduct(id, userId, url) {
        let product = await this.productRepo.findOne({
            where: { id },
        });
        if (!product) {
            throw Error('bad resource management');
        }
        product.imageUrl = url;
        this.productRepo.save(product);
    }
    async findAllForUser(filter) {
        let where = {
            level: product_entity_1.Level.PRODUCT,
            status: product_entity_1.ProductStatus.ACTIVE,
            parent: { status: product_entity_1.ProductStatus.ACTIVE },
        };
        if (filter) {
            where = Object.assign(Object.assign({}, where), { parent: Object.assign(Object.assign({}, where.parent), { id: filter }) });
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
        let categories = await this.productRepo.query('select p.id as id, p.image_url as imageUrl, p.name as name from product p inner join product child on p.id = child.parent_id where child.level = "product" and child.status ="active" and p.status ="active" group by p.id');
        const returnedProducts = products.map((p) => {
            return this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto);
        });
        return {
            products: returnedProducts,
            categories,
            loadMore: false,
            skip: 1,
        };
    }
    async getCategories(filter, parentId, includeSubs = false) {
        const [categories, subCategories] = await Promise.all([
            this.productRepo.query(` Select product.id as id,product.name as name,product.image_url as imageUrl, product.status from product where product.level = "${parentId ? 'sub_category' : 'category'}"   ${filter
                ? filter.includes('_@@')
                    ? `and product.status = '${filter.replace('_@@', '')}'`
                    : `and product.name like '%${filter}%'`
                : ''} ${parentId ? ` and product.parent_id = '${parentId}'` : ''} `),
            includeSubs
                ? this.productRepo.query(` Select product.id as id,product.name as name,product.image_url as imageUrl, product.status,product.parent_id from product where product.level ="sub_category"`)
                : undefined,
        ]);
        return categories.map((cat) => (Object.assign(Object.assign({}, cat), { subCategories: (subCategories === null || subCategories === void 0 ? void 0 : subCategories.filter((p) => p.parent_id == cat.id)) || [] })));
    }
    async findAll(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
        }
        let order = 'ASC';
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
            .where(`product.level = "${product_entity_1.Level.PRODUCT}" ${filter.includes('_@@')
            ? `and product.status = '${filter.replace('_@@', '')}'`
            : filter
                ? `and (parent.name like "%${filter}%" or product.name like "%${filter}%")`
                : ''} `)
            .getManyAndCount();
        let products = results.map((p) => {
            return this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto);
        });
        return { products, count };
    }
    async findOne(id) {
        var _a, _b;
        const db = await this.productRepo.findOne(id, {
            relations: ['parent', 'parent.parent'],
        });
        let product = this.classMapper.map(db, product_entity_1.Product, create_product_dto_1.CreateProductDto);
        product.longDescription = db.longDescription;
        product.sections = db.sections;
        if (product.parent) {
            product.parent = {
                name: db.parent.name,
                id: db.parent.id,
                parent: { id: (_a = db.parent.parent) === null || _a === void 0 ? void 0 : _a.id, name: (_b = db.parent.parent) === null || _b === void 0 ? void 0 : _b.name },
            };
        }
        return {
            product,
        };
    }
    async update(id, updateProductDto) {
        var _a;
        let product = this.classMapper.map(updateProductDto, create_product_dto_1.CreateProductDto, product_entity_1.Product);
        const oldProduct = await this.productRepo.findOne(id);
        product.id = id;
        if (!((_a = product.parent) === null || _a === void 0 ? void 0 : _a.id)) {
            delete product.parent;
        }
        await this.productRepo.save(Object.assign(Object.assign({}, oldProduct), product));
    }
    async remove(id) {
        if ((await this.productRepo.query(`Select count(*)  as count from purchase_product where product_id = "${id}"`))[0].count > 0) {
            throw Error("cannot delete a product that's been purchased!");
        }
        await this.productRepo.delete(id);
        return 'deleted';
    }
    async removeBatch(ids) {
        await Promise.all(ids.map(async (id) => await this.remove(id)));
        return 'deleted';
    }
    async changeStateBatch(ids, state) {
        if (!Object.values(product_entity_1.ProductStatus).includes(state)) {
            throw Error('invalid state change');
        }
        await Promise.all(ids.map(async (id) => await this.productRepo.update(id, { status: state })));
        return 'changed';
    }
    async searchCategories(search) {
        let allProducts = await this.productRepo
            .createQueryBuilder('product')
            .where(`product.level = 'category'`)
            .andWhere(`product.status = 'active'`)
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('product.name like :search', {
                search: `%${search}%`,
            });
        }))
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
        return allProducts.map((p) => this.classMapper.map(p, product_entity_1.Product, create_product_dto_1.CreateProductDto));
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object, promotion_service_1.PromotionService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map