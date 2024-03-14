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
import CountrySelect from './components/CountrySelect';
import { ICountry } from '@/data/interfaces/country';
import ColorPopover from '@/app/pages/components/ColorPopover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

export const EventFormSchema = z.object({
  eventValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(40, { message: 'Max 40 are characters allowed!' }),
    date: z
      .string({
        required_error: 'Please enter a valid date!',
        invalid_type_error: 'Please enter a valid date!',
      })
      .min(1, { message: 'Please enter a valid date!' }),
    country: z
      .string({
        required_error: 'Please enter a valid country!',
        invalid_type_error: 'Please enter a valid country!',
      })
      .min(1, { message: 'Please enter a valid country!' }),
    city: z
      .string({
        required_error: 'Please enter a valid city!',
        invalid_type_error: 'Please enter a valid city!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(300, { message: 'Max 300 are characters allowed!' }),
    location: z
      .string({
        required_error: 'Please enter a valid location!',
        invalid_type_error: 'Please enter a valid location!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(300, { message: 'Max 300 are characters allowed!' }),
    link: z
      .string({
        required_error: 'Please enter a valid link!',
        invalid_type_error: 'Please enter a valid link!',
      })
      .min(3, { message: 'Min 3 are characters required!' })
      .max(300, { message: 'Max 300 are characters allowed!' })
      .url(),
    backgroundColor: z
      .string({
        required_error: 'Please enter a valid background color!',
        invalid_type_error: 'Please enter a valid background color!',
      })
      .optional(),
    fontColor: z
      .string({
        required_error: 'Please enter a valid font color!',
        invalid_type_error: 'Please enter a valid font color!',
      })
      .optional(),
  }),
});

const EventForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      eventValues: {
        title: '',
        date: undefined,
        country: undefined,
        city: undefined,
        location: undefined,
        link: '',
        backgroundColor: '#fff',
        fontColor: '#000',
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
        const country = feature.values.eventValues
          ?.country as unknown as ICountry;
        const currentDate = new Date(feature.values.eventValues?.date || '');
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        form.reset({
          eventValues: {
            ...feature.values.eventValues,
            date: formattedDate,
            country: country?._id,
          },
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof EventFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.EVENT,
        values: {
          eventValues: values.eventValues,
        },
      });
    } else {
      return updateFeature?.(options?.featureId, {
        eventValues: values.eventValues,
      }).then((res) =>
        form.reset(
          {
            eventValues: { ...res.values.eventValues },
          },
          { keepValues: true }
        )
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <ScrollArea className="h-[50vh] pr-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="eventValues.title"
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
              name="eventValues.date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Date*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="date" placeholder="Date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CountrySelect
              textColorClassName="text-white"
              form={form}
              countryId="eventValues.country"
            />

            <FormField
              control={form.control}
              name="eventValues.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">City*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="City" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventValues.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Location*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Location" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventValues.link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Link*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Link" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="eventValues.backgroundColor"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-white" htmlFor="fontColorPicker">
                      Background color
                    </FormLabel>
                    <FormControl>
                      <ColorPopover
                        id="eventValues.backgroundColor"
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue('eventValues.backgroundColor', value, {
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
                name="eventValues.fontColor"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-white" htmlFor="fontColorPicker">
                      Font color
                    </FormLabel>
                    <FormControl>
                      <ColorPopover
                        id="eventValues.fontColor"
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue('eventValues.fontColor', value, {
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

export default EventForm;
