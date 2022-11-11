import React from 'react';
import { TTypeCard } from '../constants';

const CfpCard = ({ title, typeClass }: TTypeCard) => {
  return (
    <div className={`cfp_card ${typeClass ? typeClass : ''}`}>
      <p>
        {title}
      </p>
    </div>
  );
};

export default CfpCard;
