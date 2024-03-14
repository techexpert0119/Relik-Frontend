import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const RoleCard = (props: {
  id: string;
  title?: string;
  description?: string;
  checked?: boolean;
  onClick?: () => void;
  iconSrc?: string;
}) => {
  const { id, title, checked, description, onClick, iconSrc } = props;

  return (
    <>
      <label htmlFor={title} onClick={onClick}>
        <input
          type="radio"
          name={title}
          value={title}
          id={id}
          checked={checked}
          className="hidden"
          readOnly
        />
        <div className="flex gap-4 items-center border rounded-md bg-white cursor-pointer">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 p-3 lg:p-4">
              {iconSrc && <img src={iconSrc} alt="icon" className="h-8 w-8" />}
              {title}
              <div className="ml-auto">
                {checked ? (
                  <div className="rounded-full h-4 w-4 flex items-center justify-center text-white bg-[#54B8C7]">
                    <CheckIcon strokeWidth={4} className="h-[10px] w-[10px]" />
                  </div>
                ) : (
                  <div className="rounded-full h-4 w-4 border border-gray-300"></div>
                )}
              </div>
            </div>
            <Separator />
            <h2 className="text-sm p-3 gray-500">{description}</h2>
          </div>
        </div>
      </label>
    </>
  );
};

export default RoleCard;
