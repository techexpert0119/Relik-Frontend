import { IPage } from '@/data/interfaces/page';
import { IFeature } from '@/data/dtos/feature';

export interface IGetPageWithFeatureResult {
  page: IPage;
  features: IFeature[];
}
