import { type PortableTextBlock } from "sanity";

// Define a more flexible type for text children
interface TextChild {
  _type: "span";
  text: string;
  [key: string]: any; // Allow additional properties
}

// Define a more flexible block type without extending PortableTextBlock
interface PortableTextBlockExtended {
  _type: string;
  _key?: string;
  children?: TextChild[];
  [key: string]: any; // Allow additional properties
}

/**
 * Extracts and sanitizes the first paragraph from Sanity PortableText blocks
 * for use in meta descriptions.
 *
 * @param description - Array of PortableText blocks
 * @param maxLength - Maximum length of the output string (default: 155 characters)
 * @returns Sanitized and truncated description string, or empty string if invalid input
 */
export function extractFirstParagraph(
  description: PortableTextBlock[] | undefined | null,
  maxLength = 155,
): string {
  if (!description?.length) return "";

  // Find first text block using type assertion
  const firstParagraph = description.find(
    (block): block is any =>
      block._type === "block" &&
      Array.isArray((block as PortableTextBlockExtended).children) &&
      ((block as PortableTextBlockExtended).children?.length ?? 0) > 0,
  );

  if (!firstParagraph) return "";

  // Combine all text from child spans
  const fullText =
    firstParagraph.children
      ?.filter(
        (child: any) =>
          child._type === "span" && typeof child.text === "string",
      )
      .map((child: any) => child.text)
      .join(" ")
      .trim() ?? "";

  if (!fullText) return "";

  // Sanitize the text
  const sanitized = fullText
    .replace(/[\r\n]+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Normalize multiple spaces
    .replace(/[^\w\s-.,!?]/g, "") // Remove special characters except basic punctuation
    .trim();

  // Truncate and add ellipsis if necessary
  if (sanitized.length <= maxLength) return sanitized;

  // Try to break at last complete sentence within limit
  const truncated = sanitized.substring(0, maxLength);
  const lastSentence = /^.*[.!?]/.exec(truncated);

  if (lastSentence) {
    return lastSentence[0].trim();
  }

  // If no sentence break found, break at last complete word
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.substring(0, lastSpace).trim()}...`;
}
