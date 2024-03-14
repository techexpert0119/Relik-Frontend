import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import getItFromGoogleStore from '/features/get-it-on-google-store.svg';
import getItFromGoogleStoreLight from '/features/get-it-on-google-store-light.svg';
import getItFromGoogleStoreBlackOnWhite from '/features/get-it-on-google-store-black-on-white.svg';
import { AppLinkVariant } from '@/data/enums/app-link-variant';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function getGoogleStoreImg(variant?: AppLinkVariant) {
  switch (variant) {
    case AppLinkVariant.Default:
      return getItFromGoogleStore;
    case AppLinkVariant.WhiteOnTransparent:
      return getItFromGoogleStoreLight;
    case AppLinkVariant.DarkOnWhite:
      return getItFromGoogleStoreBlackOnWhite;
    default:
      return '';
  }
}

const GoogleStoreLink: FC<{ feature: IFeature }> = ({ feature }) => {
  return (
    <div className="flex flex-1 justify-center items-center p-2">
      {feature.values.googleStoreLinkValues?.variant && (
        <a
          href={feature.values.googleStoreLinkValues.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LazyLoadImage
            className="w-[160px] h-[45px] min-w-[160px] min-h-[45px] object-cover overflow-visible"
            src={getGoogleStoreImg(
              feature.values.googleStoreLinkValues.variant
            )}
            alt="appstore-img"
          />
        </a>
      )}
    </div>
  );
};

export default GoogleStoreLink;
