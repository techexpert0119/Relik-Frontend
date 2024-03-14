import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/services/api/api';
import { IBadRequestException } from '@/data/interfaces/bad-request-exception';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';

const useApiMutation = <
  Variables,
  Response,
  Error = AxiosError<IBadRequestException | IBadRequestBodyDto>,
>(
  url: string,
  method: 'post' | 'get' | 'put' | 'patch' | 'delete',
  options?: UseMutationOptions<AxiosResponse<Response>, Error, Variables>,
  params?: unknown
) =>
  useMutation<AxiosResponse<Response>, Error, Variables>({
    mutationFn: (data: unknown) => {
      const response = api({ method, url, data, params });
      return response;
    },
    mutationKey: [url, method],
    ...options,
  });

export default useApiMutation;
