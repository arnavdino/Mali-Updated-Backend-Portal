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
var Product_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Level = exports.ProductStatus = exports.Presentation = void 0;
const classes_1 = require("@automapper/classes");
const user_entity_1 = require("../../users/user.entity");
const vendor_entity_1 = require("../../vendor/entities/vendor.entity");
const typeorm_1 = require("typeorm");
var Presentation;
(function (Presentation) {
    Presentation["NONE"] = "none";
    Presentation["FEATURED"] = "featured";
    Presentation["MAIN_PAGE"] = "main";
})(Presentation = exports.Presentation || (exports.Presentation = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "active";
    ProductStatus["INACTIVE"] = "inactive";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
var Level;
(function (Level) {
    Level["CATEGORY"] = "category";
    Level["PRODUCT"] = "product";
    Level["SUB_CATEGORY"] = "sub_category";
})(Level = exports.Level || (exports.Level = {}));
let Product = Product_1 = class Product {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => vendor_entity_1.Vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Product.prototype, "vendor", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'price', default: 0.0, type: 'float' }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'reward_ratio', default: 0.0, type: 'float' }),
    __metadata("design:type", Number)
], Product.prototype, "rewardRatio", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'unit' }),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'description' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'long_description', type: 'text', default: null }),
    __metadata("design:type", String)
], Product.prototype, "longDescription", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'status', default: 'published' }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'type', default: 'product' }),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'presentation', default: Presentation.NONE }),
    __metadata("design:type", String)
], Product.prototype, "presentation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'num_avail' }),
    __metadata("design:type", Number)
], Product.prototype, "numAvail", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'num_left' }),
    __metadata("design:type", Number)
], Product.prototype, "numLeft", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'image_url' }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => Product_1),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Product)
], Product.prototype, "parent", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'sections', type: 'json', default: null }),
    __metadata("design:type", Object)
], Product.prototype, "sections", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'level', default: Level.PRODUCT }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Product.prototype, "level", void 0);
Product = Product_1 = __decorate([
    (0, typeorm_1.Entity)('product'),
    (0, typeorm_1.Unique)('product_name_per_type', ['name', 'type'])
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map