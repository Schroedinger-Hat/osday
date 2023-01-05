import Hero from '../components/Hero';
import { cfpTypes } from '../constants';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'CFV, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function CFV() {
  const t = useTranslations('Cfv');
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="Call for volounteers"
          description={t('description')}
          originals={false}
          mainCta={{
            text: t('maincta_text'),
            link: 'mailto:osday@schrodinger-hat.it'
          }}
        />

        <section className="after_main">
          <h2>
            {t('description_1')}{' '}
            <a href="https://www.schrodinger-hat.it/">Schrodingers Hat</a>
          </h2>
        </section>
      </div>
    </>
  );
}
