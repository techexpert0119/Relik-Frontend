import { DataTable } from '@/components/DataTable';
import { Checkbox } from '@/components/ui/checkbox';
import { Role } from '@/data/enums/role';
import { IUserDetails } from '@/data/interfaces/user-details';
import QueryHook from '@/hooks/queryHook';
import { getCreatedUsersByRoleQuery } from '@/services/api/users-service';
import { ColumnDef } from '@tanstack/table-core';
import { useEffect } from 'react';
import { AvatarWithStatus } from '../components/avatar';
import { generateInitials } from '@/components/AccountPopover';
import { getPublicImageURL } from '@/lib/utils';

export default function AgencyAdminTab() {
  const { QueryParams, navigate } = QueryHook();
  const { pageNumber, pageSize, searchText } = QueryParams;
  const {
    data: users,
    isLoading,
    refetch,
  } = getCreatedUsersByRoleQuery(null, {
    roleName: Role.AGENCY_ADMIN,
    pageNumber,
    pageSize,
    searchText: searchText?.length ? searchText : undefined,
  });
  const usersList = users?.data || [];
  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, searchText]);
  const columns: ColumnDef<IUserDetails>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div className="w-2!">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: 'photo',
      header: 'All Admins',
      cell: ({ row }) => {
        return (
          <div
            onClick={() => navigate(`/users/${row?.original?._id}`)}
            className=" flex items-center gap-4"
          >
            <AvatarWithStatus
              fallBack={
                row.original?.photo ? (
                  <img src={getPublicImageURL(row.original?.photo)} />
                ) : (
                  generateInitials(row.original?.firstName)
                )
              }
            />
            <p>{row.original?.firstName}</p>
          </div>
        );
      },
      enableResizing: true,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'createdBy',
      accessorKey: 'createdBy',
      header: 'Created by',
      cell: ({ getValue }) => {
        const value = getValue() as { firstName: string };
        return <p>{value?.firstName ? value?.firstName : '-'}</p>;
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        return (
          <p>
            {new Date(row.getValue('createdAt')).toLocaleDateString('en-US')}
          </p>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        withPagenation
        totalCount={users?.totalCount}
        data={usersList}
        columns={columns}
      />
    </div>
  );
}
