import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputNumber } from '@/components/ui/input';
import { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MinusCircle, PlusCircle } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DynamicOperator: FC<{ form: any; id: string }> = ({ form, id }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: id,
  });

  return (
    <div>
      <p>Operators</p>
      <div className="flex flex-col gap-2">
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex gap-3">
              <FormField
                control={form.control}
                name={`${id}.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Name*" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${id}.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <InputNumber {...field} placeholder="Price*" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${id}.${index}.shortCode`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <InputNumber {...field} placeholder="Short code*" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MinusCircle
                className="cursor-pointer self-end mb-2"
                width={23}
                height={23}
                color="red"
                onClick={() => remove(index)}
              />
            </div>
          );
        })}

        <PlusCircle
          className="cursor-pointer"
          color="#15803D"
          onClick={() => {
            append({ name: undefined, price: undefined, shortCode: undefined });
          }}
        />
      </div>
    </div>
  );
};

export default DynamicOperator;
