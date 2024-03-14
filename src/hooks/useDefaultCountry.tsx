import { useEffect, useState } from 'react';
import { getAllCountries } from '@/services/api/country-service';
import { getIPInformation } from '@/services/api/ip-service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDefaultCountry(form: any, countryId: string) {
  const { data: countryInformation, isLoading: isCountryLoading } =
    getAllCountries();
  const { data: ipInformation, isLoading: isIpLoading } = getIPInformation();

  const [defaultCountry, setDefaultCountry] = useState<
    string | null | undefined
  >(undefined);

  useEffect(() => {
    const firstCountry = countryInformation?.data?.[0];
    const ipCountry = ipInformation?.countryCode
      ? countryInformation?.data?.find(
          (country) => country?.code === ipInformation?.countryCode
        )
      : undefined;

    if (!form?.getValues(countryId) && ipInformation && firstCountry) {
      form?.setValue(countryId, ipCountry?._id ?? firstCountry?._id);
      setDefaultCountry(ipCountry?._id ?? firstCountry?._id);
    } else if (
      !isCountryLoading &&
      !isIpLoading &&
      !form?.getValues(countryId)
    ) {
      setDefaultCountry(null);
    }
  }, [
    countryId,
    countryInformation?.data,
    ipInformation,
    isCountryLoading,
    isIpLoading,
  ]);

  return { countryInformation, defaultCountry };
}
