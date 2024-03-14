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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { IVideoLink } from '@/data/dtos/feature';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const YoutubeFormSchema = z.object({
  youtubeValues: z.object({
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
    linkType: z.nativeEnum(IVideoLink, {
      required_error: 'Please enter a valid type!',
      invalid_type_error: 'Please enter a valid type!',
    }),
    embeddedOrIframeLink: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .min(1, { message: 'Please enter a valid link!' })
      .refine(
        (url) => {
          return (
            url.includes('https://youtu.be') ||
            url.includes('https://www.youtube.com')
          );
        },
        { message: 'Please enter a valid link!' }
      ),
    width: z.number({
      required_error: 'Please enter a valid width!',
      invalid_type_error: 'Please enter a valid width!',
    }),
    height: z.number({
      required_error: 'Please enter a valid height!',
      invalid_type_error: 'Please enter a valid height!',
    }),
    isAutoplay: z.boolean({
      required_error: 'Please enter a valid value!',
      invalid_type_error: 'Please enter a valid value!',
    }),
    isShowPlayerControls: z.boolean({
      required_error: 'Please enter a valid value!',
      invalid_type_error: 'Please enter a valid value!',
    }),
    isAllowFullscreen: z.boolean({
      required_error: 'Please enter a valid value!',
      invalid_type_error: 'Please enter a valid value!',
    }),
  }),
});

const YoutubeForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof YoutubeFormSchema>>({
    resolver: zodResolver(YoutubeFormSchema),
    defaultValues: {
      youtubeValues: {
        photo: undefined,
        title: undefined,
        linkType: IVideoLink.LINK,
        embeddedOrIframeLink: undefined,
        width: 560,
        height: 315,
        isAutoplay: false,
        isShowPlayerControls: true,
        isAllowFullscreen: true,
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
          youtubeValues: feature.values.youtubeValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof YoutubeFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.YOUTUBE,
        values: {
          youtubeValues: values.youtubeValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        youtubeValues: values.youtubeValues,
      }).then((res) => {
        form.reset(
          { youtubeValues: { ...res.values.youtubeValues } },
          { keepValues: true }
        );
      });
    }
  };

  const type = form.watch('youtubeValues.linkType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="youtubeValues.photo"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Photo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UploadImage
                      id="photo"
                      showPreview
                      image={form?.watch('youtubeValues.photo')}
                      setImage={(image) =>
                        form.setValue('youtubeValues.photo', image, {
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
            name="youtubeValues.title"
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

          <div className="flex items-center gap-1">
            <FormLabel className="text-white">Type*</FormLabel>
            <FormField
              control={form.control}
              name="youtubeValues.linkType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[150px]" id="buttonRadius">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={IVideoLink.LINK}>
                          <div>
                            <p>Link</p>
                          </div>
                        </SelectItem>
                        <SelectItem value={IVideoLink.EMBEDDED}>
                          <div>
                            <p>Embedded link</p>
                          </div>
                        </SelectItem>
                        <SelectItem value={IVideoLink.IFRAME}>
                          <div>
                            <p>iFrame</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {type === IVideoLink.LINK && (
            <>
              <p className="text-white font-black">YouTube link</p>
              <FormField
                control={form.control}
                name="youtubeValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Simple link*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Link" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {type === IVideoLink.EMBEDDED && (
            <>
              <p className="text-white font-black">Embedded YouTube Link</p>
              <FormField
                control={form.control}
                name="youtubeValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Insert YouTube Link*
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="YouTube iFrame" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtubeValues.width"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center	">
                    <FormLabel className="text-white">Width*</FormLabel>
                    <FormControl className="flex-grow">
                      <div className="relative">
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                name="youtubeValues.height"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center	">
                    <FormLabel className="text-white">Height*</FormLabel>
                    <FormControl className="flex-grow">
                      <div className="relative">
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                name="youtubeValues.isAutoplay"
                render={({ field }) => (
                  <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                    <FormControl>
                      <div className="relative">
                        <Switch
                          name={'youtubeValues.isAutoplay'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormLabel className="text-white">Autoplay</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtubeValues.isShowPlayerControls"
                render={({ field }) => (
                  <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                    <FormControl>
                      <div className="relative">
                        <Switch
                          name={'youtubeValues.isShowPlayerControls'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormLabel className="text-white">
                      Show player controls
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtubeValues.isAllowFullscreen"
                render={({ field }) => (
                  <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                    <FormControl>
                      <div className="relative">
                        <Switch
                          name={'youtubeValues.isAllowFullscreen'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormLabel className="text-white">
                      Allow full screen
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {type === IVideoLink.IFRAME && (
            <>
              <p className="text-white font-black">YouTube iFrame</p>
              <FormField
                control={form.control}
                name="youtubeValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Insert your embedded YouTube iFrame*
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="YouTube iFrame" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

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

export default YoutubeForm;
