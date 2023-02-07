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

        <div className="timeline">
          <div className="container-timeline left-timeline">
            <div className="content-timeline">
              <h2>09:00</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
          <div className="container-timeline right-timeline">
            <div className="content-timeline">
              <h2>09:30</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
          <div className="container-timeline left-timeline">
            <div className="content-timeline">
              <h2>10:00</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
          <div className="container-timeline right-timeline">
            <div className="content-timeline">
              <h2>10:30</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
          <div className="container-timeline left-timeline">
            <div className="content-timeline">
              <h2>11:00</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
          <div className="container-timeline right-timeline">
            <div className="content-timeline">
              <h2>11:30</h2>
              <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
            </div>
          </div>
        </div>

        <section className="talks_2021">
          <div className="talks_container">
            {agendaInfo.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
