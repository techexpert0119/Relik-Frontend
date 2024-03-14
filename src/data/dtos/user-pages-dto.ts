import { IPage } from '@/data/interfaces/page';

export default interface IGetAllPagesResult {
  data: IPage[];
  status: 'success' | 'error';
  totalCount: number;
}
