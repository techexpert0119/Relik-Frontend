import { useMemo } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Permissions } from '@/data/enums/permissions';
import { Input } from '@/components/ui/input';
import QueryHook from '@/hooks/queryHook';
import { IUserAccountCreatePayload } from '@/data/interfaces/users';
import { toast } from '@/components/ui/use-toast';
import { UserSignUpForm } from '@/data/enums/user-signUp-form';
import { postCreateOtherUserMutation } from '@/services/api/users-service';

interface IProps {
  buttonText: string;
}
const userFormSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter email' }),
});

export const UserInviteInput = ({ buttonText }: IProps) => {
  const { QueryParams, navigate } = QueryHook();
  const postCreateOtherUser = postCreateOtherUserMutation();
  const tabInQuery = (QueryParams.tab as Permissions) || 'ALL_USERS';
  const currentCreateFormType: 'user' | 'page' | 'agency' | 'invitation' =
    useMemo(() => {
      switch (tabInQuery) {
        case (Permissions.AGENCY_ADMIN,
        Permissions.SUPER_ADMIN,
        Permissions.TALENT_MANAGER,
        Permissions.USER_ADMIN):
          return 'user';
        case Permissions.PAGE:
          return 'page';
        case Permissions.AGENCY:
          return 'agency';
        default:
          return 'invitation';
      }
    }, [tabInQuery]);
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const { control } = form;
  const createdUserRole = useMemo(() => {
    if (currentCreateFormType === 'user') {
      if (Permissions[tabInQuery]) {
        return Permissions[tabInQuery];
      } else {
        return;
      }
    }
  }, [tabInQuery, currentCreateFormType]);
  const onSubmit = (values: IUserAccountCreatePayload) => {
    postCreateOtherUser.mutate(
      {
        email: values?.email,
        signUpFrom: UserSignUpForm.LOCAL,
        userRole: createdUserRole,
      },
      {
        onSuccess() {
          form.reset({ email: '' });
          toast({
            variant: 'success',
            title: 'Success',
            description: 'Invitation has been sent!',
          });
        },
        onError(error) {
          if (error) {
            form.reset({ email: '' });
            toast({
              variant: 'destructive',
              title: 'Error',
              description: error?.response?.data.message,
            });
          }
        },
      }
    );
  };
  const navigator = () => {
    if (currentCreateFormType === 'agency') {
      navigate('/agency/create');
    }
  };
  return (
    <div className="flex  justify-center  flex-row ">
      {currentCreateFormType === 'user' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 w-full justify-between items-center">
                <div className="flex w-full flex-col ">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="basis-[100%]">
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-500 left-3" />
                            <Input
                              id="email"
                              placeholder="Enter email"
                              className=" pl-10 text-base"
                              type="text"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button disabled={postCreateOtherUser.isPending} type="submit">
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {currentCreateFormType === 'agency' && (
        <Button onClick={navigator}>Add Agency</Button>
      )}
    </div>
  );
};
