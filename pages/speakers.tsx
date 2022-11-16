import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Speakers, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Speakers() {
  const t = useTranslations('Speakers');

  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="These are the great minds that will talk about tech and open source :) Coming soon"
          date={{
            where: 'Florence',
            when: 'Coming soon',
            length: 'March 2023',
            type: 'Speakers'
          }}
          description="We are still exploring your submissions so if you have an idea and you would like to talk about it head over to our CFP"
          originals={false}
        />
      </div>
    </>
  );
}
