import { FC } from 'react';

const FacebookLogo: FC<{
  readonly className?: string;
  readonly color?: string;
  readonly height?: number | string;
  readonly width?: number | string;
}> = ({ color, ...props }) => {
  return (
    <svg
      width="17"
      height="30"
      viewBox="0 0 17 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.0179 17.0535L15.813 11.8696H10.8393V8.5057C10.8393 7.08727 11.5341 5.70499 13.7619 5.70499H16.0232V1.29167C16.0232 1.29167 13.9709 0.941406 12.0087 0.941406C7.91248 0.941406 5.23507 3.42407 5.23507 7.91866V11.8696H0.681641V17.0535H5.23507V29.5853C6.16203 29.7305 7.0989 29.8034 8.03717 29.8031C8.97545 29.8034 9.91232 29.7306 10.8393 29.5853V17.0535H15.0179Z"
        fill={color ?? 'white'}
      />
    </svg>
  );
};

export default FacebookLogo;
