import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Rules, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Rules() {
  const t = useTranslations('Rules');

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
          originals={false}
        />
      </div>
    </>
  );
}
