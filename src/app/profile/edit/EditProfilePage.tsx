import EditPrivateAccountForm from '@/app/profile/edit/components/EditPrivateAccountForm';
import SessionManager from '@/app/profile/edit/components/SessionManager/SessionManager';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EditProfilePage = () => {
  return (
    <main className="flex flex-col flex-1 gap-6 container mx-auto py-6">
      <EditPrivateAccountForm />

      <Separator />

      <div className="row">
        <div className="label flex flex-col gap-2">
          <div>Browser sessions</div>
          <div className="text-sm text-gray-500 font-normal">
            Manage and log out your active sessions on other browsers and
            devices.
          </div>
        </div>

        <SessionManager />
      </div>

      <Separator />

      <div className="row">
        <div className="label flex flex-col gap-2">
          <div>Delete Account</div>
          <div className="text-sm text-gray-500 font-normal">
            Permanently delete your account.
          </div>
        </div>

        <Card>
          <CardContent className="p-6 text-sm text-gray-500 gap-4 flex flex-col">
            <div>
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Before deleting your account, please
              download any data or information that you wish to retain.
            </div>
            <Button
              variant="destructive"
              className="w-full sm:w-fit px-8"
              disabled
            >
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator />
    </main>
  );
};

export default EditProfilePage;
