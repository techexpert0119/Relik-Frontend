import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ITEMS_COUNT = 3;

export interface IData {
  data: Array<string>;
}

export default function Permissions({ data }: IData) {
  const slicedData = data.slice(0, ITEMS_COUNT + 1);

  return (
    <div className="flex relative gap-3">
      {slicedData.map((item, index) => {
        if (index === slicedData.length - 1 && data.length > ITEMS_COUNT) {
          return (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <div
                    key={index}
                    className={cn(
                      'border-white rounded-full bg-[#E1EFF1] py-1 px-3 text-[#5D6262] text-xs'
                    )}
                  >
                    +{data.length - ITEMS_COUNT}
                  </div>
                </TooltipTrigger>
                <ul>
                  <TooltipContent>
                    {data.slice(ITEMS_COUNT).map((item, id) => {
                      return <li key={id}>{item}</li>;
                    })}
                  </TooltipContent>
                </ul>
              </Tooltip>
            </TooltipProvider>
          );
        }
        return (
          <div
            key={index}
            className={cn(
              'border-white rounded-full bg-[#E1EFF1] py-1 px-3 text-[#5D6262] text-xs'
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
