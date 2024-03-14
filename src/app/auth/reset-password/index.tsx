import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import QueryHook from '@/hooks/queryHook';
import { resetPasswordFromTokenQuery } from '@/services/api/users-service';
import { validateValidationLink } from '@/services/api/verification-service';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import wideLogo from '/wide-logo.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
export const resetPasswordSchema = z.object({
  password: z.string().min(4),
  repeatPassword: z.string().min(4),
});

export default function ResetPassword() {
  const { QueryParams, navigate } = QueryHook();
  const { mutate, isPending } = resetPasswordFromTokenQuery();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { token } = QueryParams;
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', repeatPassword: '' },
  });
  const verifyToken = validateValidationLink();
  useEffect(() => {
    if (token) {
      verifyToken.mutate(
        {
          token,
        },
        {
          onError: (err) => {
            navigate('/auth/sign-in');
            toast({
              title: 'Error',
              variant: 'destructive',
              description: err?.response?.data?.message,
            });
          },
        }
      );
    }
  }, [token]);
  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    if (values.password != values.repeatPassword) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Please enter same password',
      });
      return;
    }
    mutate(
      {
        token,
        password: values?.password,
      },
      {
        onSuccess: (data) => {
          if (data?.status === 201) {
            toast({
              title: 'Success',
              variant: 'success',
              description: 'Password successfully changed',
            });
            navigate('/auth/sign-in');
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
    <section className="flex flex-col gap-4 items-center min-h-screen ml-auto mr-auto px-8">
      <figure className="mt-16 md:mt-[96px]">
        <img src={wideLogo} alt="logo" />
      </figure>

      <header className="mt-auto">
        <h1 className="text-3xl font-[600]">Reset Password</h1>
      </header>
      <div className={'  w-[384px]'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-2 ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Enter your password"
                          className="pr-12"
                          autoComplete="current-password"
                          type={!showPassword ? 'password' : 'text'}
                          {...field}
                        />
                        <Button
                          onClick={() => setShowPassword((pv) => !pv)}
                          variant="ghost"
                          size="smallIcon"
                          type="button"
                          className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
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
                    <FormLabel>Repeat password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Repeat your password"
                          className="pr-12"
                          autoComplete="current-password"
                          type={!showRepeatPassword ? 'password' : 'text'}
                          {...field}
                        />
                        <Button
                          onClick={() => setShowRepeatPassword((pv) => !pv)}
                          variant="ghost"
                          size="smallIcon"
                          type="button"
                          className="absolute top-0 bottom-0 my-auto text-gray-500 right-2 hover:bg-transparent"
                        >
                          {!showRepeatPassword ? (
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

              <Button
                disabled={isPending}
                variant={'black'}
                type="submit"
                className=" rounded-full w-full mt-4"
              >
                Submit
              </Button>
            </fieldset>
          </form>
        </Form>
        <Link
          to={'/auth/sign-in'}
          className="flex mt-5 justify-center underline font-bold items-center w-full"
          type="button"
        >
          Log in
        </Link>
      </div>

      <Footer className="mt-auto" />
    </section>
  );
}
