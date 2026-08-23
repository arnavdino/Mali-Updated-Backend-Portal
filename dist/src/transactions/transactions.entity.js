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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = exports.Status = exports.PaymentMethod = void 0;
const classes_1 = require("@automapper/classes");
const user_entity_1 = require("../users/user.entity");
const vendor_entity_1 = require("../vendor/entities/vendor.entity");
const product_entity_1 = require("../product/entities/product.entity");
const warehouse_entity_1 = require("../vendor/entities/warehouse.entity");
const typeorm_1 = require("typeorm");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["REWARD_POINTS"] = "REWARD_POINTS";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["COMPLETED"] = "COMPLETED";
    Status["PENDING_REFUND"] = "PENDING_REFUND";
    Status["REFUNDED"] = "REFUNDED";
    Status["CANCELED"] = "CANCELED";
})(Status = exports.Status || (exports.Status = {}));
let Transactions = class Transactions {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Transactions.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", user_entity_1.User)
], Transactions.prototype, "customer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => vendor_entity_1.Vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Transactions.prototype, "vendor", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Transactions.prototype, "product", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_category' }),
    __metadata("design:type", product_entity_1.Product)
], Transactions.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Transactions.prototype, "createdBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'payment_method' }),
    __metadata("design:type", String)
], Transactions.prototype, "paymentMethod", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'status' }),
    __metadata("design:type", String)
], Transactions.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => warehouse_entity_1.Warehouse),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], Transactions.prototype, "warehouse", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'quantity', type: 'float' }),
    __metadata("design:type", Number)
], Transactions.prototype, "quantity", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'amount', type: 'float' }),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fee_1', default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Transactions.prototype, "fee1", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fee_2', default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Transactions.prototype, "fee2", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'fee_3', default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Transactions.prototype, "fee3", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'reward_points', default: 0, type: 'int' }),
    __metadata("design:type", Number)
], Transactions.prototype, "rewardPoints", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'notes', default: '' }),
    __metadata("design:type", String)
], Transactions.prototype, "notes", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'completed_at', nullable: true }),
    __metadata("design:type", Date)
], Transactions.prototype, "completedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'canceled_at', nullable: true }),
    __metadata("design:type", Date)
], Transactions.prototype, "canceledAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'refunded_at', nullable: true }),
    __metadata("design:type", Date)
], Transactions.prototype, "refundedAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "createdAt", void 0);
Transactions = __decorate([
    (0, typeorm_1.Entity)('transactions')
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.entity.js.map