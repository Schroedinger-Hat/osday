import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import SpeakerHero from '../components/SpeakerHero';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Speakers, Open Source Day 2024 - Florence',
        description:
          'Open Source Day 2024 coming on the 24th of March 2023. Stay tuned on our social'
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
          description={t('description')}
          originals={false}
        />

        <section className="talks_2023">
          <div className="talks_container">
            <SpeakerHero id={t('matteo.id')} image='/speakers/matteo-collina.png' name={t('matteo.name')} talk={t('matteo.talk')} title={t('matteo.talk_title')} jobDescription={t('matteo.job_title')} githubUrl={t('matteo.github_url')} twitterUrl={t('matteo.twitter_url')} linkedinUrl={t('matteo.linkedin_url')} />
            <SpeakerHero id={t('francesco.id')} image='/speakers/francesco-corti.png' name={t('francesco.name')} talk={t('francesco.talk')} title={t('francesco.talk_title')} jobDescription={t('francesco.job_title')} twitterUrl={t('francesco.twitter_url')} linkedinUrl={t('francesco.linkedin_url')} />
            <SpeakerHero id={t('jason.id')} image='/speakers/jason-dellaluce.png' image_2='/speakers/michele-zuccala.jpg' name={t('jason.name')} talk={t('jason.talk')} title={t('jason.talk_title')} jobDescription={t('jason.job_title')} name_2={t('jason.name_2')} jobDescription_2={t('jason.job_title_2')} githubUrl={t('jason.github_url')} twitterUrl={t('jason.twitter_url')} linkedinUrl={t('jason.linkedin_url')} githubUrl_2={t('jason.github_url_2')} twitterUrl_2={t('jason.twitter_url_2')} linkedinUrl_2={t('jason.linkedin_url_2')}/>
            <SpeakerHero id={t('alina.id')} image='/speakers/alina-dima.png' name={t('alina.name')} talk={t('alina.talk')} title={t('alina.talk_title')} jobDescription={t('alina.job_title')} githubUrl={t('alina.github_url')} twitterUrl={t('alina.twitter_url')} linkedinUrl={t('alina.linkedin_url')} />
            <SpeakerHero id={t('rafael.id')} image='/speakers/rafael.jpg' image_2='/speakers/michele-riva.jpeg' name={t('rafael.name')} talk={t('rafael.talk')} title={t('rafael.talk_title')} jobDescription={t('rafael.job_title')} name_2={t('rafael.name_2')} jobDescription_2={t('rafael.job_title_2')} githubUrl={t('rafael.github_url')} twitterUrl={t('rafael.twitter_url')} linkedinUrl={t('rafael.linkedin_url')} githubUrl_2={t('rafael.github_url_2')} twitterUrl_2={t('rafael.twitter_url_2')} linkedinUrl_2={t('rafael.linkedin_url_2')}/>
            <SpeakerHero id={t('filip.id')} image='/speakers/filip.png' name={t('filip.name')} talk={t('filip.talk')} title={t('filip.talk_title')} jobDescription={t('filip.job_title')} linkedinUrl={t('filip.linkedin_url')} />
            <SpeakerHero id={t('serena.id')} image='/speakers/serena-sensini.jpg' name={t('serena.name')} talk={t('serena.talk')} title={t('serena.talk_title')} jobDescription={t('serena.job_title')} githubUrl={t('serena.github_url')} twitterUrl={t('serena.twitter_url')} linkedinUrl={t('serena.linkedin_url')} />
            <SpeakerHero id={t('liran.id')} image='/speakers/liran-tal.png' name={t('liran.name')} talk={t('liran.talk')} title={t('liran.talk_title')} jobDescription={t('liran.job_title')} githubUrl={t('liran.github_url')} twitterUrl={t('liran.twitter_url')} linkedinUrl={t('liran.linkedin_url')} />
            <SpeakerHero id={t('federico.id')} image='/speakers/federico-terzi.png' name={t('federico.name')} talk={t('federico.talk')} title={t('federico.talk_title')} jobDescription={t('federico.job_title')} githubUrl={t('federico.github_url')} twitterUrl={t('federico.twitter_url')} linkedinUrl={t('federico.linkedin_url')} />
            <SpeakerHero id={t('paolinelli.id')} image='/speakers/federico-paolinelli.jpg' name={t('paolinelli.name')} talk={t('paolinelli.talk')} title={t('paolinelli.talk_title')} jobDescription={t('paolinelli.job_title')} githubUrl={t('paolinelli.github_url')} twitterUrl={t('paolinelli.twitter_url')} linkedinUrl={t('paolinelli.linkedin_url')} />
          </div>
        </section>
      </div>
    </>
  );
}
