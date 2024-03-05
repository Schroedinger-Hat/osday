import TalkCard from "../components/TalkCard";
import { TTalkCard, talks2023 } from "../constants";
import Main from "../components/Main";
import SponsorTable from "../components/SponsorTable";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Main />
      <div style={{marginBottom: '4em'}} className="container-stream-link">
        <h2 className="sponsors_thanks">We are live!</h2>
        <Link href="/agenda" className="button">
          Click to discover the agenda!
        </Link>
      </div>
      <SponsorTable isVisible></SponsorTable>
      {/* <section className="talks_2023">
        <h1>Last edition talks:</h1>
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
