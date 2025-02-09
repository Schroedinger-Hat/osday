import { defineType } from "sanity"

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "groupKey",
      title: "Group Key",
      type: "string",
      description: "Key to group FAQs for different pages (e.g., 'membership', 'general', 'local-community')",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
      description: "Display order within the group",
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "groupKey",
    },
  },
  orderings: [
    {
      title: "Group & Order",
      name: "groupAndOrderAsc",
      by: [
        { field: "groupKey", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
})
