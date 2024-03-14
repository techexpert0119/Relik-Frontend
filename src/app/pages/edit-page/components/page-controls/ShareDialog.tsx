import RedditLogo from '@/components/icons/reddit-logo';
import SlackLogo from '@/components/icons/slack-logo';
import XLogo from '@/components/icons/x-logo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { X, Share } from 'lucide-react';
import PinterestLogo from './icons/pinterest-logo';
import LinkedInLogo from './icons/linkedin-logo';
import InstagramLogo from './icons/instagram-logo';
import FacebookLogo from './icons/facebook-logo';
import SnapchatLogo from './icons/snapchat-logo';
import EmailLogo from './icons/email-logo';
import TumblrLogo from './icons/tumblr-logo';
import DiscordLogo from './icons/discord-logo';
import WhatsAppLogo from '@/components/icons/whats-app-logo';

interface Props {
  readonly pageLink: string;
}

export function ShareDialog(props: Props) {
  const copyToClipboard = (text: string) =>
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Success',
        description: 'Text copied!',
        variant: 'success',
      });
    });

  const socialIcons = [
    {
      icon: FacebookLogo,
      name: 'Facebook',
      backgroundColor: '#1877F2',
      link: `https://www.facebook.com/sharer.php?u=${props.pageLink}`,
    },
    {
      icon: WhatsAppLogo,
      name: 'Whatsapp',
      backgroundColor: '#5FD568',
      link: `https://wa.me/?text=Join us! - ${props.pageLink}`,
    },
    {
      icon: InstagramLogo,
      name: 'Instagram',
      backgroundColor: '#7818F2',
      link: 'https://www.instagram.com' || `${props.pageLink}`,
    },
    {
      icon: RedditLogo,
      name: 'Reddit',
      backgroundColor: '#FF4500',
      link: 'https://www.reddit.com' || `${props.pageLink}`,
    },
    {
      icon: SnapchatLogo,
      name: 'Snapchat',
      backgroundColor: '#FFFC00',
      link:
        'https://www.snapchat.com' ||
        `snapchat://creativeKitWeb/camera/1?attachmentUrl=${props.pageLink}`,
    },
    {
      icon: EmailLogo,
      name: 'Email',
      backgroundColor: '#5C5C5C',
      link: `mailto:?subject= Check out this Relik! &body= Check out this Relik! - ${props.pageLink}`,
    },
    {
      icon: XLogo,
      name: 'X',
      backgroundColor: '#000000',
      link: `https://x.com/intent/tweet?text=Check out this Relik! - ${props.pageLink}`,
    },
    {
      icon: TumblrLogo,
      name: 'Tumblr',
      backgroundColor: '#303D4D',
      link: 'https://www.tumblr.com' || `${props.pageLink}`,
    },
    {
      icon: DiscordLogo,
      name: 'Discord',
      backgroundColor: '#5865F2',
      link: 'https://www.discord.com' || `${props.pageLink}`,
    },
    {
      icon: SlackLogo,
      name: 'Slack',
      backgroundColor: '#00C7D3',
      link: 'https://www.slack.com' || `${props.pageLink}`,
    },
    {
      icon: PinterestLogo,
      name: 'Pinterest',
      backgroundColor: '#CB1F27',
      link: 'https://www.pinterest.com' || `${props.pageLink}`,
    },
    {
      icon: LinkedInLogo,
      name: 'Linkedin',
      backgroundColor: '#0A66C2',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${props.pageLink}`,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="font-medium text-gray-900"
          variant="ghost"
        >
          <Share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-[600px]">
          <div className="flex items-center justify-between">
            <DialogTitle>Share</DialogTitle>
            <DialogClose>
              <X
                className="text-gray-700 h-5 w-5 text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex h-4 w-4 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              />
            </DialogClose>
          </div>
          <div>
            <div className="flex flex-wrap justify-items-center gap-3 mb-3">
              {socialIcons.map((socialIcon, index) => (
                <div key={index} className="w-20 flex flex-col items-center">
                  <a
                    href={socialIcon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center w-16 h-16 mb-2 rounded-2xl !hover:bg-[#E5E9ED]/90`}
                    style={{ backgroundColor: socialIcon.backgroundColor }}
                  >
                    <socialIcon.icon className="w-8 h-8" color="white" />
                  </a>
                  <p className="text-sm">{socialIcon.name}</p>
                </div>
              ))}
            </div>
            <div className="relative">
              <Input
                className="text-base"
                value={props.pageLink}
                disabled={true}
              />
              <Button
                size="xs"
                onClick={() => copyToClipboard(props.pageLink)}
                className="font-medium text-gray-900 px-4 py-1 text-white absolute right-3 top-1/2 -translate-y-1/2"
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
