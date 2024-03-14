import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import '@/styles/complete-profile.css';
import UploadImage from '@/components/UploadImage';
import ChipInput from '@/components/ChipInputs';
import { UserProfileService } from '@/services/api/user-profile-service';
import { Role } from '@/data/enums/role';
import { useMutation } from '@tanstack/react-query';
import { ICompleteProfileResultDto } from '@/data/dtos/complete-profile-result-dto';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';
import { ICompleteProfileDto } from '@/data/dtos/complete-profile-dto';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { AxiosError } from 'axios';
import { agencyAccountFormSchema } from '../constants/agency-account-form-schema';

const CompleteAsAgencyAccountForm = () => {
  const { authorize } = useAuthStore();
  const form = useForm<z.infer<typeof agencyAccountFormSchema>>({
    resolver: zodResolver(agencyAccountFormSchema),
    defaultValues: {
      businessName: '',
      // subscriptionId: '',
      photo: '',
      businessUrl: '',
      nameOfCelebrities: [],
    },
  });

  const { isPending, mutate } = useMutation<
    ICompleteProfileResultDto,
    AxiosError<IBadRequestBodyDto>,
    ICompleteProfileDto
  >({
    mutationFn: (values) =>
      UserProfileService.completeProfile({
        ...values,
        role: Role.AGENCY_ADMIN,
      }),
    onSuccess: (data) => {
      authorize(data.user, data.accessToken, data.refreshToken);
    },
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.response?.data?.message || e.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof agencyAccountFormSchema>) =>
    mutate({ ...values, role: Role.AGENCY_ADMIN });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-5" disabled={isPending}>
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="row">
                  <FormLabel className="label">Business name</FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your business name here"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="businessUrl"
              render={({ field }) => (
                <FormItem className="row">
                  <FormLabel className="label">Business URL</FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your business URL here"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="nameOfCelebrities"
              render={() => (
                <FormItem className="row">
                  <FormLabel className="label" id="celebreties">
                    Names of celebrities under your management
                  </FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <ChipInput
                        id="celebreties"
                        onSelect={(data) =>
                          form.setValue('nameOfCelebrities', data, {
                            shouldDirty: true,
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <FormItem className="row">
              <FormLabel
                className="label flex flex-col gap-2"
                htmlFor="pickAvatar"
              >
                <div>Your photo</div>
                <div className="text-sm text-gray-500 font-normal">
                  This picture will be used as a default profile picture on all
                  of your screens. You can keep it empty.
                </div>
              </FormLabel>
              <FormField
                control={form.control}
                name="photo"
                render={() => (
                  <UploadImage
                    id="pickAvatar"
                    showPreview
                    setImage={(image) =>
                      form.setValue('photo', image, {
                        shouldDirty: true,
                      })
                    }
                  />
                )}
              />
              <FormMessage />
            </FormItem>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="submit" size="sm">
                Complete account
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default CompleteAsAgencyAccountForm;
