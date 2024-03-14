import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface Props {
  readonly className?: string;
}

export default function QuickTip(props: Props) {
  return (
    <div className={cn('bg-[#223345] text-white rounded p-4', props.className)}>
      <div className="flex gap-3 items-center mb-2">
        <Info className="w-6 h-6" />
        <h2 className="text-base font-bold">Quick Tip</h2>
      </div>

      <p className="font-light text-sm">
        Share your relik pages link on your social platforms for better reach &
        engagement.
      </p>
    </div>
  );
}
