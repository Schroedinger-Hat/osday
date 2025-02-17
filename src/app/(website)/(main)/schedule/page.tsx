import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { urlFor } from "~/sanity/lib/image";
import type { TimelineItem } from "~/components/molecules/talks-table";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Temporary background gradients until we have images
const TYPE_BACKGROUNDS = {
  talk: "from-purple-600 to-blue-600",
  keynote: "from-rose-600 to-orange-600",
  break: "from-green-600 to-teal-600",
  registration: "from-violet-600 to-indigo-600",
  closing: "from-amber-600 to-yellow-600",
} as const;

function TimelineCard({ item }: { item: TimelineItem }) {
  const type = item.type as keyof typeof TYPE_BACKGROUNDS;
  const backgroundGradient = TYPE_BACKGROUNDS[type] ?? TYPE_BACKGROUNDS.talk;

  // Only make talks and keynotes clickable
  const isClickable = ["talk", "keynote"].includes(type);

  const content = (
    <>
      {/* Background Image/Gradient */}
      {item.backgroundImage ? (
        <Image
          src={urlFor(item.backgroundImage).width(800).height(600).url()}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} transition-transform duration-300 group-hover:scale-105`}
        />
      )}

      {/* Content */}
      <div className="absolute inset-0 m-2 flex flex-col justify-between rounded-sm bg-black/80 p-4">
        <div className="space-y-3">
          <time className="block font-title text-2xl tracking-wider text-white/90">
            {format(new Date(item.startDateTime), "HH:mm")}
          </time>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight text-white">
              {item.title}
            </h3>
          </div>
        </div>

        {item.author && (
          <div className="rounded-full py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            {getAuthorFullName(item.author)}
          </div>
        )}
        {!item.author && (
          <span className="inline-block rounded bg-white/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        )}
      </div>
    </>
  );

  const className = `group relative aspect-[4/3] overflow-hidden rounded-md shadow-md ${
    isClickable ? "cursor-pointer transition hover:scale-[1.02]" : ""
  }`;

  if (isClickable) {
    return (
      <Link href={`/schedule/${item._id}`} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export default async function SchedulePage() {
  const timeline: TimelineItem[] = await sanityFetch(
    `*[_type == "timeline"] | order(startDateTime asc) {
      _id,
      _type,
      type,
      startDateTime,
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
      cacheDuration: 30, // Cache for 30 seconds
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {timeline.map((item) => (
            <TimelineCard key={item._id} item={item} />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
