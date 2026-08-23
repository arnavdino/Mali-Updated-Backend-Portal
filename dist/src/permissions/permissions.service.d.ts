import { Permission, PermissionAction } from './permissions';
export declare class PermissionsService {
    allActions: PermissionAction[];
    permissions: Permission[];
    findAll(): Permission[];
}
