import { IUser } from './users';

export interface IInvitation {
  _id: string;
  createdBy: IUser | undefined;
  verificationToken: string;
  expireDate: string;
  invitedUser: IUser | undefined;
  email: string;
  status: string;
  purpose: ENUM_VERIFICATION_PURPOSE;
  role: {
    name: string;
  };
}

export enum ENUM_VERIFICATION_PURPOSE {
  VERIFICATION_EMAIL = 'VERIFICATION_EMAIL',
  INVITATION = 'INVITATION',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  INVITATION_FOR_EXISTED_USER = 'INVITATION_FOR_EXISTED_USER',
}
