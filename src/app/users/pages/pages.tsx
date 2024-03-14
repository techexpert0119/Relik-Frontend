import { Button } from '@/components/ui/button';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import { LayoutGrid, List } from 'lucide-react';

import { Input } from '@/components/ui/input';
import UsePageFilter from '../hooks/use-page-filter';
import ProfileCard from '@/app/pages/components/ProfileCard';
import { getPagesOfUserQuery } from '@/services/api/page-service';
import { Skeleton } from '@/components/ui/skeleton';
import { IPage, PageStatus } from '@/data/interfaces/page';
import QueryHook from '@/hooks/queryHook';
import { ChangeEvent, useEffect, useRef } from 'react';
import CustomPagination from '@/components/ui/pagenation';
import { useAuthStore } from '@/stores/auth-store';
import { ViewMode } from '@/data/enums/view-mode';

export default function PageTab() {
  const { user } = useAuthStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const { AddQueryParams, QueryParams, RemoveQueryParam } = QueryHook();
  const { pageSize, pageNumber, searchText, status } = QueryParams;
  const { filter, changeItemFilter, changeView } = UsePageFilter();
  const {
    data: userPages,
    isLoading,
    refetch,
  } = getPagesOfUserQuery({
    pageSize,
    pageNumber,
    searchText,
    status,
    agencyId: user?.currentAgency,
  });
  useEffect(() => {
    refetch();
  }, [pageSize, pageNumber, searchText, status, user?.currentAgency]);
  useEffect(() => {
    if (!pageNumber || !pageSize) {
      AddQueryParams({
        pageSize: 10,
        pageNumber: 0,
      });
    }
  }, [pageNumber, pageSize]);
  const allUserPages = userPages?.data?.map((i) => {
    return {
      _id: i._id,
      pageName: i?.pageName,
      pageDescription: i?.pageDescription,
      pageProfilePhoto: i?.pageProfilePhoto,
      pageLink: i?.pageLink,
      theme: i?.theme,
      status: i?.status,
      isPublic: i?.isPublic,
      statistics: {
        see: 3,
        budget: 3,
      },
      lastTimePagePublishedAt: i?.lastTimePagePublishedAt,
      updatedAt: i?.updatedAt,
      undoHistoryLength: i?.undoHistoryLength,
      redoHistoryLength: i?.redoHistoryLength,
      undoCountWhenThePageIsLastPublished:
        i?.undoCountWhenThePageIsLastPublished,
      latestRestoredVersion: i?.latestRestoredVersion,
    } satisfies IPage;
  });
  const debounceFn = _.debounce((text: string | undefined) => {
    AddQueryParams({ searchText: text });
  }, 100);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    debounceFn(event.target.value);
  }
  useEffect(() => {
    if (status) {
      status === PageStatus.ACTIVE
        ? changeItemFilter('published')
        : status === PageStatus.INACTIVE
          ? changeItemFilter('unpublished')
          : changeItemFilter('all');
    }
    if (searchText && searchRef?.current) {
      searchRef.current.value = searchText;
    }
  }, []);
  const hendlePageStatusChange = (status: PageStatus | undefined) => {
    if (status === undefined) {
      RemoveQueryParam('status');
      changeItemFilter('all');
    } else if (status === PageStatus.ACTIVE) {
      AddQueryParams({ status: PageStatus.ACTIVE });
      changeItemFilter('published');
    } else if (status === PageStatus.INACTIVE) {
      AddQueryParams({ status: PageStatus.INACTIVE });
      changeItemFilter('unpublished');
    }
  };
  return (
    <div>
      <div className="flex  gap-6 mt-6"></div>
      <div className="flex gap-5 items-center mt-6">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => changeView()}
            className={cn(
              'rounded',
              'h-max',
              'py-3',
              'bg-white',
              'border-slate-200',
              'hover:bg-slate-100'
            )}
            variant="outline"
          >
            <List
              color={filter.view === ViewMode.LIST ? '#d1d5db' : '#000'}
              className="h-5 w-5"
            />
          </Button>
          <Button
            size="sm"
            onClick={() => changeView()}
            className={cn(
              'rounded',
              'h-max',
              'py-3',
              'bg-white',
              'border-slate-200',
              'hover:bg-slate-100'
            )}
            variant="outline"
          >
            <LayoutGrid
              color={filter.view === ViewMode.GRID ? '#d1d5db' : '#000'}
              className="h-5 w-5"
            />
          </Button>

          {/* Input for search item */}
          <Input
            ref={searchRef}
            className="border-0 w-[320px] h-[44px]"
            type="email"
            placeholder="Search for a page"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => hendlePageStatusChange(undefined)}
            variant={filter.itemFilter === 'all' ? 'light' : 'gray'}
            className="px-4"
            size="xs"
          >
            All pages
          </Button>

          <Button
            onClick={() => hendlePageStatusChange(PageStatus.ACTIVE)}
            variant={filter.itemFilter === 'published' ? 'light' : 'gray'}
            className="px-4"
            size="xs"
          >
            Published
          </Button>
          <Button
            onClick={() => hendlePageStatusChange(PageStatus.INACTIVE)}
            variant={filter.itemFilter === 'unpublished' ? 'light' : 'gray'}
            className="px-4"
            size="xs"
          >
            Unpublished
          </Button>
        </div>
      </div>
      <main
        className={cn(
          'grid gap-6 mt-10',
          filter.view === ViewMode.GRID && 'grid-cols-2 lg:grid-cols-3'
        )}
      >
        {isLoading
          ? new Array(6).fill(null).map((_, i) => {
              return <Skeleton key={i} className="p-4 h-20" />;
            })
          : allUserPages?.map((page, i) => (
              <ProfileCard key={i} info={page} view={filter.view} />
            ))}
      </main>
      <CustomPagination
        total={userPages?.totalCount || 0}
        currentPage={+pageNumber}
        pageSize={+pageSize}
        onChagePageSize={(e) => AddQueryParams({ pageSize: e })}
        onChange={(e) => AddQueryParams({ pageNumber: e })}
      />
    </div>
  );
}
