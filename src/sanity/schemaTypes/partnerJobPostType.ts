import { defineType } from "sanity";

export const partnerJobPostType = defineType({
  name: "partnerJobPost",
  title: "Partner Job Post",
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
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
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
      name: "ctaConfig",
      title: "Call to Action Configuration",
      type: "object",
      fields: [
        {
          name: "title",
          title: "CTA Title",
          type: "string",
          initialValue: "Apply for this position",
        },
        {
          name: "link",
          title: "Application Link",
          type: "string",
          description: "Direct link to apply for this position",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      partnerName: "partner.name",
      isActive: "isActive",
    },
    prepare({ title, partnerName, isActive }) {
      return {
        title: `${title}${!isActive ? " (Inactive)" : ""}`,
        subtitle: `${partnerName} - ${isActive ? "Open" : "Closed"}`,
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
