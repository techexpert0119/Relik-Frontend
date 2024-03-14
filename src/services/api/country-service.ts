import { ICountry } from '@/data/interfaces/country';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';

const controller = 'country';

export const getAllCountries = () =>
  useGeneralAPIQuery<{ data: ICountry[]; length: number }>(controller, {
    skip: 0,
    limit: Number.MAX_SAFE_INTEGER,
    sortOptions: 'name',
  });
