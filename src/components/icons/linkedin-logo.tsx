import { FC } from 'react';

const LinkedInLogo: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.32153 10.6431C9.61128 10.6431 10.6431 9.59515 10.6431 8.32153C10.6431 7.04791 9.59515 6 8.32153 6C7.04791 6 6 7.04791 6 8.32153C6 9.59515 7.04791 10.6431 8.32153 10.6431ZM12.8518 12.4003V25.33H16.8499V18.9458C16.8499 17.253 17.1724 15.6247 19.2521 15.6247C21.3318 15.6247 21.3318 17.5593 21.3318 19.0425V25.33H25.3461V18.2364C25.3461 14.7541 24.6045 12.0779 20.5418 12.0779C18.5911 12.0779 17.2852 13.1419 16.7532 14.1576H16.7049V12.3842H12.8679L12.8518 12.4003ZM6.32244 12.4003H10.3368V25.33H6.32244V12.4003Z"
        fill={props.color}
      />
    </svg>
  );
};

export default LinkedInLogo;
