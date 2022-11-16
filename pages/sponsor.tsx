import Hero from '../components/Hero';
import SponsorshipTier from '../components/SponsorshipTier';
import { useTranslations } from 'next-intl';

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
          date={{
            where: t('where'),
            when: t('when'),
            length: t('length'),
            type: t('type')
          }}
          description={t('description')}
          originals={false}
        />
        <section className="sponsors_2022">
          <SponsorshipTier title={t('platinum')} link="#" />
          <SponsorshipTier title={t('diamond')} link="#" />
          <SponsorshipTier title={t('gold')} link="#" />
          <SponsorshipTier title={t('silver')} link="#" />
          <SponsorshipTier title={t('community')} link="#" />
          <SponsorshipTier title={t('brand')} link="#" />
        </section>
      </div>
    </>
  );
}
