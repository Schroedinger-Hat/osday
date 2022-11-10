import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function _404() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>404, Open Source Day 2023 - Florence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <meta
          name="description"
          content="Open Source Day 2023 coming soon on March 2023. Stay tuned on our social"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>

      <Header />
      <div className="container">
        <Hero
          title="404 Page"
          subtitle="You are Lost - Season Finale"
          date={{
            where: 'Anywhere',
            when: 'Anytime',
            length: 'Infinity',
            type: 'HTTP Error'
          }}
          description="It appears you may have found the secret season of the best show of this time, 404! Would you like to go back? :)"
        />
        <div className="image">
          <Image className="img" alt="background" fill={true} src="/bg.jpg" />
        </div>
      </div>
    </>
  );
}
