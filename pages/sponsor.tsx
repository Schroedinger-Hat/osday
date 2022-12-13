import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import SponsorshipTable from '../components/SponsorshipTable';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Sponsor, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
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
            link: 'https://sessionize.com/opensourceday23'
          }}
          showTicketBtn
        />

        <SponsorshipTable />
      </div>
    </>
  );
}
