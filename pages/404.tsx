import Image from 'next/image';
import Hero from '../components/Hero';

export async function getStaticProps() {
  return {
    props: {
      metas: {
        title: '404, Open Source Day 2023 - Florence',
        robots: 'noindex'
      }
    }
  };
}

export default function _404() {
  return (
    <>
      <div className="container">
        <Hero
          title="404 Page"
          subtitle="You are Lost - Season Finale"
          date={{
            where: 'Anywhere',
            when: 'Anytime',
            length: 'Infinity',
            type: 'HTTP Error'
          }}
          description="It appears you may have found the secret season of the best show of this time, 404! Would you like to go back? :)"
        />
      </div>
    </>
  );
}
