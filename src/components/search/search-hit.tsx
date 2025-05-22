"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Hit } from "instantsearch.js";

// Define the structure of a search hit
interface SearchHitData {
  objectID: string;
  title: string;
  url: string;
  type: string;
  description?: string;
  image?: string;
  lastModified?: string;
  [key: string]: any; // Add index signature for type compatibility
}

// Component for rendering individual search result hits
interface SearchHitProps {
  hit: Hit<SearchHitData>;
  onClick: () => void;
}

export function SearchHit({ hit, onClick }: SearchHitProps) {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(hit.url);
  };

  // Format the type for display
  const typeDisplay = hit.type?.replace(/_/g, " ");

  return (
    <Link
      href={hit.url}
      onClick={handleClick}
      className="block cursor-pointer px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-fiery-red">{hit.title}</span>
          {typeDisplay && (
            <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-700">
              {typeDisplay}
            </span>
          )}
        </div>
        {hit.description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {hit.description.length > 120
              ? `${hit.description.substring(0, 120)}...`
              : hit.description}
          </p>
        )}
      </div>
    </Link>
  );
}
