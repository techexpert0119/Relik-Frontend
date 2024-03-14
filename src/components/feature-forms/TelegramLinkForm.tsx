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

export const schema = z.object({
  link: z.string().min(4).url(),
  title: z
    .string()
    .min(4, { message: 'URL cannot be that short' })
    .max(200, { message: 'URL is too long' }),
});

const TelegramLinkForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { link: '', title: '' },
  });

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          link: feature.values.telegramValues?.link,
          title: feature.values.telegramValues?.title,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.JOIN_TELEGRAM_CHANNEL,
        values: {
          telegramValues: {
            link: values.link,
            title: values.title,
          },
        },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          telegramValues: {
            link: values.link,
            title: values.title,
          },
        });
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
                    <Input
                      placeholder="Enter your title"
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

          <Button variant="outline" size="sm" className="ml-auto w-fit">
            {options?.featureId ? 'Save' : 'Add'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default TelegramLinkForm;
