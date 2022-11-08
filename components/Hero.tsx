import React from 'react';

type THero = {
  title?: string;
  subtitle?: string;
  description?: string;
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
};

const Hero = ({
  title,
  subtitle,
  description,
  originals = true,
  ...props
}: THero) => {
  return (
    <div className="title-box">
      {title ? (
        <h1>
          {title} {props.originals ? <span>Originals</span> : null}
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
          <li>March 2023</li>
          <li>Florence, Italy</li>
          <li>10h 20min</li>
          <li>Conference</li>
        </ul>
      )}

      {description ? (
        <p>{description}</p>
      ) : (
        <>
          <p>
            We are coming back with a new edition of the Open Source Day
            conference. In this season we are going to smash everything.
          </p>
          <p>
            <i>Starring</i>: the best companies and the best professionals in
            the sector and in open source projects
          </p>
        </>
      )}

      <br />

      {props.mainCta ? (
        <a
          href={props.mainCta.link}
          target="_blank"
          className="button"
          rel="noreferrer"
        >
          {props.mainCta.text}
        </a>
      ) : null}
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
  );
};

export default Hero;
