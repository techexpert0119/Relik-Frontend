import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import { getPagesOfUserQuery } from '@/services/api/page-service';
import { ViewMode } from '@/data/enums/view-mode';
import { IPage, PageStatus } from '@/data/interfaces/page';
import { Input } from '@/components/ui/input';
import { NavLink } from 'react-router-dom';
import ProfileCard from '@/app/pages/components/ProfileCard';
import { Skeleton } from '@/components/ui/skeleton';
import CustomPagination from '@/components/ui/pagenation';
import usePagination from '@/hooks/usePagination';
import { useAuthStore } from '@/stores/auth-store';

const AllPagesPage = () => {
  const { user } = useAuthStore();
  const [view, setView] = useState<ViewMode>(ViewMode.GRID);

  const { AddQueryParams, RemoveQueryParam, queryParams } =
    usePagination('pages');
  const { pageSize, pageNumber, searchText, status } = queryParams;

  const [searchInputText, setSearchInputText] = useState(searchText);

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
    AddQueryParams({ searchText: text, pageNumber: 0 });
  }, 100);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInputText(event.target.value);
    debounceFn(event.target.value);
  }

  useEffect(() => {
    refetch();
  }, [pageSize, pageNumber, searchText, status, user?.currentAgency]);

  const handlePageStatusChange = (status: PageStatus | undefined) => {
    if (status === undefined) {
      RemoveQueryParam('status');
    } else {
      AddQueryParams({ status, pageNumber: 0 });
    }
  };

  return (
    <main className="flex-1 flex flex-col container mx-auto gap-4 py-4 px-6 md:py-6 md:px-8 md:gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <div className="hidden md:flex gap-1">
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
          </div>

          <Select
            onValueChange={(value) => {
              if (value === 'all') handlePageStatusChange(undefined);
              else if (value === PageStatus.ACTIVE)
                handlePageStatusChange(value);
              else if (value === PageStatus.INACTIVE)
                handlePageStatusChange(value);

              if (value === ViewMode.LIST) setView(ViewMode.LIST);
              else if (value === ViewMode.GRID) setView(ViewMode.GRID);
            }}
            value={status ?? 'all'}
          >
            <SelectTrigger
              id="buttonRadius"
              className="bg-white h-11 min-w-30 max-w-30"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'all'}>
                  <p>All Pages</p>
                </SelectItem>
                <SelectItem value={PageStatus.ACTIVE}>
                  <p>Published</p>
                </SelectItem>
                <SelectItem value={PageStatus.INACTIVE}>
                  <p>Unpublished</p>
                </SelectItem>
              </SelectGroup>
              <div className="md:hidden">
                <SelectSeparator />
                <SelectGroup>
                  <SelectItem value={ViewMode.LIST}>
                    <p>List view</p>
                  </SelectItem>
                  <SelectItem value={ViewMode.GRID}>
                    <p>Grid view</p>
                  </SelectItem>
                </SelectGroup>
              </div>
            </SelectContent>
          </Select>

          <div className="relative w-full">
            <Search className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
            <Input
              value={searchInputText}
              onChange={(e) => handleChange(e)}
              placeholder="Search for a page"
              className="pl-12 border-slate-200 h-[45px] lg:min-w-[320px]"
              autoComplete="email"
            />
          </div>
        </div>

        <Button
          size="sm"
          asChild
          className={`text-base h-14 w-14 fixed lg:static z-20 bottom-8 right-4 lg:h-10 lg:w-auto lg:ml-auto cursor-pointer ${!user?.isActive && 'bg-gray-400 hover:bg-gray-400'}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {user?.isActive ? (
            <NavLink to="/pages/create">
              <Plus className="h-5 w-5 lg:mr-1" />
              <div className="hidden lg:block">Create new page</div>
            </NavLink>
          ) : (
            <div>
              <Plus className="h-5 w-5 lg:mr-1" />
              <div className="hidden lg:block">Create new page</div>
            </div>
          )}
        </Button>
      </div>
      <hr className="border-gray-200 hidden md:block" />
      <article
        role="main"
        className={cn(
          'grid gap-2.5 md:gap-y-5 md:gap-x-8',
          view === ViewMode.GRID && 'grid-cols-2 lg:grid-cols-3'
        )}
      >
        {isLoading
          ? new Array(6).fill(null).map((_, i) => {
              return <Skeleton key={i} className="p-4 h-20" />;
            })
          : allUserPages?.map((page, i) => (
              <ProfileCard
                key={i}
                info={page}
                view={view}
                onDataUpdate={() => refetch().then()}
              />
            ))}
      </article>

      <CustomPagination
        className="mt-auto"
        pageSizeArray={[9, 15, 21, 30, 60]}
        total={userPages?.totalCount ?? 0}
        currentPage={+pageNumber}
        pageSize={+pageSize}
        onChagePageSize={(e) => AddQueryParams({ pageSize: e, pageNumber: 0 })}
        onChange={(e) => AddQueryParams({ pageNumber: e })}
      />
    </main>
  );
};

export default AllPagesPage;
