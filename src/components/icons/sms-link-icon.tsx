import { FC } from 'react';

const SmsLinkIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.87838 10.3176C7.20319 10.3176 7.47565 10.2075 7.69576 9.9874C7.91586 9.76729 8.02554 9.49521 8.02477 9.17117C8.02477 8.84635 7.91472 8.57428 7.69461 8.35493C7.4745 8.13559 7.20242 8.02553 6.87838 8.02477C6.55356 8.02477 6.28149 8.13482 6.06214 8.35493C5.8428 8.57504 5.73274 8.84712 5.73198 9.17117C5.73198 9.49598 5.84203 9.76844 6.06214 9.98855C6.28225 10.2087 6.55433 10.3183 6.87838 10.3176ZM11.464 10.3176C11.7888 10.3176 12.0612 10.2075 12.2813 9.9874C12.5014 9.76729 12.6111 9.49521 12.6104 9.17117C12.6104 8.84635 12.5003 8.57428 12.2802 8.35493C12.0601 8.13559 11.788 8.02553 11.464 8.02477C11.1391 8.02477 10.8671 8.13482 10.6477 8.35493C10.4284 8.57504 10.3183 8.84712 10.3176 9.17117C10.3176 9.49598 10.4276 9.76844 10.6477 9.98855C10.8678 10.2087 11.1399 10.3183 11.464 10.3176ZM16.0495 10.3176C16.3744 10.3176 16.6468 10.2075 16.8669 9.9874C17.087 9.76729 17.1967 9.49521 17.1959 9.17117C17.1959 8.84635 17.0859 8.57428 16.8658 8.35493C16.6457 8.13559 16.3736 8.02553 16.0495 8.02477C15.7247 8.02477 15.4527 8.13482 15.2333 8.35493C15.014 8.57504 14.9039 8.84712 14.9031 9.17117C14.9031 9.49598 15.0132 9.76844 15.2333 9.98855C15.4534 10.2087 15.7255 10.3183 16.0495 10.3176ZM4.58558 18.3423L1.94887 20.979C1.58585 21.3421 1.17009 21.4235 0.701596 21.2232C0.233102 21.023 -0.000762397 20.6645 1.86709e-06 20.1479V2.29279C1.86709e-06 1.66227 0.224696 1.1227 0.674083 0.674081C1.12347 0.225458 1.66304 0.000764264 2.29279 0H20.6351C21.2656 0 21.8056 0.224694 22.255 0.674081C22.7044 1.12347 22.9287 1.66304 22.9279 2.29279V16.0495C22.9279 16.6801 22.7036 17.22 22.255 17.6694C21.8064 18.1188 21.2664 18.3431 20.6351 18.3423H4.58558Z"
        fill="#101828"
      />
    </svg>
  );
};

export default SmsLinkIcon;
