import * as z from 'zod';

export const socialHandlesFormSchema = z
  .object({
    facebookLink: z
      .string()
      .startsWith('https://facebook.com', {
        message: 'The URL should start with https://facebook.com',
      })
      .or(z.literal('')),
    instagramLink: z
      .string()
      .min(1, {
        message: 'Username must be at least 1 character long',
      })
      .max(30, {
        message: 'Username must be up to 30 characters long',
      })
      .regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/`~\-='|"\\]+$/, {
        message:
          'Can include up to 30 characters of letters, numbers, and symbols',
      })
      .or(z.literal('')),
    xLink: z
      .string()
      .min(4, { message: 'Username must be min 4 characters long' })
      .max(15, { message: 'Username must be up to 15 characters long' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
      })
      .or(z.literal('')),
    whatsAppLink: z
      .object({
        country: z
          .string({
            required_error: 'Required!',
            invalid_type_error: 'Required!',
          })
          .min(1, { message: 'Required!' }),
        number: z
          .number({
            required_error: 'Please enter a valid phone number!',
            invalid_type_error: 'Please enter a valid phone number!',
          })
          .optional(),
      })
      .optional(),
    snapchatLink: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(15, { message: 'Username must be up to 15 characters long' })
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/, {
        message:
          'Username can only contain Latin letters, numbers, and one of -, _, or . but no special characters. Username must end in a letter or number.',
      })
      .or(z.literal('')),
    youtubeLink: z
      .string()
      .min(1, { message: 'Username must be at least 1 character long' })
      .max(100, { message: 'Username must be up to 100 characters long' })
      .or(z.literal('')),
    tiktokLink: z
      .string()
      .min(1, { message: 'Username must be at least 1 character long' })
      .max(24, { message: 'Username must be up to 24 characters long' })
      .regex(/^[a-zA-Z0-9._]+$/, {
        message:
          'Username can only contain letters, numbers, periods, and underscores',
      })
      .or(z.literal('')),
    twitchLink: z
      .string()
      .min(4, { message: 'Username must be at least 4 character long' })
      .max(25, { message: 'Username must be up to 25 characters long' })
      .or(z.literal('')),
    redditLink: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(20, { message: 'Username must be up to 20 characters long' })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message:
          'Username can only contain letters, numbers, dashes, and underscores',
      })
      .or(z.literal('')),
    threadsLink: z
      .string()
      .min(1, {
        message: 'Username must be at least 1 character long',
      })
      .max(30, {
        message: 'Username must be up to 30 characters long',
      })
      .regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/`~\-='|"\\]+$/, {
        message:
          'Can include up to 30 characters of letters, numbers, and symbols',
      })
      .or(z.literal('')),
    telegramLink: z
      .object({
        country: z
          .string({
            required_error: 'Required!',
            invalid_type_error: 'Required!',
          })
          .min(1, { message: 'Required!' }),
        number: z
          .number({
            required_error: 'Please enter a valid phone number!',
            invalid_type_error: 'Please enter a valid phone number!',
          })
          .optional(),
      })
      .optional(),
    linkedInLink: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(100, { message: 'Username must be up to 100 characters long' })
      .regex(/^(?!.*\bLinkedIn\b)[a-zA-Z0-9-]+$/, {
        message:
          'Username can only contain letters, numbers, and dashes. Cannot contain the word "LinkedIn".',
      })
      .or(z.literal('')),
  })
  .refine(
    (data) =>
      Object.entries(data).some(([key, value]) =>
        key !== 'whatsAppLink' && key !== 'telegramLink'
          ? value !== ''
          : key === 'whatsAppLink'
            ? data.whatsAppLink?.number
            : data.telegramLink?.number
      ),
    {
      message: 'Required at least one field to be set',
      path: ['facebookLink'],
    }
  );
