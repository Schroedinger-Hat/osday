import Hero from '../components/Hero';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AgendaCardCompact from '../components/AgendaCardCompact';
import { useState } from 'react';
import { YT_LIVE_LINKS } from '../constants';
import TextSection from '../components/TextSection';

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
      className='nav-button'>
      <Link className="button " href={"/agenda"}>Timeline View</Link>
    </div>
  )
  
  return (
    <>
          <div className="container">
            <div className='agenda-nav-container'>
              {ViewButton}
            </div>

        {/*
        <div className="container-stream-link">
          <h2>We are live!</h2>
          <a className="button" href={YT_LIVE_LINKS[trackSelected.toLowerCase()]} target="_blank" rel="noreferrer">
            Click to follow the live stream on YouTube!
          </a>
        </div>*/}

        <div className="container">
          <AgendaCardCompact hour='8:00' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' />
          <AgendaCardCompact hour='9:00' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Schroedinger Hat' icon='/icons/microphone.svg' />
          <AgendaCardCompact hour='09:15' isBreak={false} speakerName={s('sal.name')} talkTitle={s('sal.talk_title')} icon='/icons/microphone.svg'  link={s('sal.id')}/>
          <AgendaCardCompact hour='09:50' isBreak={false} speakerName={s('emiliano.name')} talkTitle={s('emiliano.talk_title')} icon='/icons/microphone.svg'  link={s('emiliano.id')}/>
          <AgendaCardCompact hour='10:25' isBreak={false} speakerName={s('leonardo.name')} talkTitle={s('leonardo.talk_title')} icon='/icons/microphone.svg'  link={s('leonardo.id')}/>
          <AgendaCardCompact hour='11:00' isBreak={false} speakerName={`${s('valeria.name')} & ${s('claire.name')}`} talkTitle={s('valeria.talk_title')} icon='/icons/microphone.svg'  link={s('valeria.id')}/>
          <AgendaCardCompact hour='11:35' isBreak={false} speakerName={s('maciek.name')} talkTitle={s('maciek.talk_title')} icon='/icons/microphone.svg'  link={s('maciek.id')}/>
          <AgendaCardCompact hour='12:10' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg' />
          <AgendaCardCompact hour='13:10' isBreak={false} speakerName={s('edoardo.name')} talkTitle={s('edoardo.talk_title')} icon='/icons/microphone.svg'  link={s('edoardo.id')}/>
          <AgendaCardCompact hour='13:50' isBreak={false} speakerName={s('giorgio.name')} talkTitle={s('giorgio.talk_title')} icon='/icons/microphone.svg'  link={s('giorgio.id')}/>
          <AgendaCardCompact hour='14:25' isBreak={false} speakerName={s('serena.name')} talkTitle={s('serena.talk_title')} icon='/icons/microphone.svg'  link={s('serena.id')}/>
          <AgendaCardCompact hour='14:55' isBreak={false} speakerName={s('matteo.name')} talkTitle={s('matteo.talk_title')} icon='/icons/microphone.svg'  link={s('matteo.id')}/>
          <AgendaCardCompact hour='15:30' isBreak={false} speakerName={s('stefano.name')} talkTitle={s('stefano.talk_title')} icon='/icons/microphone.svg'  link={s('stefano.id')}/>
          <AgendaCardCompact hour='16:00' isBreak={true} breakTitle='Pause' icon='/icons/coffee.svg' />
          <AgendaCardCompact hour='16:15' isBreak={false} speakerName={s('pierdomenico.name')} talkTitle={s('pierdomenico.talk_title')} icon='/icons/microphone.svg'  link={s('pierdomenico.id')}/>
          <AgendaCardCompact hour='16:50' isBreak={false} speakerName={s('cosmin.name')} talkTitle={s('cosmin.talk_title')} icon='/icons/microphone.svg'  link={s('cosmin.id')}/>
          <AgendaCardCompact hour='17:25' isBreak={false} speakerName={s('marco.name')} talkTitle={s('marco.talk_title')} icon='/icons/microphone.svg'  link={s('marco.id')}/>
          <AgendaCardCompact hour='18:00' isBreak={true} breakTitle='Closing notes' subtitle='Presented by Schroedinger Hat' icon='/icons/microphone.svg' />
          <AgendaCardCompact hour='18:20' isBreak={true} breakTitle="Networking" icon='/icons/drink.svg' />
        </div>
      </div>
      <hr className={`divider`}></hr>
      <div className={`agenda-nav-container`}>
        <Link className='button' href={'/agenda'}>Timeline View</Link>
      </div>
    </>
  );
}
