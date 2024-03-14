import { FC } from 'react';
import { cn } from '@/lib/utils';

type TToggleProps = {
  id?: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
};

const Toggle: FC<TToggleProps> = ({ id, value, onChange }) => {
  const toggle = () => {
    onChange && onChange(!value);
  };

  return (
    <button
      id={id}
      type="button"
      onClick={toggle}
      className={cn(
        'rounded-full w-10 p-[2px] cursor-pointer disabled:cursor-no-drop disabled:opacity-50',
        !value ? 'bg-gray-400' : 'bg-[#16A34A]'
      )}
    >
      <div
        className={cn('bg-white rounded-full h-5 w-5', value && 'ml-auto')}
      />
    </button>
  );
};

export default Toggle;
