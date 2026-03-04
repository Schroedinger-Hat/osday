import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import type { TimelineItem } from "~/components/molecules/talks-table";
import { ScheduleView } from "~/components/molecules/schedule-view";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { constructMetadata } from "~/lib/utils/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = constructMetadata({
  title: "Schedule",
  description: "Schedule for OSDAY26",
  path: "/schedule",
});

export default async function SchedulePage() {
  const timeline: TimelineItem[] = await sanityFetch(
    `*[_type == "timeline" && year == 2026] | order(startDateTime asc) {
      _id,
      _type,
      type,
      track,
      startDateTime,
      endDateTime,
      title,
      titleShort,
      abstract,
      backgroundImage,
      "author": speaker->{
        _id,
        firstName,
        lastName,
        photo
      }
    }`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.timeline()],
    },
  );

  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Schedule</Heading>
        <Typography variant="large" className="mb-12">
          Here is the schedule for the event.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <ScheduleView items={timeline} />
      </SectionContainer>
    </>
  );
}
