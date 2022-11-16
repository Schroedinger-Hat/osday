import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Agenda, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}
export default function Agenda() {
  const t = useTranslations('Agenda');
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2023"
          subtitle="Agenda"
          date={{
            where: 'Florence',
            when: 'Coming soon',
            length: 'March 2023',
            type: 'Agenda'
          }}
          description="We are still looking for Speakers and organising the event! Want to participate? :)"
          originals={false}
        />

        <section className="after_main">
          <h2>
            Head over to the CFP page or contact us directly @{' '}
            <a href="mailto:osday@schrodinger-hat.it">SH</a>
          </h2>
          <h3>
            You can find all the community info on our website,{' '}
            <a href="https://www.schrodinger-hat.it/">Schrodingers Hat</a> and
            if you have any questions about inclusivity, diversity or
            accessibility please ask us at any time!
          </h3>
        </section>
      </div>
    </>
  );
}
