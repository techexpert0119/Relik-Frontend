import * as z from 'zod';
import React, { useContext, useEffect } from 'react';
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
import ImageUploadField from '@/components/ImageUploadField';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const schema = z.object({
  link: z
    .string({
      required_error: 'Please enter a valid link!',
      invalid_type_error: 'Please enter a valid link!',
    })
    .url({ message: 'Please enter a valid URL!' }),
  title: z
    .string({
      required_error: 'Please enter a valid title!',
      invalid_type_error: 'Please enter a valid title!',
    })
    .min(3, { message: 'Title must be at least 3 characters long!' })
    .max(40, { message: 'Title must be at most 40 characters long!' }),
  image: z.string().optional(),
});

const XLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { link: '', title: '', image: undefined },
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
        form.reset(feature.values.xLinkValues);
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.X,
        values: { xLinkValues: values },
      });
    } else {
      return updateFeature?.(options?.featureId, { xLinkValues: values }).then(
        (res) => form.reset(res.values.xLinkValues, { keepValues: true })
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="title"
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
            name="link"
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
            name="image"
            render={({ field }) => (
              <>
                <FormLabel className="text-white">Image</FormLabel>
                <ImageUploadField
                  value={field.value}
                  setValue={(v) =>
                    form.setValue('image', v, { shouldDirty: true })
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

export default XLinkForm;
