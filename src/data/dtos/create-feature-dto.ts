import { PageFeatureType } from '@/data/enums/page-features';
import { IFeatureValues } from '@/data/dtos/feature';

export interface IPageFeatureCreateDto {
  pageId: string;
  feature: PageFeatureType;
  order: number;
  values: IFeatureValues;
}
