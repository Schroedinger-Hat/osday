import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

// Load environment variables
try {
  dotenv.config();
  console.log("✅ Loaded environment variables from .env file");
} catch (err) {
  console.warn("Failed to load .env file:", err);
}

// Create Sanity client manually instead of using the app's client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

// Base URL for building absolute URLs
const BASE_URL = "https://osday.dev";

// Verify Algolia environment variables
const APP_ID =
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? process.env.ALGOLIA_APP_ID;
// Use admin API key for write operations
const API_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY ??
  process.env.ALGOLIA_ADMIN_API_KEY;
const INDEX_NAME =
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? process.env.ALGOLIA_INDEX_NAME;

if (!APP_ID || !API_KEY || !INDEX_NAME) {
  console.error("Missing Algolia environment variables!");
  console.error("Please set the following in your .env file:");
  console.error("- NEXT_PUBLIC_ALGOLIA_APP_ID or ALGOLIA_APP_ID");
  console.error(
    "- NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY or ALGOLIA_ADMIN_API_KEY (for indexing)",
  );
  console.error("- NEXT_PUBLIC_ALGOLIA_INDEX_NAME or ALGOLIA_INDEX_NAME");
  process.exit(1);
}

console.log("✅ Environment setup complete:");
console.log(`- Sanity Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
console.log(
  `- Sanity Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
);
console.log(
  `- Sanity API Version: ${process.env.NEXT_PUBLIC_SANITY_API_VERSION}`,
);
console.log(`- Algolia App ID: ${APP_ID}`);
console.log(`- Algolia Index: ${INDEX_NAME}`);

// Static routes from sitemap.ts
const STATIC_ROUTES = [
  "/",
  "/schedule",
  "/sponsors",
  "/venue",
  "/faqs",
  "/speakers-faqs",
  "/jobs",
  "/press-kit",
  "/previous-events",
  "/schroddy",
  "/volunteers",
];

// Helper to build URLs
function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}`;
}

// Helper function to build image URL
function imageUrlBuilder(source: any) {
  // Simple implementation for urlFor replacement
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!source?._ref) return "";

  const reference = source._ref || source.asset?._ref;
  if (!reference) return "";

  const [type, id, dimensions] = reference.split("-");
  if (type !== "image" || !id) return "";

  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}`;

  // Extract dimensions and format if present in the reference
  if (dimensions) {
    const format = dimensions.split(".").pop();
    if (format) {
      url += `.${format}`;
    }
  } else {
    url += `.jpg`; // Default format
  }

  return url + "?w=800&h=600&fit=crop";
}

// Helper function to extract plain text from Sanity objects
function extractTextFromSanityObject(obj: unknown): string {
  // If it's a string, return it directly
  if (typeof obj === "string") return obj;

  // If it's null/undefined, return empty string
  if (!obj) return "";

  // If it's an array, recursively extract text from each item
  if (Array.isArray(obj)) {
    return obj.map((item) => extractTextFromSanityObject(item)).join(" ");
  }

  const objTyped = obj as Record<string, unknown>;

  // If it has a text property (common in Sanity spans)
  if (typeof objTyped.text === "string") return objTyped.text;

  // If it has children (common in Sanity blocks), recursively extract from children
  if (objTyped.children) {
    return extractTextFromSanityObject(objTyped.children);
  }

  // For other objects, try to extract from their values
  if (typeof obj === "object" && obj !== null) {
    try {
      const keys = Object.keys(objTyped);
      if (keys.length === 0) return "";

      return keys
        .map((key) => {
          const val = objTyped[key];
          return extractTextFromSanityObject(val);
        })
        .filter(Boolean)
        .join(" ");
    } catch {
      return "";
    }
  }

  // Fallback for primitives
  try {
    // For primitive values only
    if (
      typeof obj === "number" ||
      typeof obj === "boolean" ||
      obj === null ||
      obj === undefined
    ) {
      return String(obj);
    }
    return "";
  } catch {
    return "";
  }
}

