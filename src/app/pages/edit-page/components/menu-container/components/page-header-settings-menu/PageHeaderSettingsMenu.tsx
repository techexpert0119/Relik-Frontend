import React, { useContext, useEffect, useRef } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { Button } from '@/components/ui/button';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';
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
import { Input } from '@/components/ui/input';
import LayoutTypePicker from '@/app/pages/edit-page/components/menu-container/components/page-header-settings-menu/components/LayoutTypePicker';
import { PageService } from '@/services/api/page-service';
import { Loader, X } from 'lucide-react';
import z from 'zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebouncedCallback } from 'use-debounce';

const headerDataSchema = z.object({
  title: z
    .string({
      required_error: 'Please enter a valid title!',
      invalid_type_error: 'Please enter a valid title!',
    })
    .min(4, { message: 'Title must be at least 4 characters long!' })
    .max(25, {
      message: 'The character limit for title is 25, Please try again.',
    }),
  description: z
    .string({
      required_error: 'Please enter a valid description!',
      invalid_type_error: 'Please enter a valid description!',
    })
    .max(120, {
      message: 'The character limit for description is 120, Please try again.',
    }),
});

const PageHeaderSettingsMenu = () => {
  const form = useForm<z.infer<typeof headerDataSchema>>({
    resolver: zodResolver(headerDataSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const {
    formState: { isSubmitting },
    watch,
    reset,
    getValues,
  } = form;
  const { page, setPage, setDisabled } = useContext(PageContext) ?? {};
  const { setMenuType } = useContext(MenuContext) ?? {};
  const originalValues = useRef<z.infer<typeof headerDataSchema>>();

  const debounced = useDebouncedCallback(() => {
    if (form.formState.isDirty) {
      form.handleSubmit(onSubmit)();
    }
  }, 1500);

  useEffect(() => {
    const subscription = watch(() => debounced());
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (page) {
      originalValues.current = {
        title: page?.pageName,
        description: page?.pageDescription,
      };
      reset({ ...originalValues.current });
    }

    return () => {
      if (form.formState.isDirty) {
        page &&
          setPage &&
          setPage({
            ...page,
            pageName: originalValues.current?.title ?? page.pageName,
            pageDescription:
              originalValues.current?.description ?? page.pageDescription,
          });
      }
    };
  }, []);

  useEffect(() => {
    if (page) {
      originalValues.current = {
        title: page?.pageName,
        description: page?.pageDescription,
      };
      reset({ ...originalValues.current });
    }
  }, [page]);

  // useEffect(() => {
  //   const watcher = watch((d) => {
  //     page &&
  //       setPage &&
  //       setPage({
  //         ...page,
  //         pageName: d.title ?? '',
  //         pageDescription: d.description ?? '',
  //       });
  //   });

  //   return () => {
  //     watcher.unsubscribe();
  //   };
  // }, [page]);

  const close = () => {
    setMenuType?.(null);
  };

  const onSubmit = (values: z.infer<typeof headerDataSchema>) => {
    if (page) {
      return PageService.updatePageHeader(page._id, {
        pageDescription: values.description,
        pageName: values.title,
      }).then((response) => {
        setPage && setPage(response);
        originalValues.current = {
          title: response.pageName,
          description: response.pageDescription,
        };
        reset({ ...getValues() });
      });
    }
  };

  const updateLayoutType = (type: HeaderLayoutType) => {
    setDisabled?.(true);
    page &&
      PageService.updatePageHeader(page._id, {
        headerLayoutType: type,
      })
        .then((response) => {
          setPage && setPage(response);
        })
        .finally(() => setDisabled?.(false));
  };

  return (
    <section className="bg-primary p-4 rounded-md flex flex-col gap-2 w-full max-w-[496px]">
      <header className="flex flex-1 justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">Edit header</h1>
          {isSubmitting && <Loader className="animate-spin h-4 w-4" />}
        </div>

        <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter name here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter description here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button className="hidden" />
          </fieldset>
        </form>
      </Form>

      <ScrollArea className="h-42 p-4">
        <LayoutTypePicker
          value={page?.theme.headerLayoutType}
          onChange={updateLayoutType}
        />
      </ScrollArea>

      <div className="justify-end mt-2 hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Save
        </Button>
      </div>
    </section>
  );
};

export default PageHeaderSettingsMenu;
