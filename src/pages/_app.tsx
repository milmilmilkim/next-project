import '@/styles/globals.css';
import './components/layout/AppLayout';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import AppLayout from './components/layout/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  //Use The layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppLayout>
      <QueryClientProvider client={queryClient}>
        {/* devtools */}
        <ReactQueryDevtools initialIsOpen={true} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppLayout>
  );
}
