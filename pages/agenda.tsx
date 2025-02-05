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
        title: 'Agenda, Open Source Day 2025 - Florence',
        description:
          'Open Source Day 2025 coming on the 21st of March 2025. Stay tuned on our social'
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
    <div 
      className="nav-button">
     <Link className= "button" href={"/agenda-compact"}>Compact View</Link>
    </div>
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
            link: 'mailto:events@schroedinger-hat.org'
          }}
        />

        <div className='agenda-nav-container'>
          {ViewButton}
          {/*<div className='agenda-nav'>
            {NavBar(1)}
            {NavBar(2)}
          </div>*/}
        </div>

        {/*
        <div className="container-stream-link">
          <h2>We are live!</h2>
          <a className="button" href={YT_LIVE_LINKS[trackSelected.toLowerCase()]} target="_blank" rel="noreferrer">
            Click to follow the live stream on YouTube!
          </a>
        </div>*/}

        <div className="timeline">
            <AgendaCard hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' position='right'/>
            <AgendaCard hour='9:00' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Schroedinger Hat' icon='/icons/microphone.svg' position='left'/>
            <AgendaCard hour='09:15' isBreak={false} speakerName={s('sal.name')} talkTitle={s('sal.talk_title')} icon='/icons/microphone.svg' position='right' link={s('sal.id')}/>
            <AgendaCard hour='09:50' isBreak={false} speakerName={s('emiliano.name')} talkTitle={s('emiliano.talk_title')} icon='/icons/microphone.svg' position='left' link={s('emiliano.id')}/>
            <AgendaCard hour='10:25' isBreak={false} speakerName={s('leonardo.name')} talkTitle={s('leonardo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('leonardo.id')}/>
            <AgendaCard hour='11:00' isBreak={false} speakerName={`${s('valeria.name')} & ${s('claire.name')}`} talkTitle={s('valeria.talk_title')} icon='/icons/microphone.svg' position='left' link={s('valeria.id')}/>
            <AgendaCard hour='11:35' isBreak={false} speakerName={s('maciek.name')} talkTitle={s('maciek.talk_title')} icon='/icons/microphone.svg' position='right' link={s('maciek.id')}/>
            <AgendaCard hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' position='left'/>
            <AgendaCard hour='13:10' isBreak={false} speakerName={s('edoardo.name')} talkTitle={s('edoardo.talk_title')} icon='/icons/microphone.svg' position='right' link={s('edoardo.id')}/>
            <AgendaCard hour='13:50' isBreak={false} speakerName={s('giorgio.name')} talkTitle={s('giorgio.talk_title')} icon='/icons/microphone.svg' position='left' link={s('giorgio.id')}/>
            <AgendaCard hour='14:25' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg' position='right' link={s('serena.id')}/>
            <AgendaCard hour='14:55' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg' position='left' link={s('matteo.id')}/>
            <AgendaCard hour='15:30' isBreak={false} speakerName={s('stefano.name')} talkTitle={s('stefano.talk_title')} icon='/icons/microphone.svg' position='right' link={s('stefano.id')}/>
            <AgendaCard hour='16:00' isBreak={true} breakTitle='Pause' icon='/icons/coffee.svg' position='left'/>
            <AgendaCard hour='16:15' isBreak={false} speakerName={s('pierdomenico.name')} talkTitle={s('pierdomenico.talk_title')} icon='/icons/microphone.svg' position='right' link={s('pierdomenico.id')}/>
            <AgendaCard hour='16:50' isBreak={false} speakerName={s('cosmin.name')} talkTitle={s('cosmin.talk_title')} icon='/icons/microphone.svg' position='left' link={s('cosmin.id')}/>
            <AgendaCard hour='17:25' isBreak={false} speakerName={s('marco.name')} talkTitle={s('marco.talk_title')} icon='/icons/microphone.svg' position='right' link={s('marco.id')}/>
            <AgendaCard hour='18:00' isBreak={true} breakTitle='Closing notes' subtitle='Presented by Schroedinger Hat' icon='/icons/microphone.svg' position='left'/>
            <AgendaCard hour='18:20' isBreak={true} breakTitle="Networking" icon='/icons/drink.svg' position='right'/>
        </div>
      </div>
    </>
  );
}
