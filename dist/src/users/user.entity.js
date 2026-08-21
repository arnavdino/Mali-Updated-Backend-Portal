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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const classes_1 = require("@automapper/classes");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../roles/role.entity");
const location_entity_1 = require("./location.entity");
let User = User_1 = class User {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'external_id', unique: true }),
    __metadata("design:type", String)
], User.prototype, "externalId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fname' }),
    __metadata("design:type", String)
], User.prototype, "fname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'lname' }),
    __metadata("design:type", String)
], User.prototype, "lname", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'phone' }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'dob' }),
    __metadata("design:type", String)
], User.prototype, "dob", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'age', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "organization", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'email', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'password', nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => role_entity_1.RoleEntity),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.RoleEntity)
], User.prototype, "role", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'reward_points', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rewardPoints", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'image_url', nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'verified', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'gender', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'nina', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nina", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'num_of_children', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "numOfChildren", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'marital_status', default: '' }),
    __metadata("design:type", String)
], User.prototype, "maritalStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'language', default: 'en' }),
    __metadata("design:type", String)
], User.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => location_entity_1.LocationEntity, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.LocationEntity)
], User.prototype, "location", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => User_1),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    __metadata("design:type", User)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'main_crop' }),
    __metadata("design:type", String)
], User.prototype, "mainCrop", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'secondary_crop', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "secondaryCrop", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'other_products', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "otherProducts", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'activities' }),
    __metadata("design:type", String)
], User.prototype, "activities", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'live_stock_farming', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "liveStockFarming", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'small_trade', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "smallTrade", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profession", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'means_of_production', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "meansOfProduction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'means_of_transport', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "meansOfTransport", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'financial_education', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "financialEducation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'access_to_credit', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToCredit", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'access_to_insurance', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToInsurance", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'access_to_gap', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToGap", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "totalArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total_used_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "totalUsedArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'cultivated_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "cultivatedArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'actual_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "actualArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'property_status', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "propertyStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'longitude', type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "longitude", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'latitude', type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "latitude", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'forcasted_surface_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "forecastedSurfaceArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'authorized_surface_area', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "authorizedSurfaceArea", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'literacy_level', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "literacyLevel", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map