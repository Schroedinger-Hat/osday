import type { MetadataRoute } from "next"
import { BASE_URL } from "../lib/utils/withFullUrl"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
