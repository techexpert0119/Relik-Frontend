import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { sendVerificationEmailQuery } from '@/services/api/users-service';

export default function ResendVerificationEmailPage() {
  const sendVerification = sendVerificationEmailQuery();

  const sendVerificationEmail = () => {
    sendVerification
      .refetch()
      .then((data) => {
        if (data?.status === 'success') {
          toast({
            title: 'Success',
            description: 'Verification email is sent!',
            variant: 'success',
          });
        } else if (data?.failureReason?.response?.data?.message) {
          toast({
            title: 'Error',
            description: data?.failureReason?.response?.data?.message,
            variant: 'destructive',
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error?.message ?? 'Something went wrong!',
          variant: 'destructive',
        });
      });
  };

  return (
    <section className="flex justify-center items-center ">
      <div className="mt-5 mb-4 text-sm text-gray-600 flex flex-col justify-center items-start  gap-4">
        <p className="max-w-[350px]">
          Before continuing, could you verify your email address by clicking on
          the link we just emailed to you? If you didn't receive the email, we
          will gladly send you another.
        </p>
        <Button
          disabled={sendVerification.isLoading}
          onClick={sendVerificationEmail}
          className="font-semibold text-lg"
        >
          Resend Verification Email
        </Button>
      </div>
    </section>
  );
}
