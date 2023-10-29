import React from 'react';
import { TTalkCard } from '../constants';

const TalkCard = ({ description, link }: TTalkCard) => {
  return (
    <div className={`talk_card`}>
      {link ? (
        <p>
          <a href={link} target="_blank" rel="noreferrer">{description}</a>
        </p>
      ) : (
        <p>{description} </p>
      )}
    </div>
  );
};

export default TalkCard;
