import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: '404, Open Source Day 2023 - Florence',
        robots: 'noindex'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function _404() {
  const t = useTranslations('NotFound');

  return (
    <>
      <div className="container">
        <Hero
          title="404 Page"
          subtitle="You are Lost - Season Finale"
          date={{
            where: 'Anywhere',
            when: 'Anytime',
            length: 'Infinity',
            type: 'HTTP Error'
          }}
          description="It appears you may have found the secret season of the best show of this time, 404! Would you like to go back? :)"
        />
      </div>
    </>
  );
}
