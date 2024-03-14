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
import { UserProfileService } from '@/services/api/user-profile-service';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from '@/components/ui/use-toast';
import { editPrivateAccountFormSchema } from '@/app/profile/edit/constants/edit-private-account-form-schema';
import { useEffect, useRef, useState } from 'react';
import { IGetUserDataResult } from '@/data/interfaces/get-user-data-result';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';
import ImageUploaderField from '@/app/profile/edit/components/ImageUploaderField';
import ChangePasswordDialog from '@/app/profile/edit/components/ChangePasswordDialog';

const EditPrivateAccountForm = () => {
  const { updateUserData } = useAuthStore();
  const form = useForm<z.infer<typeof editPrivateAccountFormSchema>>({
    resolver: zodResolver(editPrivateAccountFormSchema),
    defaultValues: {
      firstName: '',
      photo: '',
    },
  });
  const { isDirty } = form.formState;
  const userData = useRef<IGetUserDataResult>();
  const [open, setOpen] = useState(false);

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
    if (error)
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.response?.data.message || error.message,
      });
  }, [error]);

  const onSubmit = (values: z.infer<typeof editPrivateAccountFormSchema>) => {
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
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-midnight font-medium text-lg">
                Edit the profile
              </h1>
              <span className="text-sm text-gray-500">
                Update your photo and personal details here.
              </span>
            </div>

            <div className="flex flex-row gap-4 justify-start sm:justify-end">
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
          </div>

          <Separator className="mt-5" />

          <fieldset className="flex flex-col gap-5 mt-5" disabled={isFetching}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="row">
                  <FormLabel className="label">Name</FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <Input {...field} placeholder="Enter your name here" />
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
                render={({ field }) => (
                  <ImageUploaderField
                    value={field.value}
                    setValue={(v) =>
                      form.setValue('photo', v, { shouldDirty: true })
                    }
                  />
                )}
              />
              <FormMessage />
            </FormItem>

            <Separator />

            <FormItem className="row">
              <FormLabel
                className="label flex flex-col gap-2"
                htmlFor="pickAvatar"
              >
                <div>Password</div>
                <div className="text-sm text-gray-500 font-normal">
                  Manage your password
                </div>
              </FormLabel>
              <Button
                size="lg"
                type="button"
                variant={'destructive'}
                className="min-w-[84px] text-[#54B8C7] border-[#54B8C7]"
                onClick={() => setOpen(true)}
              >
                Change Password
              </Button>
            </FormItem>
          </fieldset>
        </form>
      </Form>
      <ChangePasswordDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default EditPrivateAccountForm;
