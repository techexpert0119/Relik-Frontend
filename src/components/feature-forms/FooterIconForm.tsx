import * as z from 'zod';
import { useContext, useEffect } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageFeatureType } from '@/data/enums/page-features';
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
import UploadImage from '../UploadImage';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const footerIconFormSchema = z.object({
  footerValues: z.object({
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
    link: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .url(),
  }),
});

const FooterIconForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof footerIconFormSchema>>({
    resolver: zodResolver(footerIconFormSchema),
    defaultValues: {
      footerValues: { photo: undefined, title: undefined, link: undefined },
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
          footerValues: feature.values.footerValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof footerIconFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.FOOTER_ICON,
        values: {
          footerValues: values.footerValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        footerValues: values.footerValues,
      }).then((res) =>
        form.reset(
          {
            footerValues: { ...res.values.footerValues },
          },
          { keepValues: true }
        )
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="footerValues.photo"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Photo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UploadImage
                      id="photo"
                      showPreview
                      image={form?.watch('footerValues.photo')}
                      setImage={(image) =>
                        form.setValue('footerValues.photo', image, {
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
            name="footerValues.title"
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

          <FormField
            control={form.control}
            name="footerValues.link"
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

export default FooterIconForm;
