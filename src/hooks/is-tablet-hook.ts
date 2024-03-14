import { useMediaQuery } from '@uidotdev/usehooks';

export const useIsTablet = () =>
  useMediaQuery('only screen and (max-width : 1024px)');
export const useIsPhone = () =>
  useMediaQuery('only screen and (max-width : 640px)');
