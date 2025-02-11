import {
  EmptySectionContainer,
  SectionContainer,
} from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import Image from "next/image";
import Link from "next/link";

import osday24 from "~/assets/images/previous-editions/osday24.png";
import osday23 from "~/assets/images/previous-editions/osday23.jpg";
import osday21 from "~/assets/images/previous-editions/osday21.jpg";

export default function PreviousEventsPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Previous Events</Heading>
        <Typography variant="h3">
          Here are the previous editions of Open Source Day.
        </Typography>
      </SectionContainer>

      {/* OSDay 24, OSDay 23, OSDay 21 */}
      <SectionContainer padding="header">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link href="https://2024.osday.dev">
            <div className="aspect-video overflow-hidden rounded-lg shadow-md">
              <Image src={osday24} alt="Event 1" />
            </div>
            <Heading level={3}>OSDay 24</Heading>
          </Link>
          <Link href="https://2023.osday.dev">
            <div className="aspect-video overflow-hidden rounded-lg shadow-md">
              <Image src={osday23} alt="Event 2" />
            </div>
            <Heading level={3}>OSDay 23</Heading>
          </Link>
          <Link href="https://osday.dev/edition2021">
            <div className="aspect-video overflow-hidden rounded-lg shadow-md">
              <Image src={osday21} alt="Event 3" />
            </div>
            <Heading level={3}>OSDay 21</Heading>
          </Link>
        </div>
      </SectionContainer>
      <EmptySectionContainer />
    </>
  );
}
