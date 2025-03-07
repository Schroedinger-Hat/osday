import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import Image from "next/image";
import { Linkedin01Icon, YoutubeIcon } from "hugeicons-react";
import type { FC, SVGProps } from "react";
import { constructMetadata } from "~/lib/utils/metadata";

// Images
type LogoType = FC<SVGProps<SVGElement>> & { src: string };

import logoOsday from "~/assets/images/press-kit/logo-dark.svg";
import logoOsdayPng from "~/assets/images/press-kit/logo-dark.png";
import logoOsdayRed from "~/assets/images/press-kit/logo-red.svg";
import logoOsdayRedPng from "~/assets/images/press-kit/logo-red.png";
import logoOsdayBackground from "~/assets/images/press-kit/logo-background.svg";
import logoOsdayBackgroundPng from "~/assets/images/press-kit/logo-background.png";

export const metadata = constructMetadata({
  title: "Press Kit",
  description: "Press Kit for OSDay25",
  path: "/press-kit",
});

export default function PressKitPage() {
  return (
    <main>
      <SectionContainer padding="header" withBackground backgroundType="hero">
        <Heading level={2}>Press Kit</Heading>
        <Typography variant="h3">
          So you have decided to tell a story about us?
          <br />
          Cool, we prepared some assets for you to use
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Heading level={3}>Logo</Heading>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="rounded-md border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-md p-4">
                <Image src={logoOsday} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">In Black</p>
                <br />
                <a href={(logoOsday as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoOsdayPng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-md border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-md p-4">
                <Image src={logoOsdayRed} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">In Red</p>
                <br />
                <a href={(logoOsdayRed as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoOsdayRedPng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-md border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-md p-4">
                <Image src={logoOsdayBackground} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">With Background</p>
                <br />
                <a href={(logoOsdayBackground as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoOsdayBackgroundPng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={3}>Colors</Heading>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-[#C4493A]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Fiery Red
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #C0392B
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-[#12142D]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Dark Navy
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #12142D
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-[#4263AA]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Almost Ultramarine
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #4263AA
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-[#EDCFB7]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Creamy Sand
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #EDCFB7
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Heading level={3}>Typography</Heading>
            <div className="mt-8 space-y-8">
              <div>
                <Typography variant="muted" className="mb-0">
                  Headings
                </Typography>
                <Typography as="span" className="mt-0 font-title text-2xl">
                  Cartoon Town
                </Typography>
              </div>

              <div>
                <Typography variant="muted" className="mb-0">
                  Body
                </Typography>
                <Typography as="span" className="font-inter mt-0 text-2xl">
                  Inter
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={3}>What we do, in a nutshell</Heading>
            <Typography variant="blockquote">
              Open Source Day in Florence champions open-source tech as a
              secure, efficient alternative to proprietary software. It brings
              together industry professionals to share insights on tech trends
              and boost local communities and small businesses.
            </Typography>
          </div>
          <div className="flex-1">
            <Heading level={3}>What we do, in detail</Heading>
            <Typography variant="blockquote">
              Open Source Day is an international conference dedicated to
              open-source solutions, scheduled for March, in Florence, Italy.
              The event aims to introduce open-source technologies to public and
              business institutions, promoting them as secure, efficient, and
              cost-effective alternatives to proprietary software.
              <br />
              <br />
              Attendees, including managers, developers, and technical officers
              from various industries, will have the opportunity to exchange
              experiences and explore use cases in areas such as virtualization,
              cloud computing, databases, big data, and information security.
              <br />
              <br />
              The conference serves as a platform for fostering local
              communities and encouraging the development of small businesses
              that provide support and development for open-source solutions.
            </Typography>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={2}>Contact</Heading>
            <Typography>
              For any press inquiries, please contact us at{" "}
              <a href="mailto:osday@schroedinger-hat.org">
                osday@schroedinger-hat.org
              </a>
            </Typography>
          </div>
          <div className="flex-1">
            <Heading level={2}>Socials</Heading>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/company/schroedinger-hat/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Typography className="flex items-center gap-2" variant="large">
                  <Linkedin01Icon className="h-6 w-6" />
                  LinkedIn
                </Typography>
              </a>
              <a
                href="https://www.youtube.com/c/schrodingerhat"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Typography className="flex items-center gap-2" variant="large">
                  <YoutubeIcon className="h-6 w-6" />
                  YouTube
                </Typography>
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
