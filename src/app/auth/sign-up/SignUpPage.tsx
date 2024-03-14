import wideLogo from '/wide-logo.svg';
import { NavLink } from 'react-router-dom';
import SignUpForm from '@/app/auth/sign-up/components/sign-up-form/SignUpForm';
// import { SocialAuthButtons } from '../components/SocialAuthButtons';
import Footer from '@/components/Footer';
import {
  SocialAuthButtons,
  SocialAuthMode,
} from '@/app/auth/components/SocialAuthButtons';

const SignUpPage = () => {
  return (
    <section className="flex flex-col items-center ml-auto mr-auto px-8 gap-3 lg:gap-4 lg:min-h-screen">
      <figure className="mt-auto pt-16 md:pt-[96px] hidden lg:block">
        <img src={wideLogo} alt="logo" />
      </figure>

      <header className="md:mt-[64px] mt-3 -mb-3 lg:mt-16 lg:mb-0">
        <p className="font-[600] leading-9 text-lg lg:text-3xl">
          Create an account
        </p>
      </header>

      <SignUpForm className="max-w-[384px] lg:mt-5" />

      <h3 className="flex items-center w-full max-w-[384px]">
        <span className="flex-grow bg-border rounded h-[1px]" />
        <span className="px-4 pb-1 text-gray-500">or</span>
        <span className="flex-grow bg-border rounded h-[1px]" />
      </h3>

      <SocialAuthButtons mode={SocialAuthMode.SignUp} startTabIndex={8} />

      <div className="flex justify-center gap-2">
        <p className="text-gray-500">Already have an account?</p>
        <NavLink to="/auth/sign-in" className="link" tabIndex={12}>
          Log in
        </NavLink>
      </div>

      <Footer className="mt-auto" />
    </section>
  );
};

export default SignUpPage;
