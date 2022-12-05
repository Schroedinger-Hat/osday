import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Code of conduct, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function CodeOfConduct() {
    const t = useTranslations('CodeOfConduct');
    return (
        <>
          <div className="container">
            <Hero
              title={t('title')}
              subtitle={t('subtitle')}
            />
            <div className='codeconduct'>
              <h3>{t('shortVersion_title')}</h3>
              <p>{t('shortVersion_text')}</p>
              <h3>{t('longVersion_title')}</h3>
              <p>{t('longVersion_text')}</p>
              <h3>{t('completeVersion_title')}</h3>
              <p>{t('completeVersion_text')}</p>
              <h3>{t('enforcement_title')}</h3>
              <p>{t('enforcement_text')}</p>
              <h3>{t('reporting_title')}</h3>
              <p>{t('reporting_text')}</p>
            </div>
          </div>
          
        </>
      );
}