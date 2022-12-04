import CfpCard from '../components/CfpCard';
import Hero from '../components/Hero';
import { cfpTypes } from '../constants';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'CFP, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function CFP() {
  const t = useTranslations('Cfp');
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="Call for papers"
          description={t('description')}
          originals={false}
          mainCta={{
            text: t('maincta_text'),
            link: 'https://sessionize.com/opensourceday23'
          }}
          secondaryCta={{
            text: t('secondarycta_text'),
            link: 'mailto:osday@schrodinger-hat.it'
          }}
        />

        <section className="after_main">
          <h2>{t('description_1')}</h2>
          <h3>
            {t('description_2')}{' '}
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
