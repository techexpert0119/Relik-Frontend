import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useContext, useEffect } from 'react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { Button } from '@/components/ui/button';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { PageFeatureType } from '@/data/enums/page-features';
import UploadImage from '../UploadImage';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const MailToFormSchema = z.object({
  mailToValues: z.object({
    photo: z
      .string({
        required_error: 'Please upload a photo!',
        invalid_type_error: 'Please upload a photo!',
      })
      .min(1, { message: 'Please upload a photo!' })
      .optional(),
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    emailAddress: z
      .string({
        required_error: 'Please enter a valid email address!',
        invalid_type_error: 'Please enter a valid email address!',
      })
      .email()
      .max(40, { message: 'Max 40 are characters allowed!' }),
    subject: z
      .string({
        required_error: 'Please enter a valid subject!',
        invalid_type_error: 'Please enter a valid subject!',
      })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .optional(),
    body: z
      .string({
        required_error: 'Please enter a valid body!',
        invalid_type_error: 'Please enter a valid body!',
      })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .optional(),
  }),
});

const MailToForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof MailToFormSchema>>({
    resolver: zodResolver(MailToFormSchema),
    defaultValues: {
      mailToValues: {
        photo: undefined,
        title: undefined,
        emailAddress: undefined,
        subject: undefined,
        body: undefined,
      },
    },
  });
  const {
    watch,
    formState: { isSubmitting, isDirty },
  } = form;
  const debounced = useDebouncedCallback(() => {
    if (isDirty) {
      form.handleSubmit(onSubmit)();
    }
  }, 800);

  useEffect(() => {
    if (options?.featureId) {
      const sub = watch(() => debounced());
      return () => sub.unsubscribe();
    }
  }, [options?.featureId]);

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          mailToValues: feature.values.mailToValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof MailToFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.MAIL_TO,
        values: {
          mailToValues: values.mailToValues,
        },
      });
    } else {
      return (
        updateFeature &&
        updateFeature(options?.featureId, {
          mailToValues: values.mailToValues,
        }).then((res) => {
          form.reset(
            {
              mailToValues: res.values.mailToValues,
            },
            { keepValues: true }
          );
        })
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <ScrollArea className="h-96 pr-4">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white font-black">Email Link</p>
                <p className="text-white text-sm">
                  Triggers user's email client to create new email.
                </p>
              </div>

              <FormField
                control={form.control}
                name="mailToValues.photo"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-white">Photo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UploadImage
                          id="photo"
                          showPreview
                          image={form?.watch('mailToValues.photo')}
                          setImage={(image) =>
                            form.setValue('mailToValues.photo', image, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mailToValues.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Title*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Enter your title" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-white font-black">Responses</p>
                <p className="text-white text-sm">
                  Choose where visitor's email will be sent to.
                </p>
              </div>

              <FormField
                control={form.control}
                name="mailToValues.emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email address*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your email address"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-white font-black">Additional settings</p>
              </div>

              <FormField
                control={form.control}
                name="mailToValues.subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Subject</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Subject (optional)"
                          rows={4}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mailToValues.body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Body</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Body (optional)"
                          rows={1}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>

          {!options?.featureId ? (
            <Button variant="outline" size="sm" className="mt-4 ml-auto w-fit">
              {options?.featureId ? 'Save' : 'Add'}
            </Button>
          ) : (
            <div className="min-h-[24px] flex justify-end">
              {isSubmitting && (
                <Loader className="animate-spin h-4 w-4 text-white" />
              )}
            </div>
          )}
        </fieldset>
      </form>
    </Form>
  );
};

export default MailToForm;
