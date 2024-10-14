import Hero from "../components/Hero";
import { useTranslations } from "next-intl";
import TextSection from "../components/TextSection";

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: "DEI, Open Source Day 2025 - Florence",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}

const phrases = {
  heading1:
    "The Schroedinger's Hat family strongly believes in the value of diversity, inclusion, accessibility, friendship and respect. Without these core values we wouldn't be able to inspire ourselves and the community members everyday.",
  heading2:
    "We have a strong commitment towards these social impacting values and we strive to make our meetups, conferences and community efforts the most inclusive.\nWe are committed to raise awareness and be helpful towards everyone so if you have any issues or would like to participate but you feel that, for any reasons, you are not enabled to, please send us a message over schroedinger.hat.show@gmail.com",
  text: "As an organization, we believe that diversity and inclusion are crucial to fostering a safe and welcoming environment for all individuals. We are committed to creating an environment that respects and values the unique experiences and perspectives of all individuals, regardless of their race, ethnicity, national origin, gender, gender identity and expression, sexual orientation, age, ability, religion, or socioeconomic status.\nWe strive to create spaces where all individuals feel comfortable and empowered to fully participate and share their ideas. We recognize that this may require providing accommodations for individuals with disabilities or other special needs.\nWe are committed to actively promoting diversity and inclusion in all aspects of our events, including speaker selection, panel discussions, and networking opportunities. We also recognize that unconscious bias can impact these processes and will take steps to address and mitigate it.\nWe expect all attendees and participants at our events to respect and value the diversity of our community. Any form of discrimination or harassment will not be tolerated and will be addressed promptly and appropriately.\nWe are committed to ongoing learning and improvement in the area of diversity and inclusion, and welcome feedback from our community on how we can better serve and support all individuals.",
};

export default function DEI() {
  const t = useTranslations("DEI");

  return (
    <>
      <div className="container">
        <Hero
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("description")}
          originals={false}
        />
        <TextSection
          heading1={phrases.heading1}
          heading2={phrases.heading2}
          text={phrases.text}
        />
      </div>
    </>
  );
}
