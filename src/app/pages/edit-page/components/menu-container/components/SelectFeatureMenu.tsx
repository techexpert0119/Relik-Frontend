import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { PageContext } from '../../../../user-single-page/context/page-context';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';
import { Button } from '@/components/ui/button';
import { GripHorizontal, Link, Search, X } from 'lucide-react';
import { getFeatureQuery } from '@/services/api/features';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFeatureGroupsQuery } from '@/services/api/feature-group';
import { PageFeatureType } from '@/data/enums/page-features';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import { IRowFeature } from '@/data/dtos/feature';
import { cn } from '@/lib/utils';
import FacebookLogo from '@/components/icons/facebook-logo';
import XLogo from '@/components/icons/x-logo';
import WhatsAppLogo from '@/components/icons/whats-app-logo';
import huaweiLogo from '/icons/huawei-store.svg';
import galaxyStoreLogo from '/icons/galaxy-store.svg';
import LinkedInLogo from '@/components/icons/linkedin-logo';
import TelegramLogo from '@/components/icons/telegram-logo';
import TwitchLogo from '@/components/icons/twitch-logo';
import TikTokLogo from '@/components/icons/tiktok-logo';
import SlackLogo from '@/components/icons/slack-logo';
import ClubhouseLogo from '@/components/icons/clubhouse-logo';
import PinterestLogo from '@/components/icons/pinterest-logo';
import audioMackLogo from '@/assets/svg/features/audiomack.svg';
import InstagramLogo from '@/components/icons/instagram-logo';
import YoutubeLogo from '@/components/icons/youtube-logo';
import AudioLogo from '@/components/icons/audio-logo';
import SubscribeToNewsIcon from '@/components/icons/subscribe-to-news-icon';
import VideoIcon from '@/components/icons/video-icon';
import HtmlIcon from '@/components/icons/html-icon';
import SpotifyLogo from '@/components/icons/spotify-logo';
import SmsIcon from '@/components/icons/sms-icon';
import SmsLinkIcon from '@/components/icons/sms-link-icon';
import CallLinkIcon from '@/components/icons/call-link';
import AppleMusicIcon from '@/components/icons/apple-music-icon';
import FooterIcon from '@/components/icons/footer-icon';
import HeaderIcon from '@/components/icons/header-icon';
import IOSIcon from '@/components/icons/ios-icon';
import AndroidIcon from '@/components/icons/android-icon';
import ContactFormIcon from '@/components/icons/contact-form-icon';
import MailToIcon from '@/components/icons/mail-to-icon';
import EventIcon from '@/components/icons/event-icon';
import PaidMessageIcon from '@/components/icons/paid-message';
import ComingSoonTooltip from '@/components/features/components/ComingSoonTooltip';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SelectFeatureMenu = () => {
  const context = useContext(PageContext);
  const { setMenuType, options, setPreviousId, previousId } =
    useContext(MenuContext) ?? {};
  const { data: featuresList } = getFeatureQuery();
  const { data: featureGroups } = getFeatureGroupsQuery();
  const [filteredData, setFilteredData] = useState<IRowFeature[]>([]);
  const [featureGroup, setFeatureGroup] = useState<string>();
  const [searchText, setSearchText] = React.useState('');
  const [debouncedValue] = useDebounce(searchText, 300);
  const [previousElementId, setPreviousElementId] = useState<
    string | undefined
  >(undefined);
  const iconProps = { strokeWidth: 1.5, className: 'h-8 w-8' };

  useEffect(() => {
    if (featuresList) {
      setFilteredData(featuresList.data);
      setPreviousElementId(previousId);
    }
  }, [featuresList]);

  useEffect(() => {
    setFilteredData(
      featuresList?.data.filter(
        (s) =>
          (debouncedValue
            ? s.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
              s.featureElement.filter((e) =>
                e.elementName.includes(debouncedValue.toLowerCase())
              ).length > 0
            : true) &&
          (featureGroup ? s.featureGroup.includes(featureGroup) : true)
      ) ?? []
    );
  }, [debouncedValue, featureGroup]);

  const showAll = () => {
    featuresList?.data && setFilteredData([...featuresList.data]);
    setFeatureGroup(undefined);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);
  const close = () => setMenuType?.(null);

  if (!context) return null;

  return (
    <section className="bg-primary p-4 rounded-md flex flex-col gap-2 relative max-w-[496px] max-h-[70vh] w-full">
      <header className="flex flex-1 justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">Add Element</h1>
        </div>

        <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex flex-col p-2.5 gap-4">
        <div className="relative">
          <Search className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
          <Input
            className="pl-12"
            placeholder="Search"
            onChange={handleChange}
            value={searchText}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={showAll}
            className={cn(
              'text-[12px] font-light bg-white rounded-full py-1 px-[12px]',
              featureGroup === undefined && 'bg-[#334155] text-white'
            )}
          >
            All
          </button>
          {featureGroups?.map((fg) => (
            <button
              onClick={() => setFeatureGroup(fg._id)}
              key={fg._id}
              className={cn(
                'text-[12px] font-light bg-white rounded-full py-1 px-[12px]',
                featureGroup === fg._id && 'bg-[#334155] text-white'
              )}
            >
              {fg.groupName}
            </button>
          ))}
        </div>
      </div>
      <ScrollArea className="h-[40vh]" previousId={previousElementId}>
        <div className="grid grid-cols-4 gap-2">
          {filteredData?.map((item) => (
            <button
              key={item._id}
              id={item._id}
              className="flex flex-col items-center gap-2 hover:opacity-90"
              onClick={() => {
                if (!item.isVisible) return;

                setPreviousId?.(item._id);
                setMenuType?.('add-feature', {
                  featureName: item.name,
                  featureType: item.component,
                  canGoBack: true,
                  orderToPlace: options?.orderToPlace,
                });
              }}
            >
              {item.isVisible ? (
                <div className="h-[64px] w-[64px] sm:h-[80px] sm:w-[80px] bg-white rounded-md flex items-center justify-center">
                  {renderFeatureIcon(item.component, iconProps)}
                </div>
              ) : (
                <div className="h-[64px] w-[64px] sm:h-[80px] sm:w-[80px] bg-[#3D434A] rounded-md flex flex-col">
                  <ComingSoonTooltip>
                    <div
                      className="bg-white w-full rounded-t p-0 sm:p-1 "
                      style={{ fontSize: '10px' }}
                    >
                      Coming Soon...
                    </div>
                  </ComingSoonTooltip>

                  <div className="flex flex-col items-center content-center justify-center	h-full justify-items-center">
                    {renderFeatureIcon(item.component, {
                      ...iconProps,
                      className: 'w-6 h-6 text-white',
                      color: '#565F6A',
                    })}
                  </div>
                </div>
              )}
              <p className="text-center text-white text-sm">{item.name}</p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default SelectFeatureMenu;

function renderFeatureIcon(
  type: PageFeatureType,
  iconProps: {
    strokeWidth: number;
    className: string;
    color?: string;
  }
) {
  switch (type) {
    case PageFeatureType.HEADER:
      return <HeaderIcon {...iconProps} />;

    case PageFeatureType.FOOTER_ICON:
      return <FooterIcon {...iconProps} />;

    case PageFeatureType.CONTACT_FORM:
      return <ContactFormIcon {...iconProps} />;

    case PageFeatureType.MAIL_TO:
      return <MailToIcon {...iconProps} />;

    case PageFeatureType.HTML:
      return <HtmlIcon {...iconProps} />;

    case PageFeatureType.EVENT:
      return <EventIcon height={41} />;

    case PageFeatureType.SMS_LINK:
      return <SmsLinkIcon {...iconProps} height={48} />;

    case PageFeatureType.CALL_LINK:
      return <CallLinkIcon {...iconProps} />;

    case PageFeatureType.FACEBOOK:
      return <FacebookLogo color="black" height={42} />;

    case PageFeatureType.X:
      return <XLogo color="black" height={24} />;

    case PageFeatureType.WHATSAPP:
      return <WhatsAppLogo color="black" height={42} />;

    case PageFeatureType.ANDROID_APP:
      return <AndroidIcon height={33} />;

    case PageFeatureType.HUAWEI_APP:
      return (
        <LazyLoadImage src={huaweiLogo} alt="huawei" height={62} width={62} />
      );

    case PageFeatureType.GALAXY_APP:
      return (
        <LazyLoadImage
          src={galaxyStoreLogo}
          alt="galaxy"
          height={42}
          width={42}
        />
      );

    case PageFeatureType.LINK:
      return <Link {...iconProps} strokeWidth={2} />;

    case PageFeatureType.LINKEDIN:
      return <LinkedInLogo color="black" height={48} />;

    case PageFeatureType.JOIN_TELEGRAM_CHANNEL:
      return <TelegramLogo height={45} color="black" className="rounded-md" />;

    case PageFeatureType.JOIN_TO_TWITCH:
      return <TwitchLogo height={32} />;

    case PageFeatureType.TIKTOK:
      return <TikTokLogo height={54} color="black" />;

    case PageFeatureType.JOIN_TO_SLACK:
      return <SlackLogo height={54} color="black" />;

    case PageFeatureType.JOIN_TO_CLUBHOUSE:
      return <ClubhouseLogo height={64} />;

    case PageFeatureType.PINTEREST:
      return <PinterestLogo height={34} />;

    case PageFeatureType.SOCIAL_HANDLES:
      return <GripHorizontal className="h-8 w-8" />;

    case PageFeatureType.IOS_APP:
      return <IOSIcon {...iconProps} />;

    case PageFeatureType.PAID_MESSAGE:
      return <PaidMessageIcon {...iconProps} />;

    case PageFeatureType.VIDEO:
      return <VideoIcon {...iconProps} />;

    case PageFeatureType.SPOTIFY:
      return <SpotifyLogo {...iconProps} />;

    case PageFeatureType.AUDIOMACK:
      return (
        <LazyLoadImage src={audioMackLogo} alt="audiomack-app" {...iconProps} />
      );

    case PageFeatureType.SMS_SHORT_CODE:
      return <SmsIcon {...iconProps} />;

    case PageFeatureType.APPLE_MUSIC:
      return <AppleMusicIcon {...iconProps} />;

    case PageFeatureType.YOUTUBE:
      return <YoutubeLogo {...iconProps} />;

    case PageFeatureType.AUDIO:
      return <AudioLogo height={48} />;

    case PageFeatureType.SUBSCRIBE_TO_NEWS:
      return <SubscribeToNewsIcon {...iconProps} height={28} />;

    case PageFeatureType.INSTAGRAM:
      return <InstagramLogo width={36} color="black" />;

    default:
      return null;
  }
}
