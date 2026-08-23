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
var PromotionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const helpers_service_1 = require("../helpers/helpers.service");
const files_service_1 = require("../common/file/files.service");
let PromotionController = PromotionController_1 = class PromotionController {
    constructor(promotionService, helpersService, fileService) {
        this.promotionService = promotionService;
        this.helpersService = helpersService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(PromotionController_1.name);
    }
    findAll(res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.findAllForUser(), res, `get all promotion for user ${req.user.id} `);
    }
    findOne(id, res, req) {
        return this.helpersService.formatResponse(this.logger, this.promotionService.findOne(id), res, `get promotion for user ${req.user.id} of id ${id}`);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findOne", null);
PromotionController = PromotionController_1 = __decorate([
    (0, common_1.Controller)('promotions'),
    __metadata("design:paramtypes", [promotion_service_1.PromotionService,
        helpers_service_1.HelpersService,
        files_service_1.FilesService])
], PromotionController);
exports.PromotionController = PromotionController;
//# sourceMappingURL=promotion.controller.js.map