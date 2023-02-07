import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { TTalkCard } from '../constants';
import TalkCard from '../components/TalkCard';
import SpeakerHero from '../components/SpeakerHero';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Agenda, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Agenda() {
  const t = useTranslations('Agenda');

  const agendaInfo: TTalkCard[] = [
    {
      id: 'agenda_1',
      description: t('agenda_1'),
      link: 'https://sessionize.com/opensourceday23'
    },
    {
      id: 'agenda_2',
      description: t('agenda_2')
    },
    {
      id: 'agenda_3',
      description: t('agenda_3')
    }
  ];

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          date={{
            when: '24th of March',
            where: 'Florence',
            length: '1 Day',
            type: 'Conf'
          }}
          originals={false}
          secondaryCta={{
            text: t('secondarycta_text'),
            link: 'mailto:osday@schrodinger-hat.it'
          }}
          showTicketBtn
        />

{/*         <section className="talks_2021">
          <div className="talks_container">
            {agendaInfo.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
          </div>
        </section> */}

        <section className="talks_2021">
          {/* <SpeakerHero
            title="The unknown world of Physics and Quantums"
            name="Erwin Schrodinger"
            time="Friday, 10:00AM"
            talk="Fight an alligator and win. Eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter i like fish but scamper this cat happen now, it was too purr-fect!!! or meow to be let in scoot butt on the rug trip on catnip."
          /> */}
        </section>

{/*         <section className="after_main">
          <h2>
            {t.rich('heading', {
              link: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it">{children}</a>
              ),
              cfp: (children: ReactNode) => (
                <a href="https://sessionize.com/opensourceday23/">{children}</a>
              )
            })}
          </h2>
          <h3>
            {t.rich('heading_2', {
              link: (children: ReactNode) => (
                <a href="https://www.schrodinger-hat.it/">{children}</a>
              )
            })}
          </h3>
        </section> */}
      </div>
    </>
  );
}
