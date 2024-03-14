import * as z from 'zod';
import { socialHandlesFormSchema } from '@/components/feature-forms/components/social-handles-form/consts/social-handles-form-schema';

export const defaultFormValues: z.infer<typeof socialHandlesFormSchema> = {
  facebookLink: '',
  instagramLink: '',
  xLink: '',
  whatsAppLink: { country: '', number: undefined },
  snapchatLink: '',
  youtubeLink: '',
  tiktokLink: '',
  twitchLink: '',
  redditLink: '',
  threadsLink: '',
  telegramLink: { country: '', number: undefined },
  linkedInLink: '',
};
