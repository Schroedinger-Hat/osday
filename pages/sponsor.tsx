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
          <SponsorshipTier title={t('platinum')} card_color="platinum" price={t('platinum_price')} offer={t('platinum_offer')}/>
          <SponsorshipTier title={t('diamond')} card_color="diamond" price={t('diamond_price')} offer={t('diamond_offer')}/>
          <SponsorshipTier title={t('gold')} card_color="gold" price={t('gold_price')} offer={t('gold_offer')}/>
          <SponsorshipTier title={t('silver')} card_color="silver" price={t('silver_price')} offer={t('silver_offer')}/>
          <SponsorshipTier title={t('community')} card_color='community' offer={t('community_offer')}/>
          <SponsorshipTier title={t('brand')} card_color='brand' offer={t('brand_offer')}/>
        </section>
      </div>
    </>
  );
}
