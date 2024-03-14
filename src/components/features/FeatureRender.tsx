import { FC } from 'react';
import ContactFeature from './contact-form/ContactFeature';
import MailToLinkFeature from './link/MailToLinkFeature';
import CallLinkFeature from './link/CallLinkFeature';
import SmsLinkFeature from './link/SmsLinkFeature';
import EventLinkFeature from './link/EventLinkFeature';
import PaidMessageFeature from './paid-message/PaidMessageFeature';
import VideoFeature from './video/VideoFeature';
import HtmlFeature from './html/HtmlFeature';
import { IFeature } from '@/data/dtos/feature';
import { PageFeatureType } from '@/data/enums/page-features';
import HeaderFeature from '@/components/header/HeaderFeature';
import LinkFeature from '@/components/features/link/LinkFeature';
import AppStoreLink from '@/components/features/app-link/AppStoreLink';
import GoogleStoreLink from '@/components/features/app-link/GoogleStoreLink';
import HuaweiStoreLink from '@/components/features/app-link/HuaweiStoreLink';
import GalaxyStoreLink from '@/components/features/app-link/GalaxyStoreLink';
import LinkedInFeature from '@/components/features/link/LinkedInLinkFeature';
import TelegramLinkFeature from '@/components/features/link/TelegramLinkFeature';
import TwitchLinkFeature from '@/components/features/link/TwitchLinkFeature';
import TikTokLinkFeature from '@/components/features/link/TikTokLinkFeature';
import SlackLinkFeature from '@/components/features/link/SlackLinkFeature';
import ClubhouseLinkFeature from '@/components/features/link/ClubhouseLinkFeature';
import PinterestLinkFeature from '@/components/features/link/PinterestLinkFeature';
import FooterIconFeature from './footer-icon/FooterIconFeature';
import AudiomackFeature from './audiomack/AudiomackFeature';
import SpotifyFeature from './spotify/SpotifyFeature';
import AppleMusicFeature from './apple-music/AppleMusicFeature';
import YoutubeFeature from './youtube/YoutubeFeature';
import AudioFeature from './audio/AudioFeature';
import SmsShortCodeFeature from './sms-short-code-form/SmsShortCodeFeature';
import SubscribeToNewsFeature from './subscribe-to-news/SubscribeToNewsFeature';
import SocialHandlesFeature from '@/components/features/SocialHandlesFeature';
import InstagramLinkFeature from '@/components/features/link/InstagramLinkFeature';
import WhatsAppLinkFeature from '@/components/features/link/WhatsAppLinkFeature';
import XLinkFeature from '@/components/features/link/XLinkFeature';
import FacebookLinkFeature from '@/components/features/link/FacebookLinkFeature';

const FeatureRender: FC<{ feature: IFeature; preview?: boolean }> = ({
  feature,
  preview,
}) => {
  if (!feature.featureId) {
    return (
      <div className="border text-black flex bg-white justify-center items-center w-full min-h-[48px]">
        {feature._id} - NOT FOUND TYPE - UNIMPLEMENTED
      </div>
    );
  }

  switch (feature.featureId.component) {
    case PageFeatureType.HEADER:
      return <HeaderFeature feature={feature} preview={preview} />;

    case PageFeatureType.LINKEDIN:
      return <LinkedInFeature feature={feature} />;

    case PageFeatureType.LINK:
      return <LinkFeature feature={feature} />;

    case PageFeatureType.GALAXY_APP:
      return <GalaxyStoreLink feature={feature} />;

    case PageFeatureType.IOS_APP:
      return <AppStoreLink feature={feature} />;

    case PageFeatureType.FOOTER_ICON:
      return <FooterIconFeature feature={feature} />;

    //TODO: implement send button
    case PageFeatureType.CONTACT_FORM:
      return <ContactFeature feature={feature} />;

    case PageFeatureType.MAIL_TO:
      return <MailToLinkFeature feature={feature} />;

    case PageFeatureType.CALL_LINK:
      return <CallLinkFeature feature={feature} />;

    case PageFeatureType.SMS_LINK:
      return <SmsLinkFeature feature={feature} />;

    //TODO: implement send button
    case PageFeatureType.PAID_MESSAGE:
      return <PaidMessageFeature feature={feature} />;

    case PageFeatureType.EVENT:
      return <EventLinkFeature feature={feature} preview={preview} />;

    case PageFeatureType.VIDEO:
      return <VideoFeature feature={feature} />;

    case PageFeatureType.HTML:
      return <HtmlFeature feature={feature} />;

    case PageFeatureType.ANDROID_APP:
      return <GoogleStoreLink feature={feature} />;

    case PageFeatureType.HUAWEI_APP:
      return <HuaweiStoreLink feature={feature} />;

    case PageFeatureType.JOIN_TELEGRAM_CHANNEL:
      return <TelegramLinkFeature feature={feature} />;

    case PageFeatureType.JOIN_TO_TWITCH:
      return <TwitchLinkFeature feature={feature} />;

    case PageFeatureType.TIKTOK:
      return <TikTokLinkFeature feature={feature} />;

    case PageFeatureType.JOIN_TO_SLACK:
      return <SlackLinkFeature feature={feature} />;

    case PageFeatureType.JOIN_TO_CLUBHOUSE:
      return <ClubhouseLinkFeature feature={feature} />;

    case PageFeatureType.PINTEREST:
      return <PinterestLinkFeature feature={feature} />;

    case PageFeatureType.SPOTIFY:
      return <SpotifyFeature feature={feature} />;

    case PageFeatureType.AUDIOMACK:
      return <AudiomackFeature feature={feature} />;

    case PageFeatureType.AUDIO:
      return <AudioFeature feature={feature} />;

    case PageFeatureType.SMS_SHORT_CODE:
      return <SmsShortCodeFeature feature={feature} />;

    case PageFeatureType.APPLE_MUSIC:
      return <AppleMusicFeature feature={feature} />;

    case PageFeatureType.YOUTUBE:
      return <YoutubeFeature feature={feature} />;

    case PageFeatureType.SUBSCRIBE_TO_NEWS:
      return <SubscribeToNewsFeature feature={feature} />;

    case PageFeatureType.SOCIAL_HANDLES:
      return <SocialHandlesFeature feature={feature} preview={preview} />;

    case PageFeatureType.INSTAGRAM:
      return <InstagramLinkFeature feature={feature} />;

    case PageFeatureType.WHATSAPP:
      return <WhatsAppLinkFeature feature={feature} />;

    case PageFeatureType.X:
      return <XLinkFeature feature={feature} />;

    case PageFeatureType.FACEBOOK:
      return <FacebookLinkFeature feature={feature} />;

    default:
      return (
        <div className="border text-black flex bg-white justify-center items-center w-full min-h-[48px]">
          {feature.featureId.name} - UNIMPLEMENTED
        </div>
      );
  }
};

export default FeatureRender;
