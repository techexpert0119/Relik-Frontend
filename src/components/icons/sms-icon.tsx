import { FC } from 'react';

const SmsIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.93421C0 0.863947 0.865237 0 1.93421 0H17.4079C18.4769 0 19.3421 0.863947 19.3421 1.93421V13.5317C19.3421 14.6007 18.4769 15.4647 17.4079 15.4647H12.5956L10.2075 19.0429C10.1486 19.1312 10.0688 19.2036 9.97525 19.2537C9.88168 19.3038 9.77719 19.33 9.67105 19.33C9.56492 19.33 9.46043 19.3038 9.36685 19.2537C9.27328 19.2036 9.19351 19.1312 9.13463 19.0429L6.74782 15.4647H1.93421C0.865237 15.4647 0 14.6007 0 13.5304V1.93421ZM9.02632 11.6053V9.02632H6.44737V7.73684H9.02632V5.15789H10.3158V7.73684H12.8947V9.02632H10.3158V11.6053H9.02632Z"
        fill={props.color ?? '#101828'}
      />
    </svg>
  );
};

export default SmsIcon;
