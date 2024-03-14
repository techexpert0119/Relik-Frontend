import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputWithFixedValue } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import QueryHook from '@/hooks/queryHook';
import { postPageMutation } from '@/services/api/page-service';
import UploadImage from './components/UploadImageFull';
import { useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

const pageDomain = import.meta.env.VITE_PAGE_DOMAIN;

const formSchema = z.object({
  pageName: z
    .string({
      required_error: 'Please input page name',
      invalid_type_error: 'Invalid type',
    })
    .max(25, {
      message: 'The character limit for title is 25, Please try again.',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Required field',
    }),
  pageDescription: z
    .string({
      required_error: 'Please input page description',
      invalid_type_error: 'Invalid type',
    })
    .max(120, {
      message: 'The character limit for description is 120, Please try again.',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Required field',
    }),
  pageLink: z
    .string({
      required_error: 'Please input page link',
      invalid_type_error: 'Invalid type',
    })
    .max(100, {
      message: 'The character limit for link is 100, Please try again.',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Required field',
    })
    .refine(
      (data) => {
        return /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(data.trim());
      },
      {
        message:
          'Invalid link. Only numbers, alphabets characters, and dashes are allowed!',
      }
    ),
  pageProfilePhoto: z
    .string({
      required_error: 'Please upload image',
      invalid_type_error: 'Invalid type',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Required field',
    }),
});

export default function CreatePagesPage() {
  const { user } = useAuthStore();
  const { navigate } = QueryHook();
  const postPage = postPageMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: undefined,
      pageDescription: undefined,
      pageLink: undefined,
      pageProfilePhoto: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let agencyId = undefined;
    if (user?.currentAgency) {
      agencyId = user?.currentAgency;
    }
    postPage.mutate(
      { ...values, agencyId, pageLink: `${values.pageLink}` },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            navigate(`/pages/${data?.data?._id}`);
          }
        },
        onError: (error) => {
          if (error?.response?.data?.statusCode === 400) {
            form.setError('pageLink', {
              type: 'unique',
              message: error?.response?.data?.message,
            });
          }
        },
      }
    );
  }
  useEffect(() => {
    if (form.watch('pageName')) {
      const generatedUrl = String(form.getValues().pageName.toLowerCase())
        .replace(/\s/g, '-')
        .replace(/-+$/, '');

      form.setValue('pageLink', generatedUrl);
    }
    if (form.watch('pageName') === '') {
      form.setValue('pageLink', '');
    }
  }, [form.watch('pageName')]);

  const copyText = () => {
    const pageLink = form.getValues('pageLink');
    if (pageLink) {
      copyToClipboard(`${pageDomain}${pageLink}`);
    }
  };

  return (
    <div className="mt-5 container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            const formValues = form.getValues();
            form.clearErrors();
            if (formValues.pageName?.length > 25) {
              const previousValue = form.getValues().pageName.slice(0, 25);
              form.setValue('pageName', previousValue);
              form.setError('pageName', {
                message:
                  'The character limit for title is 25, Please try again.',
              });
            }
            if (formValues.pageDescription?.length > 120) {
              const previousValue = form
                .getValues()
                .pageDescription.slice(0, 120);
              form.setValue('pageDescription', previousValue);
              form.setError('pageDescription', {
                message:
                  'The character limit for description is 120, Please try again.',
              });
            }
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Create a page
              </h1>
              <p className="text-description text-sm font-medium">
                Give initial page data.
              </p>
            </div>
            <Button size="sm" className="gap-2 min-w-[92px] h-10">
              <h1 className="font-black">Next</h1>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <hr className="my-8" />

          <div className="flex flex-col md:flex-row">
            <h1 className="basis-[20%] text-sm font-semibold text-gray-700 mb-7 md:!mb-0">
              Page name*
            </h1>

            <FormField
              control={form.control}
              name="pageName"
              render={({ field }) => (
                <FormItem className="basis-[40%]">
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="name"
                        className="text-base"
                        type="text"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <br />

          <div className="flex flex-col md:flex-row">
            <h1 className="basis-[20%] text-sm font-semibold text-gray-700 mb-7 md:!mb-0">
              Page link*
            </h1>

            <FormField
              control={form.control}
              name="pageLink"
              render={({ field }) => (
                <FormItem className="basis-[40%]">
                  <FormControl>
                    <div className="relative">
                      <InputWithFixedValue
                        {...field}
                        onChange={(event) => {
                          form.clearErrors('pageLink');
                          field.onChange(event);
                        }}
                        placeholder="page-url"
                        fixedValue={pageDomain}
                        id="link"
                        type="text"
                        className="pr-20 text-base"
                        copyToClickboard={copyText}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <br />

          <div className="flex flex-col md:flex-row">
            <h1 className="basis-[20%] text-sm font-semibold text-gray-700 mb-7 md:!mb-0">
              Page description*
            </h1>

            <FormField
              control={form.control}
              name="pageDescription"
              render={({ field }) => (
                <FormItem className="basis-[40%]">
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        id="description"
                        className="text-base bg-white"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <br />

          <div className="flex flex-col md:flex-row">
            <div className="basis-[20%]">
              <h1 className="text-sm font-semibold text-gray-700 mb-7 md:!mb-0">
                Profile photo*
              </h1>
              <p className="text-description text-sm">For this page only</p>
            </div>

            <div className="basis-[40%]">
              <FormField
                control={form.control}
                name="pageProfilePhoto"
                render={({}) => (
                  <FormItem className="basis-[40%]">
                    <UploadImage
                      position="inside-full"
                      id="pickAvatar"
                      showPreview
                      onDropAccepted={(imgId) => {
                        form.setValue('pageProfilePhoto', imgId || '');
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
