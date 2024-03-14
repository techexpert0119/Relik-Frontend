import { useMemo } from 'react';
import UseGetPermissions from './use-get-permissions';
import { PermissionAction, Permissions } from '@/data/enums/permissions';

function UseGetPermissionByRoles(permissionList: Array<string> | null) {
  const { permissionDefaultValue } = UseGetPermissions();

  const permissionByRoles = useMemo(() => {
    const object: Partial<Record<Permissions, PermissionAction[]>> = {
      ...permissionDefaultValue,
    };
    const actionList = new Set<string>();
    permissionList?.forEach((item) => {
      const index = item.indexOf('_');
      actionList.add(item.slice(0, index));
      const key = item.slice(index + 1) as Permissions;
      object[key] = [...(Array.from(actionList) as PermissionAction[])];
    });
    return object;
  }, [permissionList]);

  return { permissionByRoles };
}

export default UseGetPermissionByRoles;
