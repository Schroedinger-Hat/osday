import Link from "next/link";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Button } from "~/components/ui/button";
import PricingTable from "./components/pricing-table";
import { SponsorsList } from "~/components/molecules/sponsors-list";
export default function SponsorsPage() {
  return (
    <>
      <SectionContainer
        withBackground
        backgroundType="hero"
        className="space-y-4"
      >
        <Heading level={2}>Sponsors</Heading>
        <Typography variant="large">
          We are looking for companies that believe in our project, and want to
          sponsor us.
          <br />
          Are you interested ? Send us an email! :)
        </Typography>
        <div className="flex gap-4">
          <Link href="mailto:events@schoedinger-hat.org">
            <Button>Contact us</Button>
          </Link>
          <Link href="/assets/osday25-sponsorship.pdf">
            <Button>Sponsorship PDF</Button>
          </Link>
        </div>
      </SectionContainer>

      <SectionContainer>
        <PricingTable />
      </SectionContainer>

      <SectionContainer withBackground>
        <SponsorsList />
      </SectionContainer>
    </>
  );
}
