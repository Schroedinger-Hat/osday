import Image from "next/image";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Paragraph } from "~/components/atoms/typography/Paragraph";
import { Typography } from "~/components/atoms/typography/Typography";
import schroddySticker from "~/assets/images/schroddy-sticker.png";
import type { Partner, Author } from "~/sanity/sanity.types";
import { sanityClient } from "~/sanity/lib/client";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import type { TimelineItem } from "~/components/molecules/talks-table";
import { TalksTable } from "~/components/molecules/talks-table";
import Hero from "../_components/hero";
import Link from "next/link";

export default async function HomePage() {
  const diamondSponsors: Partner[] = await sanityClient.fetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == true && businessTier == "diamond"] | order(orderRank asc)`,
  );

  const goldSponsors: Partner[] = await sanityClient.fetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == true && businessTier == "gold"] | order(orderRank asc)`,
  );

  const communityPartners: Partner[] = await sanityClient.fetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == false && nonBusinessType == "community"] | order(orderRank asc)`,
  );

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
          We are back with a new edition of Open Source Day.
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
        <Heading level={2} className="italic">
          &quot;Stesso posto stesso bar&quot;
        </Heading>
        <Typography>
          Like the previous year OSDay will be held in the comfy and welcoming
          walls of Nana Bianca, in Florence.
          <br />
          You can find all the informations about the venue in the{" "}
          <Link href="/venue" className="underline">
            dedicated page
          </Link>
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Speakers</Heading>
        <Typography variant="h3">
          Gain practical insights from seasoned professionals at leading
          companies.
        </Typography>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <div key={speaker._id} className="flex flex-col items-center">
              <Image
                src={urlFor(speaker.photo)
                  .auto("format")
                  .width(140)
                  .height(140)
                  .url()}
                alt={getAuthorFullName(speaker)}
                width={140}
                height={140}
                className="mb-4 rounded-lg object-cover"
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

        <div className="flex flex-col gap-8">
          {diamondSponsors.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-2">
                Diamond Sponsors
              </Typography>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {diamondSponsors.map((sponsor) => (
                  <Link
                    href={sponsor.website ?? "#"}
                    key={sponsor._id}
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={urlFor(sponsor.image).width(308).height(128).url()}
                      alt={sponsor.name ?? ""}
                      width={308}
                      height={128}
                      className="h-auto w-full object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {goldSponsors.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-2">
                Gold Sponsors
              </Typography>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {goldSponsors.map((sponsor) => (
                  <Link
                    href={sponsor.website ?? "#"}
                    key={sponsor._id}
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={urlFor(sponsor.image).width(308).height(128).url()}
                      alt={sponsor.name ?? ""}
                      width={308}
                      height={128}
                      className="h-auto w-full object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {communityPartners.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-2">
                Community Partners
              </Typography>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {communityPartners.map((partner) => (
                  <Link
                    href={partner.website ?? "#"}
                    key={partner._id}
                    className="flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={urlFor(partner.image).width(308).height(128).url()}
                      alt={partner.name ?? ""}
                      width={308}
                      height={128}
                      className="h-auto w-full object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      <SectionContainer className="flex justify-center">
        <Image src={schroddySticker} alt="Schroddy" width={240} height={240} />
      </SectionContainer>
    </main>
  );
}
