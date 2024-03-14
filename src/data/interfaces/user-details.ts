import { Role } from '@/data/enums/role';

export interface IUserDetails {
  _id: string;
  id: string;
  firstName: string;
  isActive: boolean;
  email: string;
  permissions: string[];
  currentAgency: string | undefined;
  createdAt: string;
  photo?: string;
  createdBy: {
    firstName: string;
  };
  role: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    isActive: boolean;
    name: string;
    permissions: string[];
    type: Role;
  };
}
