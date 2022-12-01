import { previousTalks, TTalkCard } from '../constants';
import Hero from './Hero';
import TalkCard from './TalkCard';
import { useTranslations } from 'next-intl';

export default function Main() {
  const t = useTranslations('Main');

  return (
    <div className="container">
      <Hero
        mainCta={{
          text: 'Call for Papers',
          link: 'https://sessionize.com/opensourceday23'
        }}
        secondaryCta={{
          text: t('email'),
          link: 'mailto:osday@schrodinger-hat.it'
        }}
      />
      <section className="talks_2021">
        <h2>{t('heading')}</h2>
        <div className="talks_container">
          {previousTalks.map((talk: TTalkCard) => {
            return <TalkCard key={talk.id} {...talk} />;
          })}
        </div>
      </section>
    </div>
  );
}
