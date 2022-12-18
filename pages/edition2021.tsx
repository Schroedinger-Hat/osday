import Hero from '../components/Hero';
import TalkCard from '../components/TalkCard';
import { previousTalks, TTalkCard } from '../constants';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Open Source Day 2021 Edition',
        description:
          "Let's go back to 2021 with this time machine"
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Edition2021() {
  const t = useTranslations('2021');
  return (
    <>
      <div className="container">
      <Hero
        subtitle={t('subtitle')}
      />
        <section className="talks_2021">
          <h3>{t('watch')}</h3>
          <div className="talks_container">
            {previousTalks.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
