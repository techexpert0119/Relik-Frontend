import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SubscriptionService } from '@/services/api/subscription-service';
import ISubscriptionDto from '@/data/dtos/subscription-dto';

const SubscriptionPicker = (props: {
  onSubSelect?: (sub: ISubscriptionDto) => void;
  id?: string;
}) => {
  const { onSubSelect, id } = props;
  const [open, setIsOpen] = useState(false);
  const [subscription, setSubscription] = useState<ISubscriptionDto>();
  const [subscriptions, setSubscriptions] = useState<ISubscriptionDto[]>([]);

  const onSelect = (sub: ISubscriptionDto) => {
    setIsOpen(false);
    setSubscription(sub);
    onSubSelect && onSubSelect(sub);
  };

  useEffect(() => {
    SubscriptionService.getAll()
      .then((response) => setSubscriptions(response.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <section className="bg-white rounded-md border px-6 py-4 flex flex-col space-y-3">
      <div className="gray-500 text-sm">
        {subscription ? subscription.subscriptionName : 'Not selected'}
      </div>

      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit" size="md" id={id}>
            Manage subscription
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage subscription</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center my-4 space-x-2">
            {subscriptions.map((sub, i) => (
              <Button
                className="w-[168px] cursor-pointer"
                key={i}
                disabled={subscription?._id === sub._id}
                onClick={() => onSelect(sub)}
              >
                {sub.subscriptionName}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
export default SubscriptionPicker;
