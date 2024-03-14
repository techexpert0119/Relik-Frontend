import { IAgency } from '../interfaces/agency';

export default interface IGetAllAgencyResult {
  data: IAgency[];
  totalCount: number;
}
