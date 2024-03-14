import * as z from 'zod';

export const editPrivateAccountFormSchema = z.object({
  firstName: z.string().min(3).max(50),
  photo: z.string().optional(),
});
