import * as z from 'zod';

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(4, { message: 'Wrong password value' }),
    newPassword: z.string().min(4, { message: 'Wrong password value' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
