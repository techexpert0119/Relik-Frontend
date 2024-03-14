import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import appStoreSVGBright from '/features/download-from-app-store-bright.svg';
import appStoreBlackOnWhite from '/features/download-from-app-store-black-on-white.svg';
import appStore from '/features/download-from-app-store.svg';
import { AppLinkVariant } from '@/data/enums/app-link-variant';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function getAppStoreImg(variant?: AppLinkVariant) {
  switch (variant) {
    case AppLinkVariant.Default:
      return appStore;
    case AppLinkVariant.WhiteOnTransparent:
      return appStoreSVGBright;
    case AppLinkVariant.DarkOnWhite:
      return appStoreBlackOnWhite;
    default:
      return '';
  }
}

const AppStoreLink: FC<{ feature: IFeature }> = ({ feature }) => {
  return (
    <div className="flex flex-1 justify-center items-center p-2">
      {feature.values.iosAppValues?.variant && (
        <a
          href={feature.values.iosAppValues.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LazyLoadImage
            className="w-[160px] h-[45px] min-w-[160px] min-h-[45px] object-cover overflow-visible"
            src={getAppStoreImg(feature.values.iosAppValues.variant)}
            alt="appstore-img"
          />
        </a>
      )}
    </div>
  );
};

export default AppStoreLink;
