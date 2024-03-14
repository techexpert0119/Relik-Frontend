import { signInSchema } from '@/app/auth/sign-in/components/sign-in-form/constants/sing-in-schema';
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
import { NavLink } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ISignResult } from '@/data/interfaces/sign-result';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/api/auth-service';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { IBadRequestException } from '@/data/interfaces/bad-request-exception';
import { Eye, EyeOff, Mail } from 'lucide-react';

const SignInForm: FC<{ className?: string }> = (props) => {
  const { className } = props;
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', rememberMe: true },
  });
  const { authorize } = useAuthStore();

  const { isPending, mutate: signIn } = useMutation<
    ISignResult,
    AxiosError<IBadRequestException>,
    { email: string; password: string }
  >({
    mutationFn: AuthService.signIn,
    onSuccess: (data) => {
      authorize(
        data.user,
        data.token.accessToken,
        data.token.refreshToken,
        data?.agencies
      );
    },
    onError: (error) => {
      if (
        error.response?.status &&
        error.response?.status &&
        error.response?.status === 400 &&
        Array.isArray(error.response?.data?.errors)
      ) {
        error.response?.data?.errors.forEach((e) => {
          if (e.property === 'email')
            form.setError('email', { message: e.message });

          if (e.property === 'password')
            form.setError('password', { message: e.message });
        });
        return;
      }

      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    signIn(values);
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
                  <div className="relative">
                    <Mail className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
                    <Input
                      placeholder="Enter your email"
                      className="pl-12"
                      autoComplete="email"
                      tabIndex={1}
                      {...field}
                    />
                  </div>
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
                      tabIndex={2}
                      {...field}
                    />
                    <Button
                      onClick={() => setShowPassword((pv) => !pv)}
                      variant="ghost"
                      size="smallIcon"
                      type="button"
                      className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                      tabIndex={3}
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
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0 my-[10px]">
                <FormControl>
                  <Checkbox
                    name="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    tabIndex={4}
                  />
                </FormControl>
                <FormLabel className="text-sm cursor-pointer text-gray-700 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </FormLabel>

                <div className="flex flex-1" />

                <NavLink
                  to="/auth/forgot-password"
                  className="link"
                  tabIndex={5}
                >
                  Forgot password
                </NavLink>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={'black'}
            className="bg-[#162636] text-base font-bold lg:my-2"
            tabIndex={6}
          >
            Sign In
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default SignInForm;
