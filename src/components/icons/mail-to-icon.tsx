import { FC } from 'react';

const MailToIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.7462 4.8325L12.0812 10.8731L2.41625 4.8325V2.41625L12.0812 8.45687L21.7462 2.41625M21.7462 0H2.41625C1.07523 0 0 1.07523 0 2.41625V16.9137C0 17.5546 0.254568 18.1692 0.707703 18.6223C1.16084 19.0754 1.77542 19.33 2.41625 19.33H21.7462C22.3871 19.33 23.0017 19.0754 23.4548 18.6223C23.9079 18.1692 24.1625 17.5546 24.1625 16.9137V2.41625C24.1625 1.77542 23.9079 1.16084 23.4548 0.707703C23.0017 0.254568 22.3871 0 21.7462 0Z"
        fill={props.color ?? 'black'}
      />
    </svg>
  );
};

export default MailToIcon;
