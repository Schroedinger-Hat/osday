import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { PortableText } from "@portabletext/react";
import { urlFor } from "~/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";
import { Typography } from "~/components/atoms/typography/Typography";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { constructMetadata } from "~/lib/utils/metadata";
import { asFormattedTime } from "~/lib/utils/date";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Speaker {
  _id: string;
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  title?: string;
  photo?: {
    asset?: {
      _ref: string;
    };
  };
  biography?: PortableTextBlock[];
}

interface Talk {
  _id: string;
  _type: string;
  type: string;
  startDateTime: string;
  endDateTime?: string;
  title: string;
  abstract?: PortableTextBlock[];
  backgroundImage?: {
    asset?: {
      _ref: string;
    };
  };
  speaker?: Speaker;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTalk(id: string) {
  return sanityFetch<Talk | null>(
    `*[_type == "timeline" && _id == $id][0]{
      _id,
      _type,
      type,
      startDateTime,
      endDateTime,
      title,
      abstract,
      backgroundImage,
      "speaker": speaker->{
        _id,
        firstName,
        lastName,
        pronouns,
        title,
        photo,
        biography
      }
    }`,
    { id },
    {
      cacheDuration: 30, // Cache for 30 seconds
      tags: [getCacheTag.timeline()],
    },
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const talk = await getTalk(id);

  return constructMetadata({
    title: talk?.title,
    description: talk?.abstract?.[0]?.children?.[0]?.text,
    path: `/schedule/${id}`,
  });
}

export default async function TalkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const talk = await getTalk(id);

  if (!talk) {
    notFound();
  }

  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <div className="relative">
          <div className="space-y-4">
            <time className="block font-title text-2xl tracking-wider text-white/90">
              {asFormattedTime(talk.startDateTime)}
              {talk.endDateTime && ` - ${asFormattedTime(talk.endDateTime)}`}
            </time>
            <Heading level={1}>{talk.title}</Heading>
            {talk.type !== "talk" && (
              <span className="inline-block rounded bg-white/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {talk.type.charAt(0).toUpperCase() + talk.type.slice(1)}
              </span>
            )}
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
            >
              <ArrowLeft01Icon className="h-4 w-4" />
              <Typography variant="muted" className="font-bold uppercase">
                Back to Schedule
              </Typography>
            </Link>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-0 space-y-8 md:grid-cols-5 md:gap-8">
          <div className="col-span-3 space-y-8">
            <Heading level={3}>Abstract</Heading>
            {talk.abstract && (
              <div className="prose prose-invert max-w-none">
                <PortableText value={talk.abstract} />
              </div>
            )}
          </div>

          {talk.speaker && (
            <aside className="space-y-6 lg:col-span-2">
              <div className="overflow-hidden rounded-md bg-dark-navy text-white shadow-md">
                <div className="aspect-square">
                  {talk.speaker.photo?.asset ? (
                    <Image
                      src={urlFor(talk.speaker.photo)
                        .width(400)
                        .height(400)
                        .url()}
                      alt={`${talk.speaker.firstName} ${talk.speaker.lastName}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-700">
                      <span className="text-4xl">
                        {talk.speaker.firstName?.[0]}
                        {talk.speaker.lastName?.[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  <Heading level={3} className="mb-0 md:mb-0">
                    {talk.speaker.firstName} {talk.speaker.lastName}
                  </Heading>
                  {talk.speaker.title && (
                    <Typography variant="muted">
                      {talk.speaker.title}
                    </Typography>
                  )}
                  {talk.speaker.biography && (
                    <div className="pt-4">
                      <PortableText value={talk.speaker.biography} />
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </SectionContainer>
    </>
  );
}

export async function generateStaticParams() {
  const talks = await sanityFetch<Talk[]>(`*[_type == "timeline"]`, undefined, {
    cacheDuration: 30,
    tags: [getCacheTag.timeline()],
  });

  return talks.map((talk) => ({
    id: talk._id,
  }));
}
