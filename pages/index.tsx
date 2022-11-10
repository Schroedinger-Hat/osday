import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>Open Source Day 2023 - Florence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <meta name='description' content='Open Source Day 2023 coming soon on March 2023. Stay tuned on our social' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
      </Head>

      <Header />
      <Main />
    </>
  )
}
