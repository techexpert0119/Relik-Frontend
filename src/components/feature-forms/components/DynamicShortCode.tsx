import { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import CountrySelect from './CountrySelect';
import { MinusCircle, PlusCircle } from 'lucide-react';
import DynamicOperator from './DynamicOperator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DynamicShortCode: FC<{ form: any; id: string }> = ({ form, id }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: id,
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="bg-white p-3 flex flex-col gap-2 rounded-md"
          >
            <div className="flex gap-2">
              <CountrySelect
                textColorClassName="text-black"
                form={form}
                countryId={`${id}.${index}.country`}
                isRequired
              />

              <MinusCircle
                className="cursor-pointer self-end mb-2"
                width={20}
                height={20}
                color="red"
                onClick={() => remove(index)}
              />
            </div>

            <DynamicOperator form={form} id={`${id}.${index}.operators`} />
          </div>
        );
      })}

      <PlusCircle
        className="cursor-pointer"
        color="white"
        onClick={() => {
          append({ country: undefined, operators: [] });
        }}
      />
    </div>
  );
};

export default DynamicShortCode;
