import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import TextSection from '../components/TextSection';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'DEI, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

const phrases = {
  heading1:
    "The Schrodinger's Hat family strongly believes in the value of diversity, inclusion, accessibility, friendship and respect. Without these core values we wouldn't be able to inspire ourselves and the community members everyday.",
  heading2:
    'We have a strong commitment towards these social impacting values and we strive to make our meetups, conferences and community efforts the most inclusive.\nWe are committed to raise awareness and be helpful towards everyone so if you have any issues or would like to participate but you feel that, for any reasons, you are not enabled to, please send us a message over schrodinger.hat.show@gmail.com',
};

export default function DEI() {
  const t = useTranslations('DEI');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
        />
        <TextSection
          heading1={phrases.heading1}
          heading2={phrases.heading2}
        />
      </div>
    </>
  );
}
