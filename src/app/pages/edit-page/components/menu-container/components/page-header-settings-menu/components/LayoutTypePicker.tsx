import { FC } from 'react';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';
import { cn } from '@/lib/utils';

const LayoutTypePicker: FC<{
  id?: string;
  value?: HeaderLayoutType;
  disabled?: boolean;
  onChange?: (value: HeaderLayoutType) => void;
}> = ({ value, disabled, onChange, id }) => {
  const hoverStyle = disabled
    ? ''
    : 'hover:text-white cursor-pointer flex justify-center';

  return (
    <div
      className={cn(
        'text-gray-400 grid gap-2 grid-cols-2 xs:grid-cols-4',
        disabled && 'opacity-50'
      )}
    >
      <input id={id} className="hidden" value={value} readOnly />

      <div
        className={cn(
          value === HeaderLayoutType.Default && 'text-white',
          hoverStyle
        )}
        onClick={() => onChange?.(HeaderLayoutType.Default)}
      >
        <svg
          width="103"
          height="111"
          viewBox="0 0 103 111"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M99.7386 2.35815H2.3584V59.4637H29.2704C29.2705 47.4358 39.0211 37.6853 51.049 37.6853C63.0769 37.6853 72.8275 47.4358 72.8276 59.4637H99.7386V2.35815Z"
            fill="currentColor"
          />
          <circle cx="51.0481" cy="59.3154" r="16.8313" fill="currentColor" />
          <rect
            x="26.0986"
            y="81.8066"
            width="49.8994"
            height="8.89674"
            fill="currentColor"
          />
          <rect
            x="12.4219"
            y="94.0049"
            width="77.2528"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="5.7793"
            y="99.9753"
            width="90.5373"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="5.7793"
            y="105.946"
            width="90.5373"
            height="2.66872"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className={cn(
          value === HeaderLayoutType.NoImage && 'text-white',
          hoverStyle
        )}
        onClick={() => onChange?.(HeaderLayoutType.NoImage)}
      >
        <svg
          width="103"
          height="111"
          viewBox="0 0 103 111"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="46.2706" cy="34.6144" r="32.256" fill="currentColor" />
          <rect
            x="21.3213"
            y="79.1333"
            width="49.8994"
            height="8.89674"
            fill="currentColor"
          />
          <rect
            x="8.88477"
            y="92.2749"
            width="74.7715"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="2.45605"
            y="99.1885"
            width="87.6293"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="2.45605"
            y="106.102"
            width="87.6293"
            height="2.66872"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className={cn(
          value === HeaderLayoutType.LeftSided && 'text-white',
          hoverStyle
        )}
        onClick={() => onChange?.(HeaderLayoutType.LeftSided)}
      >
        <svg
          width="103"
          height="110"
          viewBox="0 0 103 110"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.80176"
            y="2.3584"
            width="97.3802"
            height="57.1055"
            fill="currentColor"
          />
          <circle cx="12.9429" cy="77.1514" r="10.1412" fill="currentColor" />
          <rect
            x="31.1025"
            y="72.7031"
            width="49.8994"
            height="8.89674"
            fill="currentColor"
          />
          <rect
            x="2.80176"
            y="94.8391"
            width="74.7715"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="2.80176"
            y="99.6145"
            width="87.6293"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="2.80176"
            y="104.39"
            width="87.6293"
            height="2.66872"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className={cn(
          value === HeaderLayoutType.RightSided && 'text-white',
          hoverStyle
        )}
        onClick={() => onChange?.(HeaderLayoutType.RightSided)}
      >
        <svg
          width="103"
          height="110"
          viewBox="0 0 103 110"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.89941"
            y="2.3584"
            width="97.3802"
            height="57.1058"
            fill="currentColor"
          />
          <circle cx="25.3482" cy="80.4641" r="14.397" fill="currentColor" />
          <rect
            x="46.3486"
            y="66.0671"
            width="49.8994"
            height="8.89674"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="81.5671"
            width="46.018"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="86.1226"
            width="53.9313"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="90.6777"
            width="53.9313"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="95.2332"
            width="46.018"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="99.7886"
            width="53.9313"
            height="2.66872"
            fill="currentColor"
          />
          <rect
            x="46.3486"
            y="104.344"
            width="53.9313"
            height="2.66872"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default LayoutTypePicker;
