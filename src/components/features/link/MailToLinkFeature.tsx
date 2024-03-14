import { FC, useContext, useMemo } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ChevronRight, Mail } from 'lucide-react';
import Container from '../Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';

const MailToLinkFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};

  const url = useMemo(() => {
    const arr = [`mailto:${feature.values.mailToValues?.emailAddress}`];

    if (feature.values.mailToValues?.body) {
      arr.push(`?body=${feature.values.mailToValues?.body}`);
    }

    if (feature.values.mailToValues?.subject) {
      arr.push(
        arr.length === 1
          ? `?subject=${feature.values.mailToValues?.subject}`
          : `&subect=${feature.values.mailToValues?.subject}`
      );
    }

    return arr.join('');
  }, [
    feature.values.mailToValues?.emailAddress,
    feature.values.mailToValues?.body,
    feature.values.mailToValues?.subject,
  ]);

  return (
    <Container isPageThemeEnabled>
      <a
        href={url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center px-4 w-full min-h-[56px] gap-2"
      >
        {feature.values.mailToValues?.photo ? (
          <figure className="h-8 w-8 overflow-hidden rounded-full">
            <LazyLoadImage
              src={getPublicImageURL(feature.values.mailToValues?.photo)}
              alt={feature.values.mailToValues?.title}
              className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full object-cover"
            />
          </figure>
        ) : (
          <figure className="h-7 w-8">
            <Mail color={page?.theme.buttonFontColor} height={28} width={32} />
          </figure>
        )}
        <div className="font-[400] text-base truncate">
          {feature.values.mailToValues?.title}
        </div>
        <figure className="h-8 w-8">
          <ChevronRight height={32} width={32} />
        </figure>
      </a>
    </Container>
  );
};

export default MailToLinkFeature;
