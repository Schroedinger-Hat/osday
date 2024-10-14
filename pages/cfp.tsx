import CfpCard from "../components/CfpCard";
import Hero from "../components/Hero";
import { cfpTypes } from "../constants";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: "CFP, Open Source Day 2025 - Florence",
        description:
          "Open Source Day 2025 coming on the 7th and 8th of March 2025. Stay tuned on our social",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}

export default function CFP() {
  const t = useTranslations("Cfp");
  return (
    <>
      <div className="container">
        <Hero
          title="Open Source Day 2025"
          subtitle="Call for papers"
          description={t("description")}
          originals={false}
          mainCta={{
            text: "Call for papers",
            link: "https://sessionize.com/opensourceday24",
          }}
          secondaryCta={{
            text: t("secondarycta_text"),
            link: "mailto:events@schroedinger-hat.org",
          }}
          showTicketBtn
        />

        <section className="after_main">
          <h2>{t("description_1")}</h2>
          <h3>
            {t("description_2")}{" "}
            <a href="https://schroedinger-hat.org/">Schroedingers Hat</a>
          </h3>
          <div className="after_main_container">
            {cfpTypes.map((type) => {
              return <CfpCard key={type.id} {...type} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
