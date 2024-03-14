import { IRowFeature } from '../dtos/feature';

export interface IPageFeatureResult {
  data: IRowFeature[];
  status: 'status' | 'error';
}
