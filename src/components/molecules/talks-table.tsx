"use client";

import { useState } from "react";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Typography } from "../atoms/typography/Typography";
import { Button } from "../ui/button";

export interface TimelineItem {
  _id: string;
  _type: "timeline";
  type: string;
  track?: 0 | 1 | 2 | 3 | 4;
  startDateTime: string;
  endDateTime?: string;
  title: string;
  titleShort?: string;
  abstract?: string;
  backgroundImage?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  author?: SanityAuthor;
  coSpeaker?: SanityAuthor;
}

interface TalksTableProps {
  talks: TimelineItem[];
}

function getDayKey(dateStr: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(
    new Date(dateStr),
  );
}

function getDayLabel(dayKey: string, index: number): string {
  const [y, m, d] = dayKey.split("-").map(Number);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y!, m! - 1, d!)));
  return `Day ${index + 1} · ${formatted}`;
}

// ─── Time helpers ──────────────────────────────────────────────────────────────

function getMinutesInDay(dateStr: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date(dateStr));
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

// ─── Talk cell ─────────────────────────────────────────────────────────────────

function TalkCell({ item }: { item: TimelineItem }) {
  return (
    <Link
      href={`/schedule/${item._id}`}
      className="block overflow-hidden rounded border-[0.5px] border-fiery-red bg-white transition-all hover:border-fiery-red/50 hover:opacity-80 hover:bg-red-100"
    >
      <div className="flex flex-col gap-1 border-l-4 border-fiery-red px-4 py-2.5 sm:min-h-24">
        <Typography variant="large" className="leading-snug tracking-tight text-black font-bold">
          {item.titleShort ?? item.title}
        </Typography>
        {item.author && (
          <Typography variant="muted" className="leading-snug text-muted-foreground font-medium">
            {getAuthorFullName(item.author)}
            {item.coSpeaker && ` & ${getAuthorFullName(item.coSpeaker)}`}
          </Typography>
        )}
      </div>
    </Link>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function TalksTable({ talks }: TalksTableProps) {
  const hasTalks = Array.isArray(talks) && talks.length > 0;

  const dayKeys = hasTalks
    ? [...new Set(talks.map((t) => getDayKey(t.startDateTime)))].sort()
    : [];
  const isMultiDay = dayKeys.length > 1;

  const [selectedDay, setSelectedDay] = useState(dayKeys[0] ?? "");

  const visibleTalks = isMultiDay
    ? talks.filter((t) => getDayKey(t.startDateTime) === selectedDay)
    : talks;

  if (!hasTalks) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <Typography as="span" variant="large" className="mb-2 text-white">
          Stay tuned!
        </Typography>
        <Typography variant="medium" className="max-w-md text-center text-white">
          Check back for upcoming talks and more details.
        </Typography>
      </div>
    );
  }

  const hasMultiTrack = visibleTalks.some(
    (t) => t.track === 1 || t.track === 2,
  );

  // Group talks by start time → one visual row per unique start minute
  const slotMap = new Map<number, TimelineItem[]>();
  for (const item of visibleTalks) {
    const min = getMinutesInDay(item.startDateTime);
    if (!slotMap.has(min)) slotMap.set(min, []);
    slotMap.get(min)!.push(item);
  }
  const sortedSlots = [...slotMap.entries()].sort(([a], [b]) => a - b);

  // Derived flat lists for mobile grouped view
  const allShared = visibleTalks
    .filter((i) => (i.track ?? 0) === 0 || (i.track ?? 0) > 2)
    .sort((a, b) => getMinutesInDay(a.startDateTime) - getMinutesInDay(b.startDateTime));
  const allTrack1 = visibleTalks
    .filter((i) => i.track === 1)
    .sort((a, b) => getMinutesInDay(a.startDateTime) - getMinutesInDay(b.startDateTime));
  const allTrack2 = visibleTalks
    .filter((i) => i.track === 2)
    .sort((a, b) => getMinutesInDay(a.startDateTime) - getMinutesInDay(b.startDateTime));

  return (
    <div>
      {/* Day tabs */}
      {isMultiDay && (
        <div className="flex justify-center py-8">
          <div className="flex rounded-full bg-black/20 p-1">
            {dayKeys.map((dk, i) => (
              <button
                key={dk}
                onClick={() => setSelectedDay(dk)}
                className={cn(
                  "rounded-full px-5 py-3.5 text-base font-bold tracking-tight transition-colors",
                  selectedDay === dk
                    ? "bg-white text-black"
                    : "text-white",
                )}
              >
                {getDayLabel(dk, i)}
              </button>
            ))}
          </div>
        </div>
      )}

      {visibleTalks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4">
          <Typography variant="large" className="mb-2 text-white">
            Nothing here yet.
          </Typography>
        </div>
      ) : (
        <div className="rounded-lg bg-white px-4 py-6 sm:px-8">
          {/* ── Mobile layout: grouped by track ── */}
          <div className="flex flex-col gap-6 sm:hidden">
            {hasMultiTrack ? (
              <>
                {allShared.length > 0 && (
                  <div>
                    <Typography variant="h3" className="mb-3 font-title tracking-tight text-fiery-red text-2xl">
                      Track A+B
                    </Typography>
                    <div className="flex flex-col gap-4">
                      {allShared.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {allTrack1.length > 0 && (
                  <div>
                    <Typography variant="h3" className="mb-3 font-title tracking-tight text-fiery-red text-2xl">
                      Track A
                    </Typography>
                    <div className="flex flex-col gap-4">
                      {allTrack1.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {allTrack2.length > 0 && (
                  <div>
                    <Typography variant="h3" className="mb-3 font-title tracking-tight text-fiery-red">
                      Track B
                    </Typography>
                    <div className="flex flex-col gap-4">
                      {allTrack2.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              allShared.map((item) => (
                <TalkCell key={item._id} item={item} />
              ))
            )}
          </div>

          {/* ── Desktop layout: two-column, slot-based ── */}
          <div className="hidden sm:flex sm:flex-col sm:gap-4">
            {hasMultiTrack && (
              <div className="mb-6 flex gap-8">
                <Typography variant="h3" className="flex-1 font-title tracking-tight text-fiery-red">
                  Track A
                </Typography>
                <Typography variant="h3" className="flex-1 font-title tracking-tight text-fiery-red">
                  Track B
                </Typography>
              </div>
            )}

            {sortedSlots.map(([startMin, items]) => {
              const track1 = items.filter((i) => i.track === 1);
              const track2 = items.filter((i) => i.track === 2);
              const shared = items.filter(
                (i) => (i.track ?? 0) === 0 || (i.track ?? 0) > 2,
              );
              const isParallelRow =
                hasMultiTrack && track1.length > 0 && track2.length > 0;

              return (
                <div key={startMin} className="flex flex-col gap-4">
                  {shared.map((item) => (
                    <TalkCell key={item._id} item={item} />
                  ))}

                  {isParallelRow && (
                    <div className="flex gap-8">
                      <div className="flex flex-1 flex-col gap-4">
                        {track1.map((item) => (
                          <TalkCell key={item._id} item={item} />
                        ))}
                      </div>
                      <div className="flex flex-1 flex-col gap-4">
                        {track2.map((item) => (
                          <TalkCell key={item._id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {!isParallelRow &&
                    [...track1, ...track2].map((item) => (
                      <TalkCell key={item._id} item={item} />
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button asChild variant="default" className="rounded-r-none font-title text-2xl">
          <Link href="/schedule">Full schedule</Link>
        </Button>
      </div>
    </div>
  );
}
