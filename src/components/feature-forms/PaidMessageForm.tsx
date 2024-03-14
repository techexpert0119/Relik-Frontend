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
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export const PaidMessageFormSchema = z.object({
  paidMessageValues: z.object({
    title: z
      .string({
        required_error: 'Please enter a valid title!',
        invalid_type_error: 'Please enter a valid title!',
      })
      .min(3, { message: 'Please enter a valid title!' }),
    isShowAsListItem: z.boolean({
      required_error: 'Please enter a valid value!',
      invalid_type_error: 'Please enter a valid value!',
    }),
    price: z.number({
      required_error: 'Please enter a valid price!',
      invalid_type_error: 'Please enter a valid price!',
    }),
    isPredefinedMessage: z
      .boolean({
        required_error: 'Please enter a valid value!',
        invalid_type_error: 'Please enter a valid value!',
      })
      .optional(),
    predefinedMessage: z
      .string({
        required_error: 'Please enter a valid value!',
        invalid_type_error: 'Please enter a valid value!',
      })
      .optional(),
    emailAddress: z
      .string({
        required_error: 'Please enter a valid email address!',
        invalid_type_error: 'Please enter a valid email address!',
      })
      .email(),
    description: z
      .string({
        required_error: 'Please enter a valid description!',
        invalid_type_error: 'Please enter a valid description!',
      })
      .optional(),
    thankYouMessage: z
      .string({
        required_error: 'Please enter a valid message!',
        invalid_type_error: 'Please enter a valid message!',
      })
      .optional(),
  }),
});

const PaidMessageForm = () => {
  const { features } = useContext(PageContext) ?? {};
  const { options, createFeature, updateFeature } =
    useContext(MenuContext) ?? {};
  const form = useForm<z.infer<typeof PaidMessageFormSchema>>({
    resolver: zodResolver(PaidMessageFormSchema),
    defaultValues: {
      paidMessageValues: {
        title: undefined,
        isShowAsListItem: true,
        price: 5,
        isPredefinedMessage: false,
        predefinedMessage: undefined,
        emailAddress: undefined,
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
          paidMessageValues: feature.values.paidMessageValues,
        });
      }
    }
  }, [options?.featureId, features]);

  const onSubmit = (values: z.infer<typeof PaidMessageFormSchema>) => {
    if (!options?.featureId) {
      createFeature?.({
        type: PageFeatureType.PAID_MESSAGE,
        values: {
          paidMessageValues: values.paidMessageValues,
        },
      });
    } else {
      updateFeature &&
        updateFeature(options?.featureId, {
          paidMessageValues: values.paidMessageValues,
        });
    }
  };

  const isShowAsListItem = form.watch('paidMessageValues.isShowAsListItem');
  const isPredefinedMessage = form.watch(
    'paidMessageValues.isPredefinedMessage'
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <fieldset className="flex flex-col gap-4">
          <div>
            <p className="text-white font-black">Paid Message</p>
            <p className="text-white text-sm">
              Receive paid messages from visitors.
            </p>
          </div>

          <FormField
            control={form.control}
            name="paidMessageValues.title"
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
            name="paidMessageValues.isShowAsListItem"
            render={({ field }) => (
              <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                <FormControl>
                  <div className="relative">
                    <Switch
                      name={'paidMessageValues.isShowAsListItem'}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormLabel className="text-white">
                  Show as a List Item
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paidMessageValues.price"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-white">Price</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value)}
                  >
                    <SelectTrigger id="buttonRadius">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">
                        <p>5 AED</p>
                      </SelectItem>
                      <SelectItem value="10">
                        <p>10 AED</p>
                      </SelectItem>
                      <SelectItem value="15">
                        <p>15 AED</p>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isShowAsListItem && (
            <>
              <div>
                <p className="text-white font-black">Fields</p>
                <p className="text-white text-sm">
                  Use fields to collect a specific type of information.
                </p>
              </div>

              <FormField
                control={form.control}
                name="paidMessageValues.isPredefinedMessage"
                render={({ field }) => (
                  <FormItem className="flex gap-2 justify-items-top justify-top	content-top items-top">
                    <FormControl>
                      <div className="relative">
                        <Switch
                          name={'paidMessageValues.isPredefinedMessage'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormLabel className="text-white">
                      Predefined Message
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isPredefinedMessage && (
                <FormField
                  control={form.control}
                  name="paidMessageValues.predefinedMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Predefined message
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Predefined message" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          <div>
            <p className="text-white font-black">Responses</p>
            <p className="text-white text-sm">
              Choose where visitor's responses will be sent.
            </p>
          </div>

          <FormField
            control={form.control}
            name="paidMessageValues.emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email address*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your email address"
                      autoComplete="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-white font-black">Additional settings</p>

          {isShowAsListItem && (
            <FormField
              control={form.control}
              name="paidMessageValues.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Description (optional)"
                        rows={4}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="paidMessageValues.thankYouMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Thank you message</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Thank you message (optional)"
                      rows={1}
                      {...field}
                    />
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

export default PaidMessageForm;
