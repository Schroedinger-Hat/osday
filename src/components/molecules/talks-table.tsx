"use client";

import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import { Typography } from "../atoms/typography/Typography";

const gradients = [
  "from-blue-500/70 to-purple-500/70 bg-slate-900/80",
  "from-rose-500/70 to-orange-500/70 bg-slate-900/80",
  "from-green-500/70 to-teal-500/70 bg-slate-900/80",
  "from-violet-500/70 to-indigo-500/70 bg-slate-900/80",
  "from-amber-500/70 to-yellow-500/70 bg-slate-900/80",
];

export interface TimelineItem {
  _id: string;
  _type: "timeline";
  type: string;
  startDateTime: string;
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

export function TalksTable({ talks }: TalksTableProps) {
  return (
    <div className="space-y-12">
      {talks.map((item, index) => (
        <div key={item._id} className="flex items-start gap-4">
          <div
            className={`aspect-square w-16 shrink-0 rounded-md bg-gradient-to-br ${
              gradients[index % gradients.length]
            } p-3 backdrop-blur-xl`}
          >
            <Typography
              variant="large"
              className="flex h-full items-center justify-center font-title text-xl tracking-wide text-white"
            >
              {new Date(item.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </div>

          <div className="space-y-1">
            {item.author && (
              <Typography variant="lead" className="mb-0 font-title md:mb-0">
                {getAuthorFullName(item.author)}
              </Typography>
            )}
            <Typography variant="large" className="mt-0 font-mono md:mt-0">
              {item.title}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
