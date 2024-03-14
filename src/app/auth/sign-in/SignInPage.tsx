import SignInForm from '@/app/auth/sign-in/components/sign-in-form/SignInForm';
import { NavLink } from 'react-router-dom';
import Footer from '@/components/Footer';
import wideLogo from '/wide-logo.svg';
import {
  SocialAuthButtons,
  SocialAuthMode,
} from '@/app/auth/components/SocialAuthButtons';

const SignInPage = () => {
  return (
    <section className="flex flex-col items-center ml-auto mr-auto px-8 gap-3 lg:gap-4 lg:min-h-screen">
      <figure className="mt-auto pt-16 md:pt-[96px] hidden lg:block">
        <img src={wideLogo} alt="logo" />
      </figure>

      <header className="md:mt-[64px] mt-3 -mb-3 lg:mt-16 lg:mb-0">
        <p className="color-[#223345] font-[600] leading-9 text-lg lg:text-3xl">
          Log in to your account
        </p>
      </header>

      <SignInForm className="max-w-[384px] lg:mt-5" />

      <h3 className="flex items-center w-full max-w-[384px]">
        <span className="flex-grow bg-border rounded h-[1px]" />
        <span className="px-4 pb-1 text-gray-500">or</span>
        <span className="flex-grow bg-border rounded h-[1px]" />
      </h3>

      <SocialAuthButtons mode={SocialAuthMode.SignIn} startTabIndex={6} />

      <div className="flex justify-center gap-2">
        <p className="text-gray-500">Don’t have an account?</p>
        <NavLink to="/auth/sign-up" className="link" tabIndex={10}>
          Sign Up
        </NavLink>
      </div>

      <Footer className="mt-auto" />
    </section>
  );
};

export default SignInPage;
