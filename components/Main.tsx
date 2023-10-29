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
        date={{
          when: '7-8 March 2024',
          where: 'Florence',
          length: '2 Days',
          type: 'Conf'
        }}
        secondaryCta={{
          text: t('email'),
          link: 'mailto:osday@schrodinger-hat.it'
        }}
      />
    </div>
  );
}
