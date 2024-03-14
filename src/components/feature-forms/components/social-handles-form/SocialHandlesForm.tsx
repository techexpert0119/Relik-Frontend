import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { socialHandlesFormSchema } from '@/components/feature-forms/components/social-handles-form/consts/social-handles-form-schema';
import { defaultFormValues } from '@/components/feature-forms/components/social-handles-form/consts/default-form-values';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { InputForSocialHandle } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FacebookLogo from '@/components/icons/facebook-logo';
import { useContext, useEffect } from 'react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import WhatsAppLogo from '@/components/icons/whats-app-logo';
import XLogo from '@/components/icons/x-logo';
import LinkedInLogo from '@/components/icons/linkedin-logo';
import { InstagramIcon, Loader, Trash2, YoutubeIcon } from 'lucide-react';
import TikTokLogo from '@/components/icons/tiktok-logo';
import TelegramLogo from '@/components/icons/telegram-logo';
import TwitchLogo from '@/components/icons/twitch-logo';
import SnapchatLogo from '@/components/icons/snapchat-logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import RedditLogo from '@/components/icons/reddit-logo';
import ThreadsLogo from '@/components/icons/threads-logo';
import { PageFeatureType } from '@/data/enums/page-features';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { useDebouncedCallback } from 'use-debounce';
import { ICountry } from '@/data/interfaces/country';
import MobileNumberWithCountry from '../MobileNumberWithCountry';

const SocialHandlesForm = () => {
  const form = useForm<z.infer<typeof socialHandlesFormSchema>>({
    resolver: zodResolver(socialHandlesFormSchema),
    defaultValues: defaultFormValues,
  });
  const {
    formState: { isDirty, isSubmitting },
    watch,
    setValue,
  } = form;
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const debounced = useDebouncedCallback(() => {
    if (isDirty) {
      form.handleSubmit(onSubmit)();
    }
  }, 1000);

  useEffect(() => {
    if (options?.featureId) {
      const feature = features?.find((f) => f._id === options.featureId);
      if (feature && feature.values.socialHandlesValues) {
        const whatsapp_country = feature.values.socialHandlesValues.whatsAppLink
          ?.country as unknown as ICountry;

        const telegram_country = feature.values.socialHandlesValues.telegramLink
          ?.country as unknown as ICountry;

        const { whatsAppLink, ...valuesWithoutWhatsApp } =
          feature.values.socialHandlesValues;

        const v1 = whatsapp_country
          ? {
              ...feature.values.socialHandlesValues,
              whatsAppLink: {
                ...whatsAppLink,
                country: whatsapp_country?._id,
              },
            }
          : valuesWithoutWhatsApp;

        const { telegramLink, ...valuesWithoutTelegram } = v1;
        const newValues = telegram_country
          ? {
              ...v1,
              telegramLink: {
                ...telegramLink,
                country: telegram_country?._id,
              },
            }
          : valuesWithoutTelegram;

        const previousValues = form.getValues();
        form.reset({ ...previousValues, ...newValues });

        const sub = watch(() => debounced());
        return () => sub.unsubscribe();
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (v: z.infer<typeof socialHandlesFormSchema>) => {
    const { whatsAppLink, ...r1 } = v;
    const v1 = whatsAppLink?.number ? v : r1;
    const { telegramLink, ...r2 } = v1;
    const values = telegramLink?.number ? v1 : r2;

    if (!options?.featureId) {
      return createFeature?.({
        type: PageFeatureType.SOCIAL_HANDLES,
        values: {
          socialHandlesValues: {
            ...values,
          },
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        socialHandlesValues: { ...values },
      }).then((res) =>
        form.reset({ ...res.values.socialHandlesValues }, { keepValues: true })
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <ScrollArea className="h-[50vh] pr-4">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FacebookLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="https://facebook.com/profile.php?id="
                        onChange={(event) => {
                          form.clearErrors('facebookLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('facebookLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <InstagramIcon
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'@'}
                        onChange={(event) => {
                          form.clearErrors('instagramLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('instagramLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="xLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center h-8 w-8 mt-1">
                      <XLogo height={20} width={20} color="white" />
                    </div>
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'@'}
                        onChange={(event) => {
                          form.clearErrors('xLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('xLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 items-center">
              <WhatsAppLogo
                height={32}
                width={32}
                color="white"
                className="mt-1"
              />
              <MobileNumberWithCountry
                form={form}
                textColorClassName="text-white"
                countryId="whatsAppLink.country"
                numberId="whatsAppLink.number"
                isLabelShouldAppear={false}
                isRequired={false}
              />
              <button
                type="button"
                onClick={() => setValue('whatsAppLink.number', undefined)}
                disabled={watch('whatsAppLink.number') === undefined}
                className="text-white h-6 w-6 disabled:text-[#2F435F]"
              >
                <Trash2 />
              </button>
            </div>

            <FormField
              control={form.control}
              name="snapchatLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <SnapchatLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'/add/'}
                        onChange={(event) => {
                          form.clearErrors('snapchatLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('snapchatLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <YoutubeIcon
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'@'}
                        onChange={(event) => {
                          form.clearErrors('youtubeLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('youtubeLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktokLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <TikTokLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'@'}
                        onChange={(event) => {
                          form.clearErrors('tiktokLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('tiktokLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitchLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center h-8 w-8 mt-1">
                      <TwitchLogo
                        height={24}
                        width={24}
                        color="white"
                        className="mt-1"
                      />
                    </div>
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'/'}
                        onChange={(event) => {
                          form.clearErrors('twitchLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('twitchLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="redditLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <RedditLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'/u/'}
                        onChange={(event) => {
                          form.clearErrors('redditLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('redditLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 items-center">
              <TelegramLogo
                height={32}
                width={32}
                color="white"
                className="mt-1"
              />
              <MobileNumberWithCountry
                form={form}
                textColorClassName="text-white"
                countryId="telegramLink.country"
                numberId="telegramLink.number"
                isLabelShouldAppear={false}
                isRequired={false}
              />
              <button
                type="button"
                onClick={() => setValue('telegramLink.number', undefined)}
                disabled={watch('telegramLink.number') === undefined}
                className="text-white h-6 w-6 disabled:text-[#2F435F]"
              >
                <Trash2 />
              </button>
            </div>

            <FormField
              control={form.control}
              name="threadsLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <ThreadsLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'@'}
                        onChange={(event) => {
                          form.clearErrors('threadsLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('threadsLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedInLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <LinkedInLogo
                      height={32}
                      width={32}
                      color="white"
                      className="mt-1"
                    />
                    <FormControl>
                      <InputForSocialHandle
                        {...field}
                        placeholder="username"
                        fixedValue={'/in/'}
                        onChange={(event) => {
                          form.clearErrors('linkedInLink');
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setValue('linkedInLink', '', { shouldDirty: true })
                      }
                      disabled={field.value.length === 0}
                      className="text-white h-6 w-6 disabled:text-[#2F435F]"
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <FormMessage className="pl-8" />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        {!options?.featureId ? (
          <div className="flex pr-4">
            <Button variant="outline" size="sm" className="mt-4 ml-auto w-fit">
              {options?.featureId ? 'Save' : 'Add'}
            </Button>
          </div>
        ) : (
          <div className="min-h-[32px] pr-5 pt-1.5 flex justify-end">
            {isSubmitting && (
              <Loader className="animate-spin h-4 w-4 text-white" />
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default SocialHandlesForm;
