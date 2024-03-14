import * as z from 'zod';

export const editAgencyAccountFormSchema = z.object({
  firstName: z.string().min(3).max(50),
  businessName: z.string().min(3).max(50),
  photo: z.string().optional(),
  businessUrl: z.string().url(),
});
