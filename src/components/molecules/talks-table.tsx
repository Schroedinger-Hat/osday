"use client";

import { useState } from "react";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import { Typography } from "../atoms/typography/Typography";
import Link from "next/link";
import { asFormattedTime } from "~/lib/utils/date";
import { cn } from "~/lib/utils";

export interface TimelineItem {
  _id: string;
  _type: "timeline";
  type: string;
  track?: 1 | 2 | 3 | 4;
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

  return (
    <div>
      {/* Day tabs */}
      {isMultiDay && (
        <div className="mb-8 flex flex-wrap gap-2">
          {dayKeys.map((dk, i) => (
            <button
              key={dk}
              onClick={() => setSelectedDay(dk)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                selectedDay === dk
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/30 hover:border-primary/60",
              )}
            >
              {getDayLabel(dk, i)}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="space-y-4 md:space-y-8">
          {visibleTalks.length > 0 ? (
            <>
              {/* Continuous vertical line */}
              <div className="absolute bottom-0 left-[72px] top-0 w-px bg-black md:left-[98px]" />
              {visibleTalks.map((item) => (
                <Link
                  key={item._id}
                  href={`/schedule/${item._id}`}
                  className="block transition-opacity hover:opacity-80"
                >
                  <div className="flex gap-6 md:gap-8">
                    <div className="w-[62px] justify-end text-right md:w-[82px]">
                      <div className="text-bold text-sm font-black md:text-base">
                        {asFormattedTime(item.startDateTime)}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      {item.author && (
                        <Typography
                          variant="medium"
                          className="text-lg font-bold"
                        >
                          {getAuthorFullName(item.author)}
                        </Typography>
                      )}
                      <Typography
                        variant="medium"
                        className="max-w-xs md:max-w-xl"
                        as="p"
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : hasTalks ? (
            // Has talks but none match selected day — shouldn't happen, but just in case
            <div className="flex flex-col items-center justify-center border-b border-gray-200 py-4">
              <Typography as="span" variant="large" className="mb-2">
                Nothing here yet.
              </Typography>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-b border-gray-200 py-4">
              <Typography as="span" variant="large" className="mb-2">
                Stay tuned!
              </Typography>
              <Typography variant="medium" className="max-w-md text-center">
                Check back for upcoming talks and more details.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
