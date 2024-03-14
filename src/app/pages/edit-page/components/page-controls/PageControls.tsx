import { useContext, useMemo, useState } from 'react';
import { ArrowLeft, History, Redo2, Settings, Undo2 } from 'lucide-react';
import { AxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { toast } from '@/components/ui/use-toast';
import PreviewPage from '@/app/pages/edit-page/components/page-controls/components/PreviewPage';
import { PageService } from '@/services/api/page-service';
import PublishIcon from '@/components/icons/publish-icon';
import { PageStatus } from '@/data/enums/page-status';
import { ShareDialog } from './ShareDialog';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';
import { PageVersionHistoryService } from '@/services/api/page-version-history';
import { RenderPageStatus } from './RenderPageStatus';

const singlePageDomain = import.meta.env.VITE_SINGLE_PAGE_DOMAIN;

interface Props {
  readonly isRollbackLoading: boolean;
  readonly handleRollback: (id: string) => void;
  readonly selectedPageVersionHistory: IPageVersionHistory | undefined;
}

const PageControls = (props: Props) => {
  const pageContext = useContext(PageContext);
  const menuContext = useContext(MenuContext);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [isUndoLoading, setIsUndoLoading] = useState(false);
  const [isRedoLoading, setIsRedoLoading] = useState(false);

  if (!pageContext) return null;

  const {
    page,
    pageVersionHistories,
    features,
    setPage,
    setPageVersionHistories,
    setFeatures,
  } = pageContext;

  const handleTogglePublish = () => {
    if (page) {
      setIsPublishLoading(true);

      return PageVersionHistoryService.createOne({
        pageDraftId: page._id,
      })
        .then((response) => {
          setPage && setPage(response.page);
          setPageVersionHistories &&
            setPageVersionHistories(response.pageVersionHistories);
          toast({ variant: 'success', title: 'Success' });
        })
        .catch((e: AxiosError<{ message: string }>) =>
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message,
          })
        )
        .finally(() => setIsPublishLoading(false));
    }
  };

  const handleUndo = () => {
    if (page) {
      setIsUndoLoading(true);
      return PageService.undoOperation(page._id)
        .then((response) => {
          setPage && setPage(response.page);
          setFeatures && setFeatures(response.features);
          toast({ variant: 'success', title: 'Undo was successful' });
        })
        .catch((e: AxiosError<{ message: string }>) =>
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message,
          })
        )
        .finally(() => setIsUndoLoading(false));
    }
  };

  const handleRedo = () => {
    if (page) {
      setIsRedoLoading(true);
      return PageService.redoOperation(page._id)
        .then((response) => {
          setPage && setPage(response.page);
          setFeatures && setFeatures(response.features);
          toast({ variant: 'success', title: 'Redo was successful' });
        })
        .catch((e: AxiosError<{ message: string }>) =>
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message,
          })
        )
        .finally(() => setIsRedoLoading(false));
    }
  };

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

  const unsavedFeatureCount = useMemo(() => {
    const lastTimePagePublishedAt = new Date(
      page?.lastTimePagePublishedAt ?? Date.now()
    );

    return (
      features?.reduce((acc, { updatedAt }) => {
        return acc + (new Date(updatedAt) > lastTimePagePublishedAt ? 1 : 0);
      }, 0) ?? 0
    );
  }, [features, page?.lastTimePagePublishedAt]);

  const isUnsavedChange = useMemo(() => {
    const lastTimePagePublishedAt = new Date(
      page?.lastTimePagePublishedAt || Date.now()
    );
    const lastTimePageUpdatedAt = new Date(page?.updatedAt || Date.now());

    return lastTimePageUpdatedAt > lastTimePagePublishedAt;
  }, [page?.lastTimePagePublishedAt, page?.updatedAt]);

  const isUnsavedUndoChangeExist = useMemo(() => {
    return (
      page?.undoHistoryLength !== page?.undoCountWhenThePageIsLastPublished
    );
  }, [page?.undoHistoryLength, page?.undoCountWhenThePageIsLastPublished]);

  const isUndoLengthZero = page?.undoHistoryLength === 0;
  const isRedoLengthZero = page?.redoHistoryLength === 0;
  const isPageVersionHistoryLengthGreaterThanZero =
    pageVersionHistories && pageVersionHistories.length > 0;
  const isUnsavedFeatureCountZero =
    page?.status === PageStatus.ACTIVE && unsavedFeatureCount === 0;
  const isSavedChange = page?.status === PageStatus.ACTIVE && !isUnsavedChange;
  const isSavedUndos =
    page?.status === PageStatus.ACTIVE && !isUnsavedUndoChangeExist;

  const isLoading =
    isPublishLoading ||
    isUndoLoading ||
    isRedoLoading ||
    props.isRollbackLoading;

  const isRestoredVersion =
    props.selectedPageVersionHistory?._id === page?.latestRestoredVersion?._id;

  return (
    <section className="flex flex-col gap-2 justify-between">
      {menuContext?.menuType === 'version-history' ? (
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => menuContext?.setMenuType(null)}
          />
          {props.selectedPageVersionHistory ? (
            <>
              <p className="text-lg">
                {props.selectedPageVersionHistory?.title ??
                  formatDate(props.selectedPageVersionHistory.createdAt)}
              </p>
              {!isRestoredVersion && (
                <Button
                  disabled={isRestoredVersion || props.isRollbackLoading}
                  onClick={() =>
                    props.handleRollback(
                      props.selectedPageVersionHistory?._id ?? ''
                    )
                  }
                >
                  Restore this version
                </Button>
              )}
            </>
          ) : (
            <p className="text-lg">Current Version</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex w-full items-center gap-2 sm:flex-row flex-col">
            <div className="flex flex-col flex-1 overflow-clip">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
                  {pageContext?.page?.pageName}
                </h3>
                <RenderPageStatus
                  unsavedFeatureCount={unsavedFeatureCount}
                  isUnsavedChange={isUnsavedChange}
                  isUnsavedUndoChangeExist={isUnsavedUndoChangeExist}
                />
              </div>

              <div className="flex items-center gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs"
                  href={`${singlePageDomain}${pageContext?.page?.pageLink}`}
                >
                  {singlePageDomain}
                  {pageContext?.page?.pageLink}
                </a>

                <ShareDialog
                  pageLink={`${singlePageDomain}${pageContext?.page?.pageLink}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Button
                disabled={
                  isLoading || !isPageVersionHistoryLengthGreaterThanZero
                }
                variant="outline"
                size="sm"
                className="gap-2 h-10 w-10 md:w-fit"
                onClick={() => menuContext?.setMenuType('version-history')}
              >
                <History className="h-4 w-4" />
              </Button>

              <PreviewPage />

              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-10 w-10 md:w-fit"
                onClick={handleUndo}
                disabled={isLoading || isUndoLengthZero}
              >
                <Undo2 className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-10 w-10 md:w-fit"
                onClick={handleRedo}
                disabled={isLoading || isRedoLengthZero}
              >
                <Redo2 className="h-4 w-4" />
              </Button>

              <Button
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="gap-2 h-10 w-10 md:w-fit"
                onClick={() => menuContext?.setMenuType('settings')}
              >
                <Settings className="h-4 w-4" />
                <div className="hidden md:block">Settings</div>
              </Button>

              <Button
                disabled={
                  isLoading ||
                  (isUnsavedFeatureCountZero && isSavedChange && isSavedUndos)
                }
                className="gap-2 h-10 w-10 md:w-fit md:px-5 bg-[#54B8C7] hover:bg-[#54B8C7]/70 disabled:bg-[#D0D5DD]"
                size="sm"
                onClick={handleTogglePublish}
              >
                <PublishIcon className="h-4 w-4" />
                <div className="hidden md:block">Publish</div>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full h-0.5 bg-gray-200" />
        </>
      )}
    </section>
  );
};

export default PageControls;
