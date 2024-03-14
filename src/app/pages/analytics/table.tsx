import { Checkbox } from '@/components/ui/checkbox';
import { AvatarWithStatus } from '../../users/components/avatar';
import { getCreatedUsersByRoleQuery } from '@/services/api/users-service';
import { ColumnDef } from '@tanstack/react-table';
import { IUserDetails } from '@/data/interfaces/user-details';
import QueryHook from '@/hooks/queryHook';
import { generateInitials } from '@/components/AccountPopover';
import { DataTable } from '@/components/DataTable';
import { useEffect } from 'react';
import { getPublicImageURL } from '@/lib/utils';

type Props = {
  userId: string | undefined;
  filter: {
    searchText: undefined | string;
  };
};

function TableComponent({ userId, filter }: Props) {
  const { QueryParams } = QueryHook();
  const { pageNumber, pageSize, searchText } = QueryParams;
  const {
    data: users,
    isLoading,
    refetch,
  } = getCreatedUsersByRoleQuery(userId, { ...filter, pageNumber, pageSize });
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
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: 'photo',
      cell: ({ row }) => {
        return (
          <div className=" flex items-center gap-4">
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
      id: 'uid',
      accessorKey: 'uid',
      header: 'UID',
      cell: () => {
        return <p>UID</p>;
      },
    },
    {
      id: 'username',
      accessorKey: 'username',
      header: 'Username',
      cell: () => {
        return <p>Username</p>;
      },
    },
    {
      id: 'revenue',
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: () => {
        return <p>Revenue</p>;
      },
    },
    {
      id: 'gender',
      accessorKey: 'gender',
      header: 'Gender',
      cell: () => {
        return <p>Gender</p>;
      },
    },
    {
      id: 'country',
      accessorKey: 'country',
      header: 'Country',
      cell: () => {
        return <p>Country</p>;
      },
    },
    {
      id: 'city',
      accessorKey: 'city',
      header: 'City',
      cell: () => {
        return <p>City</p>;
      },
    },
    {
      id: 'age',
      accessorKey: 'age',
      header: 'Age',
      cell: () => {
        return <p>Age</p>;
      },
    },
    {
      id: 'fullName',
      accessorKey: 'fullName',
      header: 'Full Name',
      cell: () => {
        return <p>Full Name</p>;
      },
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      cell: () => {
        return <p>Email</p>;
      },
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: 'Phone',
      cell: () => {
        return <p>Phone</p>;
      },
    },
    {
      id: 'firstInteraction',
      accessorKey: 'firstInteraction',
      header: 'First interaction',
      cell: () => {
        return <p>First interaction</p>;
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

export default TableComponent;
