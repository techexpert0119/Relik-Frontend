import { IUserDetails } from '@/data/interfaces/user-details';
import { IAgency } from './agency';

export interface ISignResult {
  token: {
    refreshToken: string;
    accessToken: string;
  };
  user: IUserDetails;
  agencies: [] | IAgency[];
}

export interface ISignUpResult {
  token: {
    refreshToken: string;
    accessToken: string;
  };
  createdUser: IUserDetails;
}
