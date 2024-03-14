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
import getItFromGoogleStore from '/features/get-it-on-google-store.svg';
import getItFromGoogleStoreLight from '/features/get-it-on-google-store-light.svg';
import getItFromGoogleStoreBlackOnWhite from '/features/get-it-on-google-store-black-on-white.svg';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const appStoreLinkFormSchema = z.object({
  googleStoreLinkValues: z.object({
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

const GoogleStoreLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof appStoreLinkFormSchema>>({
    resolver: zodResolver(appStoreLinkFormSchema),
    defaultValues: {
      googleStoreLinkValues: {
        link: '',
        variant: AppLinkVariant.Default,
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
          googleStoreLinkValues: feature.values.googleStoreLinkValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof appStoreLinkFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.ANDROID_APP,
        values: {
          googleStoreLinkValues: values.googleStoreLinkValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        googleStoreLinkValues: values.googleStoreLinkValues,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="googleStoreLinkValues.link"
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
            name="googleStoreLinkValues.variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Variant*</FormLabel>
                <div className="flex gap-4 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'googleStoreLinkValues.variant',
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
                      src={getItFromGoogleStore}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'googleStoreLinkValues.variant',
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
                      src={getItFromGoogleStoreBlackOnWhite}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'googleStoreLinkValues.variant',
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
                      src={getItFromGoogleStoreLight}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                </div>
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

export default GoogleStoreLinkForm;
