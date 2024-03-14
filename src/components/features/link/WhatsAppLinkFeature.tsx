import { FC, useContext, useRef } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ChevronRight } from 'lucide-react';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import WhatsAppLogo from '@/components/icons/whats-app-logo';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPublicImageURL } from '@/lib/utils';
import { ICountry } from '@/data/interfaces/country';

const WhatsAppLinkFeature: FC<{ feature: IFeature }> = ({ feature }) => {
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

  const country = feature.values.whatsAppLinkValues?.phone
    ?.country as unknown as ICountry;

  return (
    <div className="flex flex-grow px-[24px]">
      <a
        href={`https://wa.me/${country?.dial_code}${feature.values.whatsAppLinkValues?.phone?.number}`}
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
        className="flex justify-between items-center px-4 w-full min-h-[56px] gap-2"
      >
        {feature.values.whatsAppLinkValues?.image ? (
          <figure className="h-8 w-8 overflow-hidden rounded-full">
            <LazyLoadImage
              src={getPublicImageURL(feature.values.whatsAppLinkValues?.image)}
              alt="link-img"
              className="h-full w-full object-cover"
            />
          </figure>
        ) : (
          <figure className="h-8 w-8">
            <WhatsAppLogo
              className="h-8 w-8"
              color={page?.theme.buttonFontColor}
              height={32}
              width={32}
            />
          </figure>
        )}
        <div className="font-[400] text-md truncate">
          {feature.values.whatsAppLinkValues?.title}
        </div>
        <figure className="h-8 w-8">
          <ChevronRight className="h-8 w-8" />
        </figure>
      </a>
    </div>
  );
};

export default WhatsAppLinkFeature;
