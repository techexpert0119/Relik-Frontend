import { api } from '@/services/api/api';
import { AxiosResponse } from 'axios';
import ISubscriptionDto from '@/data/dtos/subscription-dto';

const controller = 'subscription';

export class SubscriptionService {
  static async getAll() {
    return api.get(controller).then(
      (
        res: AxiosResponse<{
          data: ISubscriptionDto[];
          status: string;
          length: number;
        }>
      ) => res.data
    );
  }
}
