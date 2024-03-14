import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
import { ICreatedUsers, IUser } from '@/data/interfaces/users';
import useApiMutation from '@/hooks/useApiMutation';
import { ISignResult, ISignUpResult } from '@/data/interfaces/sign-result';

export const getCreatedUsersByRoleQuery = (
  userId?: string | null,
  query?: {
    pageSize?: string;
    pageNumber?: string;
    roleName?: undefined | string;
    searchText?: undefined | string;
  }
) =>
  useGeneralAPIQuery<ICreatedUsers>(
    '/user/users-by-role',
    { userId, ...query },
    query?.roleName
  );

export const postCreateOtherUserMutation = () =>
  useApiMutation('/auth/user/invite-user', 'post');
export const postCreateUserByInvitationMutation = () =>
  useApiMutation<unknown, ISignUpResult>(
    '/auth/user/create-user-by-invitation',
    'post'
  );
export const getUserByIdQuery = (id: string) =>
  useGeneralAPIQuery<IUser>(`/user/${id}`);
export const sendVerificationEmailQuery = () =>
  useGeneralAPIQuery<IUser>(`/user/resend-verification-email`, {}, undefined, {
    enabled: false,
    retry: 0,
    queryKey: ['/user/resend-verification-email'],
  });
export const verifyEmailQuery = () =>
  useApiMutation<unknown, ISignResult>(`/user/verify-email/`, 'post');
export const changeAccountPatch = () =>
  useApiMutation(`/user/change-account`, 'patch');
export const forgotPasswordQuery = () =>
  useApiMutation<unknown, { success: boolean }>(
    `/auth/user/forgot-password`,
    'post'
  );
export const resetPasswordQuery = () =>
  useApiMutation(`/auth/user/reset-password`, 'post');
export const resetPasswordFromTokenQuery = () =>
  useApiMutation(`/auth/user/reset-password-from-token`, 'post');
export const assignUserToAgencyMutation = () =>
  useApiMutation(`/user/assign-user-to-agency`, 'post');
