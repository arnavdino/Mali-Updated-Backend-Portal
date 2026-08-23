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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const create_promotion_dto_1 = require("./dto/create-promotion.dto");
const typeorm_1 = require("@nestjs/typeorm");
const promotion_entity_1 = require("./entities/promotion.entity");
const typeorm_2 = require("typeorm");
const nestjs_1 = require("@automapper/nestjs");
const product_entity_1 = require("../product/entities/product.entity");
const uuid_1 = require("uuid");
let PromotionService = class PromotionService {
    constructor(promotionRepo, classMapper) {
        this.promotionRepo = promotionRepo;
        this.classMapper = classMapper;
    }
    async create(user, createPromotionDto) {
        var _a, _b;
        let promotion = this.classMapper.map(createPromotionDto, create_promotion_dto_1.CreatePromotionDto, promotion_entity_1.Promotion);
        promotion.createdBy = { id: user.id };
        promotion.action = 'Apply Now';
        promotion.isFirstPage = true;
        if (!((_a = createPromotionDto.product) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new common_1.BadRequestException('you must link a prmotion to a product');
        }
        promotion.product = { id: (_b = createPromotionDto.product) === null || _b === void 0 ? void 0 : _b.id };
        promotion.id = (0, uuid_1.v4)();
        await this.promotionRepo.save(promotion);
        return { id: promotion.id };
    }
    async getProductForPromotions(filter) {
        return await this.promotionRepo.query(`select id,name from product where name like '%${filter}%' and parent_id is not null limit 20 `);
    }
    async addImageToPromotion(id, userId, url) {
        let promotion = await this.promotionRepo.findOne({
            where: { id },
        });
        if (!promotion) {
            throw Error('bad resource management');
        }
        promotion.imageUrl = url;
        this.promotionRepo.save(promotion);
    }
    async findMain() {
        return this.classMapper.map(await this.promotionRepo.findOne({ where: { isFirstPage: true } }), promotion_entity_1.Promotion, create_promotion_dto_1.CreatePromotionDto);
    }
    async findAll(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
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
            .where(`${filter
            ? filter.includes('_@@')
                ? ` promotion.status = '${filter.replace('_@@', '')}'`
                : ` promotion.name like "%${filter}%" `
            : ''} `)
            .getManyAndCount();
        let promotions = results.map((p) => {
            return Object.assign(Object.assign({}, this.classMapper.map(p, promotion_entity_1.Promotion, create_promotion_dto_1.CreatePromotionDto)), { product: { id: p.product.id, name: p.product.name } });
        });
        return { promotions, count };
    }
    async findAllForUser() {
        return (await this.promotionRepo.find({
            where: { status: product_entity_1.ProductStatus.ACTIVE },
        })).map((p) => this.classMapper.map(p, promotion_entity_1.Promotion, create_promotion_dto_1.CreatePromotionDto));
    }
    async findOne(id) {
        return this.classMapper.map(await this.promotionRepo.findOne(id, { relations: ['product'] }), promotion_entity_1.Promotion, create_promotion_dto_1.CreatePromotionDto);
    }
    async update(id, updateProductDto) {
        let promotion = this.classMapper.map(updateProductDto, create_promotion_dto_1.CreatePromotionDto, promotion_entity_1.Promotion);
        promotion.id = id;
        const oldProduct = await this.promotionRepo.findOne(id);
        await this.promotionRepo.save(Object.assign(Object.assign({}, oldProduct), promotion));
    }
    async remove(id) {
        return await this.promotionRepo.delete(id);
    }
};
PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], PromotionService);
exports.PromotionService = PromotionService;
//# sourceMappingURL=promotion.service.js.map