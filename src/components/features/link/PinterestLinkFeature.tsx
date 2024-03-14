import React, { FC, useContext } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ChevronRight } from 'lucide-react';
import PinterestLogo from '@/components/icons/pinterest-logo';
import Container from '../Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';

const PinterestLinkFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};

  return (
    <Container isPageThemeEnabled={true}>
      <a
        href={feature.values.pinterestValues?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center px-4 w-full min-h-[56px] gap-2"
      >
        {feature.values.pinterestValues?.image ? (
          <figure className="h-8 w-8 overflow-hidden rounded-full">
            <LazyLoadImage
              src={getPublicImageURL(feature.values.pinterestValues?.image)}
              alt="link-img"
              className="h-full w-full object-cover"
            />
          </figure>
        ) : (
          <figure className="h-[26px] w-8">
            <PinterestLogo
              color={page?.theme.buttonFontColor}
              height={26}
              width={32}
            />
          </figure>
        )}
        <div className="font-[400] text-md truncate">
          {feature.values?.pinterestValues?.title}
        </div>
        <figure className="h-8 w-8 ">
          <ChevronRight className="h-8 w-8" />
        </figure>
      </a>
    </Container>
  );
};

export default PinterestLinkFeature;
