import { IPageFeatureResult } from '@/data/interfaces/page-feature';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
const controller = 'feature';
export const getFeatureQuery = () =>
  useGeneralAPIQuery<IPageFeatureResult>(controller);
