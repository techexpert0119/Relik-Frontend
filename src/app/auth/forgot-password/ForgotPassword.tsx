import * as z from 'zod';
import { NavLink } from 'react-router-dom';
import Footer from '@/components/Footer';
import wideLogo from '/wide-logo.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { forgotPasswordQuery } from '@/services/api/users-service';
import { toast } from '@/components/ui/use-toast';
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email ID' }),
});

const ForgotPassword = () => {
  const { mutate, isPending } = forgotPasswordQuery();
  const [successMessage, setSuccessMessage] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const timeoutID: MutableRefObject<number | null> = useRef(null);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    setSuccessMessage(false);

    mutate(
      { email: values?.email },
      {
        onSuccess: (data) => {
          setIsFormSubmitted(true);
          setSuccessMessage(data?.data?.success);

          if (timeoutID.current) clearTimeout(timeoutID.current);

          timeoutID.current = window.setTimeout(
            () => {
              toast({
                variant: 'default',
                description: 'Link expired...',
                title: 'Warning',
              });
            },
            1000 * 60 * 10
          );
        },
        onError: (err) => {
          form.setError('email', { message: err?.response?.data?.message });
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutID.current) clearTimeout(timeoutID.current);
    };
  }, []);

  return (
    <section className="flex flex-col gap-4 items-center min-h-screen ml-auto mr-auto px-8">
      <figure className="mt-auto pt-16 md:pt-[96px]">
        <img src={wideLogo} alt="logo" />
      </figure>

      <header className="mt-16 md:mt-[64px]">
        <h1 className="text-3xl font-[600]">Forgot Password</h1>
      </header>
      <div className={'  w-[384px]'}>
        {successMessage && (
          <div className="p-4 rounded my-4 bg-slate-200">
            We have emailed your password reset link!
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <p className="mb-4 text-sm text-grey">
              Forgot your password? No problem. Just let us know your email
              address and we will email you a password reset link that will
              allow you to choose a new one.
            </p>
            <fieldset className="flex flex-col gap-2 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="pl-12"
                          autoComplete="email"
                          disabled={isFormSubmitted}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                variant={'black'}
                type="submit"
                className=" rounded-full w-full mt-4"
              >
                {isFormSubmitted ? 'Resend link' : 'Email Password Reset Link'}
              </Button>
            </fieldset>
          </form>
        </Form>

        <NavLink
          to={'/auth/sign-in'}
          className="flex mt-5 justify-center link  "
        >
          Log in
        </NavLink>
      </div>

      <Footer className="mt-auto" />
    </section>
  );
};

export default ForgotPassword;
