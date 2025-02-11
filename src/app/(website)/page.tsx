import Image from "next/image";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Paragraph } from "~/components/atoms/typography/Paragraph";
import { Typography } from "~/components/atoms/typography/Typography";
import type { Author } from "~/sanity/sanity.types";
import { sanityClient } from "~/sanity/lib/client";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import type { TimelineItem } from "~/components/molecules/talks-table";
import { TalksTable } from "~/components/molecules/talks-table";
import { SponsorsList } from "~/components/molecules/sponsors-list";
import Hero from "../_components/hero";
import Link from "next/link";
import auditorium from "~/assets/images/venue/auditorium.jpg";
import { SchroddySticker } from "~/components/atoms/schroddy-sticker";

export default async function HomePage() {
  const speakers: Author[] = await sanityClient.fetch(`
    *[_type == "event" && slug.current == "open-source-day-2025"][0].authors[]->{
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
    } | order(firstName asc, lastName asc)
  `);

  const timeline: TimelineItem[] = await sanityClient.fetch(`
    *[_type == "timeline" && type == "talk"] | order(startDateTime asc) {
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
    }
  `);

  return (
    <main>
      <SectionContainer padding="none" size="full">
        <Hero />
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Missed us?</Heading>
        <Typography variant="large" className="mb-4">
          We are back with a new edition of Open Source Day. TODO: Add text
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>A jam-packed one day schedule</Heading>
        <Typography variant="large" className="mb-4">
          Filled to the brim with talks, insights, and networking opportunities.
        </Typography>

        <TalksTable talks={timeline} />
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <Heading level={2} className="italic">
              &quot;Stesso posto stesso bar&quot;
            </Heading>
            <Typography>
              Like the previous year OSDay will be held in the comfy and
              welcoming walls of Nana Bianca, in Florence.
              <br />
              You can find all the informations about the venue in the{" "}
              <Link href="/venue" className="underline">
                dedicated page
              </Link>
            </Typography>
          </div>
          <div className="relative aspect-video md:col-span-2">
            <Image
              src={auditorium}
              alt="Nana Bianca venue"
              fill
              className="rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Speakers</Heading>
        <Typography variant="large">
          Gain practical insights from seasoned professionals at leading
          companies.
        </Typography>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <div key={speaker._id} className="flex flex-col items-center">
              <Image
                src={urlFor(speaker.photo)
                  .auto("format")
                  .width(192)
                  .height(192)
                  .url()}
                alt={getAuthorFullName(speaker)}
                width={192}
                height={192}
                className="mb-1 rounded-md object-cover shadow-md"
              />
              <span className="text-lg font-medium">
                {getAuthorFullName(speaker)}
              </span>
            </div>
          ))}
        </div>
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
