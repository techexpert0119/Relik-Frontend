import { FC, useContext } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ChevronRight } from 'lucide-react';
import LinkedInLogo from '@/components/icons/linkedin-logo';
import Container from '../Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';

const LinkedInFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};

  return (
    <Container isPageThemeEnabled={true}>
      <a
        href={feature.values.linkedInValues?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center px-4 w-full min-h-[56px] gap-2"
      >
        {feature.values.linkedInValues?.image ? (
          <figure className="h-8 w-8 overflow-hidden rounded-full">
            <LazyLoadImage
              src={getPublicImageURL(feature.values.linkedInValues?.image)}
              alt={feature.values.linkedInValues?.title}
              className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full border border-gray-300 object-cover"
            />
          </figure>
        ) : (
          <figure className="h-8 w-8">
            <LinkedInLogo
              color={page?.theme.buttonFontColor}
              height={32}
              width={32}
            />
          </figure>
        )}

        <div className="font-[400] text-md truncate">
          {feature.values?.linkedInValues?.title}
        </div>
        <figure className="h-8 w-8">
          <ChevronRight className="h-8 w-8" />
        </figure>
      </a>
    </Container>
  );
};

export default LinkedInFeature;
