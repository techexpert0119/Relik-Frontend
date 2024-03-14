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
import { FC, useContext, useEffect } from 'react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { Button } from '@/components/ui/button';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { PageFeatureType } from '@/data/enums/page-features';
import UploadImage from '../UploadImage';
import { Switch } from '../ui/switch';
import DynamicShortCode from './components/DynamicShortCode';
import { ICountry } from '@/data/interfaces/country';
import ColorPopover from '@/app/pages/components/ColorPopover';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

const SmsShortCodeFormSchema = z.object({
  smsShortCodeValues: z.object({
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
    isHideInternationalPhoneNumber: z.boolean({
      required_error:
        'Please specify if international phone numbers should be hidden!',
      invalid_type_error: 'Please enter a valid boolean value!',
    }),
    phoneNumber: z
      .string({
        required_error: 'Please enter a valid phone number!',
        invalid_type_error: 'Please enter a valid phone number!',
      })
      .optional(),
    shortCodes: z.array(
      z.object({
        country: z
          .string({
            required_error: 'Please enter a valid country!',
            invalid_type_error: 'Please enter a valid country!',
          })
          .min(1, { message: 'Please enter a valid country!' }),
        operators: z.array(
          z.object({
            name: z
              .string({
                required_error: 'Please enter a valid operator name!',
                invalid_type_error: 'Please enter a valid operator name!',
              })
              .min(1, { message: 'Please enter a valid operator name!' }),
            price: z.number({
              required_error: 'Please enter a valid price!',
              invalid_type_error: 'Please enter a valid price!',
            }),
            shortCode: z.number({
              required_error: 'Please enter a valid short code!',
              invalid_type_error: 'Please enter a valid short code!',
            }),
          })
        ),
      })
    ),
    backgroundColor: z
      .string({
        required_error: 'Please enter a valid background color!',
        invalid_type_error: 'Please enter a valid background color!',
      })
      .optional(),
    fontColor: z
      .string({
        required_error: 'Please enter a valid font color!',
        invalid_type_error: 'Please enter a valid font color!',
      })
      .optional(),
  }),
});

const SmsShortCodeForm: FC = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};

  const form = useForm<z.infer<typeof SmsShortCodeFormSchema>>({
    resolver: zodResolver(SmsShortCodeFormSchema),
    defaultValues: {
      smsShortCodeValues: {
        photo: undefined,
        title: undefined,
        isHideInternationalPhoneNumber: true,
        phoneNumber: undefined,
        shortCodes: [],
        backgroundColor: '#fff',
        fontColor: '#000',
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
          smsShortCodeValues: {
            ...feature?.values?.smsShortCodeValues,
            shortCodes: feature?.values?.smsShortCodeValues?.shortCodes?.map(
              (shortCode) => {
                const country = shortCode?.country as unknown as ICountry;
                return { ...shortCode, country: country?._id };
              }
            ),
          },
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof SmsShortCodeFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.SMS_SHORT_CODE,
        values: {
          smsShortCodeValues: values.smsShortCodeValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        smsShortCodeValues: values.smsShortCodeValues,
      }).then((res) =>
        form.reset(
          {
            smsShortCodeValues: { ...res.values.smsShortCodeValues },
          },
          { keepValues: true }
        )
      );
    }
  };

  const isHideInternationalPhoneNumber = form.watch(
    'smsShortCodeValues.isHideInternationalPhoneNumber'
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <div>
            <p className="text-white font-black">Phone number</p>
            <p className="text-white text-sm">
              Triggers sms by user's phone app.
            </p>
          </div>
          <FormField
            control={form.control}
            name="smsShortCodeValues.photo"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Photo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UploadImage
                      id="photo"
                      showPreview
                      image={form?.watch('smsShortCodeValues.photo')}
                      setImage={(image) =>
                        form.setValue('smsShortCodeValues.photo', image, {
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
            name="smsShortCodeValues.title"
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
            <p className="text-white font-black">Short Codes</p>
            <p className="text-white text-sm">
              Create the Country/Short-Code items to send SMS for specific
              countries.
            </p>
          </div>

          <DynamicShortCode form={form} id="smsShortCodeValues.shortCodes" />

          <div>
            <p className="text-white font-black">International Number</p>
            <p className="text-white text-sm">
              In case the user is out of the list above, you can specify to show
              international phone number to send sms to.
            </p>
          </div>
          <FormField
            control={form.control}
            name="smsShortCodeValues.isHideInternationalPhoneNumber"
            render={({ field }) => (
              <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                <FormControl>
                  <div className="relative">
                    <Switch
                      name={'smsShortCodeValues.isHideInternationalPhoneNumber'}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormLabel className="text-white">
                  Hide International Phone Number
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isHideInternationalPhoneNumber && (
            <FormField
              control={form.control}
              name="smsShortCodeValues.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Phone number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="smsShortCodeValues.backgroundColor"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-white" htmlFor="fontColorPicker">
                    Background color
                  </FormLabel>
                  <FormControl>
                    <ColorPopover
                      id="smsShortCodeValues.backgroundColor"
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue(
                          'smsShortCodeValues.backgroundColor',
                          value,
                          {
                            shouldDirty: true,
                          }
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smsShortCodeValues.fontColor"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-white" htmlFor="fontColorPicker">
                    Font color
                  </FormLabel>
                  <FormControl>
                    <ColorPopover
                      id="smsShortCodeValues.fontColor"
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue('smsShortCodeValues.fontColor', value, {
                          shouldDirty: true,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!options?.featureId ? (
            <div className="flex">
              <Button
                variant="outline"
                size="sm"
                className="mt-4 ml-auto w-fit"
              >
                {options?.featureId ? 'Save' : 'Add'}
              </Button>
            </div>
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

export default SmsShortCodeForm;
