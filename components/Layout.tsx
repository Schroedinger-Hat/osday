import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import SponsorTable from './SponsorTable';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';

export default function Layout({
    children,
    metas
}: {
    children: JSX.Element;
    metas: { title: string; description: string; image: string; url: string; robots: string };
}): JSX.Element {
    const router = useRouter();
    const [alternates, setAlternates] = useState<string[]>([]);
    const locales = ['en', 'it', 'es', 'fr'];

    const getPathname = (locale: string) => {
        if (!!window) {
            const path = window.location.pathname;
            const splittedPath = path.replace(`/${locale}`, '').split('/');
            return `${window.location.hostname}${locale !== 'en' ? `/${locale}` : ''}/${splittedPath[splittedPath.length - 1]}`;
        }

        return '';
    };

    const updatePathnames = () => {
        setAlternates([]);
        locales.forEach((l: string) => {
            setAlternates((v: string[]) => {
                return [
                    ...v,
                    getPathname(l)
                ]
            });
        });
    }

    useEffect(() => {
        updatePathnames();
    }, []);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            updatePathnames();
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

    const areSponsorVisible = () => {
        return router.asPath === '/sponsor' || router.asPath === '/';
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{metas ? metas.title : 'Open Source Day 2025'}</title>
                {metas && metas.robots && <meta name="robots" content={metas.robots} />}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/png" href="/favicon-32x32.png" />
                <meta name="description" content={metas ? metas.description : ''} />

                <meta property="og:title" content={metas.title ? metas.title : "Open Source Day 2025"} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={metas.image ? metas.image : 'https://osday.dev/intro-2025.png'} />
                <meta property="og:url" content={metas.url ? metas.url : 'https://2025.osday.dev'} />
                <meta property="og:description" content={metas.description ? metas.description : "Open Source Day 2025 coming soon on March 2025. Stay tuned on our socials"} />
                <meta property="og:site_name" content="Open Source Day 2025" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={metas.image ? metas.image : 'https://osday.dev/intro-2025.png'} />
                <meta name="twitter:image:alt" content="Open Source Day 2025" />
                <meta name="twitter:site" content="@schrodinger_hat" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {!metas.image && <link rel="canonical" href={`https://${alternates[0]}`} />}
                {locales.map((l, index) => <link key={index} rel="alternate" href={`https://${alternates[index]}`} hrefLang={`${l}-${l}`} />)}
            </Head>
            <main>
                <div className='image-background'>
                    <Header />
                    <section className='content'>{children}</section>
                    {/* <SponsorTable isVisible={areSponsorVisible()}/> */}
                </div>
            </main>
            <Footer />
            <CookieConsent
                location="bottom"
                buttonText="Of course!"
                cookieName="cookiepolicy"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                This website uses cookies to enhance the user experience. <Link href='/cookie'><u>Cookie policy</u></Link>
            </CookieConsent>
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
            <Script
                async
                src="https://eocampaign1.com/form/e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc.js"
                data-form="e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc"
            />
        </>
    );
}
