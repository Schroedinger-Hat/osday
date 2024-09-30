import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import SponsorshipTable from '../components/SponsorshipTable';
import SponsorTable from '../components/SponsorTable';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Sponsor, Open Source Day 2025 - Florence',
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Sponsor() {
  const t = useTranslations('Sponsor');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
          mainCta={{
            text: t('maincta_text'),
            link: 'mailto:events@schroedinger-hat.org'
          }}
        />

        <SponsorshipTable />

        <SponsorTable isVisible></SponsorTable>

      </div>
    </>
  );
}
