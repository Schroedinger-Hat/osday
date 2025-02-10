import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";

export default function JobBoardPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Job Board</Heading>
        <Typography variant="h3">
          Take a look at the job board with all the latest job opportunities
          from our partners.
        </Typography>
      </SectionContainer>
    </>
  );
}
