import { FC } from 'react';

const EmailLogo: FC<{
  readonly className?: string;
  readonly color?: string;
  readonly height?: number | string;
  readonly width?: number | string;
}> = ({ color, ...props }) => {
  return (
    <svg
      width="20"
      height="35"
      viewBox="0 0 20 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5095 27.3319C16.8921 27.6264 15.7107 27.8827 14.8288 27.906C12.1715 27.9775 11.6556 26.0391 11.6323 24.6313V14.293H18.3016V9.26621H11.6574V0.806641H6.79188C6.71203 0.806641 6.57223 0.876503 6.55389 1.05455C6.26936 3.64372 5.05635 8.188 0.0195312 10.0035V14.2931H3.38069V25.1455C3.38069 28.8595 6.12129 34.1376 13.3562 34.0144C15.7956 33.9728 18.5062 32.9495 19.1069 32.0693L17.5095 27.3319Z"
        fill={color ?? 'white'}
      />
    </svg>
  );
};

export default EmailLogo;
