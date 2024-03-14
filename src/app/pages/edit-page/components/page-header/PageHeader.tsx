import { FC, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PageHeader: FC<{
  editMode?: boolean;
  value: string;
  onSetValue?: (text?: string) => void;
}> = (props) => {
  const { value } = props;
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const inputRef = useRef<HTMLInputElement>(null);

  const saveChanges = () => {
    setMode('preview');
  };

  return (
    <div className="flex justify-center items-center font-[700] text-lg relative">
      {mode === 'preview' ? (
        <h1>{value}</h1>
      ) : (
        <form
          className="flex items-center gap-2 pr-10 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            props.onSetValue && props.onSetValue(inputRef.current?.value);
            saveChanges();
          }}
        >
          <Input
            className="border-gray-400"
            defaultValue={value}
            ref={inputRef}
          />
          <Button variant="ghost" size="xs">
            <Check className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default PageHeader;
