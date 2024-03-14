import * as z from 'zod';
import { FC, memo, useContext, useState } from 'react';
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
import CountrySelect from '@/components/feature-forms/components/CountrySelect';
import Container from '../Container';
import { PageFeatureService } from '@/services/api/page-feature-service';
import { toast } from '@/components/ui/use-toast';

const ContactFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { page } = useContext(PageContext) ?? {};

  const ContactFeatureSchema = z.object({
    ...(feature.values.contactValues?.fields?.name?.isActive
      ? feature.values.contactValues?.fields?.name?.isRequired
        ? {
            name: z
              .string({
                required_error: 'Please enter your name!',
                invalid_type_error: 'Please enter a valid name!',
              })
              .min(1, { message: 'Please enter a valid name!' }),
          }
        : {
            name: z
              .string({
                required_error: 'Please enter your name!',
                invalid_type_error: 'Please enter a valid name!',
              })
              .min(1, { message: 'Please enter a valid name!' })
              .optional(),
          }
      : {}),

    ...(feature.values.contactValues?.fields?.emailAddress?.isActive
      ? feature.values.contactValues?.fields?.emailAddress?.isRequired
        ? {
            emailAddress: z
              .string({
                required_error: 'Please enter your email address!',
                invalid_type_error: 'Please enter a valid email address!',
              })
              .min(1, { message: 'Please enter a valid email address!' }),
          }
        : {
            emailAddress: z
              .string({
                required_error: 'Please enter your email address!',
                invalid_type_error: 'Please enter a valid email address!',
              })
              .min(1, { message: 'Please enter a valid email address!' })
              .optional(),
          }
      : {}),

    ...(feature.values.contactValues?.fields?.mobile?.isActive
      ? feature.values.contactValues?.fields?.mobile?.isRequired
        ? {
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
          }
        : {
            phone: z.object({
              country: z
                .string({
                  required_error: 'Required!',
                  invalid_type_error: 'Required!',
                })
                .min(1, { message: 'Required!' })
                .optional(),
              number: z
                .number({
                  required_error: 'Please enter a valid phone number!',
                  invalid_type_error: 'Please enter a valid phone number!',
                })
                .optional(),
            }),
          }
      : {}),

    ...(feature.values.contactValues?.fields?.message?.isActive
      ? feature.values.contactValues?.fields?.message?.isRequired
        ? {
            message: z
              .string({
                required_error: 'Please enter a message!',
                invalid_type_error: 'Please enter a valid message!',
              })
              .min(1, { message: 'Please enter a valid message!' }),
          }
        : {
            message: z
              .string({
                required_error: 'Please enter a message!',
                invalid_type_error: 'Please enter a valid message!',
              })
              .min(1, { message: 'Please enter a valid message!' })
              .optional(),
          }
      : {}),

    ...(feature.values.contactValues?.fields?.country?.isActive
      ? feature.values.contactValues?.fields?.country?.isRequired
        ? {
            country: z
              .string({
                required_error: 'Please enter a valid country!',
                invalid_type_error: 'Please enter a valid country!',
              })
              .min(1, { message: 'Please enter a valid country!' }),
          }
        : {
            country: z
              .string({
                required_error: 'Please enter a valid country!',
                invalid_type_error: 'Please enter a valid country!',
              })
              .min(1, { message: 'Please enter a valid country!' })
              .optional(),
          }
      : {}),
  });

  const form = useForm<z.infer<typeof ContactFeatureSchema>>({
    resolver: zodResolver(ContactFeatureSchema),
    defaultValues: {
      name: undefined,
      emailAddress: undefined,
      phone: { country: undefined, number: undefined },
      message: '',
      country: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ContactFeatureSchema>) => {
    setIsDisabled(true);
    PageFeatureService.processContact({
      ...values,
      pageFeatureId: feature._id,
    })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valuesAny = values as any;

        form.reset({
          ...values,
          name: undefined,
          emailAddress: undefined,
          phone: {
            country: valuesAny?.phone?.country ?? undefined,
            number: undefined,
          },
          message: '',
        });
        toast({
          variant: 'success',
          description: 'Message sent successfully!',
          title: 'Success',
        });
      })
      .catch(() =>
        toast({
          variant: 'destructive',
          description: 'Something went wrong!',
          title: 'Error',
        })
      )
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <Container
      isPageThemeEnabled={true}
      className="shadow-[0_2px_10px] shadow-black/5"
      title={feature.values.contactValues?.title}
      style={{ color: '#020817', background: 'white', borderRadius: '8px' }}
    >
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
            {feature.values.contactValues?.description && (
              <p className="heading-1 text-base text-center mb-3">
                {feature.values.contactValues?.description}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {feature.values.contactValues?.fields?.name?.isActive && (
                <FormField
                  control={form.control}
                  name={'name' as never}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="text-base"
                            placeholder={`Enter your name${feature.values.contactValues?.fields?.name?.isRequired ? '*' : ''}`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {feature.values.contactValues?.fields?.emailAddress?.isActive && (
                <FormField
                  control={form.control}
                  name={'emailAddress' as never}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="text-base"
                            type="email"
                            placeholder={`Enter email${feature.values.contactValues?.fields?.emailAddress?.isRequired ? '*' : ''}`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {feature.values.contactValues?.fields?.mobile?.isActive && (
                <MobileNumberWithCountry
                  textColorClassName="text-current"
                  form={form}
                  countryId="phone.country"
                  numberId="phone.number"
                  isLabelShouldAppear={false}
                  inputNumberClassName="text-base"
                  isRequired={
                    feature.values.contactValues?.fields?.mobile?.isRequired
                  }
                />
              )}

              {feature.values.contactValues?.fields?.message?.isActive && (
                <FormField
                  control={form.control}
                  name={'message' as never}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              className="bg-white text-base"
                              placeholder={`Message${feature.values.contactValues?.fields?.message?.isRequired ? '*' : ''}`}
                              rows={4}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {feature.values.contactValues?.fields?.country?.isActive && (
                <CountrySelect
                  textColorClassName="text-current"
                  form={form}
                  countryId="country"
                  isLabelShouldAppear={false}
                  textClassName="text-base"
                  isRequired={
                    feature.values.contactValues?.fields?.country?.isRequired
                  }
                />
              )}

              <Button
                style={{
                  color: page?.theme.fontColor,
                  backgroundColor: page?.theme.background,
                }}
                disabled={isDisabled}
                type="submit"
                className="rounded-full w-full my-2 border border-slate-300 hover:border-slate-400 text-base"
              >
                Submit
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

export default memo(ContactFeature);
