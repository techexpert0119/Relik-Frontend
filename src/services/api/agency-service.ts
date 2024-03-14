import IGetAllAgencyResult from '@/data/dtos/agency-dto';
import { IAgency } from '@/data/interfaces/agency';
import useApiMutation from '@/hooks/useApiMutation';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
const controller = 'agency';

export const getAgenciesQuery = (query?: {
  pageSize: string;
  pageNumber: string;
  searchText?: undefined | string;
}) => useGeneralAPIQuery<IGetAllAgencyResult>(controller, { ...query });

export const getSingleAgency = (id: string) =>
  useGeneralAPIQuery<IAgency>(`${controller}/${id}`, {}, undefined, {
    enabled: false,
    queryKey: [id],
  });
export const createAgencyMutation = () =>
  useApiMutation<unknown, { allGenciesOfUser: IAgency[] }>(controller, 'post');
export const deleteAdminFromAgency = () =>
  useApiMutation(`/${controller}/remove-admin`, 'delete');
export const editAgencyMutation = (id: string) =>
  useApiMutation<unknown, { allGenciesOfUser: IAgency[] }>(
    `${controller}/${id}`,
    'patch'
  );
