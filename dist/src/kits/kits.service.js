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
exports.KitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const uuid_1 = require("uuid");
const typeorm_2 = require("typeorm");
const kit_component_entity_1 = require("./entities/kit-component.entity");
const kit_entity_1 = require("./entities/kit.entity");
let KitsService = class KitsService {
    constructor(kitRepo, componentRepo, productRepo) {
        this.kitRepo = kitRepo;
        this.componentRepo = componentRepo;
        this.productRepo = productRepo;
    }
    async create(user, dto) {
        const componentNames = dto.components.map((component) => component.componentName.trim().toLowerCase());
        if (new Set(componentNames).size !== componentNames.length) {
            throw new common_1.BadRequestException('A kit component can only be included once.');
        }
        if (await this.kitRepo.findOne({ where: { reference: dto.reference } })) {
            throw new common_1.BadRequestException(`Kit reference "${dto.reference}" already exists.`);
        }
        const product = this.productRepo.create(Object.assign({ id: (0, uuid_1.v4)(), name: dto.name, price: dto.price, description: dto.description || dto.scenario, longDescription: dto.description || null, status: dto.isActive === false ? product_entity_1.ProductStatus.INACTIVE : product_entity_1.ProductStatus.ACTIVE, type: 'product', productKind: product_entity_1.ProductKind.KIT, tracksInventory: false, unit: 'kit', numAvail: 0, numLeft: 0, imageUrl: '', level: product_entity_1.Level.PRODUCT, createdBy: { id: user.id } }, (dto.categoryId ? { parent: { id: dto.categoryId } } : {})));
        await this.productRepo.save(product);
        const kit = this.kitRepo.create({
            id: (0, uuid_1.v4)(), product, reference: dto.reference, campaign: dto.campaign,
            scenario: dto.scenario, crop: dto.crop, coverageHectares: dto.coverageHectares,
            unitAdvanceFcfa: (dto.unitAdvanceFcfa || 0),
            repaymentQuantity: (dto.repaymentQuantity || 0),
            repaymentUnit: dto.repaymentUnit || 'kg', isActive: dto.isActive !== false,
        });
        await this.kitRepo.save(kit);
        await this.componentRepo.save(dto.components.map((component, index) => this.componentRepo.create({
            kit: { id: kit.id },
            componentName: component.componentName,
            quantityPerKit: component.quantityPerKit,
            unit: component.unit,
            displayOrder: index,
        })));
        return { id: product.id };
    }
    async findByProductId(productId) {
        const kit = await this.kitRepo
            .createQueryBuilder('kit')
            .leftJoinAndSelect('kit.components', 'component')
            .where('kit.product_id = :productId', { productId })
            .andWhere('kit.is_active = :isActive', { isActive: true })
            .getOne();
        if (!kit) {
            return null;
        }
        return {
            id: kit.id,
            reference: kit.reference,
            campaign: kit.campaign,
            scenario: kit.scenario,
            crop: kit.crop,
            coverageHectares: kit.coverageHectares,
            unitAdvanceFcfa: kit.unitAdvanceFcfa,
            repaymentQuantity: kit.repaymentQuantity,
            repaymentUnit: kit.repaymentUnit,
            components: kit.components
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((component) => ({
                componentName: component.componentName,
                quantityPerKit: component.quantityPerKit,
                unit: component.unit,
            })),
        };
    }
};
KitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kit_entity_1.Kit)),
    __param(1, (0, typeorm_1.InjectRepository)(kit_component_entity_1.KitComponent)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], KitsService);
exports.KitsService = KitsService;
//# sourceMappingURL=kits.service.js.map