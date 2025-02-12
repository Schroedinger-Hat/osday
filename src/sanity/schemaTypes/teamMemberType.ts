import { defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "surname",
      title: "Surname",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
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
      title: "name",
      surname: "surname",
      subtitle: "role",
      media: "image",
    },
    prepare(selection) {
      const { title, surname, subtitle, media } = selection;
      return {
        title: `${title} ${surname}`,
        subtitle,
        media,
      };
    },
  },
});
