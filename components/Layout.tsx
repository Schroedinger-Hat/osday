import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Layout({
  children,
  metas
}: {
  children: JSX.Element;
  metas: { title: string; description: string; robots: string };
}): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if ('gtag' in window) {
        window.gtag('config', 'UA-175469686-4', {
          page_path: url
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{metas ? metas.title : 'Open Source Day 2023'}</title>
        {metas && metas.robots && <meta name="robots" content={metas.robots} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <meta name="description" content={metas ? metas.description : ''} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <Header />
        <section className='content'>{children}</section>
      </main>
      <Footer />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-175469686-4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-175469686-4');
                gtag('send', 'pageview');
                `}
      </Script>
    </>
  );
}
