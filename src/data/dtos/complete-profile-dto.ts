import { Role } from '@/data/enums/role';

export interface ICompleteProfileDto {
  role: Role;
  // subscriptionId: string;
  photo?: string;

  // Agency properties
  businessName?: string;
  businessUrl?: string;
  nameOfCelebrities?: string[];
}
