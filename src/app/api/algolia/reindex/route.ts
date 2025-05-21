import { NextResponse } from "next/server";
import { env } from "~/env";
import algoliasearch from "algoliasearch";
import { BASE_URL } from "~/lib/utils/withFullUrl";

// Helper to build full URLs
function buildUrl(path: string): string {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Remove trailing slash from BASE_URL if it exists
  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

  // Join base and path
  return `${base}${normalizedPath}`;
}

/**
 * Route handler for reindexing the Algolia search index
 * This can be called via a webhook to update the search index when content changes.
 */
export async function POST(request: Request) {
  try {
    // Verify the secret
    const searchParams = new URL(request.url).searchParams;
    const secret = searchParams.get("secret");

    if (!secret || secret !== env.ALGOLIA_SEARCH_API_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Initialize Algolia client
    const client = algoliasearch(
      env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
      env.ALGOLIA_SEARCH_API_KEY ?? "",
    );

    const index = client.initIndex(env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "");

    // Get all URLs from sitemap
    const urls = await getAllUrls();

    // Create records for Algolia
    const records = await Promise.all(
      urls.map(async (url) => {
        // Extract page title and type from URL
        const path = url.path;
        const segments = path.split("/").filter(Boolean);
        const type = segments[0] ?? "page";

        const title =
          path === "/"
            ? "Open Source Day 2025 - Home"
            : `${segments[segments.length - 1]?.replace(/-/g, " ")} - Open Source Day 2025`;

        return {
          objectID: path,
          url: url.url,
          path,
          title: toTitleCase(title),
          type,
          description: `Open Source Day 2025 - ${toTitleCase(type)}`,
          lastModified: new Date().toISOString(),
        };
      }),
    );

    // Index the records
    await index.saveObjects(records);

    return new NextResponse(
      JSON.stringify({ success: true, count: records.length }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Algolia reindex error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Helper function to get all URLs
async function getAllUrls() {
  // This is a simplified version - in production, you'd want to get
  // these from your CMS or database
  const basePaths = [
    "/",
    "/about",
    "/speakers",
    "/schedule",
    "/tickets",
    "/venue",
    "/faq",
    "/sponsors",
    "/code-of-conduct",
  ];

  return basePaths.map((path) => {
    return {
      url: buildUrl(path),
      path,
    };
  });
}

// Helper function to format titles
function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
