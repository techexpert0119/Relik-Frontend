import QueryHook from '@/hooks/queryHook';
import { getAgenciesQuery } from '@/services/api/agency-service';
import { useEffect } from 'react';
import AgencyCard from './component/AgencyCard';
import CustomPagination from '@/components/ui/pagenation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Agencies() {
  const { AddQueryParams, QueryParams, navigate } = QueryHook();
  const { pageNumber, pageSize } = QueryParams;
  const {
    refetch,
    data: agencies,
    isLoading,
  } = getAgenciesQuery({
    pageNumber,
    pageSize,
  });

  useEffect(() => {
    if (!pageNumber && !pageSize) {
      AddQueryParams({ pageNumber: 0, pageSize: 10 });
    }
  }, []);
  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize]);
  return (
    <div className="flex-1 flex  flex-col gap-6 container py-6 mx-auto ">
      <div className="flex justify-end">
        <Button onClick={() => navigate('/agency/create')}>Add Agency</Button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {isLoading
          ? new Array(6).fill(null)?.map(() => {
              return <Skeleton className="h-28" />;
            })
          : agencies?.data?.map((a) => {
              return <AgencyCard key={a?._id} info={a} />;
            })}
      </div>
      <div className="mt-auto">
        <CustomPagination
          currentPage={+pageNumber}
          pageSize={+pageSize}
          total={agencies?.totalCount || 0}
          onChagePageSize={(e) => AddQueryParams({ pageSize: e })}
          onChange={(e) => AddQueryParams({ pageNumber: e })}
        />
      </div>
    </div>
  );
}
