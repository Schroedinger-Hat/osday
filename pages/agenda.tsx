import Hero from '../components/Hero';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AgendaCard from '../components/AgendaCard';
import { useState } from 'react';
import { YT_LIVE_LINKS } from '../constants';

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

  const ViewButton = (
    <span 
     className='nav-button'>
     <Link href={'/agenda-compact'}>Compact View</Link>
   </span>
 )

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
            {ViewButton}
            {NavBar(1)}
            {NavBar(2)}
          </div>
        </div>

        {new Date().getTime() > 1709798400000 && 
        <div className="container-stream-link">
          <h2>We are live!</h2>
          <a className="button" href={YT_LIVE_LINKS[trackSelected.toLowerCase()]} target="_blank" rel="noreferrer">
            Click to follow the live stream on YouTube!
          </a>
        </div>}

        <div className="timeline">
          {trackSelected === 'Alpha1' && (
            <>
              <AgendaCard hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Lorenzo Pieri & Maciek Palmowski' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='10:00' isBreak={false} speakerName={s('pj.name')} talkTitle={s('pj.talk_title')} icon='/icons/microphone.svg' position='right' link={s('pj.id')}/>
              <AgendaCard hour='10:45' isBreak={false} speakerName={s('irine.name')} talkTitle={s('irine.talk_title')} icon='/icons/microphone.svg' position='left' link={s('irine.id')}/>
              {/* <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg' position='left'/> */}
              <AgendaCard hour='11:30' isBreak={false} speakerName={s('iulia.name')} talkTitle={s('iulia.talk_title')} icon='/icons/microphone.svg' position='right' link={s('iulia.id')}/>
              <AgendaCard hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='left'/>
              <AgendaCard hour='13:30' isBreak={true} breakTitle='Open Debate' subtitle='30min of open discussion' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Miki Lombardi & Irine Kokilashvili' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='14:05' isBreak={false} speakerName={s('fabien.name')} talkTitle={s('fabien.talk_title')} icon='/icons/microphone.svg' position='right' link={s('fabien.id')}/>
              <AgendaCard hour='14:40' isBreak={false} speakerName={s('samantha.name')} talkTitle={s('samantha.talk_title')} icon='/icons/microphone.svg' position='left' link={s('samantha.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('abdel.name')} talkTitle={s('abdel.talk_title')} icon='/icons/microphone.svg' position='right' link={s('abdel.id')}/>
              <AgendaCard hour='16:00' isBreak={false} speakerName={s('vipul.name')} talkTitle={s('vipul.talk_title')} icon='/icons/microphone.svg' position='left' link={s('vipul.id')}/>
              {/* <AgendaCard hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/> */}
              <AgendaCard hour='16:40' isBreak={false} speakerName={s('sal.name')} talkTitle={s('sal.talk_title')} icon='/icons/microphone.svg' position='right' link={s('sal.id')}/>
              <AgendaCard hour='17:20' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='left' link={s('francesco.id')}/>
              <AgendaCard hour='18:30' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Beta1' && (
            <>
              <AgendaCard hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Patrick Raedler' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='10:00' isBreak={false} speakerName={s('pj.name')} talkTitle={s('pj.talk_title')} icon='/icons/microphone.svg' position='right' link={s('pj.id')}/>
              <AgendaCard hour='10:45' isBreak={false} speakerName={s('mario.name')} talkTitle={s('mario.talk_title')} icon='/icons/microphone.svg' position='left' link={s('mario.id')}/>
              {/* <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg' position='left'/> */}
              <AgendaCard hour='11:30' isBreak={false} speakerName={s('roman.name')} talkTitle={s('roman.talk_title')} icon='/icons/microphone.svg' position='right' link={s('roman.id')}/>
              <AgendaCard hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='left'/>
              <AgendaCard hour='13:30' isBreak={true} breakTitle='Open Debate' subtitle='30min of open discussion' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Davide Imola' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='14:05' isBreak={false} speakerName={s('alessandro.name')} talkTitle={s('alessandro.talk_title')} icon='/icons/microphone.svg' position='right' link={s('alessandro.id')}/>
              <AgendaCard hour='14:40' isBreak={false} speakerName={s('sasha.name')} talkTitle={s('sasha.talk_title')} icon='/icons/microphone.svg' position='left' link={s('sasha.id')}/>
              <AgendaCard hour='15:20' isBreak={false} speakerName={s('arafat.name')} talkTitle={s('arafat.talk_title')} icon='/icons/microphone.svg' position='right' link={s('arafat.id')}/>
              <AgendaCard hour='16:00' isBreak={false} speakerName={s('sohan.name')} talkTitle={s('sohan.talk_title')} icon='/icons/microphone.svg' position='left' link={s('sohan.id')}/>
              {/* <AgendaCard hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/> */}
              <AgendaCard hour='16:40' isBreak={false} speakerName={s('noah.name')} talkTitle={s('noah.talk_title')} icon='/icons/microphone.svg' position='right' link={s('noah.id')}/>
              <AgendaCard hour='17:20' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg' position='left' link={s('francesco.id')}/>
              <AgendaCard hour='18:30' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Alpha2' && (
            <>
              <AgendaCard hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Miki Lombardi & Noah Jelic' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='10:00' isBreak={false} speakerName={s('nathan.name')} talkTitle={s('nathan.talk_title')} icon='/icons/microphone.svg' position='right' link={s('nathan.id')}/>
              <AgendaCard hour='10:45' isBreak={false} speakerName={s('noam.name')} talkTitle={s('noam.talk_title')} icon='/icons/microphone.svg' position='left' link={s('noam.id')}/>
              {/* <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg' position='left'/> */}
              <AgendaCard hour='11:30' isBreak={false} speakerName={s('christina.name')} talkTitle={s('christina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('tbd.id')}/>
              <AgendaCard hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='left'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Lorenzo Pieri & Sabrina Mazzola' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:05' isBreak={false} speakerName={s('valeria.name')} talkTitle={s('valeria.talk_title')} icon='/icons/microphone.svg' position='left' link={s('valeria.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('santosh.name')} talkTitle={s('santosh.talk_title')} icon='/icons/microphone.svg' position='right' link={s('santosh.id')}/>
              <AgendaCard hour='15:30' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg' position='left' link={s('federico.id')}/>
              <AgendaCard hour='16:15' isBreak={false} speakerName={s('sabrina.name')} talkTitle={s('sabrina.talk_title')} icon='/icons/microphone.svg' position='right' link={s('sabrina.id')}/>
              {/* <AgendaCard hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/> */}
              <AgendaCard hour='17:00' isBreak={false} speakerName={s('andrey.name')} talkTitle={s('andrey.talk_title')} icon='/icons/microphone.svg' position='left' link={s('andrey.id')}/>
              <AgendaCard hour='18:30' isBreak={true} breakTitle="Schrödinger Hat Final greetings" icon='/icons/microphone.svg' position='right'/>
            </>
          )}

          {trackSelected === 'Beta2' && (
            <>
              <AgendaCard hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
              <AgendaCard hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Davide Imola' icon='/icons/microphone.svg' position='left'/>
              <AgendaCard hour='10:00' isBreak={false} speakerName={s('maciek.name')} talkTitle={s('maciek.talk_title')} icon='/icons/microphone.svg' position='right' link={s('tbd.id')}/>
              <AgendaCard hour='10:45' isBreak={false} speakerName={s('graziano.name')} talkTitle={s('graziano.talk_title')} icon='/icons/microphone.svg' position='left' link={s('graziano.id')}/>
              {/* <AgendaCard hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg' position='left'/> */}
              <AgendaCard hour='11:30' isBreak={false} speakerName={s('paolo.name')} talkTitle={s('paolo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('paolo.id')}/>
              <AgendaCard hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='left'/>
              <AgendaCard hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Patrick Raedler' icon='/icons/microphone.svg' position='right'/>
              <AgendaCard hour='14:05' isBreak={false} speakerName={s('costa.name')} talkTitle={s('costa.talk_title')} icon='/icons/microphone.svg' position='left' link={s('costa.id')}/>
              <AgendaCard hour='14:45' isBreak={false} speakerName={s('stefano.name')} talkTitle={s('stefano.talk_title')} icon='/icons/microphone.svg' position='right' link={s('stefano.id')}/>
              <AgendaCard hour='15:30' isBreak={false} speakerName={s('edoardo.name')} talkTitle={s('edoardo.talk_title')} icon='/icons/microphone.svg' position='left' link={s('edoardo.id')}/>
              <AgendaCard hour='16:15' isBreak={false} speakerName={s('omar.name')} talkTitle={s('omar.talk_title')} icon='/icons/microphone.svg' position='right' link={s('omar.id')}/>
              {/* <AgendaCard hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg' position='right'/> */}
              <AgendaCard hour='17:00' isBreak={false} speakerName={s('napoletano.name')} talkTitle={s('napoletano.talk_title')} icon='/icons/microphone.svg' position='left' link={s('napoletano.id')}/>
              <AgendaCard hour='18:30' isBreak={true} breakTitle="Schrödinger Hat Final greetings" icon='/icons/microphone.svg' position='right'/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
