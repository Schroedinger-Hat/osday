import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { ReactNode } from 'react';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Venue, Open Source Day 2024 - Florence',
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Venue() {
  const t = useTranslations('Venue');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
          showViewOnMap
        />
        <section className="after_main">
          <h2>{t('heading')}</h2>
          <div className='arrival'>
            <div className='icon'>
              <Image width={30} height={30} src="/icons/train.svg" alt="Train" />
            </div>
            <div className='infos'>
              <p>{t('train_infos')}</p>
            </div>
          </div>
          <div className='arrival'>
            <div className='icon'>
              <Image width={30} height={30} src="/icons/plane.svg" alt="Airplane" />
            </div>
            <div className='infos'>
              <p>{t('plane_infos_1')}</p>
              <p>{t.rich('plane_infos_2', {
                    link_train: (children: ReactNode) => (
                      <a href="https://www.trenitalia.com/en.html">{children}</a>
                    )
                  })}
              </p>
              <p>{t.rich('plane_infos_3', {
                    link_bus: (children: ReactNode) => (
                      <a href="https://www.appenninoshuttle.it/">{children}</a>
                    ),
                    link_train: (children: ReactNode) => (
                      <a href="https://www.trenitalia.com/en.html">{children}</a>
                    )
                  })}
              </p>
            </div>
          </div>
          <div className='arrival'>
            <div className='icon'>
              <Image width={30} height={30} src="/icons/car.svg" alt="Car" />
            </div>
            <div className='infos'>
              <p>{t.rich('car_infos', {
                    link: (children: ReactNode) => (
                      <a href="https://www.fipark.com/">{children}</a>
                    )
                  })}
              </p>
            </div>
          </div>
          <div className='information'>
            <p>{t.rich('information', {
                    link: (children: ReactNode) => (
                      <a href="mailto:osday@schrodinger-hat.it">{children}</a>
                    )
                })}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
