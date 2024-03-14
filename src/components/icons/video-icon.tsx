import { FC } from 'react';

const VideoIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 25 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 2.83333C0 1.27057 1.24566 0 2.77778 0H13.8889C15.421 0 16.6667 1.27057 16.6667 2.83333V14.1667C16.6667 15.7294 15.421 17 13.8889 17H2.77778C1.24566 17 0 15.7294 0 14.1667V2.83333ZM24.2665 1.5849C24.7179 1.83281 25 2.31094 25 2.83333V14.1667C25 14.6891 24.7179 15.1672 24.2665 15.4151C23.8151 15.663 23.2682 15.6365 22.8385 15.3443L18.6719 12.5109L18.0556 12.0904V4.90964L18.6719 4.48906L22.8385 1.65573C23.2639 1.36797 23.8108 1.33698 24.2665 1.5849Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default VideoIcon;
