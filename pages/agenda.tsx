import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import AgendaCard from '../components/AgendaCard';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Agenda, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Agenda() {
  const t = useTranslations('Agenda');
  const s = useTranslations('Speakers');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          date={{
            when: '24th of March',
            where: 'Florence',
            length: '1 Day',
            type: 'Conf'
          }}
          originals={false}
          secondaryCta={{
            text: t('secondarycta_text'),
            link: 'mailto:osday@schrodinger-hat.it'
          }}
          showTicketBtn
        />

        <div className="timeline">
          <AgendaCard hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
          <AgendaCard hour='8:50' isBreak={true} breakTitle='Morning intro' icon='/icons/microphone.svg' position='left'/>
          <AgendaCard hour='9:00' isBreak={false} speakerName={s('liran.name')} talkTitle={s('liran.talk_title')} icon='/icons/microphone.svg' position='right' link={s('liran.id')}/>
          <AgendaCard hour='9:35' isBreak={false} speakerName={s('rafael.name')} secondSpeakerName={s('rafael.name_2')} talkTitle={s('rafael.talk_title')} icon='/icons/microphone.svg' position='left' link={s('rafael.id')}/>
          <AgendaCard hour='10:10' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
          <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='left'/>
          <AgendaCard hour='11:05' isBreak={false} speakerName={s('filip.name')} talkTitle={s('filip.talk_title')} icon='/icons/microphone.svg' position='right' link={s('filip.id')}/>
          <AgendaCard hour='11:40' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg' position='left' link={s('federico.id')}/>
          <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='right'/>
          <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' icon='/icons/microphone.svg' position='left'/>
          <AgendaCard hour='14:10' isBreak={false} speakerName={s('jason.name')} secondSpeakerName={s('jason.name_2')} talkTitle={s('jason.talk_title')} icon='/icons/microphone.svg' position='right' link={s('jason.id')}/>
          <AgendaCard hour='14:45' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='left' link={s('matteo.id')}/>
          <AgendaCard hour='15:20' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='right' link={s('serena.id')}/>
          <AgendaCard hour='15:50' isBreak={true} breakTitle='Coffee break & Open Debate & Giveaway' icon='/icons/coffee.svg' position='left'/>
          <AgendaCard hour='16:30' isBreak={false} speakerName={s('artem.name')} talkTitle={s('artem.talk_title')} icon='/icons/microphone.svg' position='right' link={s('artem.id')}/>
          <AgendaCard hour='17:05' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='left' link={s('francesco.id')}/>
          <AgendaCard hour='17:40' isBreak={true} breakTitle="Conclusion with Schrödinger Hat's admin" icon='/icons/microphone.svg' position='right'/>
          <AgendaCard hour='18:00' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='left'/>
        </div>
      </div>
    </>
  );
}
