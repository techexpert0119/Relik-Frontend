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
import { Textarea } from '../ui/textarea';
import { Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

export const VideoFormSchema = z.object({
  videoValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    videoIframe: z.string({
      required_error: 'Please enter a valid video iframe code!',
      invalid_type_error: 'Please enter a valid video iframe code!',
    }),
  }),
});

const VideoForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: {
      videoValues: { title: undefined, videoIframe: undefined },
    },
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
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature) {
        form.reset({
          videoValues: feature.values.videoValues,
        });

        const sub = watch(() => debounced());
        return () => sub.unsubscribe();
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof VideoFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.VIDEO,
        values: {
          videoValues: values.videoValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        videoValues: values.videoValues,
      }).then((res) =>
        form.reset(
          { videoValues: { ...res.values.videoValues } },
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
            <p className="text-white font-black">Video iFrame</p>
            <p className="text-white text-sm">Insert your video iFrame.</p>
          </div>

          <FormField
            control={form.control}
            name="videoValues.title"
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
            name="videoValues.videoIframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Video*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea placeholder="Video iFrame" rows={1} {...field} />
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

export default VideoForm;
