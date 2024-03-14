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
import MobileNumberWithCountry from './components/MobileNumberWithCountry';
import { ICountry } from '@/data/interfaces/country';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const CallLinkFormSchema = z.object({
  callLinkValues: z.object({
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
    phone: z.object({
      country: z
        .string({
          required_error: 'Required!',
          invalid_type_error: 'Required!',
        })
        .min(1, { message: 'Required!' }),
      number: z.number({
        required_error: 'Please enter a valid phone number!',
        invalid_type_error: 'Please enter a valid phone number!',
      }),
    }),
  }),
});

const CallLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof CallLinkFormSchema>>({
    resolver: zodResolver(CallLinkFormSchema),
    defaultValues: {
      callLinkValues: {
        photo: undefined,
        title: '',
        phone: { country: undefined, number: undefined },
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
        const country = feature.values.callLinkValues?.phone
          ?.country as unknown as ICountry;
        form.reset({
          callLinkValues: {
            ...feature.values.callLinkValues,
            phone: {
              ...feature.values.callLinkValues?.phone,
              country: country?._id,
            },
          },
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof CallLinkFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.CALL_LINK,
        values: {
          callLinkValues: values.callLinkValues,
        },
      });
    } else {
      return (
        updateFeature &&
        updateFeature(options?.featureId, {
          callLinkValues: values.callLinkValues,
        }).then((res) => {
          form.reset(
            { callLinkValues: { ...res.values.callLinkValues } },
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
          <div>
            <p className="text-white font-black">Phone number</p>
            <p className="text-white text-sm">
              Triggers call by user's phone app.
            </p>
          </div>

          <FormField
            control={form.control}
            name="callLinkValues.photo"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Photo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UploadImage
                      id="photo"
                      showPreview
                      image={form?.watch('callLinkValues.photo')}
                      setImage={(image) =>
                        form.setValue('callLinkValues.photo', image, {
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
            name="callLinkValues.title"
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

          <MobileNumberWithCountry
            textColorClassName="text-white"
            form={form}
            countryId="callLinkValues.phone.country"
            numberId="callLinkValues.phone.number"
            isRequired
          />

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

export default CallLinkForm;
