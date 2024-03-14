import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from './select';
import { cn } from '@/lib/utils';

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  onChagePageSize: (pageSize: number) => void;
  pageSizeArray?: number[];
  className?: string;
}

const calculateTotalPages = (
  itemsCount: number,
  itemsPerPage: number
): number => {
  return Math.ceil(itemsCount / itemsPerPage);
};

const CustomPagination: React.FC<PaginationProps> = ({
  onChagePageSize,
  total,
  pageSize,
  currentPage,
  onChange,
  pageSizeArray,
  className,
}) => {
  const pageSizeOptions = pageSizeArray ? pageSizeArray : [9, 15, 21, 30, 60];

  return (
    <div className={className}>
      {total > 9 && (
        <div className="flex w-full mt-3 items-center justify-between gap-3 flex-col md:flex-row">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-500">Rows per page</p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                onChagePageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-auto rounded-lg h-8 text-white  bg-primary-light border-slate-200 ">
                {pageSize}
              </SelectTrigger>
              <SelectContent className="mr-4">
                <SelectGroup>
                  {pageSizeOptions?.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Pagination
            total={total}
            current={currentPage + 1}
            pageSize={pageSize}
            onChange={(e) => onChange(e - 1)}
            locale={{
              items_per_page: 'Items Per Page',
              jump_to: 'Jump to',
              page: 'Page',
              prev_page: 'Prev page',
              next_page: 'Next page',
              prev_5: 'Prev 5',
              next_5: 'Next 5',
              prev_3: 'Prev 3',
              next_3: 'Next 3',
              page_size: 'Page size',
            }}
            className="flex items-center justify-center w-full md:w-auto"
            itemRender={(current, type, element) => {
              if (type === 'page') {
                return (
                  <div
                    className={cn(
                      'flex justify-center items-center w-8 h-8 text-sm',
                      'text-grey cursor-pointer hover:bg-gray-200 hover:rounded-md disabled:bg-red-700'
                    )}
                  >
                    {current}
                  </div>
                );
              }
              if (type === 'prev' || type === 'next') {
                return (
                  <div
                    className={cn(
                      'flex pb-1 justify-center items-center w-8 h-8 text-lg',
                      'rounded-full border border-grey text-grey cursor-pointer',
                      'hover:bg-gray-200 disabled:bg-red-700',
                      type === 'prev' && currentPage === 0 && 'opacity-50',
                      type === 'next' &&
                        currentPage + 1 ===
                          calculateTotalPages(total, pageSize) &&
                        'opacity-50'
                    )}
                  >
                    {element}
                  </div>
                );
              }
              return element; // For other types like jump-prev, jump-next etc.
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
