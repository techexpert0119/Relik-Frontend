import React, { useContext, useEffect, useRef } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { Button } from '@/components/ui/button';
import { EyeOff, Loader, X } from 'lucide-react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColorPopover from '@/app/pages/components/ColorPopover';
import { PageService } from '@/services/api/page-service';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { IPageTheme } from '@/data/interfaces/page-theme';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeFontFamily } from './enums/theme-font-family.enum';
import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { themeSettingsSchema } from '@/app/pages/edit-page/components/theme-settings/consts/theme-settings.zod-schema';
import { defaultTheme } from './consts/default-theme';
import { useDebouncedCallback } from 'use-debounce';

const ThemeSettings = () => {
  const { setMenuType } = useContext(MenuContext) ?? {};
  const { page, setPage } = useContext(PageContext) ?? {};
  const theme = page?.theme;
  const form = useForm<z.infer<typeof themeSettingsSchema>>({
    resolver: zodResolver(themeSettingsSchema),
    defaultValues: page?.theme ? page.theme : defaultTheme,
  });
  const { isSubmitting } = form.formState;
  const originalTheme = useRef<IPageTheme | undefined>(page?.theme);
  const { reset } = form;
  const debounced = useDebouncedCallback(() => {
    if (form.formState.isDirty) {
      form.handleSubmit(onSubmit)();
    }
  }, 1000);

  useEffect(() => {
    const subscription = form.watch(() => debounced());
    return () => subscription.unsubscribe();
  }, []);

  const close = () => {
    if (form.formState.isDirty) resetForm();
    setMenuType && setMenuType(null);
  };

  const resetForm = () => {
    reset({ ...originalTheme.current });
  };

  const onSubmit = (values: z.infer<typeof themeSettingsSchema>) => {
    if (page)
      return PageService.updateTheme(page._id, values)
        .then((response) => {
          setPage && setPage(response);
          form.reset({ ...form.getValues() });
        })
        .catch((e: AxiosError<{ message: string }>) =>
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data?.message,
          })
        );
  };

  if (!theme) return null;

  // useEffect(() => {
  //   watch(
  //     (value) =>
  //       setPage && setPage({ ...page, theme: { ...page?.theme, ...value } })
  //   );
  // }, [watch]);

  return (
    <section className="bg-primary p-4 rounded-md flex flex-col gap-2">
      <header className="flex flex-1 justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">Edit theme</h1>
          {isSubmitting && <Loader className="animate-spin h-4 w-4" />}
        </div>

        <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[55vh] pr-6">
            <fieldset className="flex flex-col gap-4" disabled={!page}>
              <h1 className="text-white text-md">General</h1>

              <FormField
                control={form.control}
                name="logoShape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white" htmlFor="logoShape">
                      Profile Shape
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="logoShape">
                          <SelectValue placeholder="Font Family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={LogoShape.Square}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-3.5 border-[1.5px] border-black" />
                              <p>Square</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={LogoShape.Rounded}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-3.5 border-[1.5px] border-black rounded-sm" />
                              <p>Rounded</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={LogoShape.Circle}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-3.5 border-[1.5px] border-black rounded-full  " />
                              <p>Circle</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={LogoShape.Hidden}>
                            <div className="flex items-center gap-2">
                              <EyeOff className="h-4 w-4" />
                              <p>Hidden</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="text-white"
                      htmlFor="fontFamilySelect"
                    >
                      Font Family
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="fontFamilySelect">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ThemeFontFamily.Jost}>
                            Jost
                          </SelectItem>
                          <SelectItem value={ThemeFontFamily.Lato}>
                            Lato
                          </SelectItem>
                          <SelectItem value={ThemeFontFamily.OpenSans}>
                            Open Sans
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="fontColor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel
                        className="text-white"
                        htmlFor="fontColorPicker"
                      >
                        Font Color
                      </FormLabel>
                      <FormControl>
                        <ColorPopover
                          id="fontColorPicker"
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue('fontColor', value, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="background"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel
                        className="text-white flex gap-1"
                        htmlFor="background"
                      >
                        <span>Background</span>{' '}
                        <span className="hidden sm:block">Color</span>
                      </FormLabel>
                      <FormControl>
                        <ColorPopover
                          id="background"
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue('background', value, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoColor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-white" htmlFor="background">
                        Logo Color
                      </FormLabel>
                      <FormControl>
                        <ColorPopover
                          id="background"
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue('logoColor', value, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h1 className="text-white text-md">Buttons</h1>

              <FormField
                control={form.control}
                name="buttonRadius"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-white" htmlFor="buttonRadius">
                      Radius
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="buttonRadius">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ButtonRadiusVariant.None}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-6 border-[1.5px] border-black" />
                              <p>None</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={ButtonRadiusVariant.Rounded}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-6 border-[1.5px] border-black rounded-sm" />
                              <p>Rounded</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={ButtonRadiusVariant.Full}>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-6 border-[1.5px] border-black rounded-full" />
                              <p>Full</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buttonBorder"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-white" htmlFor="buttonBorder">
                      Border
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="buttonBorder">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ButtonBorderVariant.None}>
                            <p>None</p>
                          </SelectItem>
                          <SelectItem value={ButtonBorderVariant.Thin}>
                            <p>Thin</p>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buttonShadow"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel
                      className="text-white"
                      htmlFor="buttonShadowSelect"
                    >
                      Shadow
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="buttonShadowSelect">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ButtonShadowVariant.None}>
                            <div className="flex items-center gap-2 py-1">
                              <div className="h-3.5 w-6 bg-white border-[1.5px] border-black rounded-sm" />
                              <p>None</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={ButtonShadowVariant.Hard}>
                            <div className="flex items-center gap-2 py-1">
                              <div
                                className="h-3.5 w-6 bg-white border-[1.5px] border-black rounded-sm"
                                style={{ boxShadow: '1.5px 1.5px' }}
                              />
                              <p>Hard</p>
                            </div>
                          </SelectItem>
                          <SelectItem value={ButtonShadowVariant.Soft}>
                            <div className="flex items-center gap-2 py-1">
                              <div
                                className="h-3.5 w-6 bg-white border-[1.5px] border-black rounded-sm"
                                style={{ boxShadow: '0 1px 2px' }}
                              />
                              <p>Soft</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="buttonFontColor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel
                        className="text-white"
                        htmlFor="buttonFontColor"
                      >
                        Font Color
                      </FormLabel>
                      <FormControl>
                        <ColorPopover
                          id="buttonFontColor"
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue('buttonFontColor', value, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buttonBackground"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel
                        className="text-white"
                        htmlFor="buttonBackground"
                      >
                        Background Color
                      </FormLabel>
                      <FormControl>
                        <ColorPopover
                          id="buttonBackground"
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue('buttonBackground', value, {
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </ScrollArea>
        </form>
      </Form>

      <Button
        disabled={!form.formState.isValid || !form.formState.isDirty}
        size="sm"
        className="ml-auto hidden"
        variant="outline"
        onClick={form.handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </section>
  );
};

export default ThemeSettings;
