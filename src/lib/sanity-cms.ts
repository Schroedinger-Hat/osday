import { Author } from "~/sanity/sanity.types";

/**
 * Gets the full name of an author
 */
export function getAuthorFullName(
  author: Author,
  withPronouns = false,
): string {
  const namePieces = [author.firstName, author.lastName];
  if (withPronouns && author.pronouns) namePieces.push(`(${author.pronouns})`);
  return namePieces.filter(Boolean).join(" ").trim();
}
