import { PermissionAction, Permissions } from '../enums/permissions';

export interface IPermission {
  _id: string;
  permissionName: string;
  description: string;
  permissionEnumType: Permissions;
  permissionEnumAction: PermissionAction;
}
export interface IPermissionList {
  data: IPermission[];
  status: 'success' | 'error';
}
export interface IRoles {
  _id: string;
  description: string;
  permissions: string[];
  name: string;
  type: string;
}
