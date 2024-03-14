import { toast } from '@/components/ui/use-toast';
import { ISignResult } from '@/data/interfaces/sign-result';
import QueryHook from '@/hooks/queryHook';
import { verifyEmailQuery } from '@/services/api/users-service';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect } from 'react';

export default function VerifyEmail() {
  const { QueryParams, navigate } = QueryHook();
  const { authorize } = useAuthStore();
  const { token } = QueryParams;
  const verifyEmail = verifyEmailQuery();

  useEffect(() => {
    if (token) {
      verifyEmail.mutate(
        { token },
        {
          onSuccess: ({ data }: { data: ISignResult }) => {
            if (data) {
              navigate('/auth/sign-in');
              authorize(
                data.user,
                data.token.accessToken,
                data.token.refreshToken,
                data?.agencies
              );

              toast({
                title: 'Success',
                description: 'Email successfully verified!',
                variant: 'success',
              });
            }
          },
          onError: (err) => {
            toast({
              title: 'Error',
              variant: 'destructive',
              description: err?.response?.data?.message,
            });
            navigate('/auth/sign-in');
          },
        }
      );
    }
  }, [token]);

  return (
    <div className="flex max-w-screen max-h-screen justify-center items-center">
      Validating...
    </div>
  );
}
