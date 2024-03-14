import BreadCrumb, { IBreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

import { Input } from '@/components/ui/input';
import TableComponent from './table';
import { useParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { getSingleAgency } from '@/services/api/agency-service';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Role } from '@/data/enums/role';
import { UserSignUpForm } from '@/data/enums/user-signUp-form';
import { postCreateOtherUserMutation } from '@/services/api/users-service';
import { IUserAccountCreatePayload } from '@/data/interfaces/users';
import { useEffect } from 'react';
import { getPublicImageURL } from '@/lib/utils';
const userFormSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter email' }),
});

export default function AgencyProfile() {
  const { id } = useParams();
  const postCreateOtherUser = postCreateOtherUserMutation();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),

    defaultValues: {
      email: '',
    },
  });
  const { data: agency, refetch } = getSingleAgency(id || '');
  useEffect(() => {
    refetch();
  }, []);
  const { control } = form;
  const onSubmit = (values: IUserAccountCreatePayload) => {
    postCreateOtherUser.mutate(
      {
        email: values?.email,
        signUpFrom: UserSignUpForm.LOCAL,
        userRole: Role.AGENCY_ADMIN,
        agencyId: id,
      },
      {
        onSuccess() {
          form.reset({ email: '' });
          refetch();
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
  const breadCrumbItems: Array<IBreadCrumb> = [
    {
      name: 'Users',
      link: '/users',
    },
    {
      name: 'Agency List',
      link: '/agencies',
    },
    {
      name: agency?.businessName || '',
      link: null,
    },
  ];

  return (
    <div className="container">
      <div className="mt-8">
        <BreadCrumb items={breadCrumbItems} />
      </div>
      <div className="flex justify-between mt-8 mb-6">
        <h1 className="text-3xl flex items-center gap-2">
          <p>Manage </p>
          {agency ? agency?.businessName : <Skeleton className="w-80 h-10" />}
        </h1>
        {/* <div>
					<Button
						className="text-red-700 border-red-600 mr-3 font-black"
						variant="outline"
					>
						<XCircle className="mr-2 h-4 w-4" />
						Deactivate
					</Button>
					<Button className="font-black">
						<Save className="mr-2 h-4 w-4" />
						Save
					</Button>
				</div> */}
      </div>
      <hr />

      <div className="flex items-center gap-8 mt-8">
        <div className="h-16 w-16">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="uppercase bg-blue-50 text-blue-600 text-xl font-medium">
              {agency?.photo ? (
                <img
                  className="flex object-fill p-0 m-0  w-full h-full"
                  src={getPublicImageURL(agency?.photo)}
                  alt="avatar"
                />
              ) : (
                <div>{agency?.businessName[0]}</div>
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="w-72 flex flex-col">
          <span>{agency?.businessName}</span>
        </h2>
      </div>
      <p className="my-6 text-[#667085]">
        Manage users available for the agency
      </p>
      <div className="flex mb-4 justify-end items-center">
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
                Invite Admin
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <TableComponent agency={agency} />
    </div>
  );
}
