import { FC } from 'react';

const EventIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2323_14298)">
        <path
          d="M10 9.86109C10.1989 9.86109 10.3897 9.78207 10.5303 9.64142C10.671 9.50077 10.75 9.31 10.75 9.11109V4.61108C10.75 4.41217 10.671 4.22141 10.5303 4.08075C10.3897 3.9401 10.1989 3.86108 10 3.86108C9.80109 3.86108 9.61032 3.9401 9.46967 4.08075C9.32902 4.22141 9.25 4.41217 9.25 4.61108V9.11109C9.25 9.31 9.32902 9.50077 9.46967 9.64142C9.61032 9.78207 9.80109 9.86109 10 9.86109Z"
          fill={props.color ?? 'black'}
        />
        <path
          d="M22 9.86109C22.1989 9.86109 22.3897 9.78207 22.5303 9.64142C22.671 9.50077 22.75 9.31 22.75 9.11109V4.61108C22.75 4.41217 22.671 4.22141 22.5303 4.08075C22.3897 3.9401 22.1989 3.86108 22 3.86108C21.8011 3.86108 21.6103 3.9401 21.4697 4.08075C21.329 4.22141 21.25 4.41217 21.25 4.61108V9.11109C21.25 9.31 21.329 9.50077 21.4697 9.64142C21.6103 9.78207 21.8011 9.86109 22 9.86109Z"
          fill={props.color ?? 'black'}
        />
        <path
          d="M26.6877 6.86117H23.6877V9.11117C23.6877 9.54878 23.5139 9.96846 23.2044 10.2779C22.895 10.5873 22.4753 10.7612 22.0377 10.7612C21.6001 10.7612 21.1804 10.5873 20.871 10.2779C20.5615 9.96846 20.3877 9.54878 20.3877 9.11117V6.86117H11.6502V9.11117C11.6502 9.54878 11.4764 9.96846 11.1669 10.2779C10.8575 10.5873 10.4378 10.7612 10.0002 10.7612C9.56259 10.7612 9.14291 10.5873 8.83347 10.2779C8.52404 9.96846 8.3502 9.54878 8.3502 9.11117V6.86117H5.35019C5.17171 6.85914 4.99463 6.89292 4.82943 6.96052C4.66423 7.02811 4.51427 7.12815 4.3884 7.25472C4.26254 7.38128 4.16333 7.5318 4.09665 7.69737C4.02997 7.86294 3.99717 8.0402 4.00019 8.21867V25.0037C3.99721 25.179 4.0288 25.3532 4.09315 25.5163C4.1575 25.6794 4.25336 25.8283 4.37524 25.9543C4.49712 26.0804 4.64264 26.1812 4.80349 26.251C4.96434 26.3208 5.13737 26.3583 5.31269 26.3612H26.6877C26.863 26.3583 27.0361 26.3208 27.1969 26.251C27.3578 26.1812 27.5033 26.0804 27.6252 25.9543C27.7471 25.8283 27.8429 25.6794 27.9073 25.5163C27.9716 25.3532 28.0032 25.179 28.0002 25.0037V8.21867C28.0032 8.04335 27.9716 7.86916 27.9073 7.70605C27.8429 7.54294 27.7471 7.3941 27.6252 7.26804C27.5033 7.14198 27.3578 7.04116 27.1969 6.97135C27.0361 6.90154 26.863 6.8641 26.6877 6.86117ZM21.9552 14.7962L14.7027 22.0487L10.7502 18.0662C10.5751 17.8736 10.4802 17.6213 10.4851 17.3611C10.4899 17.1008 10.594 16.8523 10.7762 16.6663C10.9583 16.4803 11.2046 16.371 11.4647 16.3608C11.7248 16.3505 11.979 16.4401 12.1752 16.6112L14.7102 19.1462L20.5002 13.3562C20.5953 13.2611 20.7081 13.1857 20.8323 13.1343C20.9564 13.0829 21.0895 13.0564 21.224 13.0564C21.3584 13.0564 21.4915 13.0829 21.6157 13.1343C21.7398 13.1857 21.8527 13.2611 21.9477 13.3562C22.0428 13.4512 22.1181 13.5641 22.1696 13.6882C22.221 13.8124 22.2475 13.9455 22.2475 14.0799C22.2475 14.2143 22.221 14.3474 22.1696 14.4716C22.1181 14.5958 22.0428 14.7086 21.9477 14.8037L21.9552 14.7962Z"
          fill={props.color ?? 'black'}
        />
      </g>
      <defs>
        <clipPath id="clip0_2323_14298">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EventIcon;