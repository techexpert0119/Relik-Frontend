import * as z from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    firstName: z
      .string()
      .min(4, { message: 'Field should have at least 4 symbols' })
      .max(50, { message: `Name can't be that long` })
      .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
        message: 'Field must contain only alphabetic characters',
      }),
    password: z.string().min(4, { message: 'Wrong password value' }),
    repeatPassword: z.string(),
    isAgreed: z.boolean().refine((value) => value, {
      message: 'Please agree the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
