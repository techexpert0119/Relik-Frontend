import { FC } from 'react';
import { ExternalLink } from 'lucide-react';

const Operator: FC<{
  name: string;
  price: number;
  shortCode: number;
}> = ({ name, price, shortCode }) => {
  return (
    <div className="flex justify-between items-center px-3 w-full">
      <div className="font-[400] text-base flex gap-2 flex-wrap items-center content-center">
        <p className="opacity-70">{name}</p>
        <p className="font-bold	">(AED {price})</p>
      </div>
      <a href={`sms:${shortCode}`} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="h-5 w-5" />
      </a>
    </div>
  );
};

export default Operator;
