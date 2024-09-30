import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: '500, Open Source Day 2025 - Florence',
        robots: 'noindex'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function _500() {
  const t = useTranslations('InternalError');

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
