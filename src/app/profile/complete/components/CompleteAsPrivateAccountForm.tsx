import { useForm } from 'react-hook-form';
import z from 'zod';
import { privateAccountFormSchema } from '@/app/profile/complete/constants/private-account-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import '@/styles/complete-profile.css';
import SubscriptionPicker from '@/components/SubscriptionPicker';
import UploadImage from '@/components/UploadImage';
import { useMutation } from '@tanstack/react-query';
import { UserProfileService } from '@/services/api/user-profile-service';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from '@/components/ui/use-toast';
import { ICompleteProfileResultDto } from '@/data/dtos/complete-profile-result-dto';
import { AxiosError } from 'axios';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';
import { ICompleteProfileDto } from '@/data/dtos/complete-profile-dto';

const CompleteAsPrivateAccountForm = () => {
  const form = useForm<z.infer<typeof privateAccountFormSchema>>({
    resolver: zodResolver(privateAccountFormSchema),
    defaultValues: { subscriptionId: '', photo: '' },
  });
  const { authorize } = useAuthStore();

  const { isPending } = useMutation<
    ICompleteProfileResultDto,
    AxiosError<IBadRequestBodyDto>,
    ICompleteProfileDto
  >({
    mutationFn: UserProfileService.completeProfile,
    onSuccess: (data) => {
      authorize(data.user, data.accessToken, data.refreshToken);
    },
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.response?.data?.message || e?.message,
      });
    },
  });

  const onSubmit = () => {};

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-5" disabled={isPending}>
            <FormField
              control={form.control}
              name="subscriptionId"
              render={({}) => (
                <FormItem className="row">
                  <FormLabel className="label" htmlFor="subscriptionId">
                    Subscription Package
                  </FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <SubscriptionPicker
                        id="subscriptionId"
                        onSubSelect={(sub) => {
                          form.setValue('subscriptionId', sub._id);
                          form.clearErrors('subscriptionId');
                        }}
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
                render={({}) => (
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

export default CompleteAsPrivateAccountForm;
