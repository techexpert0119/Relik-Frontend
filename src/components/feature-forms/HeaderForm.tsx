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
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const headerSchema = z.object({
  headerValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Title must be at least 3 characters long!' })
      .max(40, { message: 'Title must be at most 40 characters long!' }),
  }),
});

const LinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof headerSchema>>({
    resolver: zodResolver(headerSchema),
    defaultValues: { headerValues: { title: '' } },
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
        form.reset({ headerValues: feature.values.headerValues });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof headerSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.HEADER,
        values: {
          headerValues: values.headerValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        headerValues: values.headerValues,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="headerValues.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Header*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter your header" {...field} />
                  </div>
                </FormControl>
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

export default LinkForm;
