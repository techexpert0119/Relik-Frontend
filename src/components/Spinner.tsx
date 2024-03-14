import { cn } from '@/lib/utils';

interface Props {
  readonly width?: number;
  readonly height?: number;
}

export default function Spinner(props: Props) {
  return (
    <div className="relative">
      <div
        className={cn(
          'border-purple-200 border-2 rounded-full',
          props.width ? `w-${props.width}` : 'w-10',
          props.height ? `h-${props.height}` : 'h-10'
        )}
      ></div>
      <div
        className={cn(
          'border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0',
          props.width ? `w-${props.width}` : 'w-10',
          props.height ? `h-${props.height}` : 'h-10'
        )}
      ></div>
    </div>
  );
}
