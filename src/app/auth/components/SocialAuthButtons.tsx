import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';

import { AuthService } from '@/services/api/auth-service';
import { toast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { ISignResult } from '@/data/interfaces/sign-result';

interface Props {
  mode: SocialAuthMode;
  startTabIndex: number;
}

export enum SocialAuthMode {
  SignIn,
  SignUp,
}

export const SocialAuthButtons = ({ startTabIndex, mode }: Props) => {
  const { authorize } = useAuthStore();
  // const isTablet = useIsTablet();
  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
  });

  // const loginFaceBook = (response: ProfileSuccessResponse) => {
  //   if (response.id && response.email && response.name) {
  //     const user = {
  //       id: response.id,
  //       email: response.email,
  //       firstName: response.name,
  //     };
  //     AuthService.facebookignInAndSignUp(user)
  //       .then((data: ISignResult) => {
  //         authorize(data.user, data.token.accessToken, data.token.refreshToken);
  //       })
  //       .catch((error) => {
  //         toast({
  //           title: 'Error',
  //           variant: 'destructive',
  //           description: error?.response?.data?.message,
  //         });
  //       });
  //   } else {
  //     toast({
  //       title: 'Error',
  //       variant: 'destructive',
  //       description: 'Problem occoured with Facebook login',
  //     });
  //   }
  // };
  //
  // function getTwitterOauthUrl() {
  //   const rootUrl = 'https://twitter.com/i/oauth2/authorize';
  //   const options = {
  //     redirect_uri: 'http://localhost:5000/v1/auth/user/twitter',
  //     client_id: 'S19sTnhlWG1pczJKS2F5NWt6dVg6MTpjaQ',
  //     state: 'state',
  //     response_type: 'code',
  //     code_challenge: 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8',
  //     code_challenge_method: 'S256',
  //     scope: ['users.read', 'tweet.read', 'follows.read', 'follows.write'].join(
  //       ' '
  //     ),
  //   };
  //   const qs = new URLSearchParams(options).toString();
  //   return `${rootUrl}?${qs}`;
  // }

  async function onGoogleLoginSuccess(response: TokenResponse) {
    let userInfoRes;
    try {
      userInfoRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (err) {
      console.error('Failed to get user info from Google', err);
      return;
    }

    const googleUserProfile = userInfoRes?.data;
    const user = {
      id: googleUserProfile.id,
      email: googleUserProfile.email,
      firstName: googleUserProfile.name,
    };

    let data: ISignResult;
    try {
      data = await AuthService.googleSignInAndSignUp(user);
    } catch (err) {
      console.error('Failed to sign in with Google', err);

      let description = 'Failed to sign in with Google';
      if (axios.isAxiosError(err)) {
        description = (
          (err as AxiosError).response?.data as { message: string }
        )?.message;
      }
      toast({
        title: 'Error',
        variant: 'destructive',
        description,
      });
      return;
    }

    authorize(data.user, data.token.accessToken, data.token.refreshToken);
  }

  return (
    <section className="flex flex-row w-full justify-center gap-3 max-w-[384px]">
      <button
        onClick={() => googleLogin()}
        tabIndex={startTabIndex + 1}
        aria-label="Sign in with Google"
        className="flex w-full justify-center items-center bg-white border border-button-border-light rounded-full p-0.5 pr-4"
      >
        <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <title>
              Sign {mode === SocialAuthMode.SignIn ? 'in' : 'up'} with Google
            </title>
            <desc>Google G Logo</desc>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              className="fill-google-logo-blue"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              className="fill-google-logo-green"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              className="fill-google-logo-yellow"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              className="fill-google-logo-red"
            ></path>
          </svg>
        </div>
        <span className="text-sm text-google-text-gray tracking-wider">
          Sign {mode === SocialAuthMode.SignIn ? 'in' : 'up'} with Google
        </span>
      </button>

      {/*<FacebookLogin*/}
      {/*  appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID || ''}*/}
      {/*  onFail={(error) => {*/}
      {/*    console.log('Login Failed!', error);*/}
      {/*  }}*/}
      {/*  onProfileSuccess={loginFaceBook}*/}
      {/*  render={({ onClick }) => (*/}
      {/*    <Button*/}
      {/*      onClick={onClick}*/}
      {/*      variant="outline"*/}
      {/*      size={isTablet ? 'icon' : 'md'}*/}
      {/*      className="border-gray-300 rounded-md lg:flex-1 lg:border-gray-400 lg:rounded-full"*/}
      {/*      tabIndex={startTabIndex + 2}*/}
      {/*    >*/}
      {/*      <img*/}
      {/*        src={facebookIcon}*/}
      {/*        alt="google-icon"*/}
      {/*        className="w-5 lg:w-auto"*/}
      {/*      />*/}
      {/*    </Button>*/}
      {/*  )}*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  size={isTablet ? 'icon' : 'md'}*/}
      {/*  className="border-gray-300 rounded-md lg:flex-1 lg:border-gray-400 lg:rounded-full"*/}
      {/*  tabIndex={startTabIndex + 3}*/}
      {/*  asChild*/}
      {/*>*/}
      {/*  <a href={getTwitterOauthUrl()}>*/}
      {/*    <img src={twitterIcon} alt="google-icon" className="w-5 lg:w-auto" />*/}
      {/*  </a>*/}
      {/*</Button>*/}
    </section>
  );
};
