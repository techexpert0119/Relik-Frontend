import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import bg1 from '/auth/background-1.avif';
import bg2 from '/auth/background-2.avif';
import wideLogoWhite from '/wide-logo-white.svg';
import { toInteger } from 'lodash';

const image = toInteger(Math.random() * 2) % 2 ? bg1 : bg2;

const AuthLayout: FC = () => {
  return (
    <main className="flex min-h-full flex-col-reverse lg:flex-row">
      <section className="flex-1">
        <Outlet />
      </section>

      <figure className="block flex-1 relative lg:max-h-screen lg:sticky lg:top-0">
        <img
          src={image}
          alt="background"
          className="object-cover w-full object-top h-64 sm:h-96 md:h-120 lg:h-full lg:left-0 lg:right-0 lg:top-0 lg:bottom-0 lg:absolute"
        />
        <img
          src={wideLogoWhite}
          alt="logo-white"
          className="absolute left-1/2 top-1/2 transform  -translate-x-1/2 -translate-y-1/2 lg:hidden"
        />
      </figure>
    </main>
  );
};

export default AuthLayout;
