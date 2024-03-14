import QueryHook from '@/hooks/queryHook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  assignUserToAgencyMutation,
  postCreateUserByInvitationMutation,
} from '@/services/api/users-service';
import {
  ENUM_VERIFICATION_PURPOSE,
  IInvitation,
} from '@/data/interfaces/invitation';
import { useAuthStore } from '@/stores/auth-store';
import { validateValidationLink } from '@/services/api/verification-service';
import { useNavigate } from 'react-router-dom';

export const signUpSchema = z.object({
  password: z.string().min(4),
  repeatPassword: z.string().min(4),
  firstName: z.string().min(4),
});
export default function InvitationPage() {
  const { QueryParams } = QueryHook();
  const navigate = useNavigate();
  const { token } = QueryParams;
  const [invitation, setInvitation] = useState<IInvitation | undefined>(
    undefined
  );
  const validateInvitation = validateValidationLink();
  const assignUserToAgency = assignUserToAgencyMutation();
  const postCreateUserInvitation = postCreateUserByInvitationMutation();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (token) {
      validateInvitation.mutate(
        { token },
        {
          onSuccess: (data) => {
            if (data?.data?.success) {
              if (
                data?.data?.verification?.purpose ===
                ENUM_VERIFICATION_PURPOSE?.INVITATION
              ) {
                setInvitation(data?.data?.verification);
              } else if (
                data?.data?.verification?.purpose ===
                ENUM_VERIFICATION_PURPOSE?.INVITATION_FOR_EXISTED_USER
              ) {
                assignUserToAgency.mutate(
                  {
                    token,
                  },
                  {
                    onSuccess: () => {
                      navigate('/auth/sign-in');
                      toast({
                        title: 'Success',
                        variant: 'success',
                        description: 'Process successfully finished',
                      });
                    },
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
            }
          },
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
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
      firstName: '',
    },
  });
  const { authorize } = useAuthStore();
  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    if (values.password != values.repeatPassword) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Please enter same password',
      });
      return;
    }
    postCreateUserInvitation.mutate(
      {
        token: invitation?.verificationToken,
        password: values.password,
        firstName: values?.firstName,
      },
      {
        onSuccess(data) {
          if (data?.data?.createdUser) {
            authorize(data.data?.createdUser, data.data?.token?.accessToken);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <section className="flex mt-5 max-w-[384px] justify-center flex-col gap-4 items-center min-h-screen ml-auto mr-auto px-8">
      {validateInvitation.isPending && <p>Validating ...</p>}
      {assignUserToAgency.isPending && <p>Assigning you to agency ...</p>}
      {invitation?.purpose === ENUM_VERIFICATION_PURPOSE.INVITATION && (
        <>
          <header className="mt-16 md:mt-[64px]">
            <h1 className="text-2xl font-[600]">Create an account</h1>
          </header>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('w-full ')}
            >
              <fieldset className="flex flex-col gap-2 " disabled={false}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
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
                      <FormLabel>Password</FormLabel>
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
                        <Input
                          placeholder="Repeat your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="my-2">
                  Proceed with registration
                </Button>
              </fieldset>
            </form>
          </Form>
        </>
      )}
    </section>
  );
}
