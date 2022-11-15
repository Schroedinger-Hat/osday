import Image from 'next/image';
import CfpCard from '../components/CfpCard';
import Hero from '../components/Hero';
import { cfpTypes } from '../constants';

export async function getStaticProps() {
  return {
    props: {
      metas: {
        title: 'CFP, Open Source Day 2023 - Florence',
        description: 'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social',
      }
    }
  }
}

export default function CFP() {
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="Call for papers"
          date={{
            where: 'Florence',
            when: 'Started',
            length: 'Closes in Jan 2023',
            type: 'CFP'
          }}
          description="Want to participate in our Call for Papers? Head over to Sessionize and submit your ideas :)"
          originals={false}
          mainCta={{
            text: 'Submit paper :)',
            link: 'https://sessionize.com/opensourceday23'
          }}
          secondaryCta={{
            text: 'Send us an email',
            link: 'mailto:osday@schrodinger-hat.it'
          }}
        />
      
        <section className="after_main">
          <h2>
            Read along if you would like to know more about the topics that are
            of higher interest for our community attendees
          </h2>
          <h3>
            You can find all the community info on our website,{' '}
            <a href="https://www.schrodinger-hat.it/">Schrodingers Hat</a>
          </h3>
          <div className="after_main_container">
            {cfpTypes.map((type) => {
              return <CfpCard key={type.id} {...type} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
