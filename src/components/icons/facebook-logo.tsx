import { FC } from 'react';

const FacebookLogo: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons8-facebook-50">
        <path
          id="Vector"
          d="M25.6001 4.58252H6.40006C5.22139 4.58252 4.26672 5.53719 4.26672 6.71585V25.9159C4.26672 27.0945 5.22139 28.0492 6.40006 28.0492H17.0667V18.4492H13.8667V15.2492H17.0667V13.5308C17.0667 10.2775 18.6518 8.84919 21.3558 8.84919C22.6507 8.84919 23.3355 8.94519 23.6598 8.98892V12.0492H21.8155C20.6678 12.0492 20.2667 12.6551 20.2667 13.8817V15.2492H23.631L23.1745 18.4492H20.2667V28.0492H25.6001C26.7787 28.0492 27.7334 27.0945 27.7334 25.9159V6.71585C27.7334 5.53719 26.7777 4.58252 25.6001 4.58252Z"
          fill={props.color}
        />
      </g>
    </svg>
  );
};

export default FacebookLogo;
