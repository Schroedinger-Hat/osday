import React from 'react';
import Image from 'next/image';

type TSpeakerHero = {
  name?: string;
  time?: string;
  title?: string;
  talk?: string;
  image?: string;
};

const SpeakerHero = ({ name, time, title, talk, image }: TSpeakerHero) => {
  return (
    <div className="speaker_hero">
      <Image
        className="speaker_hero-image"
        width={128}
        height={128}
        src="/erwin.png"
        alt="Speaker"
      />
      <div className="speaker_hero-info">
        {name ? (
          <h1>{name}</h1>
        ) : (
          <h1>
            Coming <span>Soon</span>
          </h1>
        )}
        {time ? (
          <p className="speaker_hero-time">{time}</p>
        ) : (
          <p className="speaker_hero-time">Time yet to be revealed</p>
        )}

        {title ? <h2 className="speaker_hero-title">{title}</h2> : <h2 className="speaker_hero-title">Title yet to be revealed</h2>}
        {talk ? <p className="speaker_hero-talk">{talk}</p> : false}
      </div>
    </div>
  );
};

export default SpeakerHero;
