import { FC } from 'react';

const LinkedInLogo: FC<{
  readonly className?: string;
  readonly color?: string;
  readonly height?: number | string;
  readonly width?: number | string;
}> = ({ color, ...props }) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.6314 26.3989H25.8639C26.0173 26.3989 26.1644 26.338 26.2729 26.2296C26.3813 26.1211 26.4423 25.9741 26.4423 25.8207L26.4445 16.8782C26.4445 12.2042 25.4373 8.61152 19.9753 8.61152C17.8989 8.5343 15.9408 9.60465 14.8842 11.3919C14.8791 11.4006 14.8712 11.4074 14.8618 11.4112C14.8525 11.415 14.8421 11.4156 14.8324 11.4129C14.8226 11.4103 14.814 11.4045 14.8078 11.3966C14.8017 11.3886 14.7983 11.3788 14.7982 11.3687V9.62142C14.7982 9.46802 14.7373 9.3209 14.6288 9.21242C14.5203 9.10395 14.3732 9.04301 14.2198 9.04301H10.2032C10.0498 9.04301 9.90263 9.10395 9.79416 9.21242C9.68569 9.3209 9.62475 9.46802 9.62475 9.62142V25.8198C9.62475 25.9732 9.68569 26.1203 9.79416 26.2288C9.90263 26.3373 10.0498 26.3982 10.2032 26.3982H14.4354C14.5888 26.3982 14.7359 26.3373 14.8444 26.2288C14.9529 26.1203 15.0138 25.9732 15.0138 25.8198V17.8127C15.0138 15.5487 15.4433 13.3561 18.2502 13.3561C21.0171 13.3561 21.053 15.9468 21.053 17.9594V25.8205C21.053 25.9739 21.1139 26.1211 21.2224 26.2295C21.3309 26.338 21.478 26.3989 21.6314 26.3989ZM0.416016 3.54348C0.416016 5.25905 1.82835 6.67066 3.54406 6.67066C5.25934 6.67052 6.6708 5.25804 6.6708 3.54276C6.67052 1.82748 5.2589 0.416016 3.54348 0.416016C1.82763 0.416016 0.416016 1.82792 0.416016 3.54348ZM1.42231 26.3989H5.66018C5.81358 26.3989 5.9607 26.338 6.06918 26.2295C6.17765 26.1211 6.23859 25.9739 6.23859 25.8205V9.62142C6.23859 9.46802 6.17765 9.3209 6.06918 9.21242C5.9607 9.10395 5.81358 9.04301 5.66018 9.04301H1.42231C1.2689 9.04301 1.12178 9.10395 1.01331 9.21242C0.904835 9.3209 0.843895 9.46802 0.843895 9.62142V25.8205C0.843895 25.9739 0.904835 26.1211 1.01331 26.2295C1.12178 26.338 1.2689 26.3989 1.42231 26.3989Z"
        fill={color ?? 'white'}
      />
    </svg>
  );
};

export default LinkedInLogo;
