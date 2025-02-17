import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { FaqBlock } from "~/components/organisms/faq-block";
import { constructMetadata } from "~/lib/utils/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = constructMetadata({
  title: "FAQs",
  description: "FAQs for OSDay25",
});

export default function FAQsPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>FAQs</Heading>
        <Typography variant="h3">
          You may have some questions about the event. Here are the answers to
          the most common ones.
        </Typography>
      </SectionContainer>

      <SectionContainer padding="header">
        <FaqBlock groupKey="osday25" title="" description="" />
      </SectionContainer>
    </>
  );
}
