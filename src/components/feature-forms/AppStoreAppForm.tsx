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
import React, { useContext, useEffect } from 'react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { Button } from '@/components/ui/button';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { PageFeatureType } from '@/data/enums/page-features';
import { AppLinkVariant } from '@/data/enums/app-link-variant';
import appStoreSVGBright from '/features/download-from-app-store-bright.svg';
import appStoreBlackOnWhite from '/features/download-from-app-store-black-on-white.svg';
import appStore from '/features/download-from-app-store.svg';
import { Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const appStoreLinkFormSchema = z.object({
  iosAppValues: z.object({
    link: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .min(3, { message: 'Link cannot be that short!' })
      .url({ message: 'Please enter a valid URL!' }),
    variant: z.nativeEnum(AppLinkVariant),
  }),
});

const AppStoreAppForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof appStoreLinkFormSchema>>({
    resolver: zodResolver(appStoreLinkFormSchema),
    defaultValues: {
      iosAppValues: { link: '', variant: AppLinkVariant.Default },
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
          iosAppValues: feature.values.iosAppValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof appStoreLinkFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.IOS_APP,
        values: {
          iosAppValues: values.iosAppValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        iosAppValues: values.iosAppValues,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="iosAppValues.link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Link*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter your link" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="iosAppValues.variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Variant*</FormLabel>
                <div className="flex gap-4 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'iosAppValues.variant',
                        AppLinkVariant.Default,
                        { shouldDirty: true }
                      )
                    }
                    className={cn(
                      'rounded-sm',
                      field.value === AppLinkVariant.Default &&
                        'ring-white ring-1 ring-offset-4 ring-offset-black'
                    )}
                  >
                    <LazyLoadImage
                      src={appStore}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'iosAppValues.variant',
                        AppLinkVariant.DarkOnWhite,
                        { shouldDirty: true }
                      )
                    }
                    className={cn(
                      'rounded-sm',
                      field.value === AppLinkVariant.DarkOnWhite &&
                        'ring-white ring-1 ring-offset-4 ring-offset-black'
                    )}
                  >
                    <LazyLoadImage
                      src={appStoreBlackOnWhite}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'iosAppValues.variant',
                        AppLinkVariant.WhiteOnTransparent,
                        { shouldDirty: true }
                      )
                    }
                    className={cn(
                      'rounded-sm',
                      field.value === AppLinkVariant.WhiteOnTransparent &&
                        'ring-white ring-1 ring-offset-4 ring-offset-black'
                    )}
                  >
                    <LazyLoadImage
                      src={appStoreSVGBright}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
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

export default AppStoreAppForm;
