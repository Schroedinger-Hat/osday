import { getAuthorFullName } from "~/lib/sanity-cms";
import type { Author as SanityAuthor } from "~/sanity/sanity.types";
import { Typography } from "../atoms/typography/Typography";
import Link from "next/link";
import { asFormattedTime } from "~/lib/utils/date";
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
  const hasTalks = Array.isArray(talks) && talks.length > 0;

  return (
    <div className="relative">
      <div className="space-y-4 md:space-y-8">
        {hasTalks ? (
          <>
            {/* Continuous vertical line */}
            <div className="absolute bottom-0 left-[72px] top-0 w-px bg-black md:left-[98px]" />
            {talks.map((item) => (
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
  );
}
