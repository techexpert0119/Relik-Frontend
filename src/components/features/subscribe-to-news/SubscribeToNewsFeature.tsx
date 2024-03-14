import * as z from 'zod';
import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const SubscribeToNewsFeatureSchema = z.object({
  subscribeToNewsFeatureValues: z.object({
    emailAddress: z
      .string({
        required_error: 'Please enter your email address!',
        invalid_type_error: 'Please enter a valid email address!',
      })
      .min(1, { message: 'Please enter a valid email address!' }),
  }),
});

const SubscribeToNewsFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const form = useForm<z.infer<typeof SubscribeToNewsFeatureSchema>>({
    resolver: zodResolver(SubscribeToNewsFeatureSchema),
    defaultValues: {
      subscribeToNewsFeatureValues: {
        emailAddress: undefined,
      },
    },
  });

  const onSubmit = (values: z.infer<typeof SubscribeToNewsFeatureSchema>) => {
    console.log(values);
  };

  const isImageExist = !!feature.values.subscribeToNewsValues?.image;

  return (
    <div className="w-full px-6">
      <div className="relative">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${
              isImageExist
                ? `bg-cover bg-no-repeat bg-center `
                : 'border border-gray-300'
            } w-full flex flex-col gap-3.5 rounded-xl py-6 px-5`}
            style={{
              backgroundImage: `url(${feature.values.subscribeToNewsValues?.image})`,
            }}
          >
            <p className="text-black text-base font-semibold text-center">
              {feature.values.subscribeToNewsValues?.title}
            </p>
            <FormField
              control={form.control}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={'subscribeToNewsFeatureValues.email' as any}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-base"
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-full w-full"
              onClick={() =>
                window.open(
                  feature.values.subscribeToNewsValues?.link,
                  '_blank'
                )
              }
            >
              Subscribe
            </Button>
            {feature.values.subscribeToNewsValues?.description && (
              <p className="opacity-50">
                {feature.values.subscribeToNewsValues?.description}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscribeToNewsFeature;
