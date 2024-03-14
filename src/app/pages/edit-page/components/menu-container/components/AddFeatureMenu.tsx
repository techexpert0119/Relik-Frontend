import { ChevronLeft, X } from 'lucide-react';
import React, { useContext } from 'react';
import { MenuContext } from '../../../../user-single-page/context/menu-context';
import { PageFeatureType } from '@/data/enums/page-features';
import HeaderForm from '@/components/feature-forms/HeaderForm';
import AppStoreAppForm from '@/components/feature-forms/AppStoreAppForm';
import FooterIconForm from '@/components/feature-forms/FooterIconForm';
import MailToForm from '@/components/feature-forms/MailToForm';
import CallLinkForm from '@/components/feature-forms/CallLinkForm';
import SmsLinkForm from '@/components/feature-forms/SmsLinkForm';
import VideoForm from '@/components/feature-forms/VideoForm';
import HtmlForm from '@/components/feature-forms/HtmlForm';
import AudiomackForm from '@/components/feature-forms/AudiomackForm';
import AppleMusicForm from '@/components/feature-forms/AppleMusicForm';
import PaidMessageForm from '@/components/feature-forms/PaidMessageForm';
import EventForm from '@/components/feature-forms/EventForm';
import AudioForm from '@/components/feature-forms/AudioForm';
import YoutubeForm from '@/components/feature-forms/YoutubeForm';
import SpotifyForm from '@/components/feature-forms/SpotifyForm';
import GoogleStoreLinkForm from '@/components/feature-forms/GoogleStoreLinkForm';
import HuaweiStoreLinkForm from '@/components/feature-forms/HuaweiStoreLinkForm';
import GalaxyStoreLinkForm from '@/components/feature-forms/GalaxyStoreLinkForm';
import ContactForm from '@/components/feature-forms/ContactForm';
import SubscribeToNewsForm from '@/components/feature-forms/SubscribeToNewsForm';
import { Button } from '@/components/ui/button';
import SmsShortCodeForm from '@/components/feature-forms/SmsShortCodeForm';
import GenericLinkForm from '@/components/feature-forms/components/GenericLinkForm';
import SocialHandlesForm from '@/components/feature-forms/components/social-handles-form/SocialHandlesForm';
import WhatsAppLinkForm from '@/components/feature-forms/WhatsAppLinkForm';

function renderFeatureForm(type?: PageFeatureType) {
  switch (type) {
    case PageFeatureType.LINK:
      return <GenericLinkForm type={PageFeatureType.LINK} />;

    case PageFeatureType.LINKEDIN:
      return <GenericLinkForm type={PageFeatureType.LINKEDIN} />;

    case PageFeatureType.FACEBOOK:
      return <GenericLinkForm type={PageFeatureType.FACEBOOK} />;

    case PageFeatureType.X:
      return <GenericLinkForm type={PageFeatureType.X} />;

    case PageFeatureType.WHATSAPP:
      return <WhatsAppLinkForm />;

    case PageFeatureType.HEADER:
      return <HeaderForm />;

    case PageFeatureType.FOOTER_ICON:
      return <FooterIconForm />;

    case PageFeatureType.GALAXY_APP:
      return <GalaxyStoreLinkForm />;

    case PageFeatureType.IOS_APP:
      return <AppStoreAppForm />;

    case PageFeatureType.ANDROID_APP:
      return <GoogleStoreLinkForm />;

    case PageFeatureType.HUAWEI_APP:
      return <HuaweiStoreLinkForm />;

    case PageFeatureType.JOIN_TELEGRAM_CHANNEL:
      return <GenericLinkForm type={PageFeatureType.JOIN_TELEGRAM_CHANNEL} />;

    case PageFeatureType.JOIN_TO_TWITCH:
      return <GenericLinkForm type={PageFeatureType.JOIN_TO_TWITCH} />;

    case PageFeatureType.TIKTOK:
      return <GenericLinkForm type={PageFeatureType.TIKTOK} />;

    case PageFeatureType.JOIN_TO_SLACK:
      return <GenericLinkForm type={PageFeatureType.JOIN_TO_SLACK} />;

    case PageFeatureType.JOIN_TO_CLUBHOUSE:
      return <GenericLinkForm type={PageFeatureType.JOIN_TO_CLUBHOUSE} />;

    case PageFeatureType.CONTACT_FORM:
      return <ContactForm />;

    case PageFeatureType.MAIL_TO:
      return <MailToForm />;

    case PageFeatureType.CALL_LINK:
      return <CallLinkForm />;

    case PageFeatureType.SMS_LINK:
      return <SmsLinkForm />;

    case PageFeatureType.PINTEREST:
      return <GenericLinkForm type={PageFeatureType.PINTEREST} />;

    case PageFeatureType.PAID_MESSAGE:
      return <PaidMessageForm />;

    case PageFeatureType.EVENT:
      return <EventForm />;

    case PageFeatureType.VIDEO:
      return <VideoForm />;

    case PageFeatureType.HTML:
      return <HtmlForm />;

    case PageFeatureType.AUDIOMACK:
      return <AudiomackForm />;

    case PageFeatureType.SPOTIFY:
      return <SpotifyForm />;

    case PageFeatureType.AUDIO:
      return <AudioForm />;

    case PageFeatureType.SMS_SHORT_CODE:
      return <SmsShortCodeForm />;

    case PageFeatureType.APPLE_MUSIC:
      return <AppleMusicForm />;

    case PageFeatureType.YOUTUBE:
      return <YoutubeForm />;

    case PageFeatureType.SUBSCRIBE_TO_NEWS:
      return <SubscribeToNewsForm />;

    case PageFeatureType.SOCIAL_HANDLES:
      return <SocialHandlesForm />;

    case PageFeatureType.INSTAGRAM:
      return <GenericLinkForm type={PageFeatureType.INSTAGRAM} />;

    default:
      return <h1 className="text-white">UNDEFINED</h1>;
  }
}

const AddFeatureMenu = () => {
  const { options, setMenuType } = useContext(MenuContext) ?? {};

  const close = () => setMenuType?.(null);
  const goBack = () =>
    setMenuType?.('select-feature', { orderToPlace: options?.orderToPlace });

  return (
    <section className="bg-primary p-4 rounded-md flex flex-col gap-2 relative max-w-[496px] w-full">
      <header className="flex flex-1 justify-between items-center text-gray-200">
        <div className="flex items-center gap-2">
          {options?.canGoBack && (
            <Button
              className="text-gray-200"
              variant="ghost"
              size="icon"
              onClick={goBack}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-xl">
            {options?.featureId ? 'Edit' : 'Add'}
            {options?.featureName ? (
              <span> {options?.featureName}</span>
            ) : (
              'feature'
            )}
          </h1>
        </div>
        <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </header>
      {renderFeatureForm(options?.featureType)}
    </section>
  );
};

export default AddFeatureMenu;
