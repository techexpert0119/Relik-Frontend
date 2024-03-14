import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email ID' }),
  password: z.string().min(4, { message: 'Password is too short' }),
  rememberMe: z.boolean().optional(),
});
