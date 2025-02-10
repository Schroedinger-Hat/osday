import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";

export default function VolunteersPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Volunteers</Heading>
        <Typography variant="h3">
          We are always looking for volunteers to help us make Open Source Day
          possible.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        TODO: Una pagina, magari prendendo spunto da Contribute as Individual
        del sito principale
      </SectionContainer>
    </>
  );
}
