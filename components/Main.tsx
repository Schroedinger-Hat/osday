import { previousTalks, TTalkCard } from "../constants";
import Hero from "./Hero";
import { useTranslations } from "next-intl";

export default function Main() {
  const t = useTranslations("Main");

  return (
    <div className="container">
      <Hero
        description={t("description_1")}
        description_2={t("description_2")}
        date={{
          when: "March 2025",
          where: "Florence",
        }}
        secondaryCta={{
          text: t("email"),
          link: "mailto:events@schroedinger-hat.org",
        }}
        showTicketBtn
        showNewsletter
      />
    </div>
  );
}
