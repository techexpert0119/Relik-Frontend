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
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { PageFeatureType } from '@/data/enums/page-features';
import { Button } from '@/components/ui/button';
import UploadImage from '../UploadImage';

export const SubscribeToNewsFormSchema = z.object({
  subscribeToNewsValues: z.object({
    image: z
      .string({
        required_error: 'Please upload a image!',
        invalid_type_error: 'Please upload a image!',
      })
      .optional(),
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(4, { message: 'Title must be at least 4 characters long!' })
      .max(40, { message: 'Title must be at most 40 characters long!' }),
    link: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .max(300, { message: 'Max length of the link is 300 of symbols' })
      .url({ message: 'Please enter a valid URL!' }),
    description: z
      .string({
        required_error: 'Please enter a valid description!',
        invalid_type_error: 'Please enter a valid description!',
      })
      .max(120, { message: 'Description must be at most 120 characters long!' })
      .optional(),
    thankYouMessage: z
      .string({
        required_error: 'Please enter a valid thank you message!',
        invalid_type_error: 'Please enter a valid thank you message!',
      })
      .max(120, {
        message: 'Thank you message must be at most 120 characters long!',
      })
      .optional(),
  }),
});

const SubscribeToNewsForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof SubscribeToNewsFormSchema>>({
    resolver: zodResolver(SubscribeToNewsFormSchema),
    defaultValues: {
      subscribeToNewsValues: {
        image: undefined,
        title: undefined,
        description: undefined,
        thankYouMessage: undefined,
      },
    },
  });

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          subscribeToNewsValues: feature.values.subscribeToNewsValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof SubscribeToNewsFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.SUBSCRIBE_TO_NEWS,
        values: {
          subscribeToNewsValues: values.subscribeToNewsValues,
        },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          subscribeToNewsValues: values.subscribeToNewsValues,
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <div>
            <p className="text-white font-black">Subscribe to news</p>
            <p className="text-white text-sm">
              Give the updates to your visitors.
            </p>
          </div>
          <FormField
            control={form.control}
            name="subscribeToNewsValues.image"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Image</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UploadImage
                      id="image"
                      showPreview
                      image={form?.watch('subscribeToNewsValues.image')}
                      setImage={(image) =>
                        form.setValue('subscribeToNewsValues.image', image, {
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
            name="subscribeToNewsValues.title"
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
            name="subscribeToNewsValues.link"
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
          <div>
            <p className="text-white font-black">Additional settings</p>
          </div>
          <FormField
            control={form.control}
            name="subscribeToNewsValues.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Description (optional)" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subscribeToNewsValues.thankYouMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Thank you message</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Thank you message" {...field} />
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

export default SubscribeToNewsForm;
