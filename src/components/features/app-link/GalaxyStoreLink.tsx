import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import defaultSVG from '/features/avaliable-on-galaxy-store.svg';
import blackOnWhiteSVG from '/features/avaliable-on-galaxy-store-black-on-white.svg';
import lightSVG from '/features/avaliable-on-galaxy-store-light.svg';
import { AppLinkVariant } from '@/data/enums/app-link-variant';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function getIconSRC(variant?: AppLinkVariant) {
  switch (variant) {
    case AppLinkVariant.Default:
      return defaultSVG;
    case AppLinkVariant.WhiteOnTransparent:
      return lightSVG;
    case AppLinkVariant.DarkOnWhite:
      return blackOnWhiteSVG;
    default:
      return '';
  }
}

const GalaxyStoreLink: FC<{ feature: IFeature }> = (props) => {
  const {
    feature: {
      values: { galaxyStoreLinkValues },
    },
  } = props;

  return (
    <div className="flex flex-1 justify-center items-center p-2">
      <a href={galaxyStoreLinkValues?.link} target="_blank">
        <LazyLoadImage
          className="w-[160px] h-[45px] min-w-[160px] min-h-[45px] object-cover overflow-visible"
          src={getIconSRC(galaxyStoreLinkValues?.variant)}
          alt="appstore-img"
        />
      </a>
    </div>
  );
};

export default GalaxyStoreLink;
