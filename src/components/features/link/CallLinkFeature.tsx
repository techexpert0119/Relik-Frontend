import { FC, useContext, useRef } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ChevronRight, PhoneCall } from 'lucide-react';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import { ICountry } from '@/data/interfaces/country';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';

const CallLinkFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};
  const shadow = useRef('');
  const radius = useRef('');
  const border = useRef('');

  switch (page?.theme.buttonShadow) {
    case ButtonShadowVariant.Hard:
      shadow.current = '#000 8px 8px';
      break;
    case ButtonShadowVariant.Soft:
      shadow.current = '0px 2px 11px 0px rgba(0, 0, 0, 0.125)';
      break;
    case ButtonShadowVariant.None:
      shadow.current = '';
      break;
  }

  switch (page?.theme.buttonRadius) {
    case ButtonRadiusVariant.Full:
      radius.current = '9999px';
      break;
    case ButtonRadiusVariant.Rounded:
      radius.current = '12px';
      break;
    case ButtonRadiusVariant.None:
      radius.current = '0';
  }

  switch (page?.theme.buttonBorder) {
    case ButtonBorderVariant.Thin:
      border.current = '1px';
      break;
    case ButtonBorderVariant.None:
      border.current = '';
      break;
  }

  const country = feature.values.callLinkValues?.phone
    ?.country as unknown as ICountry;

  return (
    <div className="flex flex-grow px-[24px]">
      <a
        href={`tel:${country?.dial_code}${feature.values.callLinkValues?.phone?.number}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: page?.theme.buttonBackground,
          color: page?.theme.buttonFontColor,
          boxShadow: shadow.current,
          borderRadius: radius.current,
          borderWidth: border.current,
          borderStyle: 'solid',
          borderColor: page?.theme.buttonFontColor,
        }}
        className="flex justify-between items-center px-4 w-full min-h-[56px] text-center gap-2"
      >
        {feature.values.callLinkValues?.photo ? (
          <figure className="h-8 w-8 overflow-hidden rounded-full">
            <LazyLoadImage
              src={getPublicImageURL(feature.values.callLinkValues?.photo)}
              alt={feature.values.callLinkValues?.title}
              className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full border border-gray-300 object-cover"
            />
          </figure>
        ) : (
          <figure className="h-6 w-8">
            <PhoneCall
              color={page?.theme.buttonFontColor}
              height={24}
              width={32}
            />
          </figure>
        )}

        <div className="font-[400] text-base truncate">
          {feature.values.callLinkValues?.title}
        </div>
        <figure className="h-8 w-8">
          <ChevronRight height={32} width={32} />
        </figure>
      </a>
    </div>
  );
};

export default CallLinkFeature;
