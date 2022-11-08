import React from 'react';
import { TTalkCard } from '../constants';

const TalkCard = ({ description, link, talkClass }: TTalkCard) => {
  return (
    <div className={`talk_card ${talkClass ? talkClass : ''}`}>
      <p>
        <a href={link}>{description}</a>
      </p>
    </div>
  );
};

export default TalkCard;
