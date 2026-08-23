export declare class Permission {
    subject: PermissionSubject;
    action: PermissionAction[];
    aliases?: {
        [key: string]: string | {};
    };
    constructor(subject: PermissionSubject, action: PermissionAction[], aliases?: {
        [key: string]: string;
    });
}
export declare enum PermissionAction {
    manage = "manage",
    read = "read",
    delete = "delete",
    create = "create",
    update = "update",
    refund_initiate = "refund_initiate",
    refund_confirming = "refund_confirming"
}
export declare enum PermissionSubject {
    all = "all",
    user = "user",
    role = "role",
    product = "product",
    promotion = "promotion",
    transactions = "transactions",
    vendor = "vendor",
    warehouse = "warehouse",
    manager = "manager"
}
export declare const permissions: Permission[];
