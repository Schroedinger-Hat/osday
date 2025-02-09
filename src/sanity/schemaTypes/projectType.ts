import { defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "repositoryUrl",
      title: "Repository URL",
      type: "url",
      description: "GitHub repository URL",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).custom((url: string) => {
          if (!url) return true
          return url.startsWith("https://github.com/") ? true : "Must be a GitHub URL"
        }),
    },
    {
      name: "showStars",
      title: "Show Stars",
      type: "boolean",
      description: "Show the GitHub stars badge",
    },
    {
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      description: "List of technologies used in the project",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "launchedAt",
      title: "Launched On",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    },
    {
      name: "lookingFor",
      title: "Looking For",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Contributors", value: "contributors" },
          { title: "Maintainers", value: "maintainers" },
        ],
      },
      validation: (Rule) => Rule.unique(),
    },
    {
      name: "language",
      title: "Primary Language",
      type: "string",
      options: {
        list: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "Python", value: "python" },
          { title: "Go", value: "go" },
          { title: "Rust", value: "rust" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "",
        media,
      }
    },
  },
})
