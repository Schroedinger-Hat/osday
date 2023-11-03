import React from "react";
import { TTalkCard } from "../constants";

const TalkCard = ({ description, link, author }: TTalkCard) => {
  return (
    <div className={`talk_card`}>
      <div className={`talk_card_inner ${author}`}>
        {link ? (
          <p>
            <a href={link} target="_blank" rel="noreferrer">
              {description}
            </a>
          </p>
        ) : (
          <p>{description} </p>
        )}
      </div>
    </div>
  );
};

export default TalkCard;
