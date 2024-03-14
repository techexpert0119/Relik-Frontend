import { IInvitation } from '@/data/interfaces/invitation';
import useApiMutation from '@/hooks/useApiMutation';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
const controller = 'verification';
export const validateValidationLink = () =>
  useApiMutation<unknown, { success: boolean; verification: IInvitation }>(
    controller,
    'post'
  );
export const resendInvitation = () =>
  useApiMutation(`${controller}/resend`, 'post');
export const deleteInvitation = () => useApiMutation(`${controller}`, 'delete');
export const getInvitationsOfUserQuery = (query?: {
  pageSize?: string;
  pageNumber?: string;
  searchText?: undefined | string;
}) =>
  useGeneralAPIQuery<{ data: IInvitation[]; totalCount: number }>(controller, {
    ...query,
  });
