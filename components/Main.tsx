import { previousTalks, TTalkCard } from "../constants";
import Hero from "./Hero";
import { useTranslations } from "next-intl";

export default function Main() {
  const t = useTranslations("Main");
  const tLanding = useTranslations("Landing");

  return (
    <div className="container">
      <Hero
        description={t("description_1")}
        description_2={t("description_2")}
        date={{
          when: "7th and 8th of March",
          where: "Florence",
          length: "2 Days",
          type: "Conf",
        }}
        mainCta={{
          text: tLanding("support_us"),
          link: "/sponsor",
        }}
        secondaryCta={{
          text: tLanding("newsletter"),
          link: "/newsletter",
        }}
      />
    </div>
  );
}
