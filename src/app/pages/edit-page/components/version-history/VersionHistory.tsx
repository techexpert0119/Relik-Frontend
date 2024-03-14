import React, { useContext, useEffect, useState } from 'react';

import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { useIsTablet } from '@/hooks/is-tablet-hook';
import { cn } from '@/lib/utils';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NameVersion from './NameVersion';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';
import Spinner from '@/components/Spinner';
import { useAuthStore } from '@/stores/auth-store';

const dialogCSS = `
  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-background justify-center
  items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full
`;

interface Props {
  readonly className?: string;
  readonly setSelectedPageVersionHistory: React.Dispatch<
    React.SetStateAction<IPageVersionHistory | undefined>
  >;
  readonly selectedPageVersionHistory: IPageVersionHistory | undefined;
  readonly isRollbackLoading: boolean;
  readonly handleRollback: (id: string) => void;
}

const VersionHistory = (props: Props) => {
  const { user } = useAuthStore();
  const { setMenuType, menuType } = useContext(MenuContext) ?? {};

  const isSmallDevice = useIsTablet();

  const { page, pageVersionHistories } = useContext(PageContext) ?? {};

  const [pageVersionHistoryData, setPageVersionHistoryData] = useState<
    IPageVersionHistory | undefined
  >(undefined);

  useEffect(() => {
    if (!menuType) {
      props.setSelectedPageVersionHistory(undefined);
    }
    return () => props.setSelectedPageVersionHistory(undefined);
  }, [menuType]);

  if (menuType !== 'version-history') {
    return null;
  }

  const formatDate = (inputDate: Date | string) => {
    const date = new Date(inputDate);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return formattedDate.replace(' at ', ', ');
  };

  return (
    <div
      className={cn(
        'flex-1 bg-background fade-in-25',
        isSmallDevice && dialogCSS,
        props.className
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-center items-center lg:sticky lg:top-36',
          isSmallDevice && 'p-4'
        )}
      >
        {isSmallDevice && (
          <div
            className="flex items-center gap-3 mb-5 justify-start"
            onClick={() => setMenuType && setMenuType(null)}
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <p>Close version history</p>
          </div>
        )}

        <div className="w-full max-w-[496px] bg-white rounded-lg border">
          <div className="px-8 py-6 hover:bg-[#F0F0F0]">
            <p className="text-lg font-bold">Version history</p>
          </div>

          {page?.latestRestoredVersion && (
            <div
              onClick={() => {
                props.setSelectedPageVersionHistory(
                  page?.latestRestoredVersion
                );
              }}
              className={
                'px-8 py-6 flex justify-between items-center hover:bg-[#F0F0F0] cursor-pointer opacity-50'
              }
            >
              <div>
                <p className="text-base font-bold">
                  {page?.latestRestoredVersion.title ??
                    formatDate(page?.latestRestoredVersion.createdAt)}{' '}
                </p>
                <p className="text-sm text-[#667085]">
                  {' '}
                  saved by {user?.firstName ?? 'user'}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#223345] p-3 text-white flex flex-col gap-3">
                  <p
                    onClick={() => {
                      setPageVersionHistoryData(page?.latestRestoredVersion);
                    }}
                    className="cursor-pointer hover:text-gray-300"
                  >
                    Name this version
                  </p>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {pageVersionHistories && pageVersionHistories?.length > 0 && (
            <>
              <div className="px-8 py-6 hover:bg-[#F0F0F0]">
                <p className="text-lg font-bold">Previous versions</p>
              </div>

              {pageVersionHistories.map((pageVersionHistory, index) => {
                const isRestoredVersion =
                  pageVersionHistory._id === page?.latestRestoredVersion?._id;

                return (
                  <div
                    onClick={() => {
                      props.setSelectedPageVersionHistory(pageVersionHistory);
                    }}
                    key={index}
                    className={cn(
                      'px-8 py-6 flex justify-between items-center hover:bg-[#F0F0F0] cursor-pointer',
                      isRestoredVersion && 'opacity-50'
                    )}
                  >
                    <div>
                      <p className={cn('text-base font-bold')}>
                        {pageVersionHistory.title ??
                          formatDate(pageVersionHistory.createdAt)}{' '}
                      </p>
                      <p className={cn('text-sm text-[#667085]')}>
                        {' '}
                        saved by {user?.firstName ?? 'user'}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-6 h-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#223345] p-3 text-white flex flex-col gap-3">
                        {!isRestoredVersion && (
                          <p
                            onClick={() => {
                              props.handleRollback(pageVersionHistory._id);
                            }}
                            className="cursor-pointer hover:text-gray-300 font-thin flex gap-2 items-center"
                          >
                            Restore this version
                            {props.isRollbackLoading && (
                              <Spinner width={3} height={3} />
                            )}
                          </p>
                        )}

                        <p
                          onClick={() => {
                            setPageVersionHistoryData(pageVersionHistory);
                          }}
                          className="cursor-pointer hover:text-gray-300"
                        >
                          Name this version
                        </p>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <NameVersion
        pageVersionHistoryData={pageVersionHistoryData}
        setPageVersionHistoryData={setPageVersionHistoryData}
        setSelectedPageVersionHistory={props.setSelectedPageVersionHistory}
        selectedPageVersionHistory={props.selectedPageVersionHistory}
      />
    </div>
  );
};

export default VersionHistory;
