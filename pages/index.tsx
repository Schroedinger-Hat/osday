import { t } from "i18next";
import Main from "../components/Main";
import SpeakerHero from "../components/SpeakerHero";
import TextSection from "../components/TextSection";
import TalkCard from "../components/TalkCard";
import { TTalkCard, talks2023 } from "../constants";
import Link from "next/link";

export default function Home() {
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
        <h3>We are coming, again. Stay tuned.</h3>
        <Link className='button' href={'/sponsor'}>Support OSDay24</Link>
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
