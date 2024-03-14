import BreadCrumb, { IBreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { AvatarWithStatus } from '@/app/users/components/avatar';
import { Plus, Save, XCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import TableComponent from './table';
import { useParams } from 'react-router';
import { getUserByIdQuery } from '@/services/api/users-service';
import { generateInitials } from '@/components/AccountPopover';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useMemo, useState } from 'react';
import { PermissionAction, Permissions } from '@/data/enums/permissions';
import { Role } from '@/data/enums/role';
import QueryHook from '@/hooks/queryHook';
import { getPublicImageURL } from '@/lib/utils';

export default function UserManagingProfile() {
  const { id } = useParams();
  const { MergeQueryParams } = QueryHook();
  const [filter, setFilter] = useState<{
    roleName: undefined | string;
    searchText: undefined | string;
  }>({ searchText: undefined, roleName: undefined });

  const { data: user, refetch } = getUserByIdQuery(id || '');
  const rolesValue: { name: string; value: Role }[] = useMemo(() => {
    const roleArray = [];
    if (
      user?.permissions.includes(
        `${PermissionAction.CREATE}_${Permissions.SUPER_ADMIN}`
      )
    ) {
      roleArray.push({
        name: 'Super admin',
        value: Role.SUPER_ADMIN,
      });
    }
    if (
      user?.permissions.includes(
        `${PermissionAction.CREATE}_${Permissions.AGENCY_ADMIN}`
      )
    ) {
      roleArray.push({
        name: 'Admin',
        value: Role.AGENCY_ADMIN,
      });
    }

    // if (
    // 	user?.permissions.includes(
    // 		`${PermissionAction.CREATE}_${Permissions.INDEPENDENT_ACCOUNT}`
    // 	)
    // ) {
    // 	roleArray.push({
    // 		name: "Independent Account",
    // 		value: Role.INDEPENDENT_ACCOUNT,
    // 	});
    // }
    // if (
    // 	user?.permissions.includes(
    // 		`${PermissionAction.CREATE}_${Permissions.MANAGED_ACCOUNT}`
    // 	)
    // ) {
    // 	roleArray.push({
    // 		name: "Managed Accounts",
    // 		value: Role.MANAGED_ACCOUNT,
    // 	});
    // }
    if (
      user?.permissions.includes(
        `${PermissionAction.CREATE}_${Permissions.TALENT_MANAGER}`
      )
    ) {
      roleArray.push({
        name: 'Talent Managers',
        value: Role.TALENT_MANAGER,
      });
    }
    return roleArray;
  }, [user?.permissions]);

  const breadCrumbItems: Array<IBreadCrumb> = [
    {
      name: 'Users',
      link: '/users',
    },
    {
      name: user?.firstName || '',
      link: null,
    },
  ];
  useEffect(() => {
    if (filter.searchText || filter.roleName) {
      MergeQueryParams({ filter: JSON.stringify(filter) }, true);
    }
    if (filter.searchText === undefined && filter.roleName === undefined) {
      setFilter({ ...filter, roleName: rolesValue?.[0]?.value });
    }
  }, [filter]);
  useEffect(() => {
    refetch();
  }, [filter.roleName, filter.searchText]);
  const roleSelect = useMemo(() => {
    if (rolesValue.length) {
      return (
        <Select
          defaultValue={rolesValue?.[0]?.value}
          onValueChange={(e) => setFilter({ ...filter, roleName: e })}
        >
          <SelectTrigger className="w-[322px] bg-white border-buttonSecondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white w-[384px] z-10">
            {rolesValue?.map((item) => (
              <SelectItem value={item.value}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    } else {
      return <div></div>;
    }
  }, [rolesValue]);
  return (
    <div className="container">
      <div className="mt-8">
        <BreadCrumb items={breadCrumbItems} />
      </div>
      <div className="flex justify-between mt-8 mb-6">
        <h1 className="text-3xl flex items-center gap-2">
          <p>Manage </p>
          {user ? user?.firstName : <Skeleton className="w-80 h-10" />}
        </h1>
        <div>
          <Button
            className="text-red-700 border-red-600 mr-3 font-black"
            variant="outline"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Deactivate
          </Button>
          <Button className="font-black">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      <hr />

      <div className="flex items-center gap-8 mt-8">
        <div className="h-16 w-16">
          <AvatarWithStatus
            className={{
              avatar: 'h-full w-full flex items-center shadow-2xl',
              avatarFallBack: 'flex items-center bg-blue-400',
            }}
            fallBack={
              user?.photo ? (
                <img src={getPublicImageURL(user?.photo)} />
              ) : (
                generateInitials(user?.firstName)
              )
            }
          />
        </div>
        <h2 className="w-72 flex flex-col">
          <span>{user?.firstName}</span>
          <span>{user?.email}</span>
        </h2>
        <div>{roleSelect}</div>
      </div>
      <p className="my-6 text-[#667085]">
        Manage accounts available for the user
      </p>
      <div className="flex mb-4 justify-between items-center">
        <Input
          className="border-0 w-[451px] h-[44px] text-base"
          type="text"
          placeholder="Search user"
        />
        <Button size="sm">
          <Plus />
          Add user
        </Button>
      </div>

      <TableComponent userId={id} filter={filter} />
    </div>
  );
}
