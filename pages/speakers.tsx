import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import { TTalkCard } from '../constants';
import TalkCard from '../components/TalkCard';

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

  const speakerInfo: TTalkCard[] = [
    {
      id: 'apply',
      description: t('apply'),
      link: 'https://sessionize.com/opensourceday23'
    },
    {
      id: 'talk',
      description: t('talk')
    },
    {
      id: 'event',
      description: t('event')
    }
  ];

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
        />

        <section className="talks_2021">
          <h2>{t('heading')}</h2>
          <div className="talks_container">
            {speakerInfo.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
