import Hero from '../components/Hero';
import Image from "next/image";
import { ReactNode } from 'react';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Gallery, Open Source Day 2025 - Florence',
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Gallery() {
  return (
    <>
      <div className="container">
        <Hero
          title="Gallery"
          subtitle="Available on Flickr"
          originals={false}
        />
        <section className="after_main">
          <div style={{textAlign: "center"}}>
            <p>Go to the <a href="https://flic.kr/s/aHBqjBhq5Y" rel="noreferrer" target="_blank">Flickr OSDay2024</a> album page</p>
            <embed width={1200} height={600} src='https://embedr.flickr.com/photosets/72177720315430384?width=1200&height=600' />
          </div>
        </section>
      </div>
    </>
  );
}
