export interface MetaParam {
  rowsPerPage: number;
  page: number;
  sortable?: { field: string; order: 'DESC' | 'ASC' };
}

export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface TransactionFilter {
  from?: string;
  to?: string;
  type?: string;
  id?: string;
  customer?: string;
  state?: string;
}
