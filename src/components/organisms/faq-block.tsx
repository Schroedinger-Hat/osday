import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { PortableText } from "@portabletext/react";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";

type FAQ = {
  _id: string;
  question: string;
  answer: any[]; // Portable Text content
};

interface FaqBlockProps {
  groupKey: string;
  title?: string;
  description?: string;
}

async function getFAQs(groupKey: string): Promise<FAQ[]> {
  return sanityFetch(
    `*[_type == "faq" && groupKey == $groupKey] | order(orderRank asc) {
      _id,
      question,
      answer,
    }`,
    { groupKey },
    {
      cacheDuration: 30, // Cache for 30 seconds
      tags: [getCacheTag.faqs(), getCacheTag.faqs(groupKey)],
    },
  );
}

export async function FaqBlock({
  groupKey,
  title = "FAQ",
  description,
}: FaqBlockProps) {
  const faqs: FAQ[] = await getFAQs(groupKey);

  return (
    <div>
      <div className="pb-0 text-left md:pb-4 md:text-center">
        {title && <Heading level={2}>{title}</Heading>}
        {description && (
          <Typography variant="medium" className="text-left">
            {description}
          </Typography>
        )}
      </div>
      <Accordion type="single" collapsible className="">
        {faqs.map((faq) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger>
              <Typography variant="large" className="pt-4 font-bold">
                {faq.question}
              </Typography>
            </AccordionTrigger>
            <AccordionContent>
              <PortableText value={faq.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
