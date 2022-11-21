import React from 'react';
import { TTalkCard } from '../constants';

const TalkCard = ({ description, link }: TTalkCard) => {
  return (
    <div className={`talk_card`}>
      {link ? (
        <p>
          <a href={link}>{description}</a>
        </p>
      ) : (
        <p>{description} </p>
      )}
    </div>
  );
};

export default TalkCard;
