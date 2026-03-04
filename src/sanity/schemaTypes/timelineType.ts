import { defineType } from "sanity";

export const timelineType = defineType({
  name: "timeline",
  title: "Timeline",
  type: "document",
  orderings: [
    {
      title: "Start Date",
      name: "startDateAsc",
      by: [{ field: "startDateTime", direction: "asc" }],
    },
  ],
  fields: [
    {
      name: "track",
      title: "Track",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(0).max(4).integer(),
      options: {
        list: [
          { title: "Shared (full width)", value: 0 },
          { title: "Track 1", value: 1 },
          { title: "Track 2", value: 2 },
          { title: "Track 3", value: 3 },
          { title: "Track 4", value: 4 },
        ],
      },
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      initialValue: 2026,
      validation: (Rule) => Rule.required().min(2025).max(2026),
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description:
        "Background image for the timeline card. Recommended size: 800x600px",
      options: {
        hotspot: true, // Enables UI for selecting what areas of an image should be cropped
      },
    },
    {
      name: "startDateTime",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDateTime",
      title: "End Date & Time",
      type: "datetime",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "titleShort",
      title: "Title (Short)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Logistic", value: "logistic" },
          { title: "Keynote", value: "keynote" },
          { title: "Talk", value: "talk" },
          { title: "Break", value: "Break" },
          { title: "Drink", value: "drink" },
        ],
      },
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
      name: "speaker",
      title: "Speaker",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "coSpeaker",
      title: "Co-Speaker",
      type: "reference",
      to: [{ type: "author" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      track: "track",
      type: "type",
      startTime: "startDateTime",
    },
    prepare(selection: any) {
      const { title, track, type, startTime } = selection;
      const trackNumber = typeof track === "number" ? track : Number(track);
      const date = startTime
        ? new Date(startTime as string).toLocaleTimeString()
        : "";
      return {
        title,
        subtitle: `${trackNumber === 0 ? "Shared" : `Track ${trackNumber}`} | ${type} | ${date}`,
      };
    },
  },
});
