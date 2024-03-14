import * as z from 'zod';
import { FC, useEffect, useMemo } from 'react';
import { IFeature } from '@/data/dtos/feature';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAllCountries } from '@/services/api/country-service';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Operator from './components/Operator';
import { MessageCircle } from 'lucide-react';
import { ICountry } from '@/data/interfaces/country';
import Container from '../Container';
import useBorderRadius from '../hooks/useBorderRadius';
import useBorderWidth from '../hooks/useBorderWidth';
import {
  LazyLoadComponent,
  LazyLoadImage,
} from 'react-lazy-load-image-component';
import { getPublicImageCountryURL, getPublicImageURL } from '@/lib/utils';

export const SmsShortCodeFeatureSchema = z.object({
  smsShortCodeFeatureValues: z.object({
    country: z
      .string({
        required_error: 'Please enter a valid country!',
        invalid_type_error: 'Please enter a valid country!',
      })
      .min(1, { message: 'Please enter a valid country!' }),
  }),
});

const SmsShortCodeFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const borderRadius = useBorderRadius();
  const borderWidth = useBorderWidth();

  const form = useForm<z.infer<typeof SmsShortCodeFeatureSchema>>({
    resolver: zodResolver(SmsShortCodeFeatureSchema),
    defaultValues: {
      smsShortCodeFeatureValues: {
        country: undefined,
      },
    },
  });

  const { data, isLoading } = getAllCountries();

  const country = form.watch('smsShortCodeFeatureValues.country');

  useEffect(() => {
    const firstSavedCountry = feature.values?.smsShortCodeValues
      ?.shortCodes?.[0]?.country as unknown as ICountry;

    if (!country && firstSavedCountry) {
      form.setValue(
        'smsShortCodeFeatureValues.country',
        firstSavedCountry?._id
      );
    }
  }, [feature?.values?.smsShortCodeValues]);

  const avilableCountries = useMemo(() => {
    const savedCountries =
      feature?.values?.smsShortCodeValues?.shortCodes?.map((shortCode) => {
        const shortCodeCountry = shortCode?.country as unknown as ICountry;
        return shortCodeCountry?._id;
      }) ?? [];
    return (
      data?.data.filter((country) => savedCountries.includes(country?._id)) ??
      []
    );
  }, [feature.values?.smsShortCodeValues, data?.data]);

  const shortCode = useMemo(() => {
    return feature.values?.smsShortCodeValues?.shortCodes?.filter(
      (shortCode) => {
        const shortCodeCountry = shortCode?.country as unknown as ICountry;
        return shortCodeCountry?._id === country;
      }
    )?.[0];
  }, [feature.values?.smsShortCodeValues, country]);

  return (
    <Container
      isPageThemeEnabled
      className="shadow-[0_2px_10px] shadow-black/5"
      style={{
        ...(feature.values.smsShortCodeValues?.fontColor
          ? { color: feature.values.smsShortCodeValues?.fontColor }
          : {}),
        ...(feature.values.smsShortCodeValues?.backgroundColor
          ? { background: feature.values.smsShortCodeValues?.backgroundColor }
          : {}),
      }}
    >
      <Accordion className="rounded-md w-100" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="min-h-[56px] h-full">
            <div className="flex gap-4 items-center">
              {feature.values.smsShortCodeValues?.photo ? (
                <LazyLoadImage
                  alt={feature?.values?.smsShortCodeValues?.title}
                  src={getPublicImageURL(
                    feature?.values?.smsShortCodeValues?.photo
                  )}
                  className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <MessageCircle height={32} width={32} />
              )}

              <p className="heading-1 text-base text-center">
                {feature?.values?.smsShortCodeValues?.title}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className={'w-full flex flex-col gap-3'}>
              <div
                className="mb-2 mx-auto w-[40%] h-0.5 mb-3"
                style={{
                  background: feature.values.smsShortCodeValues?.fontColor,
                }}
              />
              <Form {...form}>
                <div className="mb-2">
                  <FormField
                    control={form.control}
                    name="smsShortCodeFeatureValues.country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1">
                        <FormControl>
                          <Select
                            autoComplete="smsShortCodeFeatureValues.country"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-[100%] border-slate-300`}
                              id="buttonRadius"
                              style={{
                                borderRadius,
                                borderWidth,
                                background:
                                  feature.values.smsShortCodeValues
                                    ?.backgroundColor,
                                color:
                                  feature.values.smsShortCodeValues?.fontColor,
                                outline: 'none',
                                borderStyle: 'solid',
                                borderColor:
                                  feature.values.smsShortCodeValues?.fontColor,
                              }}
                            >
                              {isLoading ? (
                                <p className="text-base">Loading...</p>
                              ) : (
                                <SelectValue />
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {avilableCountries?.map((curData) => (
                                <LazyLoadComponent
                                  key={curData._id}
                                  placeholder={<p>Loading...</p>}
                                  visibleByDefault={field.value === curData._id}
                                >
                                  <SelectItem value={curData._id} isNoCheck>
                                    <div className="flex items-center gap-2 text-base">
                                      <LazyLoadImage
                                        width={'20px'}
                                        height={'20px'}
                                        src={getPublicImageCountryURL(
                                          curData.code
                                        )}
                                      />
                                      <p className="line-clamp-1">
                                        <span>{curData.name}</span>
                                      </p>
                                    </div>
                                  </SelectItem>
                                </LazyLoadComponent>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              {shortCode?.operators?.map((operator, index) => (
                <Operator {...operator} key={index} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default SmsShortCodeFeature;
