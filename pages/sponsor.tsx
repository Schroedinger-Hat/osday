import Hero from "../components/Hero";
import SponsorshipTier from "../components/SponsorshipTier";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: "Sponsor, Open Source Day 2023 - Florence",
        description: "Open Source Day 2023 coming soon on March 2023. Stay tuned on our social",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}

export default function Sponsor() {
  const t = useTranslations("Sponsor");

  return (
    <>
      <div className="container">
        <Hero
          title={t("title")}
          subtitle={t("subtitle")}
          date={{
            where: t("where"),
            when: t("when"),
            length: t("length"),
            type: t("type"),
          }}
          description={t("description")}
          originals={false}
        />
        <section className="sponsors_2022">
          <SponsorshipTier
            title={t("platinum")}
            card_color="platinum"
            price={t("platinum_price")}
            offer={t("platinum_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Platinum Tier">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
          <SponsorshipTier
            title={t("diamond")}
            card_color="diamond"
            price={t("diamond_price")}
            offer={t("diamond_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Diamond Tier">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
          <SponsorshipTier
            title={t("gold")}
            card_color="gold"
            price={t("gold_price")}
            offer={t("gold_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Gold Tier">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
          <SponsorshipTier
            title={t("silver")}
            card_color="silver"
            price={t("silver_price")}
            offer={t("silver_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Silver Tier">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
          <SponsorshipTier
            title={t("community")}
            card_color="community"
            offer={t("community_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Community Partner">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
          <SponsorshipTier
            title={t("media")}
            card_color="media"
            offer={t("media_offer")}
            emailLink={t.rich("send_email", {
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Media Partner">
                  <u>{children}</u>
                </a>
              ),
            })}
          />
        </section>

        <section className="after_main">
          <h2>
            {t.rich("heading_sponsor", {
              link: (children: ReactNode) => <a href="https://opencollective.com/schrodinger-hat">{children}</a>,
              email: (children: ReactNode) => (
                <a href="mailto:osday@schrodinger-hat.it?subject=OSDay 2023, Media Partner">
                  <u>{children}</u>
                </a>
              ),
            })}
          </h2>
        </section>
      </div>
    </>
  );
}
