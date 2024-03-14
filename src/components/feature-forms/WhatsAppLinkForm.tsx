import * as z from 'zod';
import React, { useContext, useEffect } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
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
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ImageUploadField from '@/components/ImageUploadField';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';
import { PageFeatureType } from '@/data/enums/page-features';
import { ICountry } from '@/data/interfaces/country';
import MobileNumberWithCountry from './components/MobileNumberWithCountry';

export const WhatsAppLinkFormSchema = z.object({
  whatsAppLinkValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Title must be at least 3 characters long!' })
      .max(40, { message: 'Title must be at most 40 characters long!' }),
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
    image: z.string().optional(),
  }),
});

const WhatsAppLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof WhatsAppLinkFormSchema>>({
    resolver: zodResolver(WhatsAppLinkFormSchema),
    defaultValues: {
      whatsAppLinkValues: {
        title: undefined,
        phone: { country: undefined, number: undefined },
        image: undefined,
      },
    },
  });
  const {
    formState: { isDirty, isSubmitting },
    watch,
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
        const country = feature.values.whatsAppLinkValues?.phone
          ?.country as unknown as ICountry;

        form.reset({
          whatsAppLinkValues: {
            ...feature.values.whatsAppLinkValues,
            phone: {
              ...feature.values.whatsAppLinkValues?.phone,
              country: country?._id,
            },
          },
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof WhatsAppLinkFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.WHATSAPP,
        values: { whatsAppLinkValues: values.whatsAppLinkValues },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          whatsAppLinkValues: values.whatsAppLinkValues,
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="whatsAppLinkValues.title"
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
            countryId="whatsAppLinkValues.phone.country"
            numberId="whatsAppLinkValues.phone.number"
            isRequired
          />

          <FormField
            control={form.control}
            name="whatsAppLinkValues.image"
            render={({ field }) => (
              <>
                <FormLabel className="text-white">Image</FormLabel>
                <ImageUploadField
                  value={field.value}
                  setValue={(v) =>
                    form.setValue('whatsAppLinkValues.image', v, {
                      shouldDirty: true,
                    })
                  }
                />
              </>
            )}
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

export default WhatsAppLinkForm;
