import * as z from 'zod';

export const privateAccountFormSchema = z.object({
  subscriptionId: z.string().min(1, { message: 'Required' }),
  photo: z.string().optional(),
});
