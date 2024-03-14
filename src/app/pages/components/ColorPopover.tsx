import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SketchPicker } from 'react-color';

interface IProps {
  value?: string;
  onValueChange?: (value: string) => void;
  id?: string;
}

const ColorPopover: FC<IProps> = ({ value, onValueChange, id }) => {
  return (
    <Popover>
      <PopoverTrigger id={id}>
        <div
          className={cn(
            'rounded-md border border-white h-28 w-20 overflow-hidden flex flex-col'
          )}
        >
          <div
            style={{ background: value ? value : 'white' }}
            className="flex-grow"
          />
          <div className="bg-white w-full pt-2 h-8 text-sm font-semibold uppercase">
            {value}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-200}
        className="bg-background shadow-2xl rounded-md border w-fit p-1"
      >
        <SketchPicker
          color={value}
          onChange={(v) => {
            onValueChange?.(v.hex);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
export default ColorPopover;
