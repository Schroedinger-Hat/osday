import React from 'react';
import { useTranslations } from 'next-intl';
import TicketCounter from './TicketCounter';
import Link from 'next/link';

type THero = {
  title?: string;
  subtitle?: string;
  description?: string;
  description_2?: string;
  date?: {
    where: string;
    when: string;
    length: string;
    type: string;
  };
  mainCta?: {
    link: string;
    text: string;
  };
  secondaryCta?: {
    link: string;
    text: string;
  };
  originals?: boolean;
  showTicketBtn?: boolean;
  showTicketAvailability?: boolean;
  showViewOnMap?: boolean;
  showNewsletter?: boolean;
};

const Hero = ({
  title,
  subtitle,
  description,
  description_2,
  originals = true,
  ...props
}: THero) => {
  const t = useTranslations('Hero');
  return (
    <div className="title-box">
      {title ? (
        <h1>
          {title} {originals && <span>Originals</span>}
        </h1>
      ) : (
        <h1>
          Schrödinger Hat <span>Originals</span>
        </h1>
      )}

      {subtitle ? <h2>{subtitle}</h2> : <h2>Open Source Day 2024</h2>}

      {props.date && (
        <ul>
          <li>{props.date.when}</li>
          <li>{props.date.where}</li>
          <li>{props.date.length}</li>
          <li>{props.date.type}</li>
        </ul>
      )}

      {description && (
        <p>{description}</p>
      )}

      {description_2 && (
        <p>{description_2}</p>
      )}

      <br />

      <div className='cta-container'>
        {props.mainCta && (
          <>
            <a
              href={props.mainCta.link}
              target="_blank"
              className="button"
              rel="noreferrer"
            >
              {props.mainCta.text}
            </a>
            </>
        )}
        {props.showTicketBtn && (
          <a
            className='button'
            target='_blank'
            href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'}
            rel="noreferrer"
          >
            Free Tickets
          </a>
        )}
        {props.secondaryCta && (
          <a
            href={props.secondaryCta.link}
            target="_blank"
            className="button"
            rel="noreferrer"
          >
            {props.secondaryCta.text}
          </a>
        )}
        {props.showViewOnMap && (
          <a
            className='button'
            target='_blank'
            href='https://goo.gl/maps/6b6ULhE4aGFyzPkp6'
            rel='noreferrer'
          >
            View on Map
          </a>
        )}
        {props.showNewsletter && (
          <Link className='button' href={'/newsletter'}>Newsletter</Link>
        )}
      </div>

      <br />

      <div className='cta-container'>
          {props.showTicketAvailability && (
            <TicketCounter />
          )}
      </div>
    </div>
  );
};

export default Hero;
