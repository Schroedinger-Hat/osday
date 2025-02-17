import { unstable_cache } from "next/cache";
import { sanityClient } from "~/sanity/lib/client";
import type { QueryParams } from "@sanity/client";

type SanityFetchOptions = {
  /** Time in seconds to cache the data. Defaults to 60 seconds */
  cacheDuration?: number;
  /** Tags to use for cache invalidation */
  tags?: string[];
};

/**
 * Fetches data from Sanity with caching and revalidation
 * @param query The GROQ query to execute
 * @param params Query parameters
 * @param options Caching options
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> | undefined,
  options: SanityFetchOptions = {},
): Promise<T> {
  const { cacheDuration = 60, tags = [] } = options;

  // Create a cache key based on the query and params
  const cacheKey = JSON.stringify({ query, params });

  // Use Next.js unstable_cache for data caching
  return unstable_cache(
    async () => {
      return params
        ? sanityClient.fetch<T>(query, params)
        : sanityClient.fetch<T>(query);
    },
    [cacheKey],
    {
      revalidate: cacheDuration,
      tags: ["sanity", ...tags],
    },
  )();
}

// Utility function to generate cache tags for different content types
export const getCacheTag = {
  speakers: () => "speakers",
  timeline: () => "timeline",
  sponsors: () => "sponsors",
  event: (slug?: string) => `event${slug ? `:${slug}` : ""}`,
  faqs: (groupKey?: string) => `faqs${groupKey ? `:${groupKey}` : ""}`,
  jobs: (id?: string) => `jobs${id ? `:${id}` : ""}`,
};
