import { IUserDetails } from './user-details';

export interface ICreatedUsers {
  data: IUserDetails[];
  totalCount: number;
}

export interface IUserAccountCreatePayload {
  email: string;
}
export interface IUser {
  _id: string;
  createdAt: string;
  createdBy: IUser;
  email: string;
  firstName: string;
  isActive: true;
  passwordAttempt: 0;
  photo: string;
  permissions: string[];
  role: { _id: string; name: string; description: string };
  signUpDate: string;
}
