import { Button } from '@/components/ui/button';
// import { AvatarWithStatus } from '@/app/users/components/avatar';
import { Filter, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TableComponent from './table';
import { useParams } from 'react-router';
// import { getUserByIdQuery } from '@/services/api/users-service';
// import { generateInitials } from '@/components/AccountPopover';
// import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import QueryHook from '@/hooks/queryHook';

export default function Analytics() {
  const { id } = useParams();
  const { MergeQueryParams } = QueryHook();
  const [filter] = useState<{
    searchText: undefined | string;
  }>({ searchText: undefined });

  // const { data: user, refetch } = getUserByIdQuery(id || '');

  useEffect(() => {
    if (filter.searchText) {
      MergeQueryParams({ filter: JSON.stringify(filter) }, true);
    }
  }, [filter]);

  useEffect(() => {
    // refetch();
  }, [filter.searchText]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl mb-5">Analytics</h1>
      <div className="flex mb-4 justify-between items-center border-b">
        <div className="flex gap-3 items-center">
          <Input
            className="border-gray-300 w-[180px] h-[44px] text-base"
            type="text"
            placeholder="Search user"
          />
          <Button
            size="sm"
            className="p-5 rounded border-gray-300"
            variant="outline"
          >
            <Filter className="mr-2 w-6 h-6" />
            Filter
          </Button>
        </div>
        <Button size="sm" className="p-5">
          <MessageCircle className="mr-2 w-6 h-6" />
          Engage
        </Button>
      </div>

      <TableComponent userId={id} filter={filter} />
    </div>
  );
}
