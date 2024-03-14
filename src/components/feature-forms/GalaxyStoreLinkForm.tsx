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
import { AppLinkVariant } from '@/data/enums/app-link-variant';
import defaultSVG from '/features/avaliable-on-galaxy-store.svg';
import blackOnWhiteSVG from '/features/avaliable-on-galaxy-store-black-on-white.svg';
import lightSVG from '/features/avaliable-on-galaxy-store-light.svg';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const formSchema = z.object({
  link: z
    .string({
      required_error: 'Please enter a valid link!',
      invalid_type_error: 'Please enter a valid link!',
    })
    .min(3, { message: 'Link cannot be that short!' })
    .url({ message: 'Please enter a valid URL!' }),
  variant: z.nativeEnum(AppLinkVariant),
});

const GalaxyStoreLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { link: '', variant: AppLinkVariant.Default },
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
          link: feature.values.galaxyStoreLinkValues?.link,
          variant: feature.values.galaxyStoreLinkValues?.variant,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.GALAXY_APP,
        values: {
          galaxyStoreLinkValues: { link: values.link, variant: values.variant },
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        galaxyStoreLinkValues: { link: values.link, variant: values.variant },
      }).then((res) => {
        form.reset({
          link: res.values.galaxyStoreLinkValues?.link,
          variant: res.values.galaxyStoreLinkValues?.variant,
        });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Link*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your link"
                      autoComplete="email"
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
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Variant*</FormLabel>
                <div className="flex gap-4 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue('variant', AppLinkVariant.Default, {
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      'rounded-sm',
                      field.value === AppLinkVariant.Default &&
                        'ring-white ring-1 ring-offset-4 ring-offset-black'
                    )}
                  >
                    <LazyLoadImage
                      src={defaultSVG}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue('variant', AppLinkVariant.DarkOnWhite, {
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      'rounded-sm',
                      field.value === AppLinkVariant.DarkOnWhite &&
                        'ring-white ring-1 ring-offset-4 ring-offset-black'
                    )}
                  >
                    <LazyLoadImage
                      src={blackOnWhiteSVG}
                      alt="def"
                      className="h-8 sm:h-10"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      form.setValue(
                        'variant',
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
                      src={lightSVG}
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

export default GalaxyStoreLinkForm;
