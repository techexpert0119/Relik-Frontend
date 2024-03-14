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
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const ContactFormSchema = z.object({
  contactValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    fields: z.object({
      name: z.object({
        isActive: z.boolean({
          required_error: 'Please enter the field!',
          invalid_type_error: 'Please enter the field!',
        }),
        isRequired: z.boolean({
          required_error: 'Please specify if the field is required!',
          invalid_type_error: 'Please specify if the field is required!',
        }),
      }),
      emailAddress: z.object({
        isActive: z.boolean({
          required_error: 'Please enter the field!',
          invalid_type_error: 'Please enter the field!',
        }),
        isRequired: z.boolean({
          required_error: 'Please specify if the field is required!',
          invalid_type_error: 'Please specify if the field is required!',
        }),
      }),
      mobile: z.object({
        isActive: z.boolean({
          required_error: 'Please enter the field!',
          invalid_type_error: 'Please enter the field!',
        }),
        isRequired: z.boolean({
          required_error: 'Please specify if the field is required!',
          invalid_type_error: 'Please specify if the field is required!',
        }),
      }),
      message: z.object({
        isActive: z.boolean({
          required_error: 'Please enter the field!',
          invalid_type_error: 'Please enter the field!',
        }),
        isRequired: z.boolean({
          required_error: 'Please specify if the field is required!',
          invalid_type_error: 'Please specify if the field is required!',
        }),
      }),
      country: z.object({
        isActive: z.boolean({
          required_error: 'Please enter the field!',
          invalid_type_error: 'Please enter the field!',
        }),
        isRequired: z.boolean({
          required_error: 'Please specify if the field is required!',
          invalid_type_error: 'Please specify if the field is required!',
        }),
      }),
    }),
    emailAddress: z
      .string({
        required_error: 'Please enter a valid email address!',
        invalid_type_error: 'Please enter a valid email address!',
      })
      .email({ message: 'Please enter a valid email address!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    description: z
      .string({
        required_error: 'Please enter a valid description!',
        invalid_type_error: 'Please enter a valid description!',
      })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .optional(),
    thankYouMessage: z
      .string({
        required_error: 'Please enter a valid thank you message!',
        invalid_type_error: 'Please enter a valid thank you message!',
      })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .optional(),
  }),
});

const ContactForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      contactValues: {
        title: undefined,
        fields: {
          name: { isActive: true, isRequired: true },
          emailAddress: { isActive: true, isRequired: true },
          mobile: { isActive: true, isRequired: true },
          message: { isActive: true, isRequired: true },
          country: { isActive: true, isRequired: true },
        },
        emailAddress: undefined,
        description: undefined,
        thankYouMessage: undefined,
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
  }, 1000);

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
          contactValues: feature.values.contactValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof ContactFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.CONTACT_FORM,
        values: {
          contactValues: values.contactValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        contactValues: values.contactValues,
      });
    }
  };

  const fields = [
    { name: 'Name', id: 'name' },
    { name: 'Email address', id: 'emailAddress' },
    { name: 'Mobile', id: 'mobile' },
    { name: 'Message', id: 'message' },
    { name: 'Country', id: 'country' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <ScrollArea className="pr-4 vh-[90vh] md:h-[40vh]">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-white font-black">Contact Form</p>
              <p className="text-white text-sm">
                Receive messages and collect information from your visitors.
              </p>
            </div>

            <FormField
              control={form.control}
              name="contactValues.title"
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
              <p className="text-white font-black">Fields</p>
              <p className="text-white text-sm">
                Use fields to collect a specific type of information. Mark a
                field required to make it mandatory for visitors to complete.
              </p>
            </div>

            <p className="flex justify-end text-white text-sm">Required</p>

            {fields.map(({ id, name }, index) => {
              const isActive = form.watch(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                `contactValues.fields.${id}.isActive` as any
              );

              return (
                <div className="flex flex-col justify-center" key={index}>
                  <div
                    className={cn(
                      'flex justify-between content-center items-center'
                    )}
                  >
                    <FormField
                      control={form.control}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      name={`contactValues.fields.${id}.isActive` as any}
                      render={({ field }) => (
                        <FormItem className="flex gap-2 justify-items-top justify-top content-top items-top ">
                          <FormControl>
                            <div className="relative">
                              <Switch
                                name={`contactValues.fields.${id}.isActive`}
                                checked={field.value}
                                onCheckedChange={(event) => {
                                  form.setValue(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    `contactValues.fields.${id}.isRequired` as any,
                                    event
                                  );
                                  field.onChange(event);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormLabel className="text-white">{name}</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      name={`contactValues.fields.${id}.isRequired` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Checkbox
                                name={`contactValues.fields.${id}.isRequired`}
                                className="border-white bg-white data-[state=checked]:border-green-700 data-[state=checked]:bg-green-700 data-[state=checked]:text-primary-foreground"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!isActive}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {index !== fields.length - 1 && (
                    <Separator className="mt-1.5" />
                  )}
                </div>
              );
            })}

            <div>
              <p className="text-white font-black">Responses</p>
              <p className="text-white text-sm">
                Choose where visitor's responses will be sent.
              </p>
            </div>

            <FormField
              control={form.control}
              name="contactValues.emailAddress"
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
              name="contactValues.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Description (optional)"
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
              name="contactValues.thankYouMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Thank you message
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Thank you message (optional)"
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

        <div className="flex justify-end mt-4 mr-4">
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
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
