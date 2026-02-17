import { MapPin } from "lucide-react";
import {
  EmptySectionContainer,
  SectionContainer,
} from "~/components/atoms/layout/SectionContainer";
import Link from "next/link";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { constructMetadata } from "~/lib/utils/metadata";

export const metadata = constructMetadata({
  title: "Venue",
  description: "Venue for OSDay25",
  path: "/venue",
});

export default function VenuePage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Tickets</Heading>
        <Typography variant="h3">
          The event is hosted by The Social Hub, in the heart of Florence
          <br />
        </Typography>
        <Link
          href="https://maps.app.goo.gl/adfauYT9pLbSbWm37"
          className="mt-4 flex items-start space-x-2"
        >
          <MapPin className="mt-1 h-5 w-5 text-white" />
          <Typography variant="large">
            Viale Belfiore 55, 50129, Florence, Italy
          </Typography>
        </Link>
      </SectionContainer>

      <SectionContainer>
        <div className="py-20 text-center">
          {/* @ts-expect-error - custom element from Tito */}
          <tito-widget event="schroedinger-hat/osday-2026"></tito-widget>
        </div>
      </SectionContainer>

      <EmptySectionContainer />
    </>
  );
}
