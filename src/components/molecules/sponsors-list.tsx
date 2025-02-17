import Image from "next/image";
import Link from "next/link";
import { Typography } from "~/components/atoms/typography/Typography";
import type { Partner } from "~/sanity/sanity.types";
import { urlFor } from "~/sanity/lib/image";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";

export async function SponsorsList() {
  const supporterSponsors: Partner[] = await sanityFetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == true && businessTier == "supporter"] | order(orderRank asc)`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.sponsors()],
    },
  );

  const diamondSponsors: Partner[] = await sanityFetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == true && businessTier == "diamond"] | order(orderRank asc)`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.sponsors()],
    },
  );

  const goldSponsors: Partner[] = await sanityFetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == true && businessTier == "gold"] | order(orderRank asc)`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.sponsors()],
    },
  );

  const communityPartners: Partner[] = await sanityFetch(
    `*[_type == "partner" && "osday25" in visibility && isBusinessPartner == false && nonBusinessType == "community"] | order(orderRank asc)`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.sponsors()],
    },
  );

  return (
    <div className="flex flex-col gap-8">
      {supporterSponsors.length > 0 && (
        <div>
          <Typography variant="large" className="mb-2 font-semibold uppercase">
            Supporter Sponsors
          </Typography>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {supporterSponsors.map((sponsor) => (
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
                  className="h-auto w-full object-contain shadow-md"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {diamondSponsors.length > 0 && (
        <div>
          <Typography variant="large" className="mb-2 font-semibold uppercase">
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
                  className="h-auto w-full object-contain shadow-md"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {goldSponsors.length > 0 && (
        <div>
          <Typography variant="large" className="mb-2 font-semibold uppercase">
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
                  className="h-auto w-full object-contain shadow-md"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {communityPartners.length > 0 && (
        <div>
          <Typography variant="large" className="mb-2 font-semibold uppercase">
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
                  className="h-auto w-full object-contain shadow-md"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
