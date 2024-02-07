import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import SpeakerHero from '../components/SpeakerHero';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Speakers, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social'
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

        <section className="talks_2023">
          <div className="talks_container">
            <SpeakerHero id={t('pj.id')} image='/speakers/2024/pj-hagerty.jpeg' name={t('pj.name')} talk={t('pj.talk')} title={t('pj.talk_title')} jobDescription={t('pj.job_title')} twitterUrl={t('pj.twitter_url')} linkedinUrl={t('pj.linkedin_url')} />
            <SpeakerHero id={t('irine.id')} image='/speakers/2024/irine-kokilashvili.png' image_2='/speakers/2024/leo-vernisse.jpeg' name={t('irine.name')} talk={t('irine.talk')} title={t('irine.talk_title')} jobDescription={t('irine.job_title')} name_2={t('irine.name_2')} jobDescription_2={t('irine.job_title_2')} githubUrl={t('irine.github_url')} linkedinUrl={t('irine.linkedin_url')} linkedinUrl_2={t('irine.linkedin_url_2')}/>
            <SpeakerHero id={t('iulia.id')} image='/speakers/2024/iulia-feroli.jpeg' name={t('iulia.name')} talk={t('iulia.talk')} title={t('iulia.talk_title')} jobDescription={t('iulia.job_title')} linkedinUrl={t('iulia.linkedin_url')} />
            <SpeakerHero id={t('fabien.id')} image='/speakers/2024/fabien-vauchelles.jpeg' name={t('fabien.name')} talk={t('fabien.talk')} title={t('fabien.talk_title')} jobDescription={t('fabien.job_title')} linkedinUrl={t('fabien.linkedin_url')} twitterUrl={t('fabien.twitter_url')}/>
            <SpeakerHero id={t('samantha.id')} image='/speakers/2024/samantha-holstine.jpeg' name={t('samantha.name')} talk={t('samantha.talk')} title={t('samantha.talk_title')} jobDescription={t('samantha.job_title')} linkedinUrl={t('samantha.linkedin_url')} />
            <SpeakerHero id={t('abdel.id')} image='/speakers/2024/abdel-sghiouar.jpeg' name={t('abdel.name')} talk={t('abdel.talk')} title={t('abdel.talk_title')} jobDescription={t('abdel.job_title')} linkedinUrl={t('abdel.linkedin_url')} twitterUrl={t('abdel.twitter_url')}/>
            <SpeakerHero id={t('francesco.id')} image='/speakers/2024/francesco-corti.png' name={t('francesco.name')} talk={t('francesco.talk')} title={t('francesco.talk_title')} jobDescription={t('francesco.job_title')} linkedinUrl={t('francesco.linkedin_url')} />
            <SpeakerHero id={t('nathan.id')} image='/speakers/2024/nathan-marrs.png' name={t('nathan.name')} talk={t('nathan.talk')} title={t('nathan.talk_title')} jobDescription={t('nathan.job_title')} linkedinUrl={t('nathan.linkedin_url')} twitterUrl={t('nathan.twitter_url')}/>
            <SpeakerHero id={t('valeria.id')} image='/speakers/2024/valeria-salis.jpeg' name={t('valeria.name')} talk={t('valeria.talk')} title={t('valeria.talk_title')} jobDescription={t('valeria.job_title')} linkedinUrl={t('valeria.linkedin_url')} />
            <SpeakerHero id={t('santosh.id')} image='/speakers/2024/santosh-yadav.jpeg' name={t('santosh.name')} talk={t('santosh.talk')} title={t('santosh.talk_title')} jobDescription={t('santosh.job_title')} twitterUrl={t('santosh.twitter_url')} />
            <SpeakerHero id={t('federico.id')} image='/speakers/2024/federico-terzi.png' name={t('federico.name')} talk={t('federico.talk')} title={t('federico.talk_title')} jobDescription={t('federico.job_title')} linkedinUrl={t('federico.linkedin_url')} twitterUrl={t('federico.twitter_url')}/>
            <SpeakerHero id={t('sabrina.id')} image='/speakers/2024/sabrina-mazzola.jpeg' name={t('sabrina.name')} talk={t('sabrina.talk')} title={t('sabrina.talk_title')} jobDescription={t('sabrina.job_title')} linkedinUrl={t('sabrina.linkedin_url')} />
            <SpeakerHero id={t('andrey.id')} image='/speakers/2024/andrey-sitnik.jpeg' name={t('andrey.name')} talk={t('andrey.talk')} title={t('andrey.talk_title')} jobDescription={t('andrey.job_title')} linkedinUrl={t('andrey.linkedin_url')} twitterUrl={t('andrey.twitter_url')}/>
            <SpeakerHero id={t('mario.id')} image='/speakers/2024/mario-fiore-vitale.jpeg' name={t('mario.name')} talk={t('mario.talk')} title={t('mario.talk_title')} jobDescription={t('mario.job_title')} linkedinUrl={t('mario.linkedin_url')} twitterUrl={t('mario.twitter_url')}/>
            <SpeakerHero id={t('roman.id')} image='/speakers/2024/roman-khavronenko.jpeg' name={t('roman.name')} talk={t('roman.talk')} title={t('roman.talk_title')} jobDescription={t('roman.job_title')} linkedinUrl={t('roman.linkedin_url')} twitterUrl={t('roman.twitter_url')}/>
            <SpeakerHero id={t('alessandro.id')} image='/speakers/2024/alessandro-albano.png' name={t('alessandro.name')} talk={t('alessandro.talk')} title={t('alessandro.talk_title')} jobDescription={t('alessandro.job_title')} linkedinUrl={t('alessandro.linkedin_url')}/>
            <SpeakerHero id={t('sasha.id')} image='/speakers/2024/sasha-denisov.jpeg' name={t('sasha.name')} talk={t('sasha.talk')} title={t('sasha.talk_title')} jobDescription={t('sasha.job_title')} linkedinUrl={t('sasha.linkedin_url')} twitterUrl={t('sasha.twitter_url')}/>
            <SpeakerHero id={t('arafat.id')} image='/speakers/2024/arafat-khan.jpeg' name={t('arafat.name')} talk={t('arafat.talk')} title={t('arafat.talk_title')} jobDescription={t('arafat.job_title')} twitterUrl={t('arafat.twitter_url')}/>
            <SpeakerHero id={t('sohan.id')} image='/speakers/2024/sohan-maheshwar.jpeg' name={t('sohan.name')} talk={t('sohan.talk')} title={t('sohan.talk_title')} jobDescription={t('sohan.job_title')} linkedinUrl={t('sohan.linkedin_url')} twitterUrl={t('sohan.twitter_url')}/>
            <SpeakerHero id={t('noah.id')} image='/speakers/2024/noah-jelich.png' name={t('noah.name')} talk={t('noah.talk')} title={t('noah.talk_title')} jobDescription={t('noah.job_title')} linkedinUrl={t('noah.linkedin_url')} twitterUrl={t('noah.twitter_url')}/>
          </div>
        </section>
      </div>
    </>
  );
}
