import { defineType } from "sanity"
import React from "react"
import type { Author, Video } from "../sanity.types"

// Helper function to extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string => {
  try {
    const urlObj = new URL(url)

    // Handle youtu.be
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1)
    }

    // Handle youtube.com
    if (urlObj.hostname.includes("youtube.com")) {
      // Handle /watch?v=
      const searchParams = new URLSearchParams(urlObj.search)
      const videoId = searchParams.get("v")
      if (videoId) return videoId

      // Handle /shorts/ or /embed/
      const regex = new RegExp(/\/(shorts|embed)\/([^/?]+)/)
      const execResult = regex.exec(urlObj.pathname)
      if (execResult?.[2]) return execResult[2]
    }

    return url
  } catch {
    // If URL parsing fails, return the original string
    return url
  }
}

export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortTitle",
      title: "Short Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: async (doc: Video, { getClient }) => {
          // Get the first author reference
          const authorRef = doc.authors?.[0]?._ref
          if (!authorRef) return doc.title

          // Fetch the author document
          const client = getClient({ apiVersion: "2024-03-01" })
          const author = await client.fetch<Author>(`*[_id == $authorRef][0]{slug}`, { authorRef })

          // Combine author slug with title
          return `${author?.slug?.current ?? ""}-${doc.title}`
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "youtubeId",
      title: "YouTube Video ID or URL",
      type: "string",
      description: "Paste either the video ID or the full YouTube URL",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "thumbnail",
      title: "Custom Thumbnail",
      type: "image",
      description: "Optional custom thumbnail. If not provided, the YouTube thumbnail will be used",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "whyShouldWatch",
      title: "Why Should Watch",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Talk", value: "talk" },
          { title: "Workshop", value: "workshop" },
          { title: "Podcast", value: "podcast" },
          { title: "Generic", value: "generic" },
        ],
      },
    },
    {
      name: "featured",
      title: "Featured Video",
      type: "boolean",
      description: "Display this video prominently in the gallery",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Used to control the display order of videos (lower numbers appear first)",
    },
  ],
  preview: {
    select: {
      title: "title",
      shortTitle: "shortTitle",
      media: "thumbnail",
      youtubeId: "youtubeId",
      authorFirstName: "authors.0.firstName",
      authorLastName: "authors.0.lastName",
      thumbnail: "thumbnail",
    },
    prepare: (selection) => {
      const { title, shortTitle, youtubeId, authorFirstName, authorLastName, thumbnail } = selection
      const safeYoutubeId = youtubeId ?? extractYouTubeId(youtubeId as unknown as string)

      return {
        title: shortTitle ?? title ?? "Untitled Video",
        subtitle: `${authorFirstName} ${authorLastName}`,
        media: !thumbnail ? (
          <img src={`https://img.youtube.com/vi/${safeYoutubeId}/mqdefault.jpg`} alt="YouTube Thumbnail" />
        ) : (
          thumbnail
        ),
      }
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Publication Date",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
})
