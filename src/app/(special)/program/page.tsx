import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import {
  isPortableTextSpan,
  isPortableTextTextBlock,
  type Image as SanityImageValue,
  type ImageDimensions,
  type PortableTextBlock,
} from "sanity";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { asFormattedTime } from "~/lib/utils/date";
import { urlFor } from "~/sanity/lib/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProgramItem = {
  _id: string;
  type: string;
  track?: number;
  startDateTime: string;
  endDateTime?: string;
  title: string;
  titleShort?: string;
  abstract?: PortableTextBlock[];
  author?: {
    firstName?: string;
    lastName?: string;
    pronouns?: string;
    biography?: PortableTextBlock[];
    photo?: SanityImage;
  };
  coSpeaker?: {
    firstName?: string;
    lastName?: string;
    pronouns?: string;
    biography?: PortableTextBlock[];
    photo?: SanityImage;
  };
};

type SanityImage = SanityImageValue & {
  dimensions?: Partial<ImageDimensions>;
};

type ProgramSpeaker = NonNullable<ProgramItem["author"]>;
type TrackPage = {
  key: string;
  title: string;
  track: number;
};

type PrintablePage = TrackPage & {
  dayKey: string;
  dayLabel: string;
  items: ProgramItem[];
};

type AreaReference = {
  area: string;
  personInCharge: string;
};

const speakerPhotoWidth = 74;
const speakerPhotoSourceWidth = speakerPhotoWidth * 2;

export const metadata: Metadata = {
  title: "Conference Program",
  description: "Printable conference program for OSDAY26",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Rome",
});

const dayLabelFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

function getDayKey(dateStr: string): string {
  return dayKeyFormatter.format(new Date(dateStr));
}

