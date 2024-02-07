import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import AgendaCard from '../components/AgendaCard';
import { useState } from 'react';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Agenda, Open Source Day 2024 - Florence',
        description:
          'Open Source Day 2024 coming on the 07-08th of March 2024. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Agenda() {
  const t = useTranslations('Agenda');
  const s = useTranslations('Speakers');
  const [trackSelected, setTrackSelected] = useState('Alpha1');

  const NavBar = (day: number) => {
    return ['Alpha', 'Beta'].map((track) => {
      return <span
        key={`${track}${day}`}
        onClick={() => setTrackSelected(track.concat(day.toString()))}
        className={`nav-button ${trackSelected === track.concat(day.toString()) ? 'is-active' : ''}`}>
          Day{day} - {track} Track
        </span>;
    });
  };

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
          secondaryCta={{
            text: t('secondarycta_text'),
            link: 'mailto:osday@schrodinger-hat.it'
          }}
        />

        <div className='agenda-nav-container'>
          <div className='agenda-nav'>
            {NavBar(1)}
            {NavBar(2)}
          </div>
        </div>

        <div className="timeline">
          {trackSelected === 'Alpha1' && (
            <>
              <AgendaCard hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='9:50' isBreak={true} breakTitle='Morning intro' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='10:00' isBreak={false} speakerName={s('liran.name')} talkTitle={s('liran.talk_title')} icon='/icons/microphone.svg' position='right' link={s('liran.id')}/>
              <AgendaCard hour='10:35' isBreak={false} speakerName={s('rafael.name')} secondSpeakerName={s('rafael.name_2')} talkTitle={s('rafael.talk_title')} icon='/icons/microphone.svg' position='left' link={s('rafael.id')}/>
              <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg' position='left'/>
              <AgendaCard hour='11:00' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
              <AgendaCard hour='11:40' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
              <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='right'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:10' isBreak={false} speakerName={s('jason.name')} secondSpeakerName={s('jason.name_2')} talkTitle={s('jason.talk_title')} icon='/icons/microphone.svg' position='left' link={s('jason.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('matteo.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='left' link={s('serena.id')}/>
              <AgendaCard hour='15:50' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/>
              <AgendaCard hour='16:30' isBreak={false} speakerName={s('paolinelli.name')} talkTitle={s('paolinelli.talk_title')} icon='/icons/microphone.svg' position='left' link={s('paolinelli.id')}/>
              <AgendaCard hour='17:05' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='right' link={s('francesco.id')}/>
              <AgendaCard hour='18:00' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Beta1' && (
            <>
              <AgendaCard hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='8:50' isBreak={true} breakTitle='Morning intro' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='9:00' isBreak={false} speakerName={s('liran.name')} talkTitle={s('liran.talk_title')} icon='/icons/microphone.svg' position='right' link={s('liran.id')}/>
              <AgendaCard hour='9:35' isBreak={false} speakerName={s('rafael.name')} secondSpeakerName={s('rafael.name_2')} talkTitle={s('rafael.talk_title')} icon='/icons/microphone.svg' position='left' link={s('rafael.id')}/>
              <AgendaCard hour='10:10' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
              <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='left'/>
              <AgendaCard hour='11:05' isBreak={false} speakerName={s('filip.name')} talkTitle={s('filip.talk_title')} icon='/icons/microphone.svg' position='right' link={s('filip.id')}/>
              <AgendaCard hour='11:40' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg' position='left' link={s('federico.id')}/>
              <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='right'/>
              <AgendaCard hour='13:30' isBreak={true} breakTitle='Open Debate' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:10' isBreak={false} speakerName={s('jason.name')} secondSpeakerName={s('jason.name_2')} talkTitle={s('jason.talk_title')} icon='/icons/microphone.svg' position='left' link={s('jason.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('matteo.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='left' link={s('serena.id')}/>
              <AgendaCard hour='15:50' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/>
              <AgendaCard hour='16:30' isBreak={false} speakerName={s('paolinelli.name')} talkTitle={s('paolinelli.talk_title')} icon='/icons/microphone.svg' position='left' link={s('paolinelli.id')}/>
              <AgendaCard hour='17:05' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='right' link={s('francesco.id')}/>
              <AgendaCard hour='17:40' isBreak={true} breakTitle="Conclusion with Schrödinger Hat's admin" icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='18:00' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Alpha2' && (
            <>
              <AgendaCard hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='8:50' isBreak={true} breakTitle='Morning intro' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='9:00' isBreak={false} speakerName={s('liran.name')} talkTitle={s('liran.talk_title')} icon='/icons/microphone.svg' position='right' link={s('liran.id')}/>
              <AgendaCard hour='9:35' isBreak={false} speakerName={s('rafael.name')} secondSpeakerName={s('rafael.name_2')} talkTitle={s('rafael.talk_title')} icon='/icons/microphone.svg' position='left' link={s('rafael.id')}/>
              <AgendaCard hour='10:10' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
              <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='left'/>
              <AgendaCard hour='11:05' isBreak={false} speakerName={s('filip.name')} talkTitle={s('filip.talk_title')} icon='/icons/microphone.svg' position='right' link={s('filip.id')}/>
              <AgendaCard hour='11:40' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg' position='left' link={s('federico.id')}/>
              <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='right'/>
              <AgendaCard hour='13:30' isBreak={true} breakTitle='Open Debate' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:10' isBreak={false} speakerName={s('jason.name')} secondSpeakerName={s('jason.name_2')} talkTitle={s('jason.talk_title')} icon='/icons/microphone.svg' position='left' link={s('jason.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('matteo.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='left' link={s('serena.id')}/>
              <AgendaCard hour='15:50' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/>
              <AgendaCard hour='16:30' isBreak={false} speakerName={s('paolinelli.name')} talkTitle={s('paolinelli.talk_title')} icon='/icons/microphone.svg' position='left' link={s('paolinelli.id')}/>
              <AgendaCard hour='17:05' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='right' link={s('francesco.id')}/>
              <AgendaCard hour='17:40' isBreak={true} breakTitle="Conclusion with Schrödinger Hat's admin" icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='18:00' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Beta2' && (
            <>
              <AgendaCard hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='8:50' isBreak={true} breakTitle='Morning intro' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='9:00' isBreak={false} speakerName={s('liran.name')} talkTitle={s('liran.talk_title')} icon='/icons/microphone.svg' position='right' link={s('liran.id')}/>
              <AgendaCard hour='9:35' isBreak={false} speakerName={s('rafael.name')} secondSpeakerName={s('rafael.name_2')} talkTitle={s('rafael.talk_title')} icon='/icons/microphone.svg' position='left' link={s('rafael.id')}/>
              <AgendaCard hour='10:10' isBreak={false} speakerName={s('alina.name')} talkTitle={s('alina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alina.id')}/>
              <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='left'/>
              <AgendaCard hour='11:05' isBreak={false} speakerName={s('filip.name')} talkTitle={s('filip.talk_title')} icon='/icons/microphone.svg' position='right' link={s('filip.id')}/>
              <AgendaCard hour='11:40' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg' position='left' link={s('federico.id')}/>
              <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='right'/>
              <AgendaCard hour='13:30' isBreak={true} breakTitle='Open Debate' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:10' isBreak={false} speakerName={s('jason.name')} secondSpeakerName={s('jason.name_2')} talkTitle={s('jason.talk_title')} icon='/icons/microphone.svg' position='left' link={s('jason.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('matteo.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='left' link={s('serena.id')}/>
              <AgendaCard hour='15:50' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/>
              <AgendaCard hour='16:30' isBreak={false} speakerName={s('paolinelli.name')} talkTitle={s('paolinelli.talk_title')} icon='/icons/microphone.svg' position='left' link={s('paolinelli.id')}/>
              <AgendaCard hour='17:05' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='right' link={s('francesco.id')}/>
              <AgendaCard hour='17:40' isBreak={true} breakTitle="Conclusion with Schrödinger Hat's admin" icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='18:00' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
