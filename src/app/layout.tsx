import "~/styles/globals.css";

import { HydrateClient } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { FontProvider } from "~/lib/context/font-context";
import schroddy from "../assets/images/schroddy.svg";
import { AnimatedSchroddy } from "~/components/molecules/animated-schroddy";
import { constructMetadata } from "~/lib/utils/metadata";
// Font files can be colocated inside of `pages`
const cartoonTown = localFont({
  src: "../assets/fonts/cartoon-town.ttf",
  variable: "--font-cartoon-town",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <FontProvider>
      <html
        lang="en"
        className={cn(
          inter.variable,
          cartoonTown.variable,
          "font-sans transition-all duration-300", // Added transition for smooth font change
        )}
      >
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="SH" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <AnimatedSchroddy src={schroddy} />
          <TRPCReactProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCReactProvider>
        </body>
      </html>
    </FontProvider>
  );
}
