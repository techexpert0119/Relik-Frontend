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

export const formSchema = z.object({
  facebookLinkValues: z.object({
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
      .min(1, { message: 'Title must be at least 1 character long!' })
      .max(200, { message: 'Title must be at most 200 characters long!' }),
  }),
});

const LinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebookLinkValues: { link: undefined, title: undefined },
    },
  });

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          facebookLinkValues: feature.values.facebookLinkValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.FACEBOOK,
        values: {
          facebookLinkValues: values.facebookLinkValues,
        },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          facebookLinkValues: values.facebookLinkValues,
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="facebookLinkValues.title"
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
            name="facebookLinkValues.link"
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

          <Button variant="outline" size="sm" className="ml-auto w-fit">
            {options?.featureId ? 'Save' : 'Add'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default LinkForm;
