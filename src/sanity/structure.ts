/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaIcons } from "./icons/schemaIcons";

export const structure: StructureResolver = async (S, context) => {
  // Fetch all unique groupKeys
  const client = context.getClient({ apiVersion: "2023-01-01" });
  const groupKeys = await client.fetch(`
    array::unique(*[_type == "faq"].groupKey | order(@))
  `);

  const timelineYears: number[] = await client.fetch(
    `array::unique(*[_type == "timeline"].year)`,
  );

  const timelineGroups = [
    ...timelineYears.map((year) =>
      orderableDocumentListDeskItem({
        type: "timeline",
        S,
        context,
        title: `${year} Schedule`,
        filter: `year == ${year}`,
        id: `timeline-year-${year}`,
        icon: schemaIcons.timeline,
      }),
    ),
    orderableDocumentListDeskItem({
      type: "timeline",
      S,
      context,
      title: "All",
      id: "timeline-year-all",
      icon: schemaIcons.timeline,
    }),
  ];

  // Add type for the items array
  const faqGroups = [
    // Dynamic group items based on existing groupKeys
    ...groupKeys.map((groupKey: string) =>
      orderableDocumentListDeskItem({
        type: "faq",
        S,
        context,
        title: `${groupKey.charAt(0).toUpperCase()}${groupKey.slice(1).replace(/-/g, " ")} FAQs`,
        filter: `groupKey == "${groupKey}"`,
        id: `faq-group-${groupKey}`,
        icon: schemaIcons.faq,
      }),
    ),
    // All FAQs view
    orderableDocumentListDeskItem({
      type: "faq",
      S,
      context,
      title: "All FAQs",
      id: "faq-group-all",
      icon: schemaIcons.faq,
    }),
  ] as const;

  return S.list()
    .title("Content")
    .items([
      // Talks Group
      S.documentTypeListItem("video").icon(schemaIcons.video),
      S.documentTypeListItem("event").icon(schemaIcons.event),
      S.documentTypeListItem("eventSeries").icon(schemaIcons.eventSeries),
      S.documentTypeListItem("author").icon(schemaIcons.author),
      S.documentTypeListItem("blogPost").icon(schemaIcons.blogPost),

      S.divider(),

      // Website Group
      orderableDocumentListDeskItem({
        type: "teamMember",
        S,
        context,
        title: "Team Members",
        icon: schemaIcons.teamMember,
      }),
      S.listItem()
        .title("FAQs")
        .icon(schemaIcons.faq)
        .child(
          S.list()
            .title("FAQ Groups")
            .items(faqGroups as any),
        ),
      S.documentTypeListItem("jobPost").icon(schemaIcons.jobPost),
      S.documentTypeListItem("page").icon(schemaIcons.page),

      S.divider(),

      // Contribute Group
      S.listItem()
        .title("Partners")
        .icon(schemaIcons.partner)
        .child(
          S.list()
            .title("Partner Types")
            .items([
              orderableDocumentListDeskItem({
                type: "partner",
                S,
                context,
                title: "Business Partners",
                filter: "isBusinessPartner == true",
                id: "partner-business",
                icon: schemaIcons.partner,
              }),
              orderableDocumentListDeskItem({
                type: "partner",
                S,
                context,
                title: "Community Partners",
                filter: "isBusinessPartner == false",
                id: "partner-non-business",
                icon: schemaIcons.partner,
              }),
            ]),
        ),
      S.documentTypeListItem("project").icon(schemaIcons.project),

      S.divider(),

      // Conference specifics
      S.listItem()
        .title("Timeline")
        .icon(schemaIcons.timeline)
        .child(S.list().title("Years").items(timelineGroups as any)),
      S.documentTypeListItem("partnerJobPost").icon(schemaIcons.jobPost),
    ]);
};
