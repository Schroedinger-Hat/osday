import { defineType } from "sanity"

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "eventSeries" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: async (doc: { series?: { _ref: string }; title?: string }, { getClient }) => {
          const client = getClient({ apiVersion: "2023-05-03" })

          if (!doc.series || !doc.title) return ""

          const series = await client.fetch(`*[_type == "eventSeries" && _id == $seriesId][0].slug.current`, {
            seriesId: doc.series._ref,
          })

          return series ? `${series}/${doc.title}` : doc.title
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "organiser",
      title: "Organiser",
      type: "string",
      initialValue: "Schrödinger Hat",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "abstract",
      type: "array",
      title: "Abstract",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "background",
      title: "Background",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cardImage",
      title: "Card Image",
      description: "The image used for the event card, social sharing always uses cover if available",
      type: "string",
      options: {
        list: [
          { title: "Background", value: "background" },
          { title: "Cover", value: "cover" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Location Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Address",
          type: "string",
        },
        {
          name: "city",
          title: "City",
          type: "string",
        },
        {
          name: "coordinates",
          title: "Coordinates",
          type: "geopoint",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eventPeriod",
      title: "Event Period",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "datetime",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "datetime",
        },
      ],
    },
    {
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "url",
        },
      ],
    },
    {
      name: "coolBecause",
      title: "Cool Because",
      description: "Explain why visitors should join this event (marketing pitch)",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.max(3).warning("Consider keeping it to 3 key points"),
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
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: "title",
      authors: "authors",
      media: "background",
      series: "series.title",
    },
    prepare(selection) {
      const { title, authors, media, series } = selection

      const authorText = authors?.length ? `${authors.length} authors` : "No authors"

      const subtitle = series ? `[${series}] ${authorText}` : authorText

      return {
        title,
        subtitle,
        media,
      }
    },
  },
  initialValue: {
    cardImage: "background",
  },
  orderings: [
    {
      title: "Start Date, Desc",
      name: "startDateDesc",
      by: [{ field: "eventPeriod.startDate", direction: "desc" }],
    },
  ],
})
