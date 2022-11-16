import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Venue, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Venue() {
  const t = useTranslations('Venue');

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
        <section className="after_main">
          <h2>
            Want to know more about the Venue for this event? :) Keep yourself
            posted on LinkedIn, Twitter or better yet,{' '}
            <a href="https://discord.gg/RTXr8A3eFn">Discord</a>!
          </h2>
        </section>
      </div>
    </>
  );
}