// Helper function to format titles
function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Get all URLs including static routes and Sanity content
async function getAllContentForIndex() {
  console.log("📋 Collecting all content for indexing...");

  // 1. Static routes
  const staticRecords = STATIC_ROUTES.map((path) => {
    // Extract page name from path
    const pageName =
      path === "/"
        ? "Home"
        : (path.split("/").pop()?.replace(/-/g, " ") ?? path);

    return {
      objectID: path,
      url: buildUrl(path),
      path,
      title: toTitleCase(`${pageName} - Open Source Day`),
      type: "page",
      description: `Open Source Day - ${toTitleCase(pageName)}`,
      lastModified: new Date().toISOString(),
      source: "osday",
    };
  });

  // 2. CMS pages from Sanity
  console.log("📄 Fetching CMS pages from Sanity...");
  const pages = await sanityClient.fetch<
    Array<{
      slug: { current: string };
      _updatedAt: string;
      title?: string | Record<string, unknown>;
      description?: unknown;
      headerImage?: { asset: Record<string, unknown> };
    }>
  >(
    `*[_type == "page" && defined(slug.current)]{
      slug,
      _updatedAt,
      title,
      description,
      headerImage
    }`,
  );
  console.log(`Found ${pages.length} CMS pages`);

  const pageRecords = pages.map((page) => {
    const path = `/page/${page.slug.current}`;
    const title = page.title
      ? extractTextFromSanityObject(page.title)
      : toTitleCase(page.slug.current.replace(/-/g, " "));

    const record = {
      objectID: path,
      url: buildUrl(path),
      path,
      title,
      type: "cms_page",
      description: page.description
        ? extractTextFromSanityObject(page.description)
        : undefined,
      lastModified: page._updatedAt,
      source: "osday",
    };

    // Add image only if it exists
    if (page.headerImage?.asset) {
      return {
        ...record,
        image: imageUrlBuilder(page.headerImage.asset),
      };
    }

    return record;
  });

  // 3. Schedule items from Sanity
  console.log("🗓️ Fetching schedule items from Sanity...");
  const scheduleItems = await sanityClient.fetch<
    Array<{
      _id: string;
      _updatedAt: string;
      type: string;
      title?: Record<string, unknown>;
      description?: unknown;
      speaker?: {
        name?: string;
        bio?: unknown;
      };
      backgroundImage?: { asset: Record<string, unknown> };
    }>
  >(
    `*[_type == "timeline" && (type == "talk" || type == "keynote")]{
      _id,
      _updatedAt,
      type,
      title,
      description,
      speaker{
        name,
        bio
      },
      backgroundImage
    }`,
  );
  console.log(`Found ${scheduleItems.length} schedule items`);

  const scheduleRecords = scheduleItems.map((item) => {
    const path = `/schedule/${item._id}`;
    const title = item.title
      ? extractTextFromSanityObject(item.title)
      : `${toTitleCase(item.type ?? "event")}`;

    // Combine description with speaker info if available
    let description = item.description
      ? extractTextFromSanityObject(item.description)
      : "";
    if (item.speaker?.name) {
      description += ` Speaker: ${item.speaker.name}.`;
      if (item.speaker.bio) {
        description += ` ${extractTextFromSanityObject(item.speaker.bio)}`;
      }
    }

    const record = {
      objectID: path,
      url: buildUrl(path),
      path,
      title,
      type: item.type ?? "event",
      description: description || undefined,
      lastModified: item._updatedAt,
      source: "osday",
    };

    // Add image only if it exists
    if (item.backgroundImage?.asset) {
      return {
        ...record,
        image: imageUrlBuilder(item.backgroundImage.asset),
      };
    }

    return record;
  });

  return [...staticRecords, ...pageRecords, ...scheduleRecords];
}

async function main() {
  console.log("🔍 Starting Algolia reindexing...");

  try {
    if (!APP_ID || !API_KEY || !INDEX_NAME) {
      throw new Error("Missing required Algolia credentials");
    }

    // Initialize Algolia client with type assertion since we checked above
    const client = algoliasearch(APP_ID, API_KEY);
    const index = client.initIndex(INDEX_NAME);

    // Get all content
    const records = await getAllContentForIndex();
    console.log(`📋 Found ${records.length} items to index`);

    console.log(records);
    await index.saveObjects(records);
    console.log(`✅ Successfully indexed ${records.length} items to Algolia`);
  } catch (error) {
    console.error("❌ Error during indexing:", error);
    process.exit(1);
  }
}

// Call main and handle promise rejection
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
