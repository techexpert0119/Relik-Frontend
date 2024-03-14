import { PageFeatureType } from '../enums/page-features';
import { AppLinkVariant } from '@/data/enums/app-link-variant';

export interface IFeature {
  _id: string;
  pageId: string;
  order: number;
  values: IFeatureValues;
  featureId: IRowFeature;
  updatedAt: Date;
}

export interface IFeatureElement {
  id: string;
  elementName: string;
}
export interface IRowFeature {
  _id: string;
  component: PageFeatureType;
  featureGroup: string[];
  featureElement: IFeatureElement[];
  name: string;
  isVisible: boolean;
}

export enum IVideoLink {
  EMBEDDED = 'EMBEDDED',
  IFRAME = 'IFRAME',
  LINK = 'LINK',
}

export interface IFeatureValues {
  linkValues?: {
    title: string;
    link: string;
    image?: string;
  };

  instagramLinkValues?: {
    title: string;
    link: string;
    image?: string;
  };

  socialHandlesValues?: {
    facebookLink?: string;
    instagramLink?: string;
    xLink?: string;
    whatsAppLink?: { country: string; number: number };
    snapchatLink?: string;
    youtubeLink?: string;
    tiktokLink?: string;
    twitchLink?: string;
    redditLink?: string;
    threadsLink?: string;
    telegramLink?: { country: string; number: number };
    linkedInLink?: string;
  };

  linkedInValues?: {
    title: string;
    link: string;
    image?: string;
  };

  pinterestValues?: {
    title: string;
    link: string;
    image?: string;
  };

  clubhouseValues?: {
    title: string;
    link: string;
    image?: string;
  };

  slackValues?: {
    title: string;
    link: string;
    image?: string;
  };

  tikTokValues?: {
    title: string;
    link: string;
    image?: string;
  };

  telegramValues?: {
    title: string;
    link: string;
    image?: string;
  };

  twitchValues?: {
    title: string;
    link: string;
    image?: string;
  };

  whatsAppLinkValues?: {
    title: string;
    phone: { country: string; number: number };
    image?: string;
  };

  xLinkValues?: {
    title: string;
    link: string;
    image?: string;
  };

  youtubeLinkValues?: {
    title: string;
    link: string;
    image?: string;
  };

  facebookLinkValues?: {
    title: string;
    link: string;
    image?: string;
  };

  headerValues?: {
    title: string;
  };

  footerValues?: {
    photo?: string;
    title: string;
    link: string;
  };

  iosAppValues?: {
    variant: AppLinkVariant;
    link: string;
  };

  appLinkValues?: {
    variant: AppLinkVariant;
    link: string;
  };

  googleStoreLinkValues?: {
    variant: AppLinkVariant;
    link: string;
  };

  huaweiStoreLinkValues?: {
    variant: AppLinkVariant;
    link: string;
  };

  galaxyStoreLinkValues?: {
    variant: AppLinkVariant;
    link: string;
  };

  contactValues?: {
    title: string;
    fields: {
      name: { isActive: boolean; isRequired: boolean };
      emailAddress: { isActive: boolean; isRequired: boolean };
      mobile: { isActive: boolean; isRequired: boolean };
      message: { isActive: boolean; isRequired: boolean };
      country: { isActive: boolean; isRequired: boolean };
    };
    emailAddress: string;
    description?: string;
    thankYouMessage?: string;
  };

  mailToValues?: {
    photo?: string;
    title: string;
    emailAddress: string;
    subject?: string;
    body?: string;
  };

  callLinkValues?: {
    photo?: string;
    title: string;
    phone: { country: string; number: number };
  };

  smsLinkValues?: {
    photo?: string;
    title: string;
    phone: { country: string; number: number };
  };

  smsShortCodeValues?: {
    photo?: string;
    title: string;
    isHideInternationalPhoneNumber: boolean;
    phoneNumber?: string;
    shortCodes: {
      country: string;
      operators: { name: string; price: number; shortCode: number }[];
    }[];
    backgroundColor?: string;
    fontColor?: string;
  };

  paidMessageValues?: {
    title: string;
    isShowAsListItem: boolean;
    price: number;
    isPredefinedMessage?: boolean;
    predefinedMessage?: string;
    emailAddress: string;
    description?: string;
    thankYouMessage?: string;
  };

  eventValues?: {
    title: string;
    date: string;
    country: string;
    city: string;
    location: string;
    link: string;
    backgroundColor?: string;
    fontColor?: string;
  };

  videoValues?: {
    title: string;
    videoIframe: string;
  };

  htmlValues?: {
    title: string;
    html: string;
  };

  audioValues?: {
    photo?: string;
    title: string;
    file: string;
    audioTitle: string;
    audioAuthor: string;
    isImageAsBackground: boolean;
  };

  appleMusicValues?: {
    title: string;
    linkType: IVideoLink;
    embeddedOrIframeLink: string;
  };

  spotifyValues?: {
    title: string;
    linkType: IVideoLink;
    embeddedOrIframeLink: string;
    width: number;
    height: number;
  };

  youtubeValues?: {
    photo?: string;
    title: string;
    linkType: IVideoLink;
    embeddedOrIframeLink: string;
    width: number;
    height: number;
    isAutoplay: boolean;
    isShowPlayerControls: boolean;
    isAllowFullscreen: boolean;
  };

  audiomackValues?: {
    title: string;
    iframe: string;
  };

  subscribeToNewsValues?: {
    image?: string;
    title: string;
    link: string;
    description?: string;
    thankYouMessage?: string;
  };

  subscribeToNewsFeatureValues?: {
    emailAddress: string;
  };
}

export type FeatureFormValues = {
  header?: string;
  link?: string;
  photo?: string;
  title?: string;
};
