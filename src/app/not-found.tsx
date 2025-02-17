import "~/styles/globals.css";

import { type Metadata } from "next";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function NotFound() {
  return (
    <>
      <SectionContainer
        withBackground
        backgroundType="hero"
        padding="header"
        className="space-y-4"
      >
        <Heading level={1}>Not found</Heading>
        <Typography variant="lead">
          The page you are looking for does not exist.
        </Typography>
        <Link href="/">
          <Button className="mt-4" variant="secondary">
            Go to home
          </Button>
        </Link>
      </SectionContainer>
    </>
  );
}
