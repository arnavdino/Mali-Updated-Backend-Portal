import { Injectable } from '@nestjs/common';
import { Permission, PermissionAction, PermissionSubject } from './permissions';

@Injectable()
export class PermissionsService {
  allActions = [
    PermissionAction.manage,
    PermissionAction.read,
    PermissionAction.delete,
    PermissionAction.create,
    PermissionAction.update,
  ];

  permissions: Permission[] = [
    {
      subject: PermissionSubject.all,
      action: this.allActions,
    },
    {
      subject: PermissionSubject.user,
      action: this.allActions,
    },
    {
      subject: PermissionSubject.product,
      action: this.allActions,
    },
    {
      subject: PermissionSubject.role,
      action: this.allActions,
    },
  ];

  findAll() {
    return this.permissions;
  }
}
