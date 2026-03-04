"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar03Icon,
  Mic01Icon,
  BubbleChatIcon,
  Coffee02Icon,
  DrinkIcon,
} from "hugeicons-react";
import { cn } from "~/lib/utils";
import { asFormattedTime } from "~/lib/utils/date";
import { getAuthorFullName } from "~/lib/sanity-cms";
import { urlFor } from "~/sanity/lib/image";
import { Typography } from "~/components/atoms/typography/Typography";
import type { TimelineItem } from "./talks-table";

// ─── Constants ─────────────────────────────────────────────────────────────────

const SLOT_MINUTES = 15;
const SLOT_HEIGHT_PX = 32;

// ─── Per-type visual config ─────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  string,
  { border: string; bg: string; iconClass: string; badge: string; ring: string }
> = {
  talk: {
    border: "border-l-purple-500",
    bg: "bg-purple-500/8",
    iconClass: "text-purple-500",
    badge: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
    ring: "ring-purple-400/60",
  },
  keynote: {
    border: "border-l-rose-500",
    bg: "bg-rose-500/8",
    iconClass: "text-rose-500",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    ring: "ring-rose-400/60",
  },
  break: {
    border: "border-l-green-500",
    bg: "bg-green-500/8",
    iconClass: "text-green-500",
    badge: "bg-green-500/15 text-green-600 dark:text-green-400",
    ring: "ring-green-400/60",
  },
  Break: {
    border: "border-l-green-500",
    bg: "bg-green-500/8",
    iconClass: "text-green-500",
    badge: "bg-green-500/15 text-green-600 dark:text-green-400",
    ring: "ring-green-400/60",
  },
  logistic: {
    border: "border-l-gray-400",
    bg: "bg-gray-500/8",
    iconClass: "text-gray-400",
    badge: "bg-gray-500/15 text-gray-500 dark:text-gray-400",
    ring: "ring-gray-400/60",
  },
  drink: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/8",
    iconClass: "text-amber-500",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    ring: "ring-amber-400/60",
  },
};

const DEFAULT_CONFIG = TYPE_CONFIG.talk!;

// ─── Type icon (inline, size 16) ────────────────────────────────────────────────

function TypeIcon({ type, className }: { type: string; className?: string }) {
  const props = { size: 16, className: cn("shrink-0", className) };
  switch (type) {
    case "logistic":
      return <Calendar03Icon {...props} />;
    case "keynote":
      return <BubbleChatIcon {...props} />;
    case "talk":
      return <Mic01Icon {...props} />;
    case "break":
    case "Break":
      return <Coffee02Icon {...props} />;
    case "drink":
      return <DrinkIcon {...props} />;
    default:
      return null;
  }
}

function typeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// ─── Day helpers ────────────────────────────────────────────────────────────────

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

// ─── Time helpers ───────────────────────────────────────────────────────────────

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

// ─── Avatar ─────────────────────────────────────────────────────────────────────

function AuthorAvatar({
  author,
}: {
  author: NonNullable<TimelineItem["author"]>;
}) {
  const initials =
    (
      (author.firstName?.[0] ?? "") + (author.lastName?.[0] ?? "")
    ).toUpperCase() || "?";

  if (author.photo?.asset) {
    return (
      <Image
        src={urlFor(author.photo).width(56).height(56).url()}
        alt={getAuthorFullName(author)}
        width={38}
        height={38}
        className={cn("rounded-sm object-cover")}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold",
      )}
    >
      {initials}
    </span>
  );
}

// ─── ScheduleCard ───────────────────────────────────────────────────────────────

