import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PageContext } from '../../../../user-single-page/context/page-context';
import { PageService } from '@/services/api/page-service';
import { AxiosError } from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { PageStatus } from '@/data/interfaces/page';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import Toggle from '@/app/pages/components/Toggle';
import { Loader } from 'lucide-react';
import { PageVersionHistoryService } from '@/services/api/page-version-history';
import { toast } from '@/components/ui/use-toast';

const statusSchema = z.object({
  status: z.nativeEnum(PageStatus),
});

const Status = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: PageStatus.ACTIVE,
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  const { page, setPage, setPageVersionHistories } =
    useContext(PageContext) ?? {};

  const debounced = useDebouncedCallback(() => {
    if (form.formState.isDirty) {
      form.handleSubmit(onSubmit)();
    }
  }, 1000);

  useEffect(() => {
    const subscription = form.watch(() => debounced());
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    form.reset({
      status: page?.status ?? PageStatus.INACTIVE,
    });
  }, [page]);

  const onSubmit = (values: z.infer<typeof statusSchema>) => {
    if (page && !isSubmitting) {
      if (values.status === PageStatus.ACTIVE) {
        return PageVersionHistoryService.createOne({ pageDraftId: page._id })
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
          );
      } else {
        return PageService.deactivatePage(page._id)
          .then((response) => {
            setPage && setPage(response);
            toast({ variant: 'success', title: 'Success' });
          })
          .catch((e: AxiosError<{ message: string }>) =>
            toast({
              variant: 'destructive',
              title: 'Error',
              description: e.response?.data?.message,
            })
          );
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => {
              return (
                <AlertDialog.Root open={isOpen}>
                  <AlertDialog.Trigger asChild>
                    <FormItem className="flex flex-col">
                      <div className="flex gap-3 items-center">
                        <FormLabel
                          className="text-white"
                          htmlFor="statusToggle"
                        >
                          Activate link
                        </FormLabel>
                        {isSubmitting && (
                          <Loader
                            className="animate-spin h-3 w-3"
                            color="white"
                          />
                        )}
                      </div>

                      <FormControl>
                        <Toggle
                          id="statusToggle"
                          value={field.value === PageStatus.ACTIVE}
                          onChange={(value) => {
                            if (value) {
                              field.onChange(PageStatus.ACTIVE);
                            } else {
                              setIsOpen(true);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                      <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-center">
                        Are you sure you want to deactivate your live link?
                      </AlertDialog.Title>
                      <div className="mt-5 flex gap-[25px]">
                        <AlertDialog.Cancel asChild>
                          <Button
                            onClick={() => setIsOpen(false)}
                            variant={'outline'}
                            className="w-full text-base"
                          >
                            Cancel
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button
                            onClick={() => {
                              setIsOpen(false);
                              field.onChange(PageStatus.INACTIVE);
                            }}
                            variant={'black'}
                            className="w-full text-base"
                          >
                            Yes, deactive link
                          </Button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              );
            }}
          />

          <Button
            variant="outline"
            size="sm"
            className="w-fit ml-auto hidden"
            disabled={!isDirty}
          >
            Update
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Status;
