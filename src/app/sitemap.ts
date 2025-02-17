import type { MetadataRoute } from "next"
import { sanityClient } from "../sanity/lib/client"
import { urlFor } from "../sanity/lib/image"
import { BASE_URL } from "../lib/utils/withFullUrl"

const STATIC_LAST_MODIFIED = new Date("2024-12-01")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core website pages
  const mainRoutes = [
    /*
    Static pages
    */
    // Home page
    {
      url: BASE_URL,
      lastModified: STATIC_LAST_MODIFIED,
    },
    // Association pages
    {
      url: `${BASE_URL}/association/about-us`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/association/join`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/association/press-kit`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    // Contribute pages
    {
      url: `${BASE_URL}/contribute/as-individual`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/contribute/as-partner`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/contribute/as-speaker`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/contribute/as-sponsor`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    // Partecipate section
    {
      url: `${BASE_URL}/partecipate/local-communities`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    {
      url: `${BASE_URL}/partecipate/projects`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    // Speakers section
    {
      url: `${BASE_URL}/speakers`,
      lastModified: STATIC_LAST_MODIFIED,
    },
    // Watch section
    {
      url: `${BASE_URL}/watch`,
      lastModified: STATIC_LAST_MODIFIED,
    },
  ]

  // Fetch all dynamic pages from Sanity
  const [pages, blogPosts, speakers, events, videos] = await Promise.all([
    // Generic CMS pages
    sanityClient.fetch<
      Array<{ slug: { current: string }; _updatedAt: string; headerImage?: { asset: any } }>
    >(
      `*[_type == "page" && defined(slug.current)]{
        slug,
        _updatedAt,
        headerImage
      }`,
    ),
    // Blog posts
    sanityClient.fetch<
      Array<{ slug: { current: string }; _updatedAt: string; headerImage?: { asset: any } }>
    >(
      `*[_type == "blogPost" && defined(slug.current)]{
        slug,
        _updatedAt,
        headerImage
      }`,
    ),
    // Speaker profiles
    sanityClient.fetch<Array<{ slug: { current: string }; _updatedAt: string; photo?: { asset: any } }>>(
      `*[_type == "author" && defined(slug.current)]{
        slug,
        _updatedAt,
        photo
      }`,
    ),
    // Events
    sanityClient.fetch<
      Array<{
        slug: { current: string }
        _updatedAt: string
        cover?: { asset: any }
        background?: { asset: any }
      }>
    >(
      `*[_type == "event" && defined(slug.current)]{
        slug,
        _updatedAt,
        cover,
        background
      }`,
    ),
    // Videos
    sanityClient.fetch<Array<{ slug: { current: string }; _updatedAt: string }>>(
      `*[_type == "video" && defined(slug.current)] | order(publishedAt desc){
        slug,
        _updatedAt
      }`,
    ),
  ])

  // Map generic CMS pages
  const pageRoutes = pages.map((page) => ({
    url: `${BASE_URL}/page/${page.slug.current}`,
    lastModified: new Date(page._updatedAt),
    ...(page.headerImage?.asset && {
      images: [urlFor(page.headerImage.asset).format("jpg").width(800).height(450).url()],
    }),
  }))

  // Map blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    ...(post.headerImage?.asset && {
      images: [urlFor(post.headerImage.asset).format("jpg").width(800).height(450).url()],
    }),
  }))

  // Map speaker profiles
  const speakerRoutes = speakers.map((speaker) => ({
    url: `${BASE_URL}/speaker/${speaker.slug.current}`,
    lastModified: new Date(speaker._updatedAt),
    ...(speaker.photo?.asset && {
      images: [urlFor(speaker.photo.asset).format("jpg").width(800).height(450).url()],
    }),
  }))

  // Map events
  const eventRoutes = events.map((event) => ({
    url: `${BASE_URL}/partecipate/events/${event.slug.current}`,
    lastModified: new Date(event._updatedAt),
    ...((event.cover?.asset || event.background?.asset) && {
      images: [
        urlFor(event.cover?.asset || event.background?.asset)
          .format("jpg")
          .width(800)
          .height(450)
          .url(),
      ],
    }),
  }))

  // Map videos
  const videoRoutes = videos.map((video) => ({
    url: `${BASE_URL}/watch/${video.slug.current}`,
    lastModified: new Date(video._updatedAt),
  }))

  return [...mainRoutes, ...pageRoutes, ...blogRoutes, ...speakerRoutes, ...eventRoutes, ...videoRoutes]
}
