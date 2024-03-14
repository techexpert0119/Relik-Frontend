import React from 'react';
import ReactDOM from 'react-dom/client';
import { AxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/globals.css';
import '@/styles/components.css';
import { Toaster } from './components/ui/toaster';
import Router from '@/app/Router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Loader from './components/Loader';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<Loader />}>
          <Router />
          <Toaster />
        </React.Suspense>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
