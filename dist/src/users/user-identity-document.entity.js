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
exports.UserIdentityDocument = exports.IdentityDocumentStatus = exports.IdentityDocumentType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var IdentityDocumentType;
(function (IdentityDocumentType) {
    IdentityDocumentType["ID_PHOTO"] = "id_photo";
    IdentityDocumentType["SELFIE"] = "selfie";
    IdentityDocumentType["PROOF_OF_ADDRESS"] = "proof_of_address";
})(IdentityDocumentType = exports.IdentityDocumentType || (exports.IdentityDocumentType = {}));
var IdentityDocumentStatus;
(function (IdentityDocumentStatus) {
    IdentityDocumentStatus["PENDING"] = "pending";
    IdentityDocumentStatus["APPROVED"] = "approved";
    IdentityDocumentStatus["REJECTED"] = "rejected";
})(IdentityDocumentStatus = exports.IdentityDocumentStatus || (exports.IdentityDocumentStatus = {}));
let UserIdentityDocument = class UserIdentityDocument {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserIdentityDocument.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', length: 64 }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_key', length: 512 }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "storageKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_filename', length: 255 }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "originalFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 128 }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size', type: 'int' }),
    __metadata("design:type", Number)
], UserIdentityDocument.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32, default: IdentityDocumentStatus.PENDING }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', nullable: true }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], UserIdentityDocument.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', nullable: true, type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], UserIdentityDocument.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserIdentityDocument.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserIdentityDocument.prototype, "updatedAt", void 0);
UserIdentityDocument = __decorate([
    (0, typeorm_1.Entity)('user_identity_document'),
    (0, typeorm_1.Index)(['userId', 'documentType'], { unique: true })
], UserIdentityDocument);
exports.UserIdentityDocument = UserIdentityDocument;
//# sourceMappingURL=user-identity-document.entity.js.map