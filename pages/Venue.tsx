import Head from 'next/head'
import Image from 'next/image';
import Header from '../components/Header'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>Venue, Open Source Day 2023 - Florence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <meta name='description' content='Open Source Day 2023 coming soon on March 2023. Stay tuned on our social' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
      </Head>

      <Header />
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="We have a wonderful Venue"
          date={{
            where: 'Florence',
            when: 'Coming soon',
            length: 'March 2023',
            type: 'Venue'
          }}
          description="Keep in touch through our channels (Discord, LinkedIn) to know which Venue will host us for this event :)"
          originals={false}
        />
        <div className="image">
          <Image className="img" alt="background" fill={true} src="/bg.jpg" />
        </div>
      </div>
    </>
  )
}
