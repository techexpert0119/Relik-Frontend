import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface Props {
  readonly amount: string;
  readonly growthRate: number;
  readonly title: string;
}

export default function Card(props: Props) {
  return (
    <div className="w-full bg-[#F7F8F9] rounded-2xl p-5">
      <p className="text-base font-medium mb-1">{props.title}</p>
      <div className="flex items-center gap-3 justify-between">
        <p className="text-2xl font-bold">{props.amount}</p>
        <div
          className={cn(
            'flex gap-2 items-center',
            props.growthRate >= 0 ? 'text-[#027A48]' : 'text-[#B42318]'
          )}
        >
          <p className="text-sm">{props.growthRate}%</p>
          {props.growthRate >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
}
