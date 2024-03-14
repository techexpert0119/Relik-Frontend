import * as React from 'react';

import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 hover:border-slate-400  bg-background px-3 py-[10px] text-sm ' +
            'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
            'placeholder:text-muted-foreground focus-visible:outline-none  ' +
            'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white',
          className
        )}
        ref={ref}
        value={value ?? ''}
        {...props}
      />
    );
  }
);

interface CustomOnChange {
  onChange: (value?: number) => void;
}

const InputNumber = React.forwardRef<
  HTMLInputElement,
  InputProps & CustomOnChange
>(({ onChange, ...props }, ref) => {
  return (
    <Input
      onChange={(e) => {
        const numberRegex = /^[0-9]+$/;
        if (numberRegex.test(e.target.value)) {
          onChange && onChange(Number(e.target.value));
        } else {
          onChange && onChange(undefined);
        }
      }}
      ref={ref}
      {...props}
    />
  );
});

const InputWithFixedValue = React.forwardRef<
  HTMLInputElement,
  InputProps & { fixedValue: string; copyToClickboard: () => void }
>(({ className, type, fixedValue, copyToClickboard, ...props }, ref) => {
  const [domainWidth, setDomainWidth] = React.useState(0);

  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border border-slate-300 hover:border-slate-400  bg-white  text-sm' +
            ' ring-offset-background focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
            className
        )}
        ref={ref}
        style={{ paddingLeft: `${domainWidth + 16}px` }}
        {...props}
      />
      <h1
        ref={(el) => {
          if (!el) return;
          setDomainWidth(el.getBoundingClientRect().width);
        }}
        className="absolute text-sm top-1/2 translate-y-[-50%] left-[15px] font-bold"
      >
        {fixedValue}
      </h1>

      <h1 className="flex text-sm items-center link absolute top-1/2 translate-y-[-50%] right-[14px] font-bold gap-2">
        <Copy
          onClick={copyToClickboard}
          className="h-5 text-sm  w-5 cursor-pointer"
        />
      </h1>
    </div>
  );
});

const InputForSocialHandle = React.forwardRef<
  HTMLInputElement,
  InputProps & { fixedValue?: string; numeric?: boolean }
>(({ fixedValue, numeric, onChange, ...props }, ref) => {
  const [fixedWidth, setFixedWidth] = React.useState(0);

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        onChange={(e) => {
          if (numeric) {
            const regex = /^[0-9]*$/;
            const newValue = e.target.value;
            if (regex.test(newValue) || newValue === '') {
              onChange && onChange(e);
            }
          } else onChange && onChange(e);
        }}
        style={{ paddingLeft: `${fixedWidth + 20}px` }}
        {...props}
      />
      {fixedValue && (
        <h1
          ref={(el) => {
            if (!el) return;
            setFixedWidth(el.getBoundingClientRect().width);
          }}
          className="absolute text-sm top-1/2 translate-y-[-50%] left-[15px] font-bold"
        >
          {fixedValue}
        </h1>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input, InputNumber, InputWithFixedValue, InputForSocialHandle };
