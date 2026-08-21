"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permissions_1 = require("./permissions");
let PermissionsService = class PermissionsService {
    constructor() {
        this.allActions = [
            permissions_1.PermissionAction.manage,
            permissions_1.PermissionAction.read,
            permissions_1.PermissionAction.delete,
            permissions_1.PermissionAction.create,
            permissions_1.PermissionAction.update,
        ];
        this.permissions = [
            {
                subject: permissions_1.PermissionSubject.all,
                action: this.allActions,
            },
            {
                subject: permissions_1.PermissionSubject.user,
                action: this.allActions,
            },
            {
                subject: permissions_1.PermissionSubject.product,
                action: this.allActions,
            },
            {
                subject: permissions_1.PermissionSubject.role,
                action: this.allActions,
            },
        ];
    }
    findAll() {
        return this.permissions;
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)()
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map