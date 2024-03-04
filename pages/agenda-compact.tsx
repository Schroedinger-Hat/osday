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
      <Link href={'/agenda'}>Timeline View</Link>
    </span>
  )
  
  return (
    <>
          <div className=".container">

        <div className='agenda-nav-container'>
          {ViewButton}
          <div className='agenda-nav compact'>
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

        <div className="container">

          {trackSelected === 'Alpha1' && (
            <>
              <div className={`agenda-nav compact`}>
                <h1 > OS Day 1 - Alpha Track (07.03)</h1>
              </div>
              <AgendaCardCompact hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg' />
              <AgendaCardCompact hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Lorenzo Pieri & Maciek Palmowski' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='10:00' isBreak={false} speakerName={s('pj.name')} talkTitle={s('pj.talk_title')} icon='/icons/microphone.svg'   link={s('pj.id')}/>
              <AgendaCardCompact hour='10:45' isBreak={false} speakerName={s('irine.name')} talkTitle={s('irine.talk_title')} icon='/icons/microphone.svg'   link={s('irine.id')}/>
              {/* <AgendaCardCompact hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='11:30' isBreak={false} speakerName={s('iulia.name')} talkTitle={s('iulia.talk_title')} icon='/icons/microphone.svg'   link={s('iulia.id')}/>
              <AgendaCardCompact hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg'  />
              <AgendaCardCompact hour='13:30' isBreak={true} breakTitle='Open Debate' subtitle='30min of open discussion' icon='/icons/microphone.svg' />
              <AgendaCardCompact hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Miki Lombardi & Irine Kokilashvili' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='14:05' isBreak={false} speakerName={s('fabien.name')} talkTitle={s('fabien.talk_title')} icon='/icons/microphone.svg'   link={s('fabien.id')}/>
              <AgendaCardCompact hour='14:40' isBreak={false} speakerName={s('samantha.name')} talkTitle={s('samantha.talk_title')} icon='/icons/microphone.svg'   link={s('samantha.id')}/>
              <AgendaCardCompact hour='15:20' isBreak={false} speakerName={s('abdel.name')} talkTitle={s('abdel.talk_title')} icon='/icons/microphone.svg'   link={s('abdel.id')}/>
              <AgendaCardCompact hour='16:00' isBreak={false} speakerName={s('vipul.name')} talkTitle={s('vipul.talk_title')} icon='/icons/microphone.svg'   link={s('vipul.id')}/>
              {/* <AgendaCardCompact hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='16:40' isBreak={false} speakerName={s('sal.name')} talkTitle={s('sal.talk_title')} icon='/icons/microphone.svg'   link={s('sal.id')}/>
              <AgendaCardCompact hour='17:20' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg'   link={s('francesco.id')}/>
              <AgendaCardCompact hour='18:30' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg'  />
            </>
          )}

          {trackSelected === 'Beta1' && (
            <>
              <div className={`agenda-nav compact`}>
                <h1> OS Day 1 - Beta Track (07.03)</h1>
              </div>
              <AgendaCardCompact hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg'  />
              <AgendaCardCompact hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Patrick Raedler' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='10:00' isBreak={false} speakerName={s('pj.name')} talkTitle={s('pj.talk_title')} icon='/icons/microphone.svg'   link={s('pj.id')}/>
              <AgendaCardCompact hour='10:45' isBreak={false} speakerName={s('mario.name')} talkTitle={s('mario.talk_title')} icon='/icons/microphone.svg'   link={s('mario.id')}/>
              {/* <AgendaCardCompact hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='11:30' isBreak={false} speakerName={s('roman.name')} talkTitle={s('roman.talk_title')} icon='/icons/microphone.svg'   link={s('roman.id')}/>
              <AgendaCardCompact hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg'  />
              <AgendaCardCompact hour='13:30' isBreak={true} breakTitle='Open Debate' subtitle='30min of open discussion' icon='/icons/microphone.svg' />
              <AgendaCardCompact hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Davide Imola' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='14:05' isBreak={false} speakerName={s('alessandro.name')} talkTitle={s('alessandro.talk_title')} icon='/icons/microphone.svg'   link={s('alessandro.id')}/>
              <AgendaCardCompact hour='14:40' isBreak={false} speakerName={s('sasha.name')} talkTitle={s('sasha.talk_title')} icon='/icons/microphone.svg'   link={s('sasha.id')}/>
              <AgendaCardCompact hour='15:20' isBreak={false} speakerName={s('arafat.name')} talkTitle={s('arafat.talk_title')} icon='/icons/microphone.svg'   link={s('arafat.id')}/>
              <AgendaCardCompact hour='16:00' isBreak={false} speakerName={s('sohan.name')} talkTitle={s('sohan.talk_title')} icon='/icons/microphone.svg'   link={s('sohan.id')}/>
              {/* <AgendaCardCompact hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='16:40' isBreak={false} speakerName={s('noah.name')} talkTitle={s('noah.talk_title')} icon='/icons/microphone.svg'   link={s('noah.id')}/>
              <AgendaCardCompact hour='17:20' isBreak={false} speakerName={s('francesco.name')} talkTitle={s('francesco.talk_title')} icon='/icons/microphone.svg'   link={s('francesco.id')}/>
              <AgendaCardCompact hour='18:30' isBreak={true} breakTitle="Aperitivo" icon='/icons/drink.svg'  />
            </>
          )}

          {trackSelected === 'Alpha2' && (
            <>
              <div className={`agenda-nav compact`}>
                <h1> OS Day 2 - Alpha Track (08.03)</h1>
              </div>
              <AgendaCardCompact hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg'  />
              <AgendaCardCompact hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Miki Lombardi & Noah Jelic' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='10:00' isBreak={false} speakerName={s('nathan.name')} talkTitle={s('nathan.talk_title')} icon='/icons/microphone.svg'   link={s('nathan.id')}/>
              <AgendaCardCompact hour='10:45' isBreak={false} speakerName={s('noam.name')} talkTitle={s('noam.talk_title')} icon='/icons/microphone.svg'   link={s('noam.id')}/>
              {/* <AgendaCardCompact hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='11:30' isBreak={false} speakerName={s('christina.name')} talkTitle={s('christina.talk_title')} icon='/icons/microphone.svg'   link={s('tbd.id')}/>
              <AgendaCardCompact hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg'  />
              <AgendaCardCompact hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Lorenzo Pieri & Sabrina Mazzola' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='14:05' isBreak={false} speakerName={s('valeria.name')} talkTitle={s('valeria.talk_title')} icon='/icons/microphone.svg'   link={s('valeria.id')}/>
              <AgendaCardCompact hour='14:45' isBreak={false} speakerName={s('santosh.name')} talkTitle={s('santosh.talk_title')} icon='/icons/microphone.svg'   link={s('santosh.id')}/>
              <AgendaCardCompact hour='15:30' isBreak={false} speakerName={s('federico.name')} talkTitle={s('federico.talk_title')} icon='/icons/microphone.svg'   link={s('federico.id')}/>
              <AgendaCardCompact hour='16:15' isBreak={false} speakerName={s('sabrina.name')} talkTitle={s('sabrina.talk_title')} icon='/icons/microphone.svg'   link={s('sabrina.id')}/>
              {/* <AgendaCardCompact hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='17:00' isBreak={false} speakerName={s('andrey.name')} talkTitle={s('andrey.talk_title')} icon='/icons/microphone.svg'   link={s('andrey.id')}/>
              <AgendaCardCompact hour='18:30' isBreak={true} breakTitle="Schrödinger Hat Final greetings" icon='/icons/microphone.svg'  />
            </>
          )}

          {trackSelected === 'Beta2' && (
            <>
              <div className={`agenda-nav compact`}>
                <h1> OS Day 2 - Beta Track (08.03)</h1>
              </div>
              <AgendaCardCompact hour='8:30' isBreak={true} breakTitle='Open gate' icon='/icons/pencil.svg'  />
              <AgendaCardCompact hour='9:50' isBreak={true} breakTitle='Morning intro' subtitle='Presented by Davide Imola' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='10:00' isBreak={false} speakerName={s('maciek.name')} talkTitle={s('maciek.talk_title')} icon='/icons/microphone.svg'   link={s('tbd.id')}/>
              <AgendaCardCompact hour='10:45' isBreak={false} speakerName={s('graziano.name')} talkTitle={s('graziano.talk_title')} icon='/icons/microphone.svg'   link={s('graziano.id')}/>
              {/* <AgendaCardCompact hour='10:40' isBreak={true} breakTitle='Coffee break' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='11:30' isBreak={false} speakerName={s('paolo.name')} talkTitle={s('paolo.talk_title')} icon='/icons/microphone.svg'   link={s('paolo.id')}/>
              <AgendaCardCompact hour='12:15' isBreak={true} breakTitle='Lunch break' icon='/icons/fork-and-knife.svg'  />
              <AgendaCardCompact hour='14:00' isBreak={true} breakTitle='Afternoon intro' subtitle='Presented by Patrick Raedler' icon='/icons/microphone.svg'  />
              <AgendaCardCompact hour='14:05' isBreak={false} speakerName={s('costa.name')} talkTitle={s('costa.talk_title')} icon='/icons/microphone.svg'   link={s('costa.id')}/>
              <AgendaCardCompact hour='14:45' isBreak={false} speakerName={s('stefano.name')} talkTitle={s('stefano.talk_title')} icon='/icons/microphone.svg'   link={s('stefano.id')}/>
              <AgendaCardCompact hour='15:30' isBreak={false} speakerName={s('edoardo.name')} talkTitle={s('edoardo.talk_title')} icon='/icons/microphone.svg'   link={s('edoardo.id')}/>
              <AgendaCardCompact hour='16:15' isBreak={false} speakerName={s('omar.name')} talkTitle={s('omar.talk_title')} icon='/icons/microphone.svg'   link={s('omar.id')}/>
              {/* <AgendaCardCompact hour='16:00' isBreak={true} breakTitle='Coffee break & Giveaway' icon='/icons/coffee.svg'  /> */}
              <AgendaCardCompact hour='17:00' isBreak={false} speakerName={s('napoletano.name')} talkTitle={s('napoletano.talk_title')} icon='/icons/microphone.svg'   link={s('napoletano.id')}/>
              <AgendaCardCompact hour='18:30' isBreak={true} breakTitle="Schrödinger Hat Final greetings" icon='/icons/microphone.svg'  />
            </>
          )}
        </div>
      </div>
      <hr className={`divider`}></hr>
      <div className={`agenda-nav-container`}>
        <Link className='button' href={'/agenda'}>Timeline View</Link>
      </div>
    </>
  );
}
