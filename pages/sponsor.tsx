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
          title="Open Source Day 2023"
          subtitle="Would you like to become a Sponsor for Open Source Day 2023?"
          date={{
            where: 'Florence',
            when: 'To Feb 2023',
            length: '3 months',
            type: 'Call for sponsors'
          }}
          description="Let's find out how you can help the Open Source community achieve great results in organizing one of the best conferences ever! :)"
          originals={false}
        />
        <section className="sponsors_2022">
          <SponsorshipTier title="Platinum Tier" link="#" />
          <SponsorshipTier title="Diamond Tier" link="#" />
          <SponsorshipTier title="Gold Tier" link="#" />
          <SponsorshipTier title="Silver Tier" link="#" />
          <SponsorshipTier title="Community Partner" link="#" />
          <SponsorshipTier title="Brand Partner" link="#" />
        </section>
      </div>
    </>
  );
}
