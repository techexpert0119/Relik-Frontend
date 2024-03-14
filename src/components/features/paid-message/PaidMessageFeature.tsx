import * as z from 'zod';
import { FC, useContext } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MobileNumberWithCountry from '@/components/feature-forms/components/MobileNumberWithCountry';
import Container from '../Container';

export const PaidFeatureSchema = z.object({
  paidMessageFeatureValues: z.object({
    name: z
      .string({
        required_error: 'Please enter your name!',
        invalid_type_error: 'Please enter a valid name!',
      })
      .min(1, { message: 'Please enter a valid name!' }),
    emailAddress: z
      .string({
        required_error: 'Please enter a valid email address!',
        invalid_type_error: 'Please enter a valid email address!',
      })
      .min(3, { message: 'Please enter a valid email address!' }),
    phone: z.object({
      country: z
        .string({
          required_error: 'Required!',
          invalid_type_error: 'Required!',
        })
        .min(1, { message: 'Required!' }),
      number: z.number({
        required_error: 'Please enter a valid phone number!',
        invalid_type_error: 'Please enter a valid phone number!',
      }),
    }),
    message: z
      .string({
        required_error: 'Please enter a message!',
        invalid_type_error: 'Please enter a valid message!',
      })
      .min(1, { message: 'Please enter a valid message!' }),
  }),
});

const PaidFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};

  const form = useForm<z.infer<typeof PaidFeatureSchema>>({
    resolver: zodResolver(PaidFeatureSchema),
    defaultValues: {
      paidMessageFeatureValues: {
        name: undefined,
        emailAddress: undefined,
        phone: { country: undefined, number: undefined },
        message: undefined,
      },
    },
  });

  const onSubmit = (values: z.infer<typeof PaidFeatureSchema>) => {
    console.log(values);
  };

  return (
    <Container
      isPageThemeEnabled={true}
      className="shadow-[0_2px_10px] shadow-black/5"
      title={feature.values.paidMessageValues?.title}
      style={{ color: '#020817', background: 'white', borderRadius: '8px' }}
    >
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
            {/* {feature.values.paidMessageValues?.description && (
              <p className="heading-1 text-base text-center mb-3">
                {feature.values.paidMessageValues?.description}
              </p>
            )} */}

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="paidMessageFeatureValues.name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="text-base"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidMessageFeatureValues.emailAddress"
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

              <MobileNumberWithCountry
                textColorClassName="text-current"
                form={form}
                countryId="paidMessageFeatureValues.phone.country"
                numberId="paidMessageFeatureValues.phone.number"
                isLabelShouldAppear={false}
                inputNumberClassName="text-base"
              />

              <FormField
                control={form.control}
                name="paidMessageFeatureValues.message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          className="bg-white text-base"
                          placeholder="Message"
                          rows={4}
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
                className="rounded-full w-full mt-3 text-base"
                style={{
                  color: page?.theme.fontColor,
                  backgroundColor: page?.theme.background,
                }}
              >
                Send for {feature.values.paidMessageValues?.price} AED
              </Button>

              <p className="opacity-50">
                By submitting your contact details, you are providing your data
                to relik who may contact you.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default PaidFeature;
