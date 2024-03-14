import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { ArrowDown } from 'lucide-react';

function TableComponent() {
  return (
    <div className="mt-6">
      <Table className="w-full">
        <TableHeader className="bg-white hover:bg-white">
          <TableRow>
            <TableHead className="flex items-center gap-4">
              <Label
                className="cursor-pointer text-description"
                htmlFor="checkbox"
              >
                Roles
              </Label>
              <Label htmlFor="checkbox" className="h-5 w-5 cursor-pointer">
                <ArrowDown width="100%" height="100%" />
              </Label>
            </TableHead>

            <TableHead>Permissions</TableHead>

            <TableHead>Users</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}

export default TableComponent;
