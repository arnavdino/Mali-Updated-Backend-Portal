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
exports.Purchase = exports.PurchaseState = void 0;
const classes_1 = require("@automapper/classes");
const user_entity_1 = require("../../users/user.entity");
const typeorm_1 = require("typeorm");
const purchase_product_entity_1 = require("./purchase-product.entity");
var PurchaseState;
(function (PurchaseState) {
    PurchaseState["PENDING"] = "pending";
    PurchaseState["COMPLETED"] = "completed";
    PurchaseState["REFUNDED"] = "refunded";
    PurchaseState["PENDING_REFUND"] = "pending_refund";
    PurchaseState["DECLINE"] = "declined";
})(PurchaseState = exports.PurchaseState || (exports.PurchaseState = {}));
let Purchase = class Purchase {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Purchase.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Purchase.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'purchased_by' }),
    __metadata("design:type", user_entity_1.User)
], Purchase.prototype, "purchasedBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'state' }),
    __metadata("design:type", String)
], Purchase.prototype, "state", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'taxes', type: 'float' }),
    __metadata("design:type", Number)
], Purchase.prototype, "taxes", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'total', type: 'float' }),
    __metadata("design:type", Number)
], Purchase.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'charge_id', default: '' }),
    __metadata("design:type", String)
], Purchase.prototype, "chargeId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)((type) => purchase_product_entity_1.PurchaseProduct, (purchaseOrder) => purchaseOrder.purchase, { cascade: true }),
    __metadata("design:type", Array)
], Purchase.prototype, "orders", void 0);
Purchase = __decorate([
    (0, typeorm_1.Entity)('purchase')
], Purchase);
exports.Purchase = Purchase;
//# sourceMappingURL=purchase.entity.js.map