import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { FaqBlock } from "~/components/organisms/faq-block";

export default function SpeakerFAQsPage() {
  return (
    <SectionContainer padding="header">
      <FaqBlock
        groupKey="osday25-speaker"
        title="Speaker FAQs"
        description=""
      />
    </SectionContainer>
  );
}
