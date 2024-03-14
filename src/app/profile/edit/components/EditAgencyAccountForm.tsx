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
import { useEffect, useRef } from 'react';
import { UserProfileService } from '@/services/api/user-profile-service';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { editAgencyAccountFormSchema } from '@/app/profile/edit/constants/edit-agency-account-form-schema';
import { IGetUserDataResult } from '@/data/interfaces/get-user-data-result';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';

const EditAgencyAccountForm = () => {
  const { updateUserData } = useAuthStore();
  const form = useForm<z.infer<typeof editAgencyAccountFormSchema>>({
    resolver: zodResolver(editAgencyAccountFormSchema),
    defaultValues: {
      firstName: '',
      businessName: '',
      photo: '',
      businessUrl: '',
    },
  });
  const { isDirty } = form.formState;
  const userData = useRef<IGetUserDataResult>();

  const cancel = () => {
    form.reset({ ...userData.current });
  };

  const { data, isFetching, error } = useQuery<
    IGetUserDataResult,
    AxiosError<IBadRequestBodyDto>
  >({
    queryKey: ['userData'],
    queryFn: UserProfileService.getData,
  });

  useEffect(() => {
    if (data) {
      form.reset({ ...data });
      userData.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.response?.data.message || error.message,
      });
    }
  }, [error]);

  const onSubmit = (values: z.infer<typeof editAgencyAccountFormSchema>) => {
    UserProfileService.update(values).then((res) => {
      form.reset({ ...res });
      updateUserData({
        email: res.email,
        photo: res.photo,
        name: res.firstName,
      });
      toast({
        title: 'Success',
        description: 'Your account has been updated',
        variant: 'success',
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-5" disabled={isFetching}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="row">
                  <FormLabel className="label">Name</FormLabel>
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

            <div className="flex flex-col sm:flex-row gap-4 justify-end row">
              <Button
                size="sm"
                variant="gray"
                className="min-w-[84px]"
                disabled={!isDirty}
                onClick={cancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!isDirty}
                className="min-w-[84px]"
              >
                Save
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default EditAgencyAccountForm;
