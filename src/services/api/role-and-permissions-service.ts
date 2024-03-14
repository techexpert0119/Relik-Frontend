import {
  IPermissionList,
  IRoles,
} from '@/data/interfaces/role-and-permissions';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
export const getPermissions = () =>
  useGeneralAPIQuery<IPermissionList>('/permissions');
export const getRoles = () =>
  useGeneralAPIQuery<IRoles[]>('/role', undefined, 'roles');
