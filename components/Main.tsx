import { previousTalks, TTalkCard } from '../constants';
import Hero from './Hero';
import { useTranslations } from 'next-intl';

export default function Main() {
  const t = useTranslations('Main');

  return (
    <div className="container">
      <Hero
        description={t('description_1')}
        description_2={t('description_2')}
        mainCta={{
          text: 'Call for Papers',
          link: 'https://sessionize.com/opensourceday23'
        }}
        secondaryCta={{
          text: t('email'),
          link: 'mailto:osday@schrodinger-hat.it'
        }}
        showTicketAvailability
      />
    </div>
  );
}
