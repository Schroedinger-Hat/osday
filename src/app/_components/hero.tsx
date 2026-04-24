import { Heading } from "~/components/atoms/typography/Heading";
import { cn } from "~/lib/utils";
import logo from "~/assets/images/logo.svg";
import Image from "next/image";
import { Typography } from "~/components/atoms/typography/Typography";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import Link from "next/link";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { urlFor } from "~/sanity/lib/image";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author } from "~/sanity/sanity.types";
import { Button } from "~/components/ui/button";

import eventRecap2025 from "~/assets/images/osday25/event-recap-2025.jpg";
import defaultEventImage from "~/assets/images/venue/auditorium.jpg";

const stats = [
  { label: "Speakers", value: "16" },
  { label: "When", value: "24th & 25th of April" },
  { label: "Venue", value: "The Social Hub Belfiore" },
  { label: "Location", value: "Florence, Italy" },
];

type TimelineItem = {
  _id: string;
  type: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  titleShort: string;
  abstract: any;
  backgroundImage: any;
  author: Author;
};

// Mock checks - we can expand these later with real conditions
const useEventChecks = () => {
  // Mock check that returns true
  const isDayOfEvent =
    new Date().toDateString() === new Date("2026-04-24").toDateString();
  const isAfterEvent = new Date() > new Date("2026-04-24T18:00:00");

  return {
    shouldHideStats: isDayOfEvent || isAfterEvent,
    isDayOfEvent,
    isAfterEvent,
  };
};

export default function Hero() {
  const { shouldHideStats, isAfterEvent } = useEventChecks();

  return (
    <>
      <SectionContainer padding="none" size="full">
        <div className="min-h-[80vh] w-full bg-[#C4493A] px-4 md:px-6 lg:px-8 2xl:px-0">
          <div className="container mx-auto flex max-w-6xl flex-col py-8 md:py-20">
            {/* Name */}
            <div className="mb-16 flex justify-center md:justify-start">
              <Image
                src={logo}
                alt="Open Source Day"
                width={100}
                height={200}
              />
            </div>

            <Heading level={1} huge>
              FOR THOSE WHO LOVE
              <br />
              OPEN SOURCE
            </Heading>

            {/* Modified stats section with margin for overlap */}
            <div>
              {!shouldHideStats && (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className={cn("flex flex-col")}>
                      <Typography
                        variant="small"
                        className="mb-0 font-bold uppercase text-background md:mb-0"
                      >
                        {stat.label}
                      </Typography>
                      <Typography variant="h3" className="font-semibold">
                        {stat.value}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
      {/* {shouldHideStats && (
        <div className="mx-auto -mt-36 max-w-6xl px-4 md:px-6 lg:px-8 2xl:px-0">
          <div className="rounded-md bg-slate-100 p-8 shadow-lg md:p-12">
            {isAfterEvent ? <AfterEvent /> : <DayOfEvent />}
          </div>
        </div>
      )} */}
    </>
  );
}

async function DayOfEvent() {
  const now = new Date();
  // Get only time parts for comparison
  const currentTime = Number(now.getHours()) * 60 + Number(now.getMinutes());

  const timeline: TimelineItem[] = await sanityFetch(
    `*[_type == "timeline" && year == 2026] | order(startDateTime asc) {
      _id,
      type,
      startDateTime,
      endDateTime,
      title,
      titleShort,
      abstract,
      backgroundImage,
      "author": speaker->{
        _id,
        firstName,
        lastName
      }
    }`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.timeline()],
    },
  );

  // First check for events with defined end times
  const currentEvent = timeline.find((event) => {
    if (!event.endDateTime) return false;

    const startDate = new Date(event.startDateTime);
    const startTime =
      Number(startDate.getHours()) * 60 + Number(startDate.getMinutes());
    const endDate = new Date(event.endDateTime);
    const endTime =
      Number(endDate.getHours()) * 60 + Number(endDate.getMinutes());

    return startTime <= currentTime && currentTime <= endTime;
  });

  // If no event with end time is found, find the most recent event
  if (!currentEvent) {
    const eventsBeforeNow = timeline
      .filter((event) => {
        const startDate = new Date(event.startDateTime);
        const startTime =
          Number(startDate.getHours()) * 60 + Number(startDate.getMinutes());
        return startTime <= currentTime;
      })
      .sort((a, b) => {
        const aTime = new Date(a.startDateTime);
        const bTime = new Date(b.startDateTime);
        return bTime.getTime() - aTime.getTime(); // Sort in descending order
      });

    const mostRecentEvent = eventsBeforeNow[0];

    if (!mostRecentEvent) {
      return (
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-video shadow-md">
            <Image
              src={defaultEventImage}
              alt="Event about to start"
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Typography variant="h3" className="text-primary">
                We&apos;re about to start!
              </Typography>
              <Typography className="text-gray-600">
                Stay tuned, the event will begin shortly. Make sure you&apos;re
                ready for an amazing day of open source content!
              </Typography>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-video shadow-md">
          <Image
            src={
              mostRecentEvent.backgroundImage
                ? urlFor(mostRecentEvent.backgroundImage)
                    .width(800)
                    .height(600)
                    .url()
                : defaultEventImage
            }
            alt={mostRecentEvent.title}
            fill
            className="rounded-md object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="">
            <Typography variant="small" className="mb-2 font-bold uppercase">
              Current Talk
            </Typography>
            <Heading level={3}>{mostRecentEvent.title}</Heading>
            {mostRecentEvent.author && (
              <Typography className="text-gray-600">
                with {getAuthorFullName(mostRecentEvent.author)}
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="relative aspect-video shadow-md">
        <Image
          src={
            currentEvent.backgroundImage
              ? urlFor(currentEvent.backgroundImage)
                  .width(800)
                  .height(600)
                  .url()
              : defaultEventImage
          }
          alt={currentEvent.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Typography variant="small" className="mb-2 font-bold uppercase">
            Current Talk
          </Typography>
          <Heading level={3}>{currentEvent.title}</Heading>
          {currentEvent.author && (
            <Typography className="text-gray-600">
              with {getAuthorFullName(currentEvent.author)}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

function AfterEvent() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="relative aspect-video shadow-md">
        <Image
          src={eventRecap2025}
          alt="OSDAY26 Event Recap"
          fill
          className="rounded-md object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Typography variant="h3" className="text-primary">
            That was a blast, thanks for coming!
          </Typography>
          <Typography className="text-gray-600">
            We&apos;ll see you next year! In the meantime, we&apos;d love to
            hear your thoughts about the event.
          </Typography>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScTCqbkSk4OQOVppSJh9cgJGSB624exJaDqskDZk9SSAFb3FQ/viewform?usp=header">
            <Button variant="default">Leave Feedback</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
