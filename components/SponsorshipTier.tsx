import React from 'react';
import { useTranslations } from 'next-intl';

type TSponsorshipTier = {
  title: string;
  card_color: string;
  price?: string;
  offer: string;
};

const SponsorshipTier = ({
  title = 'Tier #',
  card_color = '#',
  price = '',
  offer = ''
}: TSponsorshipTier) => {
  const t = useTranslations('SponsorshipTier');

  return (
    <>
      <div className={`card_sponsor ${card_color}`}>
        <h1 className="title">{title}</h1>
        <h4 className="sponsorship_price">{price}</h4>
        <h3 className="sponsorship_offer">
          <ul>{offer.length > 0 && offer.split(",").map((item) => <li key={item}>{item} </li>)}</ul>
        </h3>
      </div>
    </>
  );
};

export default SponsorshipTier;
