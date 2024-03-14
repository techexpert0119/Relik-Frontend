import { IUser } from './users';

export interface IAgency {
  _id: string;
  createdAt: string;
  createdBy: IUser;
  photo: string;
  businessName: string;
  businessUrl: string;
  admins: IUser[];
}
