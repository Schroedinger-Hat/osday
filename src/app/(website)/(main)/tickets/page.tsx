import Image from "next/image";
import Link from "next/link";
import {
  EmptySectionContainer,
  SectionContainer,
} from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { constructMetadata } from "~/lib/utils/metadata";
import type { Author } from "~/sanity/sanity.types";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";

export const metadata = constructMetadata({
  title: "Tickets",
  description: "Tickets for OSDAY26",
  path: "/tickets",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface TicketsPageProps {
  searchParams: Promise<{ coupon?: string | string[] }>;
}

function resolveCouponParam(
  coupon: string | string[] | undefined,
): string | undefined {
  if (coupon === undefined) return undefined;
  const raw = Array.isArray(coupon) ? coupon[0] : coupon;
  const trimmed = raw?.trim() ?? "";
  if (trimmed.length === 0) return undefined;
  return trimmed;
}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  await searchParams;

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
      cacheDuration: 30,
      tags: [getCacheTag.speakers(), getCacheTag.event("open-source-day-2026")],
    },
  );

  return (
    <>
      {/* Hero */}
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Tickets</Heading>
        <Typography variant="large">
          Join OSDAY26 for a full day of open source stories, real-world
          engineering, and community connections.
        </Typography>
      </SectionContainer>

      {/* Venue (dialed down) */}
      <SectionContainer>
        <div className="space-y-4">
          <Heading level={3}>Where we&apos;ll meet</Heading>
          <Typography>
            OSDAY26 takes place at <b>The Social Hub Firenze Belfiore</b>, a
            modern venue close to the city center of Florence. It&apos;s a
            nine-floor space designed for collaboration, with areas dedicated to
            events, coworking, and community.
          </Typography>
          <Typography>
            You&apos;ll find spaces for focused sessions, informal chats, and
            hallway tracks throughout the day. For full details on how to reach
            the venue, parking, and nearby services, check the{" "}
            <Link href="/venue" className="underline">
              venue page
            </Link>
            .
          </Typography>
        </div>
      </SectionContainer>

      {/* Speakers grid */}
      <SectionContainer padding="little">
        <Heading level={3}>What you&apos;ll hear</Heading>
        <Typography variant="large">
          Hear stories and experiences directly from industry leaders,
          maintainers, and practitioners across the open source ecosystem.
        </Typography>

        {Array.isArray(speakers) && speakers.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-5">
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

      <EmptySectionContainer />
    </>
  );
}
