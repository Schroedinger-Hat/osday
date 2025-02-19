import { type PortableTextComponents } from "@portabletext/react";
import { Paragraph } from "~/components/atoms/typography/Paragraph";
import { Heading } from "~/components/atoms/typography/Heading";
import { Blockquote } from "~/components/atoms/typography/Blockquote";
import { List } from "~/components/atoms/lists/List";
import { ListItem } from "~/components/atoms/lists/ListItem";
import { InlineText } from "~/components/atoms/typography/InlineText";
import { Link } from "~/components/atoms/links/Link";
import { Image } from "~/components/atoms/media/Image";
import { urlFor } from "~/sanity/lib/image";
import { cn } from "~/lib/utils";

// Define the type for link value
interface LinkValue {
  href: string;
}

// Define the type for image value
interface ImageValue {
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

export const createPortableTextComponents = (
  className?: string,
): PortableTextComponents => ({
  block: {
    normal: ({ children }) => (
      <Paragraph className={className}>{children}</Paragraph>
    ),
    h1: ({ children }) => (
      <Heading level={1} className={cn(className, "mt-8")}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading level={2} className={cn(className, "mt-8")}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level={3} className={cn(className, "mt-8")}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level={4} className={cn(className, "mt-8")}>
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <Blockquote className={className}>{children}</Blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List variant="bullet" className={className}>
        {children}
      </List>
    ),
    number: ({ children }) => (
      <List variant="number" className={className}>
        {children}
      </List>
    ),
  },
  listItem: ({ children }) => (
    <ListItem className={className}>{children}</ListItem>
  ),
  marks: {
    strong: ({ children }) => (
      <InlineText variant="strong" className={className}>
        {children}
      </InlineText>
    ),
    em: ({ children }) => (
      <InlineText variant="em" className={className}>
        {children}
      </InlineText>
    ),
    code: ({ children }) => (
      <InlineText variant="code" className={className}>
        {children}
      </InlineText>
    ),
    link: ({ value, children }) => (
      <Link href={(value as LinkValue)?.href ?? "#"} className={className}>
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }: { value: ImageValue }) => {
      return (
        <figure className="-mx-0 my-0 md:-mx-8 lg:-mx-16">
          <Image
            src={urlFor(value).url()}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            className="mx-auto w-full rounded-md"
            withContainer={false}
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
});
