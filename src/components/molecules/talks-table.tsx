"use client";

import { useState } from "react";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import { Typography } from "../atoms/typography/Typography";
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

// ─── Grid constants ────────────────────────────────────────────────────────────

const SLOT_MINUTES = 15;
const SLOT_HEIGHT_PX = 32; // px per 15-min slot

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

function durationToPx(minutes: number): number {
  return Math.max(minutes / SLOT_MINUTES, 2) * SLOT_HEIGHT_PX;
}

// ─── Talk cell ─────────────────────────────────────────────────────────────────

function TalkCell({ item }: { item: TimelineItem }) {
  return (
    <Link
      href={`/schedule/${item._id}`}
      className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card px-3 py-2 text-card-foreground transition-opacity hover:border-primary/50 hover:opacity-80"
    >
      <Typography variant="small" className="font-bold leading-snug" as="p">
        {item.titleShort}
      </Typography>
      {item.author && (
        <Typography
          variant="small"
          className="line-clamp-3 leading-snug text-muted-foreground"
        >
          {getAuthorFullName(item.author)}
          {item.coSpeaker && ` & ${getAuthorFullName(item.coSpeaker)}`}
        </Typography>
      )}
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
      <div className="flex flex-col items-center justify-center border-b border-gray-200 py-4">
        <Typography as="span" variant="large" className="mb-2">
          Stay tuned!
        </Typography>
        <Typography variant="medium" className="max-w-md text-center">
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

  const getDuration = (item: TimelineItem, startMin: number) => {
    const endMin = item.endDateTime
      ? getMinutesInDay(item.endDateTime)
      : startMin + 45;
    return Math.max(endMin - startMin, SLOT_MINUTES);
  };

  return (
    <div>
      {/* Day tabs */}
      {isMultiDay && (
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {dayKeys.map((dk, i) => (
            <button
              key={dk}
              onClick={() => setSelectedDay(dk)}
              className={cn(
                "rounded-full border-2 px-6 py-2 text-base font-semibold transition-colors",
                selectedDay === dk
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary bg-primary/10 text-primary hover:bg-primary/20",
              )}
            >
              {getDayLabel(dk, i)}
            </button>
          ))}
        </div>
      )}

      {visibleTalks.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-b border-gray-200 py-4">
          <Typography as="span" variant="large" className="mb-2">
            Nothing here yet.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedSlots.map(([startMin, items]) => {
            const track1 = items.filter((i) => i.track === 1);
            const track2 = items.filter((i) => i.track === 2);
            const shared = items.filter(
              (i) => (i.track ?? 0) === 0 || (i.track ?? 0) > 2,
            );
            const isParallelRow =
              hasMultiTrack && track1.length > 0 && track2.length > 0;

            return (
              <div key={startMin} className="flex flex-col gap-2">
                {/* Shared / full-width items */}
                {shared.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      height: durationToPx(getDuration(item, startMin)),
                    }}
                  >
                    <TalkCell item={item} />
                  </div>
                ))}

                {/* Both tracks present → side-by-side on sm+, stacked on mobile */}
                {isParallelRow && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div
                      style={{
                        height: durationToPx(
                          Math.max(
                            ...track1.map((i) => getDuration(i, startMin)),
                          ),
                        ),
                      }}
                    >
                      {track1.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                    <div
                      style={{
                        height: durationToPx(
                          Math.max(
                            ...track2.map((i) => getDuration(i, startMin)),
                          ),
                        ),
                      }}
                    >
                      {track2.map((item) => (
                        <TalkCell key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Only one track present (no parallel partner) → full-width */}
                {!isParallelRow &&
                  [...track1, ...track2].map((item) => (
                    <div
                      key={item._id}
                      style={{
                        height: durationToPx(getDuration(item, startMin)),
                      }}
                    >
                      <TalkCell item={item} />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
