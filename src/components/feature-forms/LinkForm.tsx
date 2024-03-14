import * as z from 'zod';
import { FC, useContext, useEffect } from 'react';
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

export const linkFormSchema = z.object({
  linkValues: z.object({
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
      .max(200, { message: 'Title must be at most 200 characters long!' }),
    image: z.string().optional(),
  }),
});

const LinkForm: FC = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof linkFormSchema>>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: { linkValues: { link: '', title: '', image: undefined } },
  });
  const { isValid, isDirty } = form.formState;

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          linkValues: feature.values.linkValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof linkFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.LINK,
        values: {
          linkValues: values.linkValues,
        },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          linkValues: values.linkValues,
        }).then((res) =>
          form.reset({ linkValues: { ...res.values.linkValues } })
        );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="linkValues.title"
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
            name="linkValues.link"
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
            name="linkValues.image"
            render={({ field }) => (
              <>
                <FormLabel className="text-white">Image</FormLabel>
                <ImageUploadField
                  value={field.value}
                  setValue={(v) =>
                    form.setValue('linkValues.image', v, { shouldDirty: true })
                  }
                />
              </>
            )}
          />

          <Button
            variant="outline"
            size="sm"
            className="ml-auto w-fit"
            disabled={!isDirty || !isValid}
          >
            {options?.featureId ? 'Save' : 'Add'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default LinkForm;
