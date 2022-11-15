import Image from 'next/image';
import { previousTalks, TTalkCard } from '../constants';
import Hero from './Hero';
import TalkCard from './TalkCard';

export default function Main() {
  return (
    <div className="container">
      <Hero mainCta={{ text: 'Call for Papers', link: 'https://sessionize.com/opensourceday23' }} secondaryCta={{ text: 'Send us an email', link: 'mailto:osday@schrodinger-hat.it' }} />
      <section className="talks_2021">
        <h2>Take a look at the first edition</h2>
        <div className="talks_container">
          {previousTalks.map((talk: TTalkCard) => {
            return <TalkCard key={talk.id} {...talk} />;
          })}
        </div>
      </section>
    </div>
  );
}
