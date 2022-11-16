import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

type TSponsorshipTier = {
  title: string;
  link: string;
  bg?: string;
};

const SponsorshipTier = ({
  title = 'Tier #',
  link = '#',
  bg = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
}: TSponsorshipTier) => {
  const t = useTranslations('SponsorshipTier');

  return (
    <>
      <div className="card_sponsor" style={{ backgroundImage: `url(${bg})` }}>
        <div className="inner">
          <h2 className="title">{title}</h2>
          <Link className="subtitle" href={link}>
            {t('know_more')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SponsorshipTier;
