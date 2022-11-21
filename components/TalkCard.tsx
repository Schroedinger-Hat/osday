import React from 'react';
import { TTalkCard } from '../constants';

const TalkCard = ({ description, link }: TTalkCard) => {
  return (
    <div className={`talk_card`}>
      <p>
        <a href={link}>{description}</a>
      </p>
    </div>
  );
};

export default TalkCard;
