import { PermissionAction, Permissions } from '@/data/enums/permissions';
import { getPermissions } from '@/services/api/role-and-permissions-service';
import { useMemo } from 'react';

function UseGetPermissions() {
  const { data } = getPermissions();

  const { permissionActions, permissionDefaultValue } = useMemo(() => {
    const permissionDefaultValue: Partial<
      Record<Permissions, PermissionAction[]>
    > = {};
    const permissionActions: Partial<Record<Permissions, PermissionAction[]>> =
      {};
    data?.data.forEach((permission) => {
      permissionDefaultValue[permission.permissionEnumType] = [];
      const action = permission.permissionName.split(
        ' '
      )[0] as PermissionAction;
      permissionActions[permission.permissionEnumType] = [
        ...(permissionActions[permission.permissionEnumType] || []),
        action,
      ];
    });
    return { permissionDefaultValue, permissionActions };
  }, [data]);

  return { permissionActions, permissionDefaultValue };
}

export default UseGetPermissions;