function getDayLabel(dayKey: string): string {
  const [year, month, day] = dayKey.split("-").map(Number);
  if (!year || !month || !day) return dayKey;

  return dayLabelFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

function getSpeakerNames(item: ProgramItem): string | null {
  const speakers = [item.author, item.coSpeaker].flatMap((speaker) =>
    speaker ? [formatSpeakerName(speaker)] : [],
  );

  return speakers.length > 0 ? speakers.join(" & ") : null;
}

function getSpeakers(item: ProgramItem): ProgramSpeaker[] {
  return [item.author, item.coSpeaker].filter(Boolean) as ProgramSpeaker[];
}

function formatSpeakerName(speaker: ProgramSpeaker): string {
  return [speaker.firstName, speaker.lastName].filter(Boolean).join(" ").trim();
}

function getSpeakerPhotoHeight(photo?: SanityImage): number {
  const aspectRatio = photo?.dimensions?.aspectRatio;

  if (!aspectRatio || aspectRatio <= 0) return speakerPhotoWidth;

  return Math.round(speakerPhotoWidth / aspectRatio);
}

function getTrackName(track: number): string {
  const alphaIndex = track - 1;
  const charCodeA = "A".charCodeAt(0);

  if (alphaIndex >= 0 && alphaIndex < 26) {
    return String.fromCharCode(charCodeA + alphaIndex);
  }

  return String(track);
}

function getTrackLabel(track?: number): string {
  if (track === 0) return "All tracks";
  if (typeof track === "number" && track > 0) {
    return `Track ${getTrackName(track)}`;
  }
  return "General";
}

function getTrackIndicator(track?: number): string {
  if (track === 0) return "AB";
  if (typeof track === "number" && track > 0) return getTrackName(track);
  return "G";
}

function typeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function groupByDay(items: ProgramItem[]) {
  const groups = new Map<string, ProgramItem[]>();

  for (const item of items) {
    const dayKey = getDayKey(item.startDateTime);
    const current = groups.get(dayKey) ?? [];
    current.push(item);
    groups.set(dayKey, current);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function isSharedItem(track?: number): boolean {
  return track === 0 || track === undefined;
}

function filterItemsForTrack(
  items: ProgramItem[],
  track: number,
): ProgramItem[] {
  return items.filter(
    (item) => item.track === track || isSharedItem(item.track),
  );
}

function getTrackPages(items: ProgramItem[]): TrackPage[] {
  const tracks = new Set(
    items
      .map((item) => item.track)
      .filter(
        (track): track is number => typeof track === "number" && track > 0,
      ),
  );

  return [...tracks]
    .sort((a, b) => a - b)
    .map((track) => ({
      key: `track-${track}`,
      title: getTrackLabel(track),
      track,
    }));
}

function portableTextToPlainText(blocks?: PortableTextBlock[]): string | null {
  if (!blocks?.length) return null;

  const text = blocks
    .flatMap((block) => (isPortableTextTextBlock(block) ? block.children : []))
    .map((child) => (isPortableTextSpan(child) ? child.text.trim() : ""))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return text || null;
}

function getTalkDescription(item: ProgramItem): string | null {
  return portableTextToPlainText(item.abstract);
}

function getSpeakerBio(item: ProgramItem): string | null {
  const bios = [item.author?.biography, item.coSpeaker?.biography]
    .map((bio) => portableTextToPlainText(bio))
    .filter(Boolean)
    .join(" ");

  return bios || null;
}

function parseAreaReferencesYaml(content: string): AreaReference[] {
  const references: AreaReference[] = [];
  let current: Partial<AreaReference> | null = null;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line === "references:") continue;

    if (line.startsWith("- ")) {
      if (current?.area && current.personInCharge) {
        references.push({
          area: current.area,
          personInCharge: current.personInCharge,
        });
      }

      current = {};
      const inlineField = line.slice(2).trim();
      if (inlineField) {
        const [key, ...rest] = inlineField.split(":");
        const value = rest.join(":").trim();
        if (key?.trim() === "area" && value) current.area = value;
        if (key?.trim() === "person_in_charge" && value) {
          current.personInCharge = value;
        }
      }
      continue;
    }

    if (!current) continue;

    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (!key || !value) continue;

    if (key.trim() === "area") current.area = value;
    if (key.trim() === "person_in_charge") current.personInCharge = value;
  }

  if (current?.area && current.personInCharge) {
    references.push({
      area: current.area,
      personInCharge: current.personInCharge,
    });
  }

  return references;
}

async function getAreaReferences(): Promise<AreaReference[]> {
  const filePath = path.join(
    process.cwd(),
    "src/app/(special)/program/area-references.yaml",
  );
  const content = await readFile(filePath, "utf8");

  return parseAreaReferencesYaml(content);
}

async function getProgram(): Promise<ProgramItem[]> {
  return sanityFetch(
    `*[_type == "timeline" && year == 2026] | order(startDateTime asc) {
      _id,
      type,
      track,
      startDateTime,
      endDateTime,
      title,
      titleShort,
      abstract,
      "author": speaker->{
        firstName,
        lastName,
        pronouns,
        biography,
        photo{
          ...,
          "dimensions": asset->metadata.dimensions
        }
      },
      "coSpeaker": coSpeaker->{
        firstName,
        lastName,
        pronouns,
        biography,
        photo{
          ...,
          "dimensions": asset->metadata.dimensions
        }
      }
    }`,
    undefined,
    {
      cacheDuration: 30,
      tags: [getCacheTag.timeline()],
    },
  );
}

export default async function ProgramPage() {
  const [program, areaReferences] = await Promise.all([
    getProgram(),
    getAreaReferences(),
  ]);
  const trackPages = getTrackPages(program);
  const printablePages: PrintablePage[] = trackPages.flatMap((page) =>
    groupByDay(filterItemsForTrack(program, page.track)).map(
      ([dayKey, items]) => ({
        ...page,
        dayKey,
        dayLabel: getDayLabel(dayKey),
        items,
      }),
    ),
  );

  return (
    <>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 24mm 8mm 12mm 8mm;

          @bottom-right {
            content: counter(page);
            color: #94a3b8;
            font-size: 10px;
            font-family: sans-serif;
          }
        }

        .animated-schroddy {
          display: none;
        }

        @media print {
          html, body {
            background: white !important;
          }

          .program-sheet-header,
          .program-day-header {
            break-after: avoid;
            page-break-after: avoid;
          }

          .program-table,
          .program-table-body {
            break-inside: auto;
            page-break-inside: auto;
          }

          .program-row {
            break-inside: auto;
            page-break-inside: auto;
          }

          .program-row-meta {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .program-row-content {
            break-inside: auto;
            page-break-inside: auto;
          }

          .program-row-content p {
            orphans: 3;
            widows: 3;
          }
        }
      `}</style>

      <main className="min-h-screen bg-stone-200 py-8 text-slate-950 print:bg-white print:py-0">
        <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-8 print:max-w-none print:gap-0">
          <div className="bg-white print:break-after-page">
            <section className="flex min-h-[250mm] flex-col justify-between border-y-2 border-slate-950 px-8 py-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Internal print document
                </p>
              </div>

              <div className="space-y-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Schroedinger Hat
                </p>
                <h1 className="text-6xl font-semibold tracking-tight text-slate-950">
                  OSDAY26
                </h1>
                <p className="text-xl font-medium uppercase tracking-[0.2em] text-slate-700">
                  Event Program
                </p>
              </div>

              <div className="border-t border-slate-300 pt-4 text-sm text-slate-600">
                Organized by Schroedinger Hat
              </div>
            </section>
          </div>

          {printablePages.map((page, index) => (
            <div
              key={`${page.key}-${page.dayKey}`}
              className={
                index < printablePages.length - 1
                  ? "bg-white print:break-after-page"
                  : "bg-white"
              }
            >
              <section className="program-sheet-header border-b border-slate-300 px-6 py-4 print:rounded-none">
                <div className="flex items-baseline justify-between gap-4">
                  <h1 className="text-lg font-semibold tracking-tight text-slate-950">
                    OSDAY26 Event Program
                  </h1>
                  <p className="text-sm font-medium text-slate-700">
                    {page.title} · {page.dayLabel}
                  </p>
                </div>
              </section>

              <section className="px-6 py-6">
                <div>
                  <div className="program-table overflow-hidden border border-slate-300">
                    <div className="program-table-body divide-y divide-slate-200">
                      {page.items.map((item) => {
                        const speakers = getSpeakerNames(item);
                        const speakerList = getSpeakers(item);
                        const speakerBio = getSpeakerBio(item);
                        const talkDescription = getTalkDescription(item);
                        const showSpeakerPhotos = item.type === "talk";
                        const showRoomTag = !isSharedItem(item.track);

                        return (
                          <article
                            key={item._id}
                            className="program-row grid grid-cols-[74px_minmax(0,1fr)] gap-3 px-4 py-4"
                          >
                            <aside className="program-row-meta flex flex-col items-center gap-2 text-center">
                              <div className="w-full text-base font-semibold tabular-nums leading-none text-slate-950">
                                {asFormattedTime(item.startDateTime)}
                                {item.endDateTime && (
                                  <span className="mt-1 block text-xs font-medium text-slate-500">
                                    {asFormattedTime(item.endDateTime)}
                                  </span>
                                )}
                              </div>

                              {showRoomTag && (
                                <span
                                  title={getTrackLabel(item.track)}
                                  className="inline-flex min-w-11 justify-center rounded border border-slate-950 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-950"
                                >
                                  {getTrackIndicator(item.track)}
                                </span>
                              )}

                              {showSpeakerPhotos && (
                                <div className="mt-1 flex w-full flex-wrap justify-center gap-1.5">
                                  {speakerList.map((speaker, speakerIndex) => {
                                    const speakerName =
                                      formatSpeakerName(speaker) || "Speaker";
                                    const photoHeight = getSpeakerPhotoHeight(
                                      speaker.photo,
                                    );

                                    return speaker.photo?.asset ? (
                                      <Image
                                        key={`${item._id}-${speakerName}-${speakerIndex}`}
                                        src={urlFor(speaker.photo)
                                          .width(speakerPhotoSourceWidth)
                                          .url()}
                                        alt={speakerName}
                                        width={speakerPhotoWidth}
                                        height={photoHeight}
                                        className="h-auto w-full rounded-sm"
                                      />
                                    ) : (
                                      <span
                                        key={`${item._id}-${speakerName}-${speakerIndex}`}
                                        className="flex aspect-square w-full items-center justify-center rounded-sm bg-slate-100 text-sm font-semibold text-slate-600"
                                      >
                                        {speakerName
                                          .split(" ")
                                          .map((part) => part[0])
                                          .join("")
                                          .slice(0, 2)
                                          .toUpperCase() || "?"}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </aside>

                            <div className="program-row-content min-w-0">
                              <p className="text-base font-semibold leading-5 text-slate-950">
                                {item.titleShort ?? item.title}
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
                                {speakers ? (
                                  <span>{speakers}</span>
                                ) : (
                                  <span>{typeLabel(item.type)}</span>
                                )}
                              </div>
                              {speakerBio && (
                                <p className="mt-2 text-sm leading-5 text-slate-700">
                                  <span className="font-semibold text-slate-900">
                                    Speaker bio:
                                  </span>{" "}
                                  {speakerBio}
                                </p>
                              )}
                              {talkDescription && (
                                <p className="mt-2 text-sm leading-5 text-slate-700">
                                  <span className="font-semibold text-slate-900">
                                    Talk:
                                  </span>{" "}
                                  {talkDescription}
                                </p>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}

          <div className="bg-white print:break-before-page">
            <section className="flex min-h-[250mm] flex-col border-y-2 border-slate-950 px-8 py-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Event Program
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                  Venue Map
                </h2>
                {/* Venue map asset path: /public/venue-map.png */}
              </div>

              <div className="mt-8 flex flex-1 items-center justify-center border border-slate-300 p-4">
                <Image
                  src="/venue-map.png"
                  alt="Venue map with rooms and usage destinations"
                  width={1400}
                  height={1000}
                  className="h-auto max-h-full w-full object-contain"
                  priority
                />
              </div>
            </section>
          </div>

          <div className="bg-white print:break-before-page">
            <section className="flex min-h-[250mm] flex-col border-y-2 border-slate-950 px-8 py-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Event Program
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                  References
                </h2>
              </div>

              <div className="mt-8 overflow-hidden border border-slate-300">
                <div className="grid grid-cols-[minmax(0,1fr)_220px] bg-slate-100 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <span>Area</span>
                  <span>Person In Charge</span>
                </div>

                <div className="divide-y divide-slate-200">
                  {areaReferences.map((reference, index) => (
                    <div
                      key={`${reference.area}-${reference.personInCharge}-${index}`}
                      className="grid grid-cols-[minmax(0,1fr)_220px] gap-4 px-4 py-3 text-sm text-slate-800"
                    >
                      <span className="font-medium text-slate-950">
                        {reference.area}
                      </span>
                      <span>{reference.personInCharge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex min-h-0 flex-1 flex-col">
                <div className="border-b border-slate-300 pb-2">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                    Notes
                  </h3>
                </div>

                <div
                  className="mt-4 h-full min-h-[120mm] flex-1"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 1.45rem, rgb(203 213 225) 1.45rem, rgb(203 213 225) calc(1.45rem + 1px))",
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
