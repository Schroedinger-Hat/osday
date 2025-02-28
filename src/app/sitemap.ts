import type { MetadataRoute } from "next";
import { sanityClient } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { BASE_URL } from "../lib/utils/withFullUrl";

const STATIC_LAST_MODIFIED = new Date("2024-12-01");
const STATIC_CHANGE_FREQUENCY = "yearly";

/**
 * Encodes special characters in URLs for XML compatibility
 * Used to ensure sitemap URLs are properly escaped
 */
function encodeXMLUrl(url: string): string {
  return url
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core website pages
  const mainRoutes: MetadataRoute.Sitemap = [
    /*
    Static pages
    */
    // Home page
    {
      url: encodeXMLUrl(BASE_URL),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    // Main pages
    {
      url: encodeXMLUrl(`${BASE_URL}/schedule`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/sponsors`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/venue`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    // Secondary pages
    {
      url: encodeXMLUrl(`${BASE_URL}/faqs`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/speakers-faqs`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/jobs`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/press-kit`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/previous-events`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/schroddy`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
    {
      url: encodeXMLUrl(`${BASE_URL}/volunteers`),
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: STATIC_CHANGE_FREQUENCY,
    },
  ];

  // Fetch all dynamic pages from Sanity
  const [pages, schedule] = await Promise.all([
    // Pages
    sanityClient.fetch<
      Array<{
        slug: { current: string };
        _updatedAt: string;
        headerImage?: { asset: any };
      }>
    >(
      `*[_type == "page" && defined(slug.current)]{
        slug,
        _updatedAt,
        headerImage
      }`,
    ),
    // Schedule
    sanityClient.fetch<
      Array<{
        _id: string;
        _updatedAt: string;
        type: string;
        backgroundImage?: { asset: any };
      }>
    >(
      `*[_type == "timeline" && (type == "talk" || type == "keynote")]{
        _id,
        _updatedAt,
        type,
        backgroundImage
      }`,
    ),
  ]);

  // Map generic CMS pages
  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: encodeXMLUrl(`${BASE_URL}/page/${page.slug.current}`),
    lastModified: new Date(page._updatedAt),
    changeFrequency: STATIC_CHANGE_FREQUENCY,
    ...(page.headerImage?.asset && {
      images: [
        encodeXMLUrl(
          urlFor(page.headerImage.asset)
            .format("jpg")
            .width(800)
            .height(600)
            .url(),
        ),
      ],
    }),
  }));

  // Map schedule
  const scheduleRoutes: MetadataRoute.Sitemap = schedule.map((schedule) => ({
    url: encodeXMLUrl(`${BASE_URL}/schedule/${schedule._id}`),
    lastModified: new Date(schedule._updatedAt),
    changeFrequency: STATIC_CHANGE_FREQUENCY,
    ...(schedule.backgroundImage && {
      images: [
        encodeXMLUrl(
          urlFor(schedule.backgroundImage)
            .format("jpg")
            .width(800)
            .height(600)
            .url(),
        ),
      ],
    }),
  }));

  // Combine all routes and return
  return [...mainRoutes, ...pageRoutes, ...scheduleRoutes];
}
