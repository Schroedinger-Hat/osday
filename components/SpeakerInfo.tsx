import React from 'react';
import Image from 'next/image';

type TSpeakerInfo = {
    name: string;
    jobDescription: string;
    image: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
}

const SpeakerInfo = ({ name, jobDescription, image, githubUrl, linkedinUrl, twitterUrl}: TSpeakerInfo) => {
    return (
        <>
        <Image
            className="speaker_hero-image"
            width={150}
            height={150}
            src={image}
            alt="Speaker"
        />
      <span><h1>{name}</h1><i>{jobDescription}</i></span>
      <div className='speaker_social'>
        {twitterUrl ? 
          <a href={twitterUrl} target="_blank" rel="noreferrer" title="Twitter">
            <Image width={15} height={15} src="/icons/twitter.svg" alt="Twitter" />
          </a>
          : ''
        }
        {linkedinUrl ? 
          <a href={linkedinUrl} title="Linkedin" target="_blank" rel="noreferrer">
            <Image width={15} height={15} src="/icons/linkedin.svg" alt="Linkedin" />
          </a> 
          : ''
        }
        {githubUrl ? 
          <a href={githubUrl} target="_blank" rel="noreferrer" title="Github">
            <Image width={15} height={15} src="/icons/github.svg" alt="Github" />
          </a> 
          : ''
        }
      </div>
      </>
    );
};

export default SpeakerInfo;