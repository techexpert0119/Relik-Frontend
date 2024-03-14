import { PageService } from '@/services/api/page-service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPage } from '@/data/interfaces/page';
import PageControls from '@/app/pages/edit-page/components/page-controls/PageControls';
import '@/styles/page-features.css';
import { PageContextProvider } from '@/app/pages/user-single-page/context/page-context';
import MenuContainer from '@/app/pages/edit-page/components/menu-container/MenuContainer';
import { MenuContextProvider } from '@/app/pages/user-single-page/context/menu-context';
import ActionContainer from '@/app/pages/edit-page/components/action-container/ActionContainer';
import PageHeaderFeature from '@/components/features/page-header/PageHeaderFeature';
import { IFeature } from '@/data/dtos/feature';
import FeatureContainer from '@/app/pages/edit-page/components/featute-container/FeatureContainer';
import { cn } from '@/lib/utils';
import WideLogoTM from '@/app/pages/components/WideLogoTM';
import NotFound from '@/components/NotFound';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';
import { PageVersionHistoryService } from '@/services/api/page-version-history';
import VersionHistory from './components/version-history/VersionHistory';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

const EditPage = () => {
  const [pageData, setPageData] = useState<IPage>();
  const [pageVersionHistories, setPageVersionHistories] =
    useState<ReadonlyArray<IPageVersionHistory>>();
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isRollbackLoading, setIsRollbackLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPageVersionHistory, setSelectedPageVersionHistory] = useState<
    IPageVersionHistory | undefined
  >(undefined);
  const params = useParams();

  const loadData = () => {
    if (params.id) {
      PageService.getPageWithFeatures(params.id)
        .then((res) => {
          setPageData(res?.page);
          setFeatures(res?.features);
        })
        .catch(() => setIsError(true));
    }
  };

  const loadPageVersionHistories = () => {
    if (params.id) {
      PageVersionHistoryService.getAll(params.id).then((res) => {
        setPageVersionHistories(res);
      });
    }
  };

  useEffect(() => {
    loadData();
    loadPageVersionHistories();
  }, []);

  const handleRollback = (id: string) => {
    if (!isRollbackLoading) {
      setIsRollbackLoading(true);
      PageVersionHistoryService.rollback(id)
        .then((response) => {
          setFeatures && setFeatures(response.features);
          setPageData && setPageData(response.page);
          setPageVersionHistories &&
            setPageVersionHistories(response.pageVersionHistories);
          toast({ variant: 'success', title: 'Rollback was successful' });
        })
        .catch((e: AxiosError<{ message: string }>) =>
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message,
          })
        )
        .finally(() => setIsRollbackLoading(false));
    }
  };

  if (isError) {
    return (
      <NotFound
        className="grow h-full bg-slate"
        statusCode={404}
        title=" Page not found"
        description="Sorry, we couldn’t find the page you’re looking for."
      />
    );
  }

  return (
    <PageContextProvider
      value={{
        page: pageData,
        features: features,
        pageVersionHistories,
        setPage: setPageData,
        setFeatures,
        setPageVersionHistories,
        disabled: disabled,
        setDisabled: setDisabled,
      }}
    >
      <MenuContextProvider>
        <div className="sticky z-[50] md:top-[80px] top-[141px] sm:container w-full bg-[#F3F4F6] min-h-full flex-1 px-2 py-4 mx-0 md:mx-auto">
          <PageControls
            isRollbackLoading={isRollbackLoading}
            handleRollback={handleRollback}
            selectedPageVersionHistory={selectedPageVersionHistory}
          />
        </div>
        <main className="min-h-full flex-1 px-2 sm:container mx-0 md:mx-auto pb-6 flex flex-col gap-4 overflow-clip">
          {pageData && (
            <>
              <section className="flex flex-col md:flex-row gap-2 justify-center sm:pr-8">
                <MenuContainer className="mt-3" />

                <div
                  className={cn(
                    'flex flex-col h-fit flex-1 items-center max-w-[calc(593px)] rounded-md shadow-lg',
                    disabled && 'opacity-50',
                    'mt-3'
                  )}
                  style={{
                    background: pageData?.theme?.background,
                    fontFamily: pageData?.theme?.fontFamily,
                  }}
                >
                  <ActionContainer editMode={'page-header'}>
                    <PageHeaderFeature />
                  </ActionContainer>

                  <FeatureContainer />

                  <div className="w-full flex-col flex justify-center mt-10">
                    <p
                      style={{
                        color: pageData?.theme?.fontColor,
                        textAlign: 'center',
                        fontSize: '12px',
                      }}
                    >
                      Powered by
                    </p>
                    <WideLogoTM
                      height={32}
                      color={pageData.theme?.fontColor}
                      className="mb-10 mt-2"
                    />
                  </div>
                </div>

                <VersionHistory
                  className="mt-3"
                  isRollbackLoading={isRollbackLoading}
                  handleRollback={handleRollback}
                  selectedPageVersionHistory={selectedPageVersionHistory}
                  setSelectedPageVersionHistory={setSelectedPageVersionHistory}
                />
              </section>
            </>
          )}
        </main>
      </MenuContextProvider>
    </PageContextProvider>
  );
};

export default EditPage;
