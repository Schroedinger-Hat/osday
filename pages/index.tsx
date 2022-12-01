import Main from '../components/Main';
import SponsorTable from '../components/SponsorTable';

export default function Home() {
  return (
    <>
      <Main />
      <SponsorTable />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}
