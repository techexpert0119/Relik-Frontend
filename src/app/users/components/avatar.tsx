import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import React, { ReactElement } from 'react';

export function WithStatus(props: React.PropsWithChildren) {
  return (
    <div className="relative w-16 h-16">
      {props.children}
      <div className="absolute bottom-2 right-1/2 translate-x-1/2 translate-y-1/2">
        <div className="rounded-full to-background bg-amber-500 text-white text-xxs font-normal px-1 leading-5">
          Inactive
        </div>
      </div>
    </div>
  );
}

export function AvatarWithStatus({
  fallBack,
  className,
}: {
  fallBack: string | ReactElement;
  className?: {
    avatar?: string;
    avatarFallBack?: string;
  };
}) {
  return (
    <Avatar className={className?.avatar}>
      <AvatarFallback
        className={cn(
          'uppercase bg-blue-50 text-blue-600',
          className?.avatarFallBack
        )}
      >
        {fallBack}
      </AvatarFallback>
    </Avatar>
  );
}
