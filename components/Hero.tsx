import React from 'react';
import { useTranslations } from 'next-intl';

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
          {title} {originals ? <span>Originals</span> : null}
        </h1>
      ) : (
        <h1>
          Schrödinger Hat <span>Originals</span>
        </h1>
      )}

      {subtitle ? <h2>{subtitle}</h2> : <h2>Open Source Day 2023</h2>}

      {props.date ? (
        <ul>
          <li>{props.date.when}</li>
          <li>{props.date.where}</li>
          <li>{props.date.length}</li>
          <li>{props.date.type}</li>
        </ul>
      ) : (
        <ul>
          <li>{t('when')}</li>
          <li>{t('where')}</li>
          <li>{t('length')}</li>
          <li>{t('type')}</li>
        </ul>
      )}

      {description ? (
        <p>{description}</p>
      ) : (
        <>
        </>
      )}

      {description_2 ? (
        <p>{description_2}</p>
      ) : (
        <>
        </>
      )}

      <br />

      <div className='cta-container'>
        {props.mainCta ? (
          <>
            <a
              href={props.mainCta.link}
              target="_blank"
              className="button"
              rel="noreferrer"
            >
              {props.mainCta.text}
            </a>
            <a
              className='button'
              target='_blank'
              href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'}
              rel="noreferrer"
            >
              Free Tickets
            </a>
            </>
        ) : null}
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
        {props.secondaryCta ? (
          <a
            href={props.secondaryCta.link}
            target="_blank"
            className="button"
            rel="noreferrer"
          >
            {props.secondaryCta.text}
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
