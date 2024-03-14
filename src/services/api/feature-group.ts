import { IFeatureGroup } from '@/data/interfaces/feature-group';
import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
const controller = 'feature-group';
export const getFeatureGroupsQuery = () =>
  useGeneralAPIQuery<IFeatureGroup[]>(controller);
