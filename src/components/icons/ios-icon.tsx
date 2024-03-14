import { FC } from 'react';

const IOSIcon: FC<{
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}> = (props) => {
  return (
    <svg
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.973 20.4742C13.8119 21.5998 12.5441 21.4221 11.3237 20.8889C10.0322 20.3439 8.84737 20.3202 7.48479 20.8889C5.77861 21.6235 4.87812 21.4102 3.85915 20.4742C-1.92292 14.5144 -1.06983 5.43846 5.49425 5.10671C7.09379 5.18964 8.20755 5.98349 9.14358 6.05459C10.5417 5.77022 11.8806 4.95267 13.3735 5.05931C15.1626 5.20149 16.5134 5.9124 17.402 7.19204C13.7053 9.40771 14.582 14.2774 17.9707 15.64C17.2954 17.4173 16.4186 19.1827 14.9612 20.4861L14.973 20.4742ZM9.0251 5.03561C8.84737 2.3934 10.992 0.213273 13.4564 0C13.8 3.05691 10.6839 5.33183 9.0251 5.03561Z"
        fill={props.color ?? 'black'}
      />
    </svg>
  );
};

export default IOSIcon;
