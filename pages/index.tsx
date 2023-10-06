import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Landing');
  return (
    <>
      <div className="title-box" style={{
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'calc(100vh - 550px)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto',
        }}>
          <h1>
            Schrödinger Hat <span>Originals</span>
          </h1>

        <h2>Open Source Day 2024</h2>
        <h3>{t('title')}</h3>
        <Link className='button' href={'/sponsor'}>{t('support_us')}</Link>
        </div>
    </div>
      {/* <section className="talks_2023">
        <div className="talks_container">
          {talks2023.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
        </div>
      </section> */}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: "Open Source Day 2024 - Florence",
        description:
          "Open Source Day 2024. We are coming, again. Stay tuned on our social",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}
