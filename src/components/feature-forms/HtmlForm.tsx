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
import { Textarea } from '../ui/textarea';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const HtmlFormSchema = z.object({
  htmlValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    html: z
      .string({
        required_error: 'Please enter a valid HTML code!',
        invalid_type_error: 'Please enter a valid HTML code!',
      })
      .min(1, { message: 'Please enter a valid HTML code!' }),
  }),
});

const HtmlForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof HtmlFormSchema>>({
    resolver: zodResolver(HtmlFormSchema),
    defaultValues: {
      htmlValues: { title: undefined, html: undefined },
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
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          htmlValues: feature.values.htmlValues,
        });

        const sub = watch(() => debounced());
        return () => sub.unsubscribe();
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof HtmlFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.HTML,
        values: {
          htmlValues: values.htmlValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        htmlValues: values.htmlValues,
      }).then((res) =>
        form.reset(
          {
            htmlValues: {
              ...res.values.htmlValues,
            },
          },
          { keepValues: true }
        )
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <div>
            <p className="text-white font-black">HTML Block</p>
            <p className="text-white text-sm">Insert your HTML code.</p>
          </div>

          <FormField
            control={form.control}
            name="htmlValues.title"
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
            name="htmlValues.html"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Html Block*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea placeholder="Html Block" rows={1} {...field} />
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

export default HtmlForm;
