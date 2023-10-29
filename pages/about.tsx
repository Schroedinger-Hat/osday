import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'About, Open Source Day 2024 - Florence',
        description:
          'Open Source Day 2024 coming on the 7-8 of March 2024. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function About() {
  const t = useTranslations('About');
  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
        />
      </div>
    </>
  );
}
