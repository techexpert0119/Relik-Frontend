import { CSSProperties, FC, useContext, useRef } from 'react';
import { IFeature } from '@/data/dtos/feature';
import XLogo from '@/components/icons/x-logo';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import FacebookLogo from '@/components/icons/facebook-logo';
import { InstagramIcon } from 'lucide-react';
import WhatsAppLogo from '@/components/icons/whats-app-logo';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import SnapchatLogo from '@/components/icons/snapchat-logo';
import TikTokLogo from '@/components/icons/tiktok-logo';
import TwitchLogo from '@/components/icons/twitch-logo';
import RedditLogo from '@/components/icons/reddit-logo';
import ThreadsLogo from '@/components/icons/threads-logo';
import TelegramLogo from '@/components/icons/telegram-logo';
import LinkedInLogo from '@/components/icons/linkedin-logo';
import YoutubeLogo from '@/components/icons/youtube-logo';
import { ICountry } from '@/data/interfaces/country';

const SocialHandlesFeature: FC<{ feature: IFeature; preview?: boolean }> = ({
  feature,
  preview,
}) => {
  const shadow = useRef('');
  const radius = useRef('');
  const border = useRef('');
  const { page } = useContext(PageContext) ?? {};
  const {
    xLink,
    facebookLink,
    instagramLink,
    whatsAppLink,
    youtubeLink,
    tiktokLink,
    twitchLink,
    redditLink,
    threadsLink,
    telegramLink,
    snapchatLink,
    linkedInLink,
  } = feature.values.socialHandlesValues ?? {};

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

  const iconProps: { color: string; style: CSSProperties } = {
    color: page?.theme.buttonFontColor ?? 'black',
    style: {
      height: 28,
      width: 28,
    },
  };

  const whatsapp_country = whatsAppLink?.country as unknown as ICountry;
  const telegram_country = telegramLink?.country as unknown as ICountry;

  const iconContainerProps: { style: CSSProperties } = {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      backgroundColor: page?.theme.buttonBackground,
      boxShadow: shadow.current,
      borderRadius: radius.current,
      borderWidth: border.current,
      borderStyle: 'solid',
      borderColor: page?.theme.buttonFontColor,
    },
  };

  return (
    <div
      className={`flex flex-wrap justify-center gap-[10px] ${preview ? 'max-w-[300px]' : 'max-w-[382px]'} ml-auto mr-auto`}
    >
      {facebookLink && (
        <a {...iconContainerProps} target="_blank" href={facebookLink}>
          <FacebookLogo {...iconProps} />
        </a>
      )}

      {instagramLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(instagramLink, 'https://www.instagram.com/')}
        >
          <InstagramIcon {...iconProps} />
        </a>
      )}

      {xLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(xLink, 'https://www.x.com/')}
        >
          <XLogo {...iconProps} />
        </a>
      )}

      {whatsAppLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={`https://wa.me/${whatsapp_country?.dial_code}${whatsAppLink?.number}`}
        >
          <WhatsAppLogo {...iconProps} />
        </a>
      )}

      {snapchatLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(snapchatLink, 'https://www.snapchat.com/add/')}
        >
          <SnapchatLogo {...iconProps} />
        </a>
      )}

      {youtubeLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(youtubeLink, 'https://www.youtube.com/@')}
        >
          <YoutubeLogo {...iconProps} />
        </a>
      )}

      {tiktokLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(tiktokLink, 'https://www.tiktok.com/@')}
        >
          <TikTokLogo {...iconProps} />
        </a>
      )}

      {twitchLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(twitchLink, 'https://www.twitch.com/')}
        >
          <TwitchLogo {...iconProps} />
        </a>
      )}

      {redditLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(redditLink, 'https://www.reddit.com/u/')}
        >
          <RedditLogo {...iconProps} />
        </a>
      )}

      {telegramLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={`https://t.me/${telegram_country?.dial_code}${telegramLink?.number}`}
        >
          <TelegramLogo {...iconProps} />
        </a>
      )}

      {threadsLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(threadsLink, 'https://www.threads.net/@')}
        >
          <ThreadsLogo {...iconProps} />
        </a>
      )}

      {linkedInLink && (
        <a
          {...iconContainerProps}
          target="_blank"
          href={renderLink(linkedInLink, 'https://www.linkedin.com/in/')}
        >
          <LinkedInLogo {...iconProps} />
        </a>
      )}
    </div>
  );
};

export default SocialHandlesFeature;

function renderLink(link: string, linkPrefix: string): string {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link;
  }

  return `${linkPrefix}${link}`;
}
