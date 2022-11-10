import Image from 'next/image';
import { previousTalks, TTalkCard } from '../constants';
import Hero from './Hero';
import TalkCard from './TalkCard';

export default function Main() {
  return (
    <div className="container">
      <Hero />
      <div className="image">
        <Image className="img" alt="background" fill={true} src="/bg.jpg" />
      </div>
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
