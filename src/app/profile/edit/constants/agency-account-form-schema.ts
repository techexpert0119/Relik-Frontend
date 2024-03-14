import * as z from 'zod';

export const agencyAccountFormSchema = z
  .object({
    businessName: z.string().min(3).max(50),
    subscriptionId: z.string().min(1, { message: 'Required' }),
    photo: z.string().optional(),
    businessUrl: z.string().url(),
    nameOfCelebrities: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.nameOfCelebrities?.length) {
        const isWrong = data.nameOfCelebrities?.some(
          (str) => !/^[a-zA-Z\s]+$/.test(str)
        );
        if (isWrong) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['nameOfCelebrities'],
      message: 'Names should contain only alphabets',
    }
  );
