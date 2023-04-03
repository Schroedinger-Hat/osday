import { t } from "i18next";
import Main from "../components/Main";
import SpeakerHero from "../components/SpeakerHero";
import TextSection from "../components/TextSection";
import TalkCard from "../components/TalkCard";
import { TTalkCard, talks2023 } from "../constants";

export default function Home() {
  return (
    <>
      <Main />
      <section className="talks_2023">
        <div className="talks_container">
          {talks2023.map((talk: TTalkCard) => {
              return <TalkCard key={talk.id} {...talk} />;
            })}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: "Open Source Day 2023 - Florence",
        description:
          "Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}
