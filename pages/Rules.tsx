import Image from 'next/image';
import Hero from '../components/Hero';

export async function getStaticProps() {
  return {
    props: {
      metas: {
        title: 'Rules, Open Source Day 2023 - Florence',
        description: 'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social',
      }
    }
  }
}

export default function Rules () {
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="Rules of Conduct"
          date={{
            where: 'Florence',
            when: 'Coming soon',
            length: 'March 2023',
            type: 'Rules of Conduct'
          }}
          description="Let's find out how you can help the Open Source community achieve great results in organizing one of the best conferences ever! :)"
          originals={false}
        />
        <div className="image">
          <Image className="img" alt="background" fill={true} src="/bg.jpg" />
        </div>
      </div>
    </>
  );
}
