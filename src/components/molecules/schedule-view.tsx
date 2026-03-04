"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { asFormattedTime } from "~/lib/utils/date";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import type { TimelineItem } from "./talks-table";

const TYPE_BACKGROUNDS: Record<string, string> = {
  talk: "from-purple-600 to-blue-600",
  keynote: "from-rose-600 to-orange-600",
  Break: "from-green-600 to-teal-600",
  break: "from-green-600 to-teal-600",
  logistic: "from-violet-600 to-indigo-600",
  drink: "from-amber-600 to-yellow-600",
};

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

function TimelineCard({ item }: { item: TimelineItem }) {
  const backgroundGradient =
    TYPE_BACKGROUNDS[item.type] ?? "from-purple-600 to-blue-600";
  const isClickable = item.type === "talk";

  const content = (
    <>
      {item.backgroundImage ? (
        <Image
          src={urlFor(item.backgroundImage).width(800).height(600).url()}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-50 transition-transform duration-300 group-hover:scale-105`}
        />
      )}

      <div
        className={cn(
          "absolute inset-0 m-2 flex flex-col justify-between rounded-sm bg-black/80 p-4",
          !isClickable && "border-2 border-dashed border-white bg-black/40",
        )}
      >
        <div className="space-y-3">
          <Heading
            level={3}
            className="mb-0 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.50)] md:mb-0"
          >
            {asFormattedTime(item.startDateTime)}
          </Heading>
          <Typography variant="h4" className="leading-tight text-white">
            {item.title}
          </Typography>
        </div>

        {item.author ? (
          <Typography
            variant="small"
            className="rounded-md bg-white/20 p-2 font-semibold text-white/90"
          >
            {getAuthorFullName(item.author)}
          </Typography>
        ) : (
          <Typography
            variant="small"
            className="rounded-md bg-white/20 p-2 font-semibold text-white/90"
          >
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Typography>
        )}
      </div>
    </>
  );

  const className = cn(
    "group relative aspect-[4/3] overflow-hidden rounded-md shadow-md",
    isClickable && "cursor-pointer transition hover:scale-[1.02]",
  );

  if (isClickable) {
    return (
      <Link href={`/schedule/${item._id}`} className={className}>
        {content}
      </Link>
    );
  }
  return <div className={className}>{content}</div>;
}

interface SlotData {
  shared: TimelineItem[];
  track1: TimelineItem[];
  track2: TimelineItem[];
}

function groupByDayAndSlot(items: TimelineItem[]) {
  const days = new Map<string, Map<string, SlotData>>();

  for (const item of items) {
    const dayKey = getDayKey(item.startDateTime);
    const hourKey = asFormattedTime(item.startDateTime, true);

    if (!days.has(dayKey)) days.set(dayKey, new Map());
    const slots = days.get(dayKey)!;

    if (!slots.has(hourKey)) {
      slots.set(hourKey, { shared: [], track1: [], track2: [] });
    }
    const slot = slots.get(hourKey)!;

    if (item.track === 1) slot.track1.push(item);
    else if (item.track === 2) slot.track2.push(item);
    else slot.shared.push(item);
  }

  return days;
}

export function ScheduleView({ items }: { items: TimelineItem[] }) {
  const days = groupByDayAndSlot(items);
  const dayKeys = Array.from(days.keys()).sort();
  const [selectedDay, setSelectedDay] = useState(dayKeys[0] ?? "");

  if (dayKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Typography variant="large" className="mb-2">
          Stay tuned!
        </Typography>
        <Typography variant="medium" className="max-w-md text-center">
          The schedule hasn&apos;t been published yet. Check back soon.
        </Typography>
      </div>
    );
  }

  const currentDaySlots = days.get(selectedDay) ?? new Map<string, SlotData>();
  const slotKeys = Array.from(currentDaySlots.keys()).sort();
  const isMultiTrack = Array.from(currentDaySlots.values()).some(
    (s) => s.track2.length > 0,
  );

  return (
    <div>
      {/* Day tabs */}
      {dayKeys.length > 1 && (
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

      {/* Track column headers */}
      {isMultiTrack && (
        <div className="mb-2 grid grid-cols-2 gap-4 px-1">
          <Typography
            variant="small"
            className="font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Track 1
          </Typography>
          <Typography
            variant="small"
            className="font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Track 2
          </Typography>
        </div>
      )}

      {/* Time slots */}
      <div className="space-y-4">
        {slotKeys.map((slotKey) => {
          const slot = currentDaySlots.get(slotKey)!;
          const hasTrackedItems =
            slot.track1.length > 0 || slot.track2.length > 0;

          return (
            <div
              key={slotKey}
              className="space-y-4 border-b-2 border-dotted border-primary/30 pb-4"
            >
              {/* Full-width items (no track assigned) */}
              {slot.shared.map((item) => (
                <TimelineCard key={item._id} item={item} />
              ))}

              {/* Tracked items */}
              {hasTrackedItems &&
                (isMultiTrack ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      {slot.track1.map((item) => (
                        <TimelineCard key={item._id} item={item} />
                      ))}
                    </div>
                    <div className="space-y-4">
                      {slot.track2.map((item) => (
                        <TimelineCard key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...slot.track1, ...slot.track2].map((item) => (
                      <TimelineCard key={item._id} item={item} />
                    ))}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
