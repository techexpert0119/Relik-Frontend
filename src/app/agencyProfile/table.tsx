import { Checkbox } from '@/components/ui/checkbox';
import { AvatarWithStatus } from '../users/components/avatar';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/table-core';
import { IUser } from '@/data/interfaces/users';
import { useNavigate } from 'react-router';
import { generateInitials } from '@/components/AccountPopover';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteAdminFromAgency } from '@/services/api/agency-service';
import { useParams } from 'react-router';
import { toast } from '@/components/ui/use-toast';
import { IAgency } from '@/data/interfaces/agency';
import { getPublicImageURL } from '@/lib/utils';

type Props = {
  agency: IAgency | undefined;
};
function TableComponent({ agency }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = deleteAdminFromAgency();
  const hendleDeleteAdmin = (adminId: string) => {
    mutate(
      { agencyId: id, adminId },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          if (error) {
            toast({
              title: 'Error',
              description: error?.response?.data?.message,
              variant: 'destructive',
            });
          }
        },
      }
    );
  };
  const columns: ColumnDef<IUser>[] = [
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
      header: 'All admins',
      cell: ({ row }) => {
        return (
          <div
            onClick={() => navigate(`/users/${row?.original?._id}`)}
            className=" flex items-center gap-4"
          >
            <AvatarWithStatus
              fallBack={
                row.original?.photo ? (
                  <img src={getPublicImageURL(row?.original?.photo)} />
                ) : (
                  generateInitials(row.original?.firstName)
                )
              }
            />
            <p>{row?.original?.firstName}</p>
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
      cell: ({ row }) => {
        return (
          <div className=" flex items-center gap-4">
            <AvatarWithStatus
              fallBack={
                row.original?.createdBy?.photo ? (
                  <img
                    src={getPublicImageURL(row.original?.createdBy?.photo)}
                  />
                ) : (
                  generateInitials(row.original?.createdBy?.firstName)
                )
              }
            />
            <p>{row?.original?.createdBy?.firstName}</p>
          </div>
        );
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
    {
      accessorKey: 'remove',
      header: 'Remove',
      cell: ({ row }) => {
        return (
          row?.original?._id != agency?.createdBy?._id && (
            <Button
              onClick={() => hendleDeleteAdmin(row?.original?._id)}
              className="flex justify-center bg-white border w-14 h-10 hover:bg-white focus:bg-white rounded-3xl items-center border-red-600"
            >
              <Trash2 stroke="#B42318" />
            </Button>
          )
        );
      },
    },
  ];

  return (
    <div>
      <DataTable data={agency?.admins || []} columns={columns} />
    </div>
  );
}

export default TableComponent;
