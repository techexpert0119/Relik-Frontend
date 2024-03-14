import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { FC, useState } from 'react';

const ConfirmationDialog: FC<{
  onConfirm: () => void;
  isDisabled: boolean;
}> = ({ onConfirm, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        disabled={isDisabled}
        variant="outline"
        onClick={open}
        className="text-gray-700"
      >
        <LogOut className="h-4 w-4 mr-2" /> Logout other sessions
      </Button>

      <DialogContent>
        Are you sure?
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onConfirm?.();
              setIsOpen(false);
            }}
          >
            Yes
          </Button>
          <Button variant="destructive" onClick={close}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
