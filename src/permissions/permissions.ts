export class Permission {
  subject: PermissionSubject;
  action: PermissionAction[];
  aliases?: { [key: string]: string | {} };
  constructor(
    subject: PermissionSubject,
    action: PermissionAction[],
    aliases?: { [key: string]: string },
  ) {
    this.subject = subject;
    this.action = action;
    this.aliases = aliases || {};
  }
}

export enum PermissionAction {
  manage = 'manage',
  read = 'read',
  delete = 'delete',
  create = 'create',
  update = 'update',
  refund_initiate = 'refund_initiate',
  refund_confirming = 'refund_confirming',
}

export enum PermissionSubject {
  all = 'all',
  user = 'user',
  role = 'role',
  product = 'product',
  promotion = 'promotion',
  transactions = 'transactions',
  vendor = 'vendor',
  warehouse = 'warehouse',
  manager = 'manager',
}
const allActions = [
  PermissionAction.manage,
  PermissionAction.read,
  PermissionAction.delete,
  PermissionAction.create,
  PermissionAction.update,
];

export const permissions: Permission[] = [
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
