import { FC } from 'react';
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
  SelectValue,
} from '@/components/ui/select';
import {
  LazyLoadComponent,
  LazyLoadImage,
} from 'react-lazy-load-image-component';
import useDefaultCountry from '@/hooks/useDefaultCountry';
import { getPublicImageCountryURL } from '@/lib/utils';

const CountrySelect: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  countryId: string;
  textColorClassName: string;
  isLabelShouldAppear?: boolean;
  textClassName?: string;
  isRequired?: boolean;
}> = ({
  form,
  countryId,
  textColorClassName,
  textClassName,
  isRequired,
  isLabelShouldAppear = true,
}) => {
  const { countryInformation, defaultCountry } = useDefaultCountry(
    form,
    countryId
  );

  return (
    <FormField
      control={form.control}
      name={countryId}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col gap-1 w-full">
            {isLabelShouldAppear && (
              <FormLabel className={textColorClassName}>
                Country{isRequired && '*'}
              </FormLabel>
            )}
            <FormControl>
              {defaultCountry === undefined ? (
                <Select>
                  <SelectTrigger
                    className="w-[100%] bg-white border-slate-300"
                    id="buttonRadius"
                  >
                    <p className={textClassName}>Loading...</p>
                  </SelectTrigger>
                </Select>
              ) : (
                <Select
                  autoComplete={countryId}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className="w-[100%] bg-white border-slate-300"
                    id="buttonRadius"
                  >
                    <SelectValue
                      placeholder={`Country${isRequired && !isLabelShouldAppear ? '*' : ''}`}
                      className={textClassName}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countryInformation?.data?.map((curData) => (
                      <LazyLoadComponent
                        visibleByDefault={field.value === curData._id}
                        placeholder={
                          <p className={textClassName}>Loading...</p>
                        }
                        key={curData._id}
                      >
                        <SelectItem value={curData._id} isNoCheck>
                          <div className="flex items-center gap-2 text-base">
                            <LazyLoadImage
                              width={'20px'}
                              height={'20px'}
                              src={getPublicImageCountryURL(curData.code)}
                            />
                            <p className="line-clamp-1">
                              <span className={textClassName}>
                                {curData.name}
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
        );
      }}
    />
  );
};

export default CountrySelect;
