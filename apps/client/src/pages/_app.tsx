import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import client from '@/lib/apollo-client';
import '@/styles/globals.css';

dayjs.extend(advancedFormat);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
