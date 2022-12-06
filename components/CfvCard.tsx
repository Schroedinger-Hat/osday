import React from 'react';
import { TTypeCard } from '../constants';

const CfvCard = ({ title, typeClass }: TTypeCard) => {
  return (
    <div className={`cfv_card ${typeClass ? typeClass : ''}`}>
      <p>
        {title}
      </p>
    </div>
  );
};

export default CfvCard;
