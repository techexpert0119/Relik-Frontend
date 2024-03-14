import { Input } from '@/components/ui/input';
import { useContext, useEffect } from 'react';
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
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

const pageLinkSchema = z.object({
  pageLink: z
    .string()
    .min(4)
    .max(100)
    .refine(
      (data) => {
        return /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(data.trim());
      },
      {
        message:
          'Invalid link. Only numbers, alphabets characters, and dashes are allowed!',
        path: [],
      }
    ),
});

const PageLink = () => {
  const form = useForm<z.infer<typeof pageLinkSchema>>({
    resolver: zodResolver(pageLinkSchema),
    defaultValues: {
      pageLink: '',
    },
  });

  const { isSubmitting } = form.formState;

  const { page, setPage } = useContext(PageContext) ?? {};

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
      pageLink: page?.pageLink ?? '',
    });
  }, [page]);

  const onSubmit = (values: z.infer<typeof pageLinkSchema>) => {
    if (page) {
      return PageService.updatePageLink(page._id, {
        pageLink: values.pageLink,
      })
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pageLink"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormLabel className="text-white" htmlFor="linkInput">
                  Link
                </FormLabel>
                {isSubmitting && (
                  <Loader className="animate-spin h-3 w-3" color="white" />
                )}
              </div>

              <FormControl>
                <div className="relative">
                  <div
                    className="absolute top-0 bottom-0 h-5 text-sm my-auto text-gray-500 left-3"
                    unselectable="on"
                  >
                    https://relik.com/
                  </div>
                  <Input className="pl-[118px]" {...field} id="linkInput" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PageLink;
