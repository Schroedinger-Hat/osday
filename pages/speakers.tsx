import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import SpeakerHero from '../components/SpeakerHero';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Speakers, Open Source Day 2025 - Florence',
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Speakers() {
  const t = useTranslations('Speakers');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          originals={false}
        />

        <section className="talks">
          <div className="talks_container">
            <SpeakerHero id={t('valeria.id')} image='/speakers/2025/valeria-salis.jpeg' name={t('valeria.name')} talk={t('valeria.talk')} title={t('valeria.talk_title')} jobDescription={t('valeria.job_title')} linkedinUrl={t('valeria.linkedin_url')} />
            <SpeakerHero id={t('serena.id')} image='/speakers/2025/serena-sensini.jpg' name={t('serena.name')} talk={t('serena.talk')}  title={t('serena.talk_title')} jobDescription={t('serena.job_title')} linkedinUrl={t('serena.linkedin_url')} />
            <SpeakerHero id={t('maciek.id')} image='/speakers/2025/maciek-palmowski.jpg' name={t('maciek.name')} talk={t('maciek.talk')} title={t('maciek.talk_title')} jobDescription={t('maciek.job_title')} linkedinUrl={t('maciek.linkedin_url')} />
            <SpeakerHero id={t('sal.id')} image='/speakers/2025/sal-kimmich.png' name={t('sal.name')} talk={t('sal.talk')} title={t('sal.talk_title')} jobDescription={t('sal.job_title')} linkedinUrl={t('sal.linkedin_url')} />
            <SpeakerHero id={t('claire.id')} image='/speakers/2025/claire-fletcher-harris.jpg' name={t('claire.name')} talk={t('claire.talk')}  title={t('claire.talk_title')} jobDescription={t('claire.job_title')} linkedinUrl={t('claire.linkedin_url')} />
            <SpeakerHero id={t('emiliano.id')} image='/speakers/2025/emiliano-pisu.jpg' name={t('emiliano.name')} talk={t('emiliano.talk')}  title={t('emiliano.talk_title')} jobDescription={t('emiliano.job_title')} linkedinUrl={t('emiliano.linkedin_url')} />
            <SpeakerHero id={t('leonardo.id')} image='/speakers/2025/leonardo-cavagnis.jpeg' name={t('leonardo.name')} talk={t('leonardo.talk')}  title={t('leonardo.talk_title')} jobDescription={t('leonardo.job_title')} linkedinUrl={t('leonardo.linkedin_url')} />
            <SpeakerHero id={t('edoardo.id')} image='/speakers/2025/edoardo-calesi.jpg' name={t('edoardo.name')} talk={t('edoardo.talk')}  title={t('edoardo.talk_title')} jobDescription={t('edoardo.job_title')} linkedinUrl={t('edoardo.linkedin_url')} />
            <SpeakerHero id={t('giorgio.id')} image='/speakers/2025/giorgio-boa.jpg' name={t('giorgio.name')} talk={t('giorgio.talk')}  title={t('giorgio.talk_title')} jobDescription={t('giorgio.job_title')} linkedinUrl={t('giorgio.linkedin_url')} />
            <SpeakerHero id={t('matteo.id')} image='/speakers/2025/matteo-valentini.jpg' name={t('matteo.name')} talk={t('matteo.talk')}  title={t('matteo.talk_title')} jobDescription={t('matteo.job_title')} linkedinUrl={t('matteo.linkedin_url')} />
            <SpeakerHero id={t('stefano.id')} image='/speakers/2025/stefano-marinelli.jpg' name={t('stefano.name')} talk={t('stefano.talk')}  title={t('stefano.talk_title')} jobDescription={t('stefano.job_title')} linkedinUrl={t('stefano.linkedin_url')} />
            <SpeakerHero id={t('pierdomenico.id')} image='/speakers/2025/pierdomenico-reitano.jpg' name={t('pierdomenico.name')} talk={t('pierdomenico.talk')}  title={t('pierdomenico.talk_title')} jobDescription={t('pierdomenico.job_title')} linkedinUrl={t('pierdomenico.linkedin_url')} />
            <SpeakerHero id={t('cosmin.id')} image='/speakers/2025/cosmin-marian-paduraru.jpg' name={t('cosmin.name')} talk={t('cosmin.talk')}  title={t('cosmin.talk_title')} jobDescription={t('cosmin.job_title')} linkedinUrl={t('cosmin.linkedin_url')} />
            <SpeakerHero id={t('marco.id')} image='/speakers/2025/marco-ippolito.png' name={t('marco.name')} talk={t('marco.talk')}  title={t('marco.talk_title')} jobDescription={t('marco.job_title')} linkedinUrl={t('marco.linkedin_url')} />
          </div>
        </section>
      </div>
    </>
  );
}
