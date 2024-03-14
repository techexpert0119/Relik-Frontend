import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter';
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function ComingSoonTooltip(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);
  const timeoutID: MutableRefObject<number | null> = useRef(null);
  const delay = 100;

  useEffect(() => {
    return () => {
      if (timeoutID.current) clearTimeout(timeoutID.current);
    };
  }, []);

  const handleToggle = () => {
    if (timeoutID.current) clearTimeout(timeoutID.current);
    timeoutID.current = window.setTimeout(() => setIsOpen(!isOpen), delay);
  };

  const handleClose = () => {
    if (timeoutID.current) clearTimeout(timeoutID.current);
    if (isOpen) {
      timeoutID.current = window.setTimeout(() => setIsOpen(false), delay);
    }
  };

  const handleOpen = () => {
    if (timeoutID.current) clearTimeout(timeoutID.current);
    if (!isOpen) {
      timeoutID.current = window.setTimeout(() => setIsOpen(true), delay);
    }
  };

  useOutsideAlerter({ ref: tooltipRef, handleClickOutside: handleClose });

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} delayDuration={0}>
        <TooltipTrigger
          onMouseEnter={() => handleOpen()}
          onMouseOutCapture={() => handleClose()}
          ref={tooltipRef}
          onClick={handleToggle}
          className="flex flex-col gap-1 items-center"
        >
          {props.children}
        </TooltipTrigger>
        <TooltipContent className="text-start text-bold py-3 px-5 rounded-xl">
          <div className="w-[300px]">
            <p className="text-base mb-1 font-bold text-black">
              Coming Soon...
            </p>
            <p className="text-sm" style={{ color: '#667085' }}>
              Stay tuned for an incredible addition to enhance your RELIK
              experience.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
