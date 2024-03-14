import { FC } from 'react';

const SubscribeToNewsIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.99503 17.6309C6.4156 18.1627 6.95152 18.592 7.56231 18.8863C8.17311 19.1807 8.8428 19.3324 9.52081 19.33C10.1988 19.3324 10.8685 19.1807 11.4793 18.8863C12.0901 18.592 12.626 18.1627 13.0466 17.6309C10.7068 17.948 8.33485 17.948 5.99503 17.6309ZM16.0447 6.76549V7.44591C16.0447 8.2626 16.2766 9.06092 16.7135 9.74037L17.7844 11.4057C18.7615 12.9269 18.0154 14.9943 16.3153 15.4746C11.873 16.733 7.16859 16.733 2.72633 15.4746C1.02626 14.9943 0.28012 12.9269 1.25725 11.4057L2.32813 9.74037C2.76651 9.05547 2.99898 8.25909 2.99791 7.44591V6.76549C2.99791 3.02901 5.91867 0 9.52081 0C13.123 0 16.0447 3.02901 16.0447 6.76549Z"
        fill={props.color ?? 'black'}
      />
    </svg>
  );
};

export default SubscribeToNewsIcon;
