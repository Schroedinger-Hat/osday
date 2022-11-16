import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: '404, Open Source Day 2023 - Florence',
        robots: 'noindex'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function _404() {
  const t = useTranslations('NotFound');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          date={{
            where: t('where'),
            when: t('when'),
            length: t('length'),
            type: t('type')
          }}
          description={t('description')}
        />
      </div>
    </>
  );
}
