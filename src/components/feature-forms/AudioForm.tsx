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
import UploadImage from '../UploadImage';
import { Switch } from '../ui/switch';
import UploadFile from '../UploadFile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const AudioFormSchema = z.object({
  audioValues: z.object({
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
    audioTitle: z
      .string({
        required_error: 'Please enter a valid audio title!',
        invalid_type_error: 'Please enter a valid audio title!',
      })
      .max(300, { message: 'Max 300 are characters allowed!' }),
    audioAuthor: z
      .string({
        required_error: 'Please enter a valid audio author!',
        invalid_type_error: 'Please enter a valid audio author!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(300, { message: 'Max 300 are characters allowed!' }),
    file: z
      .string({
        required_error: 'Please enter a valid audio file!',
        invalid_type_error: 'Please enter a valid audio file!',
      })
      .min(1, { message: 'Please enter a valid audio file!' }),
    isImageAsBackground: z.boolean({
      required_error: 'Please enter a valid value!',
      invalid_type_error: 'Please enter a valid value!',
    }),
  }),
});

const AudioForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof AudioFormSchema>>({
    resolver: zodResolver(AudioFormSchema),
    defaultValues: {
      audioValues: {
        photo: undefined,
        title: undefined,
        audioAuthor: undefined,
        audioTitle: undefined,
        file: undefined,
        isImageAsBackground: true,
      },
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
          audioValues: feature.values.audioValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof AudioFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.AUDIO,
        values: {
          audioValues: values.audioValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        audioValues: values.audioValues,
      }).then((res) =>
        form.reset(
          {
            audioValues: {
              ...res.values.audioValues,
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
        <ScrollArea className="h-[45vh] pr-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="audioValues.photo"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Photo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UploadImage
                        id="photo"
                        showPreview
                        image={form?.watch('audioValues.photo')}
                        setImage={(image) =>
                          form.setValue('audioValues.photo', image, {
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
              name="audioValues.title"
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
              name="audioValues.audioTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Audio title*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Enter audio title" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audioValues.audioAuthor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Audio author*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Enter audio author" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audioValues.file"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">File*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UploadFile
                        id="file"
                        accept={{ 'audio/*': ['.mp3'] }}
                        showPreview
                        file={form?.watch('audioValues.file')}
                        onDropAccepted={(imgUrl) => {
                          if (imgUrl) {
                            form.setValue('audioValues.file', imgUrl);
                            form.clearErrors('audioValues.file');
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audioValues.isImageAsBackground"
              render={({ field }) => (
                <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                  <FormControl>
                    <div className="relative">
                      <Switch
                        name={'audioValues.isImageAsBackground'}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormLabel className="text-white">
                    Image As Background
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        {!options?.featureId ? (
          <div className="flex">
            <Button variant="outline" size="sm" className="mt-4 ml-auto w-fit">
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
      </form>
    </Form>
  );
};

export default AudioForm;
