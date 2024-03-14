import { IUserDetails } from '@/data/interfaces/user-details';

export interface ICompleteProfileResultDto {
  accessToken: string;
  refreshToken: string;
  user: IUserDetails;
}
