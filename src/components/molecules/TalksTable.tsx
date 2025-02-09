"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/atoms/typography/Typography";
import { cn } from "~/lib/utils";
import { PortableText } from "next-sanity";
import { createPortableTextComponents } from "../atoms/portableTextComponents";
import { TimelineTypeIcon } from "~/components/atoms/TimelineTypeIcon";

export interface TimelineItem {
  _id: string;
  _type: "timeline";
  type: string;
  startDateTime: string;
  title: string;
  author?: SanityAuthor;
  note?: string;
}

interface TalksTableProps {
  talks: TimelineItem[];
}

function DetailedView({ talks }: TalksTableProps) {
  const [selectedTalkId, setSelectedTalkId] = useState<string | null>(
    talks[0]?._id ?? null,
  );
  const selectedTalk = talks.find((t) => t._id === selectedTalkId);

  return (
    <div className="grid grid-cols-3 gap-12 rounded-sm border p-8 shadow-sm">
      {/* Left column - Schedule List */}
      <div className="space-y-6">
        {talks.map((talk, index) => (
          <div
            key={talk._id}
            className={cn(
              "cursor-pointer text-center transition-colors",
              selectedTalkId === talk._id
                ? "text-blue-900"
                : "text-blue-900/70 hover:text-blue-900",
            )}
            onClick={() => setSelectedTalkId(talk._id)}
          >
            {talk.author && (
              <h3 className="text-2xl font-semibold">
                {getAuthorFullName(talk.author)}
              </h3>
            )}
            <p className="mt-1 text-xl">{talk.titleShort}</p>
            <p className="mt-2 font-mono">
              {new Date(talk.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </p>
            {index < talks.length - 1 && (
              <div className="mt-6 border-t border-blue-100" />
            )}
          </div>
        ))}
      </div>

      {/* Right column - Notes */}
      <div className="col-span-2">
        {selectedTalk?.abstract ? (
          <PortableText
            value={selectedTalk.abstract}
            components={createPortableTextComponents(
              "md:text-lg md:leading-relaxed",
            )}
          />
        ) : (
          <Typography className="text-muted-foreground">
            No additional notes available.
          </Typography>
        )}
      </div>
    </div>
  );
}

function CompactView({ talks }: TalksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Speaker</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {talks.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-mono">
              {new Date(item.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </TableCell>
            <TableCell>
              <TimelineTypeIcon type={item.type} />
            </TableCell>
            <TableCell>
              {item.author ? getAuthorFullName(item.author) : "—"}
            </TableCell>
            <TableCell>{item.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TalksTable({ talks }: TalksTableProps) {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div>
      {isCompact ? (
        <CompactView talks={talks} />
      ) : (
        <DetailedView talks={talks} />
      )}

      <div className="flex justify-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setIsCompact(!isCompact)}
        >
          Switch to {isCompact ? "detailed" : "compact"} view
        </Button>
      </div>
    </div>
  );
}
