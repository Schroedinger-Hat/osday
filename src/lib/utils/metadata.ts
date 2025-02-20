import type { Metadata } from "next";
import { BASE_URL } from "./withFullUrl";

interface MetadataProps {
  title?: string;
  description?: string;
  overrides?: Partial<Metadata>;
}

const defaultTitle = "OSDay25: For who loves Open Source";
const defaultDescription =
  "OSDay25 is a one-day conference for who loves Open Source";

export function constructMetadata({
  title = defaultTitle,
  description = defaultDescription,
  overrides,
}: MetadataProps = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: BASE_URL,
      siteName: "OSDay25",
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "OSDay25 Open Source Conference",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@schrodinger_hat",
    },
    robots: "index, follow",
    ...overrides,
  };

  return metadata;
}
