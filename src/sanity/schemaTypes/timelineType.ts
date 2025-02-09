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
      validation: (Rule) => Rule.required().min(1).max(4).integer(),
      options: {
        list: [
          { title: "Track 1", value: 1 },
          { title: "Track 2", value: 2 },
          { title: "Track 3", value: 3 },
          { title: "Track 4", value: 4 },
        ],
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
  ],
  preview: {
    select: {
      title: "title",
      track: "track",
      type: "type",
      startTime: "startDateTime",
    },
    prepare({
      title,
      track,
      type,
      startTime,
    }: {
      title: string;
      track: number;
      type: string;
      startTime: string;
    }) {
      const date = startTime ? new Date(startTime).toLocaleTimeString() : "";
      return {
        title,
        subtitle: `Track ${track} | ${type} | ${date}`,
      };
    },
  },
});
