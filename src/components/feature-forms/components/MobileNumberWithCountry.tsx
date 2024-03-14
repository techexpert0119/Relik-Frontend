import { FC, useMemo } from 'react';
import {
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
} from '@/components/ui/select';
import { InputNumber } from '@/components/ui/input';
import {
  LazyLoadComponent,
  LazyLoadImage,
} from 'react-lazy-load-image-component';
import useDefaultCountry from '@/hooks/useDefaultCountry';
import { getPublicImageCountryURL } from '@/lib/utils';

const MobileNumberWithCountry: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  countryId: string;
  numberId: string;
  textColorClassName: string;
  isLabelShouldAppear?: boolean;
  inputNumberClassName?: string;
  isRequired?: boolean;
}> = ({
  form,
  countryId,
  numberId,
  textColorClassName,
  inputNumberClassName,
  isRequired,
  isLabelShouldAppear = true,
}) => {
  const { countryInformation, defaultCountry } = useDefaultCountry(
    form,
    countryId
  );

  const country = form.watch(countryId);

  const code = useMemo(() => {
    return countryInformation?.data.find(
      (curCountry) => curCountry._id === country
    )?.code;
  }, [country, countryInformation?.data]);

  return (
    <div className="w-full">
      {isLabelShouldAppear && (
        <div className="mb-2">
          <FormLabel className={textColorClassName}>
            Phone number{isRequired && '*'}
          </FormLabel>
        </div>
      )}
      <div className="flex">
        <FormField
          control={form.control}
          name={countryId}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                {defaultCountry === undefined ? (
                  <Select>
                    <SelectTrigger
                      className="w-[70px] rounded-r-none bg-white focus:border-slate-300 click:border-slate-300 hover:border-slate-300 border-slate-300"
                      id="buttonRadius"
                    >
                      ...
                    </SelectTrigger>
                  </Select>
                ) : (
                  <Select
                    autoComplete={countryId}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      className="w-[70px] rounded-r-none bg-white focus:border-slate-300 click:border-slate-300 hover:border-slate-300 border-slate-300"
                      id="buttonRadius"
                    >
                      <div>
                        {code && (
                          <LazyLoadImage
                            width={'20px'}
                            height={'20px'}
                            src={getPublicImageCountryURL(code)}
                          />
                        )}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {countryInformation?.data?.map((curData) => (
                        <LazyLoadComponent
                          key={curData._id}
                          placeholder={<p>Loading...</p>}
                          visibleByDefault={field.value === curData._id}
                        >
                          <SelectItem value={curData._id} isNoCheck>
                            <div className="flex items-center gap-2 ">
                              <LazyLoadImage
                                width={'20px'}
                                height={'20px'}
                                src={getPublicImageCountryURL(curData.code)}
                              />
                              <p
                                className={`line-clamp-1 ${inputNumberClassName}`}
                              >
                                <span className="font-bold">
                                  {curData.name}
                                </span>
                                <span className="ml-1">
                                  {curData.dial_code}
                                </span>
                              </p>
                            </div>
                          </SelectItem>
                        </LazyLoadComponent>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={numberId}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <div className="relative">
                  <InputNumber
                    {...field}
                    className={`rounded-l-none ml-[-2px] focus:outline-none click:outline-none hover:outline-none focus:border-slate-300 click:border-slate-300 hover:border-slate-300 border-slate-300 ${inputNumberClassName}`}
                    placeholder={`Mobile${isRequired && !isLabelShouldAppear ? '*' : ''}`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MobileNumberWithCountry;
