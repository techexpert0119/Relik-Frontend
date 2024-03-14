import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';
import QueryHook from '@/hooks/queryHook';
import { Skeleton } from './ui/skeleton';
import CustomPagination from './ui/pagenation';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount?: number;
  withPagenation?: boolean;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount = 0,
  withPagenation = false,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: withPagenation ? getPaginationRowModel() : undefined,
    getCoreRowModel: getCoreRowModel(),
  });
  const { MergeQueryParams, QueryParams, AddQueryParams } = QueryHook();
  const query = QueryParams;
  const { pageNumber, pageSize } = query;
  useEffect(() => {
    MergeQueryParams({ pageSize: table.getState().pagination.pageSize }, true);
  }, [table.getState().pagination.pageSize]);
  useEffect(() => {
    if (withPagenation && (!pageNumber || !pageSize)) {
      AddQueryParams({
        pageSize: table.getState().pagination.pageSize,
        pageNumber: 0,
      });
    }
  }, [query]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-white w-full hover:bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!isLoading
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : new Array(3).fill(null).map((_, i) => {
                return (
                  <>
                    <TableRow key={i}>
                      {new Array(table.getAllColumns().length)
                        .fill(null)
                        .map((_table, i) => {
                          return (
                            <TableCell key={i} className="text-description">
                              <Skeleton className="p-4 " />
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  </>
                );
              })}
          {!isLoading && table.getRowModel().rows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {withPagenation && (
        <div>
          <CustomPagination
            onChagePageSize={table.setPageSize}
            key={1}
            currentPage={+pageNumber}
            pageSize={+pageSize}
            total={totalCount}
            onChange={(e) => MergeQueryParams({ pageNumber: e })}
          />
        </div>
      )}
    </div>
  );
}
