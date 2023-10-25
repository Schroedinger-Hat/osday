import '../styles/globals.css';
import '../styles/ticket.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { NextIntlProvider } from 'next-intl';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Layout metas={pageProps.metas}>
        <Component {...pageProps} />
      </Layout>
    </NextIntlProvider>
  );
}
