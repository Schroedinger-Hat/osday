import Link from "next/link";
import { useTranslations } from "next-intl";
import Main from "../components/Main";

export default function Home() {
  const t = useTranslations("Landing");
  return (
    <>
      <Main />
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
