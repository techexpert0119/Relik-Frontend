import { api } from '@/services/api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';
import { ICompleteProfileResultDto } from '@/data/dtos/complete-profile-result-dto';
import { ICompleteProfileDto } from '@/data/dtos/complete-profile-dto';
import { IGetUserDataResult } from '@/data/interfaces/get-user-data-result';
import { IEditProfile } from '@/data/interfaces/edit-profile';
import { IUserDetails } from '@/data/interfaces/user-details';
import { ISessionDto } from '@/data/interfaces/session';
import { useMutation, useQuery } from '@tanstack/react-query';

const controller = 'user/profile';

export class UserProfileService {
  static async completeProfile(profile: ICompleteProfileDto) {
    return api
      .post(`${controller}/complete`, profile)
      .then(
        (
          r: AxiosResponse<
            ICompleteProfileResultDto,
            AxiosError<IBadRequestBodyDto>
          >
        ) => r.data
      );
  }

  static async getData() {
    return api
      .get(`${controller}/data`)
      .then(
        (
          r: AxiosResponse<IGetUserDataResult, AxiosError<IBadRequestBodyDto>>
        ) => r.data
      );
  }

  static async update(body: IEditProfile) {
    return api
      .patch(`${controller}/edit`, body)
      .then(
        (r: AxiosResponse<IUserDetails, AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }

  static async getSessions() {
    return api
      .get(`${controller}/session`)
      .then(
        (r: AxiosResponse<ISessionDto[], AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }

  static async deleteSession(id: string) {
    return api
      .delete(`${controller}/session/${id}`)
      .then((r: AxiosResponse<void, AxiosError<IBadRequestBodyDto>>) => r.data);
  }

  static async removeAllOtherSessions() {
    return api
      .post(`${controller}/session/logout-all`)
      .then((r: AxiosResponse<void, AxiosError<IBadRequestBodyDto>>) => r.data);
  }
}

// Hooks

export const useRemoveOtherSessions = (props?: { onSuccess?: () => void }) =>
  useMutation({
    mutationFn: UserProfileService.removeAllOtherSessions,
    onSuccess: props?.onSuccess,
  });

export const useRemoveSession = (props?: { onSuccess?: () => void }) =>
  useMutation({
    mutationFn: UserProfileService.deleteSession,
    onSuccess: props?.onSuccess,
  });

export const useSessions = (props?: { enabled: boolean }) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: UserProfileService.getSessions,
    enabled: props?.enabled,
  });
