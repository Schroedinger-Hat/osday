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
          when: '24th of March',
          where: 'Florence',
          length: '1 Day',
          type: 'Conf'
        }}
        secondaryCta={{
          text: t('email'),
          link: 'mailto:osday@schrodinger-hat.it'
        }}
        showTicketBtn
        showTicketAvailability
      />
      <iframe frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} width={800} height={650} type="text/html" src="https://www.youtube.com/embed/1tnQLkcToIQ?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe>
    </div>
  );
}
