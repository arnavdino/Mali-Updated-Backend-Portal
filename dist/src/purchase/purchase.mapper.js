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
exports.PurchaseProfile = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const purchase_entity_1 = require("./entities/purchase.entity");
const purchase_product_dto_1 = require("./dto/purchase-product.dto");
const purchase_product_entity_1 = require("./entities/purchase-product.entity");
const product_service_1 = require("../product/product.service");
const moment = require("moment-timezone");
let PurchaseProfile = class PurchaseProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper, productService) {
        super(mapper);
        this.productService = productService;
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, purchase_product_entity_1.PurchaseProduct, purchase_product_dto_1.PurchaseProductDTO);
            (0, core_1.createMap)(mapper, purchase_product_dto_1.PurchaseProductDTO, purchase_product_entity_1.PurchaseProduct);
            (0, core_1.createMap)(mapper, create_purchase_dto_1.PurchaseDto, purchase_entity_1.Purchase, (0, core_1.forMember)((dest) => dest.orders, (0, core_1.mapFrom)((src) => {
                return src.orders.map((o) => (Object.assign(Object.assign({}, mapper.map(o, purchase_product_dto_1.PurchaseProductDTO, purchase_product_entity_1.PurchaseProduct)), { product: { id: o.product.id } })));
            })));
            (0, core_1.createMap)(mapper, purchase_entity_1.Purchase, create_purchase_dto_1.PurchaseDto, (0, core_1.forMember)((dest) => dest.orders, (0, core_1.mapFrom)((src) => {
                var _a;
                return (_a = src.orders) === null || _a === void 0 ? void 0 : _a.map((o) => (Object.assign(Object.assign({}, mapper.map(o, purchase_product_entity_1.PurchaseProduct, purchase_product_dto_1.PurchaseProductDTO)), { product: this.productService.mapDao(o.product) })));
            })), (0, core_1.forMember)((dest) => dest.createdAt, (0, core_1.mapFrom)((src) => {
                return moment
                    .tz(src.createdAt, 'America/Toronto')
                    .format('ddd, DD MMM yyyy');
            })));
        };
    }
};
PurchaseProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, product_service_1.ProductService])
], PurchaseProfile);
exports.PurchaseProfile = PurchaseProfile;
//# sourceMappingURL=purchase.mapper.js.map