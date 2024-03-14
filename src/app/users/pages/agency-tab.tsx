import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/DataTable';
import { AvatarWithStatus } from '../components/avatar';
import { generateInitials } from '@/components/AccountPopover';
import { ColumnDef } from '@tanstack/table-core';
import { useEffect } from 'react';
import QueryHook from '@/hooks/queryHook';
import { getAgenciesQuery } from '@/services/api/agency-service';
import { IAgency } from '@/data/interfaces/agency';
import { getPublicImageURL } from '@/lib/utils';

export default function AgencyTab() {
  const { QueryParams, navigate } = QueryHook();
  const { pageNumber, pageSize, searchText } = QueryParams;
  const {
    data: agency,
    isLoading,
    refetch,
  } = getAgenciesQuery({
    pageNumber,
    pageSize,
    searchText: searchText?.length ? searchText : undefined,
  });
  const agencyList = agency?.data || [];

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, searchText]);
  const columns: ColumnDef<IAgency>[] = [
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
      header: 'All Agencies',
      cell: ({ row }) => {
        return (
          <div
            onClick={() =>
              navigate(`/agency/${row?.original?._id}?type=AGENCY`)
            }
            className=" flex items-center gap-4"
          >
            <AvatarWithStatus
              fallBack={
                row.original?.photo ? (
                  <img src={getPublicImageURL(row.original?.photo)} />
                ) : (
                  generateInitials(row.original?.businessName)
                )
              }
            />
            <p>{row.original?.businessName}</p>
          </div>
        );
      },
      enableResizing: true,
    },
    {
      accessorKey: 'businessUrl',
      header: 'Business Url',
    },
    {
      accessorKey: 'admins',
      header: 'Admins',
      cell: ({ row }) => {
        return row?.original?.admins?.map((a) => {
          return (
            <div className="flex gap-2 items-center">
              <AvatarWithStatus
                fallBack={
                  a?.photo ? (
                    <img src={getPublicImageURL(a?.photo)} />
                  ) : (
                    generateInitials(a?.firstName)
                  )
                }
              />
              <p>{a?.firstName}</p>
            </div>
          );
        });
      },
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
        totalCount={agency?.totalCount}
        data={agencyList}
        columns={columns}
      />
    </div>
  );
}
