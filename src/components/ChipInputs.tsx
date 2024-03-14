import { KeyboardEvent, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const ChipInput = (props: {
  id?: string;
  onSelect?: (data: string[]) => void;
}) => {
  const { id, onSelect } = props;
  const [chips, setChips] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && inputRef.current?.value.length === 0) {
      removeLast();
      return;
    }

    if (e.key !== 'Enter') return;

    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (!value.trim()) return;

    e.preventDefault();
    const newValue = [...chips, value];
    setChips(newValue);
    onSelect && onSelect(newValue);
    target.value = '';
  }

  function removeTag(index: number) {
    const newValue = chips.filter((el, i) => i !== index);
    setChips(newValue);
    onSelect && onSelect(newValue);
  }

  function removeLast() {
    if (chips.length > 0) {
      removeTag(chips.length - 1);
    }
  }

  return (
    <div
      className={cn(
        `flex flex-wrap gap-x-2 min-h-[44px] px-2 py-1 bg-white  focus:outline-none border-0 outline-none border-black rounded-md text-sm`
        // focused && 'outline outline-1 outline-offset-2'
      )}
    >
      {chips.map((chip, index) => (
        <div
          onClick={() => removeTag(index)}
          className="bg-[#E1EFF1] px-[10px] my-1 flex items-center rounded-lg font-semibold"
          key={index}
        >
          <span className="text w-fit cursor-pointer flex flex-wrap h-8 items-center">
            {chip}
          </span>
        </div>
      ))}
      <input
        id={id}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        className="outline-0 mx-1 flex-1 placeholder:text-gray-500 min-h-[32px]"
        placeholder={chips.length === 0 ? 'Type something' : ''}
      />
    </div>
  );
};

export default ChipInput;
