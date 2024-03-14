import * as z from 'zod';
import { FC, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { AxiosError } from 'axios';
import { ISignUpResult } from '@/data/interfaces/sign-result';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/api/auth-service';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { IBadRequestException } from '@/data/interfaces/bad-request-exception';
import { signUpSchema } from '@/app/auth/sign-up/components/sign-up-form/constants/sing-up-schema';
import { Eye, EyeOff } from 'lucide-react';

const SignUpForm: FC<{ className?: string }> = (props) => {
  const { className } = props;
  const { authorize } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      repeatPassword: '',
      isAgreed: false,
    },
  });

  const { isPending, mutate: signUp } = useMutation<
    ISignUpResult,
    AxiosError<IBadRequestException>,
    {
      email: string;
      password: string;
      firstName: string;
      signUpFrom: 'LOCAL';
    }
  >({
    mutationFn: AuthService.signUp,
    onSuccess: (data) => {
      authorize(
        data.createdUser,
        data.token.accessToken,
        data.token.refreshToken
      );
    },
    onError: (error) => {
      if (
        error.response?.status === 400 &&
        Array.isArray(error.response?.data?.errors)
      ) {
        error.response?.data?.errors.forEach((e) => {
          if (e.property === 'email')
            form.setError('email', { message: e.message });

          if (e.property === 'firstName')
            form.setError('firstName', { message: e.message });

          if (e.property === 'password')
            form.setError('password', { message: e.message });
        });
        return;
      }

      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.response?.data.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    signUp({ ...values, signUpFrom: 'LOCAL' });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full', className)}
      >
        <fieldset className="flex flex-col gap-2" disabled={isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold lg:font-normal">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    tabIndex={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold lg:font-normal">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name "
                    {...field}
                    tabIndex={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold lg:font-normal">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      className="pr-12"
                      autoComplete="current-password"
                      type={!showPassword ? 'password' : 'text'}
                      tabIndex={3}
                      {...field}
                    />
                    <Button
                      onClick={() => setShowPassword((pv) => !pv)}
                      variant="ghost"
                      size="smallIcon"
                      type="button"
                      className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                      tabIndex={4}
                    >
                      {!showPassword ? (
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
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold lg:font-normal">
                  Repeat password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repeat your password"
                    className="pr-12"
                    autoComplete="current-password"
                    type={!showPassword ? 'password' : 'text'}
                    tabIndex={5}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex flex-row items-center space-x-2 space-y-0 my-[10px]">
                  <FormControl>
                    <Checkbox
                      name="isAgreed"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      tabIndex={6}
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-midnight font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <span className="text-[#344054]">I agree with</span>{' '}
                    <a
                      className="ml-1.5 link"
                      href="http://google.com"
                      tabIndex={7}
                    >
                      Terms and Conditions
                    </a>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#162636] text-base font-bold lg:my-2"
            tabIndex={8}
          >
            Proceed with registration
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default SignUpForm;
