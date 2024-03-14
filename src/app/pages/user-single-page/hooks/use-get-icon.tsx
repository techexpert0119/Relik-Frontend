import link from '@/assets/svg/features/Link.svg';
import header from '@/assets/svg/features/header.svg';
import footer from '@/assets/svg/features/footer.svg';
import ios from '@/assets/svg/features/ios.svg';
import android from '@/assets/svg/features/android.svg';
import contact from '@/assets/svg/features/contact-form.svg';
import mail from '@/assets/svg/features/mail-to.svg';
import call from '@/assets/svg/features/call-link.svg';
import sms from '@/assets/svg/features/sms-link.svg';
import smsShortCode from '@/assets/svg/features/sms-short-code.svg';
import paidMessage from '@/assets/svg/features/paid-message.svg';
import event from '@/assets/svg/features/event.svg';
import video from '@/assets/svg/features/video.svg';
import html from '@/assets/svg/features/html.svg';
import audio from '@/assets/svg/features/headphones.svg';
import appleMusic from '@/assets/svg/features/apple-music.svg';
import spotify from '@/assets/svg/features/spotify.svg';
import youtube from '@/assets/svg/features/youtube.svg';
import audiomac from '@/assets/svg/features/audiomack.svg';
import deezer from '@/assets/svg/features/deezer.svg';
import pandora from '@/assets/svg/features/pandora.png';
import boomplay from '@/assets/svg/features/boomplay.png';
import platX from '@/assets/svg/features/platx.png';
import product from '@/assets/svg/features/product.svg';
import whatsapp from '@/assets/svg/features/whatsapp.svg';
import facebook from '@/assets/svg/features/facebook.svg';
import linkedin from '@/assets/svg/features/linkedin.svg';
import x from '@/assets/svg/features/twitter.svg';
import tiktok from '@/assets/svg/features/tiktok.svg';
import pinterest from '@/assets/svg/features/pinterest.svg';
import telegramChannel from '@/assets/svg/features/telegram.svg';
import twitch from '@/assets/svg/features/twitch.svg';
import slack from '@/assets/svg/features/slack.svg';
import clubhouse from '@/assets/svg/features/clubhouse.svg';
import news from '@/assets/svg/features/subscribe-to-news.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UseGetIcon() {
  function getIcon(component: string) {
    switch (component) {
      case 'LINK':
        return <LazyLoadImage className="w-8 h-8" alt="link" src={link} />;
      case 'HEADER':
        return <LazyLoadImage className="w-8 h-8" alt="header" src={header} />;
      case 'FOOTER_ICON':
        return <LazyLoadImage className="w-8 h-8" alt="footer" src={footer} />;
      case 'IOS_APP':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={ios} />;
      case 'ANDROID_APP':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={android} />;
      case 'CONTACT_FORM':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={contact} />;
      case 'MAIL_TO':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={mail} />;
      case 'CALL_LINK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={call} />;
      case 'SMS_LINK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={sms} />;
      case 'SMS_SHORT_CODE':
        return (
          <LazyLoadImage className="w-8 h-8" alt="icon" src={smsShortCode} />
        );
      case 'PAID_MESSAGE':
        return (
          <LazyLoadImage className="w-8 h-8" alt="icon" src={paidMessage} />
        );
      case 'EVENT':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={event} />;
      case 'VIDEO':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={video} />;
      case 'HTML':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={html} />;
      case 'AUDIO':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={audio} />;
      case 'APPLE_MUSIC':
        return (
          <LazyLoadImage className="w-8 h-8" alt="icon" src={appleMusic} />
        );
      case 'SPOTIFY':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={spotify} />;
      case 'YOUTUBE':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={youtube} />;
      case 'AUDIOMACK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={audiomac} />;
      case 'DEEZER':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={deezer} />;
      case 'PANDORA':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={pandora} />;
      case 'BOOMPLAY':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={boomplay} />;
      case 'PLAT_X_PAY':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={platX} />;
      case 'PRODUCT':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={product} />;
      case 'WHATSAPP':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={whatsapp} />;
      case 'FACEBOOK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={facebook} />;
      case 'LINKEDIN':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={linkedin} />;
      case 'X':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={x} />;
      case 'TIKTOK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={tiktok} />;
      case 'PINTEREST':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={pinterest} />;
      case 'JOIN_TELEGRAM_CHANNEL':
        return (
          <LazyLoadImage className="w-8 h-8" alt="icon" src={telegramChannel} />
        );
      case 'JOIN_TO_TWITCH':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={twitch} />;
      case 'JOIN_TO_X_SPACE':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={x} />;
      case 'JOIN_TO_SLACK':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={slack} />;
      case 'JOIN_TO_CLUBHOUSE':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={clubhouse} />;
      case 'SUBSCRIBE_TO_NEWS':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={news} />;
      case 'SLIDER':
        return <LazyLoadImage className="w-8 h-8" alt="icon" src={html} />;
    }
  }
  return { getIcon };
}

export default UseGetIcon;
