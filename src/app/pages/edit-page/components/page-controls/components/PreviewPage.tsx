import { useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PageService } from '@/services/api/page-service';
import { IGetPageWithFeatureResult } from '@/data/dtos/get-page-with-feature-result';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import FeatureRender from '@/components/features/FeatureRender';
import PageHeaderFeaturePreview from '@/components/features/page-header/PageHeaderFeaturePreview';
import WideLogoTM from '@/app/pages/components/WideLogoTM';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageStatus } from '@/data/enums/page-status';
import { Scrollbars } from 'react-custom-scrollbars-2';

const PreviewPage = () => {
  const [data, setData] = useState<IGetPageWithFeatureResult>();
  const [open, setOpen] = useState(false);
  const { page } = useContext(PageContext) ?? {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (open && page) {
      setError(undefined);
      setLoading(true);
      PageService.getPageWithFeatures(page._id)
        .then((res) => {
          setData(res);
        })
        .catch(() => setError('Page has not been found'))
        .finally(() => setLoading(false));
    }

    if (!open) {
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Eye className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </DialogTrigger>

      <DialogContent className="py-8 w-full max-w-[611px]">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(false)}
          className="bg-white top-4 right-4 w-7 h-7 z-30 absolute"
        >
          <X className="h-5 w-5" />
        </Button>

        {error && (
          <div className="flex flex-col mr-24 h-24 p-4 w-full">
            <Alert className="h-16">
              <AlertTitle>Error :(</AlertTitle>
              <AlertDescription>Did you save the page?</AlertDescription>
            </Alert>
          </div>
        )}

        {loading ? (
          <p className="flex justify-center items-center text-2xl h-24">
            Loading...
          </p>
        ) : (
          <>
            {data?.page &&
              (data.page.status === PageStatus.ARCHIVED ? (
                <p className="flex justify-center items-center text-2xl h-24 text-center">
                  Page is archived
                </p>
              ) : (
                <>
                  <div className="w-[14px] h-[58px] bg-black absolute right-32 top-48 rounded-full" />
                  <Scrollbars
                    className="mt-4 mx-auto ring-8 ring-black bg-white rounded-3xl scrollable"
                    style={{
                      background: data?.page?.theme?.background,
                      fontFamily: data?.page?.theme?.fontFamily,
                    }}
                  >
                    <div className="flex flex-col flex-1 items-center max-w-[calc(593px)] rounded-md">
                      <PageHeaderFeaturePreview page={data?.page} />
                      {data?.features.map((f, i) => (
                        <div className="w-full py-1.5" key={i}>
                          <FeatureRender feature={f} preview={true} />
                        </div>
                      ))}

                      <div className="w-full flex-col flex justify-center mt-10">
                        <p
                          style={{
                            color: data?.page?.theme.fontColor,
                            textAlign: 'center',
                            fontSize: '12px',
                          }}
                        >
                          Powered by
                        </p>
                        <WideLogoTM
                          height={32}
                          color={data?.page?.theme.fontColor}
                          className="mb-10 mt-2"
                        />
                      </div>
                    </div>
                  </Scrollbars>
                </>
              ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPage;
