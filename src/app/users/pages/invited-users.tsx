import { Checkbox } from '@/components/ui/checkbox';
import QueryHook from '@/hooks/queryHook';
import { useEffect } from 'react';
import { ColumnDef } from '@tanstack/table-core';
import { DataTable } from '@/components/DataTable';
import {
  deleteInvitation,
  getInvitationsOfUserQuery,
  resendInvitation,
} from '@/services/api/verification-service';
import { IInvitation } from '@/data/interfaces/invitation';
import { Repeat, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { formatDate, getPublicImageURL } from '@/lib/utils';
import { generateInitials } from '@/components/AccountPopover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarWithStatus } from '../components/avatar';

export default function InvitedUsersTab() {
  const { QueryParams } = QueryHook();
  const resendInvitationMutation = resendInvitation();
  const deleteInvitationMutation = deleteInvitation();
  const { pageNumber, pageSize, searchText } = QueryParams;
  const {
    data: users,
    isLoading,
    refetch,
  } = getInvitationsOfUserQuery({
    pageNumber,
    pageSize,
    searchText: searchText?.length ? searchText : undefined,
  });
  const usersList = users?.data || [];
  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize, searchText]);
  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-[#CE9D3E]';
      case 'REJECTED':
        return 'text-red-300';
      case 'ACCEPTED':
        return 'text-green-600';
      default:
        return ''; // Default background color or no background color
    }
  };

  // const isExpired = (expireDate: Date) => {
  //   const currentDate = new Date();
  //   if (currentDate > new Date(expireDate)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const handleResendInvitation = (id: string) => {
    resendInvitationMutation.mutate(
      { id },
      {
        onSuccess: (data) => {
          if (data) {
            refetch();
            toast({
              title: 'Success',
              variant: 'success',
              description: 'Invitation has been sant successfully!',
            });
          }
        },
        onError: (error) => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: error?.response?.data?.message,
          });
        },
      }
    );
  };
  const handleDeleteInvitation = (id: string) => {
    deleteInvitationMutation.mutate(
      { id },
      {
        onSuccess: (data) => {
          if (data) {
            refetch();
            toast({
              title: 'Successful',
              variant: 'success',
              description: 'Invitation is deleted!',
            });
          }
        },
        onError: () => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: 'Error happened! Try again later!',
          });
        },
      }
    );
  };
  const renderText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Invited';
      case 'ACCEPTED':
        return 'Accepted';
      case 'REJECTED':
        return 'Rejected';
      default:
        return '';
    }
  };
  const columns: ColumnDef<IInvitation>[] = [
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
      accessorKey: 'email',
      header: 'Users',
      cell: ({ row }) => {
        return row?.original?.invitedUser ? (
          <div className=" flex items-center gap-4">
            <AvatarWithStatus
              fallBack={
                row.original?.invitedUser?.photo ? (
                  <img
                    src={getPublicImageURL(row.original?.invitedUser?.photo)}
                  />
                ) : (
                  generateInitials(row.original?.invitedUser?.firstName)
                )
              }
            />
            <div className="flex flex-col">
              <b className="text-base">
                {row.original?.invitedUser?.firstName}
              </b>
              <span className="text-xs">
                {row.original?.invitedUser?.email}
              </span>
            </div>
          </div>
        ) : (
          <p>{row?.original?.email}</p>
        );
      },
    },
    {
      accessorKey: 'expireDate',
      header: 'Status',
      cell: ({ row }) => {
        return true ? (
          <div className="flex gap-2">
            <span
              className={`py-1 px-2  ${getStatusBackgroundColor(row.original.status as string)}`}
            >
              {renderText(row.original.status)}
            </span>
            {row.original.status === 'PENDING' && (
              <>
                <span
                  onClick={() => handleResendInvitation(row.original._id)}
                  className="cursor-pointer"
                >
                  <Repeat />
                </span>
                <span>
                  <X
                    onClick={() => handleDeleteInvitation(row.original._id)}
                    className="text-[#BC3333] cursor-pointer"
                  />
                </span>
              </>
            )}
          </div>
        ) : (
          ''
        );
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Sent',
      cell: ({ row }) => {
        return <p>{formatDate(row.getValue('createdAt'))}</p>;
      },
    },
    {
      id: 'createdBy',
      accessorKey: 'createdBy',
      header: 'By',
      cell: ({ row }) => {
        return (
          <div className="flex gap-3 items-center">
            <Avatar className="h-12 w-12 rounded-[50px]  flex items-center justify-center">
              {row?.original?.createdBy?.photo ? (
                <img
                  className="flex object-fill p-0 m-0  w-full h-full"
                  src={getPublicImageURL(row?.original?.createdBy?.photo)}
                  alt="avatar"
                />
              ) : (
                <AvatarFallback className="uppercase bg-blue-50 text-blue-600">
                  {generateInitials(row?.original?.createdBy?.firstName)}
                </AvatarFallback>
              )}
            </Avatar>

            <p className="flex flex-col">
              <span>{row?.original?.createdBy?.firstName}</span>
              <span>{row?.original?.createdBy?.email}</span>
            </p>
          </div>
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
