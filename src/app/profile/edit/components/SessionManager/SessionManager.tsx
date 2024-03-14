import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useRemoveOtherSessions,
  useRemoveSession,
  useSessions,
} from '@/services/api/user-profile-service';
import { Monitor, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConfirmationDialog from '@/app/profile/edit/components/SessionManager/ConfirmationDialog';
import { cn } from '@/lib/utils';

const SessionManager = () => {
  const { data: sessions, refetch: refetchSessions } = useSessions();
  const { mutate: remove } = useRemoveSession({ onSuccess: refetchSessions });
  const { mutate: logoutOthers } = useRemoveOtherSessions({
    onSuccess: refetchSessions,
  });

  return (
    <Card>
      <CardContent className="p-6 text-sm text-gray-500 gap-4 flex flex-col">
        <div>
          If necessary, you may log out of all of your other browser sessions
          across all of your devices. Some of your recent sessions are listed
          below; however, this list may not be exhaustive. If you feel your
          account has been compromised, you should also update your password.
        </div>

        <ScrollArea className="h-72">
          {sessions?.map((s, i) => (
            <div className="flex flex-col gap-2" key={i}>
              <div className="flex items-center text-gray-500 gap-4 py-2 pr-4">
                <Monitor />
                <div className="flex flex-col text-clip ">
                  <p
                    className={cn(
                      'text-sm max-w-[220px] sm:max-w-[320px] md:max-w-[364px]',
                      'whitespace-nowrap text-ellipsis overflow-x-hidden'
                    )}
                  >
                    {s.userAgent}
                  </p>
                  <div>
                    <span>{s.ip}</span>
                    {s.thisDevice && (
                      <>
                        <span>,</span>
                        <span className="ml-2 text-[#33C138] font-[600]">
                          This device
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(s._id)}
                  className="ml-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="flex">
          <ConfirmationDialog
            isDisabled={sessions && sessions?.length > 1 ? false : true}
            onConfirm={() => logoutOthers()}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManager;
