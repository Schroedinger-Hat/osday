import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Venue, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
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
          showTicketBtn
        />
        <section className="after_main">
          <h2>
            {t.rich('heading', {
              discord: (children: ReactNode) => (
                <a href="https://discord.gg/RTXr8A3eFn">{children}</a>
              ),
              linkedin: (children: ReactNode) => (
                <a href="https://www.linkedin.com/company/schrodinger-hat/">{children}</a>
              ),
              twitter: (children: ReactNode) => (
                <a href="https://twitter.com/OSDayDev">{children}</a>
              ),
            })}
          </h2>
        </section>
      </div>
    </>
  );
}
