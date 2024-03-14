import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/services/api/api';
import { AxiosError } from 'axios';
import { IBadRequestException } from '@/data/interfaces/bad-request-exception';

const useGeneralAPIQuery = <Data, Error = AxiosError<IBadRequestException>>(
  url: string,
  params?: object,
  queryKey?: string,
  options?: UseQueryOptions<Data, Error>
) => {
  return useQuery({
    queryFn: () => api.get(url, { params }).then((data) => data?.data),
    ...options,
    queryKey: [queryKey ? queryKey : url],
  });
};

export default useGeneralAPIQuery;
