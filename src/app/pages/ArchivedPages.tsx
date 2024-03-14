import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutGrid, List, Search } from 'lucide-react';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import { getPagesOfUserQuery } from '@/services/api/page-service';
import { IPage, PageStatus } from '@/data/interfaces/page';
import { ViewMode } from '@/data/enums/view-mode';
import { Input } from '@/components/ui/input';
import { NavLink } from 'react-router-dom';
import ProfileCard from '@/app/pages/components/ProfileCard';
import { Skeleton } from '@/components/ui/skeleton';
import CustomPagination from '@/components/ui/pagenation';
import QueryHook from '@/hooks/queryHook';
import { useAuthStore } from '@/stores/auth-store';

const ArchivedPages = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.GRID);
  const searchRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const { AddQueryParams, QueryParams } = QueryHook();
  const { pageSize, pageNumber, searchText } = QueryParams;
  const {
    data: userPages,
    isLoading,
    refetch,
  } = getPagesOfUserQuery({
    pageSize,
    pageNumber,
    searchText,
    status: PageStatus.ARCHIVED,
    agencyId: user?.currentAgency,
  });
  const allUserPages = userPages?.data?.map((i) => {
    return {
      _id: i._id,
      pageName: i.pageName,
      pageDescription: i.pageDescription,
      pageProfilePhoto: i?.pageProfilePhoto,
      pageLink: i?.pageLink,
      theme: i?.theme,
      isPublic: i?.isPublic,
      status: i?.status,
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
    refetch();
  }, [pageSize, pageNumber, searchText, user?.currentAgency]);
  useEffect(() => {
    if (!pageNumber || !pageSize) {
      AddQueryParams({
        pageSize: 10,
        pageNumber: 0,
      });
    }
  }, [pageNumber, pageSize]);
  useEffect(() => {
    if (searchText && searchRef?.current) {
      searchRef.current.value = searchText;
    }
  }, []);
  return (
    <main className="flex-1 flex flex-col gap-6 container py-6 mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            onClick={() => setView(ViewMode.GRID)}
            className="rounded h-max py-3 bg-white border-slate-200"
            disabled={view === ViewMode.GRID}
            variant="outline"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            onClick={() => setView(ViewMode.LIST)}
            className="rounded h-max py-3 bg-white border-slate-200"
            disabled={view === ViewMode.LIST}
            variant="outline"
          >
            <List className="h-5 w-5" />
          </Button>

          <div className="relative w-full">
            <Search className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
            <Input
              ref={searchRef}
              onChange={(e) => handleChange(e)}
              placeholder="Search for a page"
              className="pl-12 border-slate-200 h-[45px] lg:min-w-[320px]"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end w-full gap-4">
          <NavLink to="/pages">
            <ArrowLeft className="h-5 w-5 mr-1" />
          </NavLink>
        </div>
      </div>

      <article
        role="main"
        className={cn(
          'grid gap-6',
          view === ViewMode.GRID && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {isLoading
          ? new Array(6).fill(null).map((_, i) => {
              return <Skeleton key={i} className="p-4 h-20" />;
            })
          : allUserPages?.map((page, i) => (
              <ProfileCard key={i} info={page} view={view} />
            ))}
      </article>

      <CustomPagination
        total={userPages?.totalCount || 0}
        currentPage={+pageNumber}
        pageSize={+pageSize}
        onChagePageSize={(e) => AddQueryParams({ pageSize: e })}
        onChange={(e) => AddQueryParams({ pageNumber: e })}
      />
    </main>
  );
};

export default ArchivedPages;
