import * as z from 'zod';

export const privateAccountFormSchema = z.object({
  businessName: z.string().min(3).max(50),
  subscriptionId: z.string().min(1, { message: 'Required' }),
  photo: z.string().optional(),
});
