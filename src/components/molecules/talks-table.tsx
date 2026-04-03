"use client";

import { useState } from "react";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import Link from "next/link";
import { cn } from "~/lib/utils";

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
      <div className="flex min-h-24 flex-col gap-1 border-l-4 border-fiery-red px-4 py-2.5">
        <p className="text-lg font-bold leading-snug tracking-tight text-black">
          {item.titleShort ?? item.title}
        </p>
        {item.author && (
          <p className="text-base font-medium leading-snug text-muted-foreground">
            {getAuthorFullName(item.author)}
            {item.coSpeaker && ` & ${getAuthorFullName(item.coSpeaker)}`}
          </p>
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
        <p className="mb-2 text-lg font-semibold text-white">Stay tuned!</p>
        <p className="max-w-md text-center text-base font-semibold text-white">
          Check back for upcoming talks and more details.
        </p>
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
        <div className="mb-8 flex flex-wrap justify-center gap-4 py-8">
          {dayKeys.map((dk, i) => (
            <button
              key={dk}
              onClick={() => setSelectedDay(dk)}
              className={cn(
                "rounded-full border px-5 py-3.5 text-base font-bold tracking-tight transition-colors",
                selectedDay === dk
                  ? "border-white/20 bg-white text-black"
                  : "border-white/20 bg-black/20 text-white",
              )}
            >
              {getDayLabel(dk, i)}
            </button>
          ))}
        </div>
      )}

      {visibleTalks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4">
          <p className="mb-2 text-lg font-semibold text-white">
            Nothing here yet.
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-white px-4 py-6 sm:px-8">
          {/* ── Mobile layout: grouped by track ── */}
          <div className="flex flex-col gap-6 sm:hidden">
            {hasMultiTrack ? (
              <>
                {allShared.length > 0 && (
                  <div>
                    <p className="mb-3 font-title text-2xl tracking-tight text-fiery-red">
                      Track A+B
                    </p>
                    <div className="flex flex-col gap-4">
                      {allShared.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {allTrack1.length > 0 && (
                  <div>
                    <p className="mb-3 font-title text-2xl tracking-tight text-fiery-red">
                      Track A
                    </p>
                    <div className="flex flex-col gap-4">
                      {allTrack1.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                {allTrack2.length > 0 && (
                  <div>
                    <p className="mb-3 font-title text-2xl tracking-tight text-fiery-red">
                      Track B
                    </p>
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
                <p className="flex-1 font-title text-3xl tracking-tight text-fiery-red">
                  Track A
                </p>
                <p className="flex-1 font-title text-3xl tracking-tight text-fiery-red">
                  Track B
                </p>
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
    </div>
  );
}
