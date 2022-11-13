import Image from 'next/image';
import Hero from '../components/Hero'

export async function getStaticProps() {
  return {
    props: {
      metas: {
        title: 'Venue, Open Source Day 2023 - Florence',
        description: 'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social',
      }
    }
  }
}

export default function Home() {
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="We have a wonderful Venue"
          date={{
            where: 'Florence',
            when: 'Coming soon',
            length: 'March 2023',
            type: 'Venue'
          }}
          description="Keep in touch through our channels (Discord, LinkedIn) to know which Venue will host us for this event :)"
          originals={false}
        />
        <div className="image">
          <Image className="img" alt="background" fill={true} src="/bg.jpg" />
        </div>
        <section className="after_main">
          <h2>
            Want to know more about the Venue for this event? :) Keep yourself posted on LinkedIn, Twitter or better yet, <a href="https://discord.gg/RTXr8A3eFn">Discord</a>!
          </h2>
        </section>
      </div>
    </>
  )
}
