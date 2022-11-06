import Head from 'next/head'
import Image from 'next/image'
import '../styles/Home.module.css'

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

      <div className="container">
        <div className="title-box">
            <h1>Schrödinger Hat <span>Originals</span></h1>
            <h2>Open Source Day 2023</h2>
            <ul>
                <li>March 2023</li>
                <li>Florence, Italy</li>
                <li>10h 20min</li>
                <li>Conference</li>
            </ul>
            <p>We are coming back with a new edition of the Open Source Day conference. In this season we are going to smash everything.</p>
            <p><i>Starring</i>: the best companies and the best professionals in the sector and in open source projects</p>
            <br />
            <a href="https://sessionize.com/opensourceday23" target="_blank" className="button" rel="noreferrer">Call for Papers</a>
            <a href="mailto:osday@schrodinger-hat.it" target="_blank" className="button" rel="noreferrer">Send us an email</a>
        </div>
        <div className="image">
            <Image className='img' alt='background' fill={true} src="/bg.jpg" />
        </div>
      </div>
    </>
  )
}
