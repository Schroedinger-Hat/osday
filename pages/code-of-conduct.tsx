import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Code of conduct, Open Source Day 2024 - Florence',
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