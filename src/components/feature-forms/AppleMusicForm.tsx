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
import { IVideoLink } from '@/data/dtos/feature';
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from 'lucide-react';

export const AppleMusicFormSchema = z.object({
  appleMusicValues: z.object({
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
      .includes('https://music.apple.com', {
        message: 'Please enter a valid link!',
      }),
  }),
});

const AppleMusicForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof AppleMusicFormSchema>>({
    resolver: zodResolver(AppleMusicFormSchema),
    defaultValues: {
      appleMusicValues: {
        title: undefined,
        linkType: IVideoLink.EMBEDDED,
        embeddedOrIframeLink: undefined,
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
          appleMusicValues: feature.values.appleMusicValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof AppleMusicFormSchema>) => {
    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.APPLE_MUSIC,
        values: {
          appleMusicValues: values.appleMusicValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        appleMusicValues: values.appleMusicValues,
      }).then((res) => {
        form.reset(
          { appleMusicValues: { ...res.values.appleMusicValues } },
          { keepValues: true }
        );
      });
    }
  };

  const appleMusicType = form.watch('appleMusicValues.linkType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="appleMusicValues.title"
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
              name="appleMusicValues.linkType"
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

          {appleMusicType === IVideoLink.EMBEDDED ? (
            <div>
              <div className="mb-3">
                <p className="text-white font-black">AppleMusic Link</p>
                <p className="text-white text-sm">Insert AppleMusic Link*</p>
              </div>

              <FormField
                control={form.control}
                name="appleMusicValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="AppleMusic link" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <p className="text-white font-black">Apple Music iFrame</p>
                <p className="text-white text-sm">
                  Insert your embedded Apple Music iFrame*
                </p>
              </div>

              <FormField
                control={form.control}
                name="appleMusicValues.embeddedOrIframeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="AppleMusic link" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default AppleMusicForm;
