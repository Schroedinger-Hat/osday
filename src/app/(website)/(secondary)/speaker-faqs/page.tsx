import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { FaqBlock } from "~/components/organisms/faq-block";

export default function SpeakerFAQsPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Speaker FAQs</Heading>
        <Typography variant="h3">
          If you are a speaker, you may have some questions about the event.
          Here are the answers to the most common ones.
        </Typography>
      </SectionContainer>

      <SectionContainer padding="header">
        <FaqBlock groupKey="osday25-speaker" title="" description="" />
      </SectionContainer>
    </>
  );
}
