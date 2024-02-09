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
            <SpeakerHero id={t('irine.id')} image='/speakers/2024/irine-kokilashvili.png' name={t('irine.name')} talk={t('irine.talk')} title={t('irine.talk_title')} jobDescription={t('irine.job_title')} githubUrl={t('irine.github_url')} linkedinUrl={t('irine.linkedin_url')} />
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
            <SpeakerHero id={t('christina.id')} image='/speakers/2024/christina-dahlen.jpg' name={t('christina.name')} talk={t('christina.talk')} title={t('christina.talk_title')} jobDescription={t('christina.job_title')} linkedinUrl={t('christina.linkedin_url')}/>
            <SpeakerHero id={t('graziano.id')} image='/speakers/2024/graziano-casto.png' name={t('graziano.name')} talk={t('graziano.talk')} title={t('graziano.talk_title')} jobDescription={t('graziano.job_title')} linkedinUrl={t('graziano.linkedin_url')} twitterUrl={t('graziano.twitter_url')}/>
            <SpeakerHero id={t('edoardo.id')} image='/speakers/2024/edoardo-dusi.jpeg' name={t('edoardo.name')} talk={t('edoardo.talk')} title={t('edoardo.talk_title')} jobDescription={t('edoardo.job_title')} linkedinUrl={t('edoardo.linkedin_url')} twitterUrl={t('edoardo.twitter_url')}/>
            <SpeakerHero id={t('paolo.id')} image='/speakers/2024/paolo-insogna.jpeg' name={t('paolo.name')} talk={t('paolo.talk')} title={t('paolo.talk_title')} jobDescription={t('paolo.job_title')} linkedinUrl={t('paolo.linkedin_url')} twitterUrl={t('paolo.twitter_url')}/>
            <SpeakerHero id={t('costa.id')} image='/speakers/2024/costa-tsaousis.jpeg' name={t('costa.name')} talk={t('costa.talk')} title={t('costa.talk_title')} jobDescription={t('costa.job_title')} linkedinUrl={t('costa.linkedin_url')} twitterUrl={t('costa.twitter_url')}/>
            <SpeakerHero id={t('stefano.id')} image='/speakers/2024/stefano-fiorucci.png' name={t('stefano.name')} talk={t('stefano.talk')} title={t('stefano.talk_title')} jobDescription={t('stefano.job_title')} linkedinUrl={t('stefano.linkedin_url')} twitterUrl={t('stefano.twitter_url')}/>
            <SpeakerHero id={t('omar.id')} image='/speakers/2024/omar-diop.jpeg' name={t('omar.name')} talk={t('omar.talk')} title={t('omar.talk_title')} jobDescription={t('omar.job_title')} linkedinUrl={t('omar.linkedin_url')} />
            <SpeakerHero id={t('napoletano.id')} image='/speakers/2024/francesco-napoletano.jpeg' name={t('napoletano.name')} talk={t('napoletano.talk')} title={t('napoletano.talk_title')} jobDescription={t('napoletano.job_title')} linkedinUrl={t('napoletano.linkedin_url')} twitterUrl={t('napoletano.twitter_url')}/>
            <SpeakerHero id={t('maciek.id')} image='/speakers/2024/maciek-palmowski.jpg' name={t('maciek.name')} talk={t('maciek.talk')} title={t('maciek.talk_title')} jobDescription={t('maciek.job_title')} linkedinUrl={t('maciek.linkedin_url')} twitterUrl={t('maciek.twitter_url')}/>
            <SpeakerHero id={t('noam.id')} image='/speakers/2024/noam-honig.jpg' name={t('noam.name')} talk={t('noam.talk')} title={t('noam.talk_title')} jobDescription={t('noam.job_title')} linkedinUrl={t('noam.linkedin_url')} twitterUrl={t('noam.twitter_url')}/>
            <SpeakerHero id={t('vipul.id')} image='/speakers/2024/vipul-siddharth.jpeg' name={t('vipul.name')} talk={t('vipul.talk')} title={t('vipul.talk_title')} jobDescription={t('vipul.job_title')} linkedinUrl={t('vipul.linkedin_url')} twitterUrl={t('vipul.twitter_url')}/>
          </div>
        </section>
      </div>
    </>
  );
}
