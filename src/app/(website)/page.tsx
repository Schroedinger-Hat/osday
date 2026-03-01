import Image from "next/image";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Paragraph } from "~/components/atoms/typography/Paragraph";
import { Typography } from "~/components/atoms/typography/Typography";
import type { Author } from "~/sanity/sanity.types";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import type { TimelineItem } from "~/components/molecules/talks-table";
import { TalksTable } from "~/components/molecules/talks-table";
import { SponsorsList } from "~/components/molecules/sponsors-list";
import Hero from "../_components/hero";
import Link from "next/link";
import auditorium from "~/assets/images/venue/auditorium.jpg";
import { SchroddySticker } from "~/components/atoms/schroddy-sticker";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { Button } from "~/components/ui/button";
import ImageGrid from "~/components/molecules/image-grid";

import tShirt from "~/assets/images/osday25/tee.png";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const speakers: Author[] = await sanityFetch(
    `*[_type == "event" && slug.current == "open-source-day-2026"][0].authors[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      firstName,
      lastName,
      pronouns,
      title,
      photo,
      biography,
      slug
    } | order(firstName asc, lastName asc)`,
    undefined,
    {
      cacheDuration: 30, // Cache for 30 seconds
      tags: [getCacheTag.speakers(), getCacheTag.event("open-source-day-2026")],
    },
  );

  const timeline: TimelineItem[] = await sanityFetch(
    `*[_type == "timeline" && year == 2026 && type == "talk"] | order(startDateTime asc) {
      _id,
      _type,
      type,
      startDateTime,
      title,
      titleShort,
      abstract,
      "author": speaker->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        firstName,
        lastName
      }
    }`,
    undefined,
    {
      cacheDuration: 30, // Cache for 30 seconds
      tags: [getCacheTag.timeline()],
    },
  );

  return (
    <main>
      <Hero />

      <SectionContainer size="tiny">
        <Heading level={2}>Missed us?</Heading>
        <Typography variant="large" className="mb-4">
          We're thrilled to announce the latest edition of Open Source Day, an
          unmissable gathering of developers, tech enthusiasts, and
          forward-thinking innovators.
          <br />
          On <b>April 24st</b>, join us at the vibrant{" "}
          <i>The Social Hub Firenze Belfiore</i> in Florence for a full day of
          talks that dive deep into today's most exciting open source trends.
          <br />
          Connect with like-minded peers, learn from top industry experts, and
          discover how open collaboration is shaping the future of technology.
          <br />
          <br />
          <b>Grab your ticket now</b> and be part of this thriving community of
          open source trailblazers!
        </Typography>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="relative order-2 aspect-square md:order-1 md:col-span-2">
            <Image
              src={tShirt}
              alt="Open Source Day t-shirt"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="order-1 space-y-4 md:order-2 md:col-span-3">
            <Heading level={2}>Grab a ticket, and a tee?</Heading>
            <Typography>
              We also have a brand-new Open Source Day tee!
              <br />
              Choose between a vibrant, colorful design or a sleek, minimalist
              style. Grab yours online or at the event, and show off your open
              source love.
              <br />
              Fun games await those who show up in their tee for a chance to win
              exclusive prizes!
            </Typography>
            <Button>
              <Link href="https://shop.schroedinger-hat.org/">Visit store</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <Heading level={2} className="italic">
              &quot;New year, new venue!&quot;
            </Heading>
            <Typography>
              Ready for our new basecamp? This year, OSDay moves to The Social
              Hub Firenze Belfiore, a nine-floor venue designed for
              collaboration, technology, and community.
              <br />
              The space includes rooftop terraces, dedicated coworking areas,
              and flexible rooms built for discussion and hands-on sessions.
              <br />
              <br />
              Full venue details are available on the{" "}
              <Link href="/venue" className="underline">
                dedicated page
              </Link>
              .
            </Typography>
          </div>
          <div className="relative aspect-video md:col-span-2">
            <Image
              src={auditorium}
              alt="Event venue"
              fill
              className="rounded-md object-cover shadow-md"
            />
          </div>
        </div>
      </SectionContainer>

      <ImageGrid title="Memories from 0sday 2025 Edition" />

      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>A jam-packed two day schedule</Heading>
        <Typography variant="large" className="mb-10">
          Filled to the brim with talks, insights, and networking opportunities.
        </Typography>

        <TalksTable talks={timeline} />
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Speakers</Heading>
        <Typography variant="large">
          Gain practical insights from seasoned professionals at leading
          companies.
        </Typography>
        {Array.isArray(speakers) && speakers.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {speakers.map((speaker) => (
              <div key={speaker._id} className="relative aspect-square">
                <Image
                  src={urlFor(speaker.photo)
                    .auto("format")
                    .width(400)
                    .height(400)
                    .url()}
                  alt={getAuthorFullName(speaker)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-6">
                  <Typography variant="medium" className="font-bold text-white">
                    {getAuthorFullName(speaker)}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <Typography variant="medium" className="max-w-md text-center">
              Speaker list coming soon. Stay tuned!
            </Typography>
          </div>
        )}
      </SectionContainer>

      <SectionContainer withBackground>
        <Heading level={2}>Sponsors</Heading>
        <Paragraph className="mb-12">
          Open Source Day is made possible by the generous support of our
          sponsors.
        </Paragraph>

        <SponsorsList />
      </SectionContainer>

      <SectionContainer className="flex justify-center">
        <SchroddySticker />
      </SectionContainer>
    </main>
  );
}
