import Head from 'next/head';
import Image from 'next/image';
import CfpCard from '../components/CfpCard';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { cfpTypes } from '../constants';

export default function CFP() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Call for Papers, Open Source Day 2023 - Florence</title>
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
          title="Open Source Day 2023"
          subtitle="Call for papers"
          date={{
            where: 'Florence',
            when: 'Started',
            length: 'Closes in Jan 2023',
            type: 'CFP'
          }}
          description="Want to participate in our Call for Papers? Head over to Sessionize and submit your ideas :)"
          originals={false}
          mainCta={{
            text: 'Submit paper :)',
            link: 'https://sessionize.com/opensourceday23'
          }}
          secondaryCta={{
            text: 'Send us an email',
            link: 'mailto:osday@schrodinger-hat.it'
          }}
        />
        <div className="image">
          <Image className="img" alt="background" fill={true} src="/bg.jpg" />
        </div>
        <section className="after_main">
          <h2>
            Read along if you would like to know more about the topics that are
            of higher interest for our community attendees
          </h2>
          <h3>
            You can find all the community info on our website,{' '}
            <a href="https://www.schrodinger-hat.it/">Schrodingers Hat</a>
          </h3>
          <div className="after_main_container">
            {cfpTypes.map((type) => {
              return <CfpCard key={type.id} {...type} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
