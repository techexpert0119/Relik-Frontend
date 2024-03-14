import { api } from '@/services/api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';
import { useQuery } from '@tanstack/react-query';
import IGetAllPagesResult from '@/data/dtos/user-pages-dto';

const controller = 'page';

export class UserProfileService {
  static async getAll() {
    return api
      .get(`${controller}`)
      .then(
        (
          r: AxiosResponse<IGetAllPagesResult, AxiosError<IBadRequestBodyDto>>
        ) => r.data
      );
  }
}

export const usePages = (props?: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: UserProfileService.getAll,
    enabled: props?.enabled,
  });
};
