import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';
import { PageVersionHistoryService } from '@/services/api/page-version-history';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';

interface Props {
  readonly pageVersionHistoryData: IPageVersionHistory | undefined;
  readonly setPageVersionHistoryData: Dispatch<
    SetStateAction<IPageVersionHistory | undefined>
  >;
  readonly setSelectedPageVersionHistory: React.Dispatch<
    React.SetStateAction<IPageVersionHistory | undefined>
  >;
  readonly selectedPageVersionHistory: IPageVersionHistory | undefined;
}

export const NameVersionSchema = z.object({
  title: z
    .string({
      required_error: 'Please enter a valid title!',
      invalid_type_error: 'Please enter a valid title!',
    })
    .min(3, { message: 'Min 3 characters are required!' })
    .max(40, { message: 'Max 40 characters are allowed!' }),
  description: z
    .string({
      required_error: 'Please enter a valid description!',
      invalid_type_error: 'Please enter a valid description!',
    })
    .optional(),
});

export default function NameVersion(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { page, pageVersionHistories, setPage, setPageVersionHistories } =
    useContext(PageContext) ?? {};

  const form = useForm<z.infer<typeof NameVersionSchema>>({
    resolver: zodResolver(NameVersionSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
    },
  });

  useEffect(() => {
    if (props.pageVersionHistoryData) {
      setIsOpen(true);
    }
  }, [props.pageVersionHistoryData]);

  useEffect(() => {
    if (props.pageVersionHistoryData) {
      form.reset({
        title: props.pageVersionHistoryData.title,
        description: props.pageVersionHistoryData.description,
      });
    }
  }, [props.pageVersionHistoryData]);

  const handleClose = () => {
    setIsOpen(false);
    props.setPageVersionHistoryData(undefined);
  };

  const onSubmit = (values: z.infer<typeof NameVersionSchema>) => {
    setIsLoading(true);

    if (props.pageVersionHistoryData) {
      PageVersionHistoryService.updateOne(
        props.pageVersionHistoryData._id,
        values
      )
        .then((response) => {
          if (props.selectedPageVersionHistory?._id === response._id) {
            props.setSelectedPageVersionHistory(response);
          }

          pageVersionHistories &&
            setPageVersionHistories &&
            setPageVersionHistories(
              pageVersionHistories.map((pageVersionHistory) => {
                if (pageVersionHistory._id === response._id) {
                  return response;
                }

                return pageVersionHistory;
              })
            );
          page &&
            setPage &&
            setPage({
              ...page,
              ...(page.latestRestoredVersion?._id === response._id
                ? { latestRestoredVersion: response }
                : {}),
            });
        })
        .finally(() => {
          setIsLoading(false);
          handleClose();
        });
    }
  };

  return (
    <Dialog open={isOpen}>
      <Form {...form}>
        <DialogContent style={{ maxWidth: 550 }}>
          <DialogTitle className="text-center">
            Add to version history
          </DialogTitle>

          <fieldset className="flex flex-col gap-4 text-gray-700">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Title" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        className="bg-white"
                        placeholder="Description"
                        rows={3}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <div className="flex justify-end gap-3">
            <Button
              className="font-bold"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="font-bold"
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
