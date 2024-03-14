import { FC } from 'react';

const UnpublishIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.73314 0.850291C1.67592 0.788885 1.60692 0.739633 1.53025 0.705473C1.45358 0.671313 1.37082 0.652945 1.2869 0.651464C1.20299 0.649984 1.11963 0.665421 1.0418 0.696855C0.963981 0.728289 0.893286 0.775076 0.833937 0.834425C0.774588 0.893774 0.727801 0.964469 0.696367 1.04229C0.664933 1.12012 0.649496 1.20347 0.650976 1.28739C0.652457 1.37131 0.670825 1.45407 0.704985 1.53074C0.739145 1.60741 0.788397 1.67641 0.849802 1.73362L2.68564 3.56946C-0.141864 6.84446 -0.00103098 11.7961 3.1073 14.9045C3.26367 15.0607 3.47571 15.1485 3.69676 15.1484C3.91782 15.1483 4.1298 15.0604 4.28605 14.904C4.44231 14.7477 4.53005 14.5356 4.52997 14.3146C4.52989 14.0935 4.442 13.8815 4.28564 13.7253C3.11091 12.5503 2.41702 10.9792 2.3398 9.31944C2.26258 7.65974 2.80759 6.03096 3.86814 4.75196L5.1348 6.01862C4.41512 6.96876 4.06363 8.14726 4.14527 9.3364C4.22692 10.5255 4.73618 11.6449 5.57897 12.4878C5.73534 12.6442 5.94742 12.732 6.16855 12.732C6.38969 12.732 6.60177 12.6442 6.75814 12.4878C6.9145 12.3314 7.00235 12.1193 7.00235 11.8982C7.00235 11.6771 6.9145 11.465 6.75814 11.3086C6.22829 10.7786 5.89668 10.0827 5.81885 9.3373C5.74102 8.59194 5.92171 7.84247 6.33064 7.21446L7.8598 8.74446C7.81056 8.92974 7.80452 9.12386 7.84213 9.31185C7.87975 9.49984 7.96001 9.67669 8.07675 9.82877C8.19349 9.98085 8.34358 10.1041 8.51546 10.189C8.68734 10.274 8.87642 10.3183 9.06814 10.3186C9.1798 10.3186 9.28814 10.3036 9.39147 10.2761L16.2665 17.1511C16.3242 17.2108 16.3931 17.2584 16.4694 17.2911C16.5457 17.3238 16.6277 17.341 16.7107 17.3417C16.7937 17.3424 16.876 17.3265 16.9528 17.2951C17.0296 17.2636 17.0993 17.2172 17.158 17.1584C17.2166 17.0997 17.263 17.0299 17.2944 16.9531C17.3258 16.8763 17.3416 16.794 17.3408 16.711C17.34 16.628 17.3228 16.546 17.29 16.4698C17.2572 16.3935 17.2095 16.3246 17.1498 16.267L1.73314 0.850291ZM14.8565 12.2053L16.0748 13.4236C18.0865 10.2061 17.6931 5.91362 14.8956 3.11529C14.8182 3.03787 14.7263 2.97645 14.6251 2.93455C14.524 2.89264 14.4155 2.87108 14.3061 2.87108C14.1966 2.87108 14.0881 2.89264 13.987 2.93455C13.8858 2.97645 13.7939 3.03787 13.7165 3.11529C13.639 3.19272 13.5776 3.28463 13.5357 3.38579C13.4938 3.48695 13.4723 3.59538 13.4723 3.70487C13.4723 3.81437 13.4938 3.92279 13.5357 4.02395C13.5776 4.12511 13.639 4.21703 13.7165 4.29446C14.7351 5.31321 15.3967 6.63433 15.6022 8.06027C15.8077 9.48622 15.5461 10.9404 14.8565 12.2053ZM12.2748 9.62362L13.6006 10.9495C13.9907 10.0424 14.0997 9.03923 13.9135 8.06958C13.7274 7.09994 13.2547 6.20843 12.5565 5.51029C12.4796 5.4307 12.3876 5.36721 12.286 5.32354C12.1843 5.27987 12.075 5.25688 11.9643 5.25592C11.8537 5.25495 11.7439 5.27604 11.6415 5.31794C11.5391 5.35984 11.4461 5.42172 11.3678 5.49996C11.2896 5.57821 11.2277 5.67125 11.1858 5.77366C11.1439 5.87608 11.1228 5.98581 11.1238 6.09646C11.1247 6.20711 11.1477 6.31646 11.1914 6.41813C11.2351 6.5198 11.2985 6.61175 11.3781 6.68862C11.7567 7.06685 12.0365 7.53237 12.1929 8.04417C12.3493 8.55598 12.3774 9.09839 12.2748 9.62362Z"
        fill={props.color ?? 'white'}
      />
    </svg>
  );
};

export default UnpublishIcon;