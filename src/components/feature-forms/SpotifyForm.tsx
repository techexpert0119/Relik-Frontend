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

export const SpotifyFormSchema = z.object({
  spotifyValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    linkType: z.nativeEnum(IVideoLink, {
      required_error: 'Please enter a valid link!',
      invalid_type_error: 'Please enter a valid link!',
    }),
    embeddedOrIframeLink: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .min(1, { message: 'Please enter a valid link!' })
      .includes('https://open.spotify.com', {
        message: 'Please enter a valid link!',
      }),
    width: z.number({
      required_error: 'Please enter a valid width!',
      invalid_type_error: 'Please enter a valid width!',
    }),
    height: z.number({
      required_error: 'Please enter a valid height!',
      invalid_type_error: 'Please enter a valid height!',
    }),
  }),
});

const SpotifyForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof SpotifyFormSchema>>({
    resolver: zodResolver(SpotifyFormSchema),
    defaultValues: {
      spotifyValues: {
        title: undefined,
        linkType: IVideoLink.EMBEDDED,
        embeddedOrIframeLink: undefined,
        width: 100,
        height: 352,
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
          spotifyValues: feature.values.spotifyValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof SpotifyFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.SPOTIFY,
        values: {
          spotifyValues: values.spotifyValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        spotifyValues: values.spotifyValues,
      }).then((res) =>
        form.reset(
          {
            spotifyValues: { ...res.values.spotifyValues },
          },
          { keepValues: true }
        )
      );
    }
  };

  const type = form.watch('spotifyValues.linkType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="spotifyValues.title"
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
              name="spotifyValues.linkType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[150px]" id="buttonRadius">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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

          {type === IVideoLink.EMBEDDED && (
            <>
              <p className="text-white font-black">Spotify Link</p>
              <FormField
                control={form.control}
                name="spotifyValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Insert Spotify Link*
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Spotify Link" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spotifyValues.width"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center	">
                    <FormLabel className="text-white">Width (%)*</FormLabel>
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

              <div className="flex items-center gap-1">
                <FormLabel className="text-white">Height (px)*</FormLabel>
                <FormField
                  control={form.control}
                  name="spotifyValues.height"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={String(field.value)}
                        >
                          <SelectTrigger id="buttonRadius">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'352'}>
                              <p>Normal (352px)</p>
                            </SelectItem>
                            <SelectItem value={'152'}>
                              <p>Compact (152px)</p>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {type === IVideoLink.IFRAME && (
            <>
              <p className="text-white font-black">Spotify iFrame*</p>
              <FormField
                control={form.control}
                name="spotifyValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Insert your embedded Spotify iFrame.
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Spotify iFrame" {...field} />
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

export default SpotifyForm;
