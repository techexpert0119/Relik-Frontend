import { FC, useContext } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';

const FooterIconFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};

  return (
    <a
      className="flex flex-col flex-grow justify-center items-center px-6"
      style={{ color: page?.theme.fontColor }}
      href={feature.values.footerValues?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {feature.values.footerValues?.photo && (
        <LazyLoadImage
          alt={feature.values.footerValues?.title}
          src={getPublicImageURL(feature.values.footerValues?.photo)}
          className="w-[65px] h-[65px] min-w-[65px] min-h-[65px] rounded-full border border-gray-300 object-cover"
        />
      )}
      <p className="text-base">{feature.values.footerValues?.title}</p>
    </a>
  );
};

export default FooterIconFeature;
