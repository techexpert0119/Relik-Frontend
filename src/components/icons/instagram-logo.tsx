import { FC } from 'react';

const InstagramLogo: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = ({ height, width, color, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      color={color}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.0276 2C14.1526 2.003 14.7236 2.009 15.2166 2.023L15.4106 2.03C15.6346 2.038 15.8556 2.048 16.1226 2.06C17.1866 2.11 17.9126 2.278 18.5496 2.525C19.2096 2.779 19.7656 3.123 20.3216 3.678C20.8301 4.1779 21.2236 4.78259 21.4746 5.45C21.7216 6.087 21.8896 6.813 21.9396 7.878C21.9516 8.144 21.9616 8.365 21.9696 8.59L21.9756 8.784C21.9906 9.276 21.9966 9.847 21.9986 10.972L21.9996 11.718V13.028C22.0021 13.7574 21.9944 14.4868 21.9766 15.216L21.9706 15.41C21.9626 15.635 21.9526 15.856 21.9406 16.122C21.8906 17.187 21.7206 17.912 21.4746 18.55C21.2243 19.2178 20.8307 19.8226 20.3216 20.322C19.8216 20.8303 19.2169 21.2238 18.5496 21.475C17.9126 21.722 17.1866 21.89 16.1226 21.94C15.8853 21.9512 15.648 21.9612 15.4106 21.97L15.2166 21.976C14.7236 21.99 14.1526 21.997 13.0276 21.999L12.2816 22H10.9726C10.2429 22.0025 9.51312 21.9949 8.7836 21.977L8.5896 21.971C8.35221 21.962 8.11487 21.9517 7.8776 21.94C6.8136 21.89 6.0876 21.722 5.4496 21.475C4.78227 21.2244 4.17782 20.8308 3.6786 20.322C3.16965 19.8223 2.77582 19.2176 2.5246 18.55C2.2776 17.913 2.1096 17.187 2.0596 16.122C2.04846 15.8847 2.03846 15.6474 2.0296 15.41L2.0246 15.216C2.00617 14.4868 1.99784 13.7574 1.9996 13.028V10.972C1.99681 10.2426 2.00414 9.5132 2.0216 8.784L2.0286 8.59C2.0366 8.365 2.0466 8.144 2.0586 7.878C2.1086 6.813 2.2766 6.088 2.5236 5.45C2.77471 4.7819 3.16932 4.17702 3.6796 3.678C4.17869 3.16947 4.78274 2.77599 5.4496 2.525C6.0876 2.278 6.8126 2.11 7.8776 2.06C8.1436 2.048 8.3656 2.038 8.5896 2.03L8.7836 2.024C9.51279 2.00623 10.2422 1.99857 10.9716 2.001L13.0276 2ZM11.9996 7C10.6735 7 9.40175 7.52678 8.46407 8.46447C7.52638 9.40215 6.9996 10.6739 6.9996 12C6.9996 13.3261 7.52638 14.5979 8.46407 15.5355C9.40175 16.4732 10.6735 17 11.9996 17C13.3257 17 14.5975 16.4732 15.5351 15.5355C16.4728 14.5979 16.9996 13.3261 16.9996 12C16.9996 10.6739 16.4728 9.40215 15.5351 8.46447C14.5975 7.52678 13.3257 7 11.9996 7ZM11.9996 9C12.3936 8.99993 12.7837 9.07747 13.1477 9.22817C13.5117 9.37887 13.8424 9.5998 14.1211 9.87833C14.3997 10.1569 14.6207 10.4875 14.7715 10.8515C14.9224 11.2154 15 11.6055 15.0001 11.9995C15.0002 12.3935 14.9226 12.7836 14.7719 13.1476C14.6212 13.5116 14.4003 13.8423 14.1218 14.121C13.8432 14.3996 13.5126 14.6206 13.1486 14.7714C12.7847 14.9223 12.3946 14.9999 12.0006 15C11.205 15 10.4419 14.6839 9.87928 14.1213C9.31667 13.5587 9.0006 12.7956 9.0006 12C9.0006 11.2044 9.31667 10.4413 9.87928 9.87868C10.4419 9.31607 11.205 9 12.0006 9M17.2506 5.5C16.9191 5.5 16.6011 5.6317 16.3667 5.86612C16.1323 6.10054 16.0006 6.41848 16.0006 6.75C16.0006 7.08152 16.1323 7.39946 16.3667 7.63388C16.6011 7.8683 16.9191 8 17.2506 8C17.5821 8 17.9001 7.8683 18.1345 7.63388C18.3689 7.39946 18.5006 7.08152 18.5006 6.75C18.5006 6.41848 18.3689 6.10054 18.1345 5.86612C17.9001 5.6317 17.5821 5.5 17.2506 5.5Z" />
    </svg>
  );
};

export default InstagramLogo;