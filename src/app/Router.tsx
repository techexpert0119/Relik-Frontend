import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { addTokenToAxios } from '@/services/api/api';

const EditPage = lazy(() => import('./pages/edit-page/EditPage'));
const Analytics = lazy(() => import('./pages/analytics/Analytics'));
const AuthLayout = lazy(() => import('@/components/layouts/AuthLayout'));
const SignInPage = lazy(() => import('./auth/sign-in/SignInPage'));
const SignUpPage = lazy(() => import('@/app/auth/sign-up/SignUpPage'));
const MainLayout = lazy(() => import('@/components/layouts/MainLayout'));
const AllPagesPage = lazy(() => import('@/app/pages/AllPagesPage'));
const Users = lazy(() => import('./users'));
const EditProfilePage = lazy(
  () => import('@/app/profile/edit/EditProfilePage')
);
const UserRoles = lazy(() => import('./roles'));
const InvitationPage = lazy(() => import('./invitation'));
const UserManagingProfile = lazy(() => import('./user-managing-profile'));
const AgencyProfile = lazy(() => import('./agencyProfile'));
const ResendVerificationEmailPage = lazy(
  () => import('./resend-verification-email')
);
const VerifyEmail = lazy(() => import('./auth/verify-email'));
const CreateAgencyPage = lazy(
  () => import('@/app/agency/create/CreateAgencyPage')
);
const Agencies = lazy(() => import('./agencies'));
const ArchivedPages = lazy(() => import('./pages/ArchivedPages'));
const CreatePagesPage = lazy(() => import('./pages/create/CreatePagesPage'));
const ForgotPassword = lazy(
  () => import('./auth/forgot-password/ForgotPassword')
);
const ResetPassword = lazy(() => import('./auth/reset-password/index'));
const Performance = lazy(() => import('./pages/performance/Performance'));
const SinglePerformance = lazy(
  () => import('./pages/performance/SinglePerformance')
);

const Router = () => {
  const { isLogged, user } = useAuthStore();

  const token = localStorage.getItem('token');
  if (token) {
    addTokenToAxios(token);
  }

  let defaultPage: string = '/auth/sign-in';

  if (user && !user?.isActive) {
    defaultPage = '/resend-verification-email';
  } else {
    if (user) {
      defaultPage = '/pages';
    }
  }

  const router = createBrowserRouter([
    !isLogged
      ? {
          path: 'auth',
          element: <AuthLayout />,
          children: [
            { path: 'sign-in', element: <SignInPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
            { path: 'invitation', element: <InvitationPage /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'reset-password', element: <ResetPassword /> },
          ],
        }
      : {},
    {
      path: 'verify-email',
      children: [{ path: '', element: <VerifyEmail /> }],
    },
    isLogged
      ? {
          path: 'resend-verification-email',
          element: <MainLayout />,
          children: [{ path: '', element: <ResendVerificationEmailPage /> }],
        }
      : {},
    isLogged
      ? {
          path: 'agencies',
          element: <MainLayout />,
          children: [{ path: '', element: <Agencies /> }],
        }
      : {},

    isLogged
      ? {
          path: '/agency',
          element: <MainLayout />,
          children: [{ path: 'create', element: <CreateAgencyPage /> }],
        }
      : {},
    isLogged
      ? {
          path: '/profile',
          element: <MainLayout />,
          children: [{ path: 'edit', element: <EditProfilePage /> }],
        }
      : {},
    isLogged
      ? {
          path: 'users',
          element: <MainLayout />,
          children: [
            { path: '', element: <Users /> },
            { path: '/users/:id', element: <UserManagingProfile /> },
          ],
        }
      : {},
    isLogged
      ? {
          path: 'agency',
          element: <MainLayout />,
          children: [
            { path: '/agency/:id', element: <AgencyProfile /> },
            { path: '/agency/edit/:id', element: <CreateAgencyPage /> },
          ],
        }
      : {},
    isLogged
      ? {
          path: 'roles',
          element: <MainLayout />,
          children: [{ path: '', element: <UserRoles /> }],
        }
      : {},
    isLogged
      ? {
          path: 'pages',
          element: <MainLayout />,
          children: [
            { path: '', element: <AllPagesPage /> },
            { path: '/pages/create', element: <CreatePagesPage /> },
            { path: '/pages/archived', element: <ArchivedPages /> },
            { path: '/pages/:id', element: <EditPage /> },
          ],
        }
      : {},
    isLogged
      ? {
          path: 'analytics',
          element: <MainLayout />,
          children: [{ path: '', element: <Analytics /> }],
        }
      : {},
    isLogged
      ? {
          element: <MainLayout />,
          children: [
            { path: 'performance', element: <Performance /> },
            { path: 'performance/:id', element: <SinglePerformance /> },
          ],
        }
      : {},
    { path: '*', element: <Navigate to={defaultPage} replace /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
