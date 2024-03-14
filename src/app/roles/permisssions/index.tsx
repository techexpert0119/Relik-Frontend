import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getPermissions } from '@/services/api/role-and-permissions-service';
import { Skeleton } from '@/components/ui/skeleton';

function Permissions() {
  const { data: permissions, isLoading } = getPermissions();

  return (
    <div className="mt-6">
      <Table className="w-full">
        <TableHeader className="bg-white hover:bg-white">
          <TableRow>
            <TableHead className="flex items-center gap-4">
              Permissions
              <Label htmlFor="checkbox" className="h-5 w-5 cursor-pointer">
                <ArrowDown width="100%" height="100%" />
              </Label>
            </TableHead>

            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? new Array(3).fill(null).map((_, i) => {
                return (
                  <>
                    <TableRow key={i}>
                      <TableCell className="text-description">
                        <Skeleton className="p-4 " />
                      </TableCell>
                      <TableCell className="text-description">
                        <Skeleton className="p-4 " />
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            : permissions?.data?.map((item) => {
                return (
                  <>
                    <TableRow>
                      <TableCell className="flex gap-3 items-center">
                        <p className="font-medium text-[#0F1828] text-sm">
                          {item.permissionName}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-normal text-sm text-[#9DA3B1]">
                          {item.description}
                        </p>
                      </TableCell>
                    </TableRow>
                    <Separator />
                  </>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Permissions;
