import { defineType, type ConditionalPropertyCallback } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "isBusinessPartner",
      title: "Is Business",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "businessTier",
      title: "Partnership Tier",
      type: "string",
      options: {
        list: [
          { title: "Silver", value: "silver" },
          { title: "Gold", value: "gold" },
          { title: "Platinum", value: "platinum" },
          { title: "Diamond", value: "diamond" },
          { title: "Supporter", value: "supporter" },
        ],
      },
      hidden: (({ document }) =>
        !document?.isBusinessPartner) as ConditionalPropertyCallback,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.isBusinessPartner && !value) {
            return "Business partners must have a tier selected";
          }
          return true;
        }),
    },
    {
      name: "nonBusinessType",
      title: "Partner Type",
      type: "string",
      initialValue: "community",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Media", value: "media" },
        ],
      },
      hidden: (({ document }) =>
        document?.isBusinessPartner) as ConditionalPropertyCallback,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.isBusinessPartner && !value) {
            return "Non-business partners must have a type selected";
          }
          return true;
        }),
    },
    {
      name: "website",
      title: "Website URL",
      type: "url",
      description: "Partner's website URL",
    },
    {
      name: "partnershipPeriod",
      title: "Partnership Period",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "date",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "date",
        },
      ],
    },
    {
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) =>
            Rule.email().error("Please enter a valid email address"),
        },
      ],
    },
    {
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
      description: "Used to control the display order of partners",
    },
    {
      name: "visibility",
      title: "Visibility",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "As Sponsors", value: "sponsors" },
          { title: "As Partners", value: "partners" },
          { title: "About Us", value: "about" },
          { title: "OSDay 2025", value: "osday25" },
        ],
        layout: "checkbox",
      },
      description: "Select where this partner should be displayed",
    },
  ],
  initialValue: {
    isBusinessPartner: false,
    nonBusinessType: "community",
  },
  preview: {
    select: {
      title: "name",
      subtitle: "isBusinessPartner",
      businessTier: "businessTier",
      nonBusinessType: "nonBusinessType",
      media: "image",
    },
    prepare: (selection) => {
      const { title, subtitle, businessTier, nonBusinessType, media } =
        selection;
      const partnerType = subtitle
        ? `Business - ${businessTier}`
        : `Non-Business - ${nonBusinessType}`;

      return {
        title,
        subtitle: partnerType,
        media,
      } as const;
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Partner Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
