import * as z from 'zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { changePasswordFormSchema } from '../constants/change-password-form-schema';
import { resetPasswordQuery } from '@/services/api/users-service';
import { toast } from '@/components/ui/use-toast';

type ShowPassword = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

const ChangePasswordDialog: FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = (props) => {
  const { open, setOpen } = props;
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const { mutate, isPending } = resetPasswordQuery();

  useEffect(() => {
    form.reset();
  }, [open]);

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordFormSchema>) => {
    mutate(
      { oldPassword: values.oldPassword, newPassword: values.newPassword },
      {
        onSuccess: (data) => {
          if (data?.status === 201) {
            toast({
              title: 'Success',
              variant: 'success',
              description: 'Password successfully changed',
            });
            setOpen(false);
          }
        },
        onError: (error) => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: error?.response?.data?.message,
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[30%] max-h-[90%] flex flex-col">
        <DialogHeader className="items-center">
          <DialogTitle className="text-center font-bold text-lg">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-center w-4/5">
            <p>
              Use a password at least 8 characters long with both letters and
              numbers.
            </p>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <fieldset className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold lg:font-normal">
                      Old Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="oldPassword"
                          placeholder="Enter your old password"
                          className="pr-12"
                          autoComplete="current-password"
                          type={!showPassword.oldPassword ? 'password' : 'text'}
                          tabIndex={1}
                          {...field}
                        />
                        <Button
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              oldPassword: !showPassword.oldPassword,
                            })
                          }
                          variant="ghost"
                          size="smallIcon"
                          type="button"
                          className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                          tabIndex={2}
                        >
                          {!showPassword.oldPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold lg:font-normal">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          placeholder="Enter your new password"
                          className="pr-12"
                          autoComplete="current-password"
                          type={!showPassword.newPassword ? 'password' : 'text'}
                          tabIndex={3}
                          {...field}
                        />
                        <Button
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              newPassword: !showPassword.newPassword,
                            })
                          }
                          variant="ghost"
                          size="smallIcon"
                          type="button"
                          className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                          tabIndex={4}
                        >
                          {!showPassword.newPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold lg:font-normal">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          placeholder="Confirm your new password"
                          className="pr-12"
                          autoComplete="current-password"
                          type={
                            !showPassword.confirmPassword ? 'password' : 'text'
                          }
                          tabIndex={5}
                          {...field}
                        />
                        <Button
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              confirmPassword: !showPassword.confirmPassword,
                            })
                          }
                          variant="ghost"
                          size="smallIcon"
                          type="button"
                          className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                          tabIndex={6}
                        >
                          {!showPassword.confirmPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-end gap-3 mt-4">
                <Button
                  type="button"
                  variant="gray"
                  tabIndex={7}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" tabIndex={8} disabled={isPending}>
                  Save Password
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
