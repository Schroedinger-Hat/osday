import { defineType } from "sanity";

export const jobPostType = defineType({
  name: "jobPost",
  title: "Job Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "effort",
      title: "Effort",
      type: "string",
      options: {
        list: [
          { title: "Low (<4 hours/month)", value: "low" },
          { title: "Moderate (4-8 hours/month)", value: "moderate" },
          { title: "Elevate (>8 hours/month)", value: "elevate" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this position is currently open",
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      effort: "effort",
      isActive: "isActive",
    },
    prepare({ title, effort, isActive }) {
      return {
        title: `${title}${!isActive ? " (Inactive)" : ""}`,
        subtitle: `${isActive ? "Open" : "Closed"} - ${effort} effort`,
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