function ScheduleCard({ item }: { item: TimelineItem }) {
  const isClickable = item.type === "talk" || item.type === "keynote";
  const cfg = TYPE_CONFIG[item.type] ?? DEFAULT_CONFIG;

  const content = (
    <div className="flex flex-col gap-2">
      {/* Top row: type badge (icon + label) · time */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            cfg.badge,
          )}
        >
          <TypeIcon type={item.type} className={cfg.iconClass} />
        </span>
        <span className="text-xs text-muted-foreground">
          {typeLabel(item.type)} •{" "}
          <strong>
            {asFormattedTime(item.startDateTime)}
            {item.endDateTime && ` – ${asFormattedTime(item.endDateTime)}`}
          </strong>
        </span>
      </div>

      {/* Title */}
      <Typography
        variant="small"
        className="line-clamp-2 flex-1 font-bold leading-snug"
        as="p"
      >
        {item.title}
      </Typography>

      {/* Bottom row: author name(s) + avatar(s) */}
      {item.author && (
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="small"
            className="truncate text-muted-foreground"
          >
            {getAuthorFullName(item.author)}
            {item.coSpeaker && ` & ${getAuthorFullName(item.coSpeaker)}`}
          </Typography>
          <div className="flex shrink-0 -space-x-2">
            {item.coSpeaker && (
              <AuthorAvatar author={item.coSpeaker} />
            )}
            <AuthorAvatar author={item.author} />
          </div>
        </div>
      )}
    </div>
  );

  const shellClass = cn(
    "flex-1 flex flex-col rounded-md border border-border/60 border-l-4 px-3 py-2.5 gap-2 shadow-sm",
    cfg.border,
    cfg.bg,
    isClickable &&
      "cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 hover:border-l-4",
  );

  if (isClickable) {
    return (
      <Link href={`/schedule/${item._id}`} className={shellClass}>
        {content}
      </Link>
    );
  }
  return <div className={shellClass}>{content}</div>;
}

// ─── ScheduleView ───────────────────────────────────────────────────────────────

export function ScheduleView({ items }: { items: TimelineItem[] }) {
  const dayKeys = items.length
    ? [...new Set(items.map((i) => getDayKey(i.startDateTime)))].sort()
    : [];

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

  const visibleItems = items.filter(
    (i) => getDayKey(i.startDateTime) === selectedDay,
  );

  const hasMultiTrack = visibleItems.some(
    (t) => t.track === 1 || t.track === 2,
  );

  // Group by start minute
  const slotMap = new Map<number, TimelineItem[]>();
  for (const item of visibleItems) {
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
      {hasMultiTrack && (
        <div className="mb-2 hidden grid-cols-2 gap-2 px-1 sm:grid">
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

      {/* Slot rows */}
      <div className="flex flex-col gap-2">
        {sortedSlots.map(([startMin, slotItems]) => {
          const track1 = slotItems.filter((i) => i.track === 1);
          const track2 = slotItems.filter((i) => i.track === 2);
          const shared = slotItems.filter(
            (i) => (i.track ?? 0) === 0 || (i.track ?? 0) > 2,
          );
          const isParallelRow =
            hasMultiTrack && track1.length > 0 && track2.length > 0;

          return (
            <div key={startMin} className="flex flex-col gap-2">
              {/* Shared / full-width */}
              {shared.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col"
                  style={{
                    minHeight: durationToPx(getDuration(item, startMin)),
                  }}
                >
                  <ScheduleCard item={item} />
                </div>
              ))}

              {/* Both tracks present → side-by-side on sm+, stacked on mobile */}
              {isParallelRow && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div
                    className="flex flex-col"
                    style={{
                      minHeight: durationToPx(
                        Math.max(...track1.map((i) => getDuration(i, startMin))),
                      ),
                    }}
                  >
                    {track1.map((item) => (
                      <ScheduleCard key={item._id} item={item} />
                    ))}
                  </div>
                  <div
                    className="flex flex-col"
                    style={{
                      minHeight: durationToPx(
                        Math.max(...track2.map((i) => getDuration(i, startMin))),
                      ),
                    }}
                  >
                    {track2.map((item) => (
                      <ScheduleCard key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Only one track → full-width */}
              {!isParallelRow &&
                [...track1, ...track2].map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col"
                    style={{
                      minHeight: durationToPx(getDuration(item, startMin)),
                    }}
                  >
                    <ScheduleCard item={item} />
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
