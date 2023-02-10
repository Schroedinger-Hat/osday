import React from 'react';
import SpeakerInfo from './SpeakerInfo';

type TSpeakerHero = {
  name: string;
  name_2?: string;
  jobDescription: string;
  jobDescription_2?: string;
  title: string;
  talk: string;
  image: string;
  image_2?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl_2?: string;
  linkedinUrl_2?: string;
  twitterUrl_2?: string;
};

const SpeakerHero = ({ name, jobDescription, title, talk, image, image_2, name_2, jobDescription_2, githubUrl, linkedinUrl, twitterUrl, githubUrl_2, linkedinUrl_2, twitterUrl_2 }: TSpeakerHero) => {
  return (
    <div className="speaker_hero">
      <div className='speaker_info'>
        <SpeakerInfo name={name} jobDescription={jobDescription} image={image} githubUrl={githubUrl} twitterUrl={twitterUrl} linkedinUrl={linkedinUrl}/>
        {
          name_2 && image_2 && jobDescription_2 ? 
          <SpeakerInfo name={name_2} jobDescription={jobDescription_2} image={image_2} githubUrl={githubUrl_2} twitterUrl={twitterUrl_2} linkedinUrl={linkedinUrl_2}/>
          : ''
        }
      </div>
      <div className="speaker_talk">
        <h2 className="speaker_hero-title">{title}</h2>
        <p className="speaker_hero-talk">{talk}</p>
      </div>
    </div>
  );
};

export default SpeakerHero;
