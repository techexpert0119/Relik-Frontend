import { Role } from '@/data/enums/role';

export interface IGetUserDataResult {
  id: string;
  firstName: string;
  isActive: boolean;
  businessName: string;
  businessUrl: string;
  email: string;
  permissions: string[];
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
