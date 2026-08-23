"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.PermissionSubject = exports.PermissionAction = exports.Permission = void 0;
class Permission {
    constructor(subject, action, aliases) {
        this.subject = subject;
        this.action = action;
        this.aliases = aliases || {};
    }
}
exports.Permission = Permission;
var PermissionAction;
(function (PermissionAction) {
    PermissionAction["manage"] = "manage";
    PermissionAction["read"] = "read";
    PermissionAction["delete"] = "delete";
    PermissionAction["create"] = "create";
    PermissionAction["update"] = "update";
    PermissionAction["refund_initiate"] = "refund_initiate";
    PermissionAction["refund_confirming"] = "refund_confirming";
})(PermissionAction = exports.PermissionAction || (exports.PermissionAction = {}));
var PermissionSubject;
(function (PermissionSubject) {
    PermissionSubject["all"] = "all";
    PermissionSubject["user"] = "user";
    PermissionSubject["role"] = "role";
    PermissionSubject["product"] = "product";
    PermissionSubject["promotion"] = "promotion";
    PermissionSubject["transactions"] = "transactions";
    PermissionSubject["vendor"] = "vendor";
    PermissionSubject["warehouse"] = "warehouse";
    PermissionSubject["manager"] = "manager";
})(PermissionSubject = exports.PermissionSubject || (exports.PermissionSubject = {}));
const allActions = [
    PermissionAction.manage,
    PermissionAction.read,
    PermissionAction.delete,
    PermissionAction.create,
    PermissionAction.update,
];
exports.permissions = [
    {
        subject: PermissionSubject.all,
        action: allActions,
    },
    {
        subject: PermissionSubject.user,
        action: allActions,
    },
    {
        subject: PermissionSubject.product,
        action: allActions,
    },
    {
        subject: PermissionSubject.role,
        action: allActions,
    },
    {
        subject: PermissionSubject.promotion,
        action: allActions,
    },
    {
        subject: PermissionSubject.manager,
        action: allActions,
    },
    {
        subject: PermissionSubject.vendor,
        action: allActions,
    },
    {
        subject: PermissionSubject.warehouse,
        action: allActions,
    },
    {
        subject: PermissionSubject.transactions,
        action: [
            ...allActions,
            PermissionAction.refund_confirming,
            PermissionAction.refund_initiate,
        ],
    },
];
//# sourceMappingURL=permissions.js.map