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
  description: "Press Kit for OSDAY26",
  path: "/press-kit",
});

export default function PressKitPage() {
  const logos = [
    {
      alt: "OSDAY logo in black",
      label: "In Black",
      png: logoOsdayPng.src,
      src: logoOsday,
      svg: (logoOsday as LogoType).src,
    },
    {
      alt: "OSDAY logo in red",
      label: "In Red",
      png: logoOsdayRedPng.src,
      src: logoOsdayRed,
      svg: (logoOsdayRed as LogoType).src,
    },
    {
      alt: "OSDAY logo with background",
      label: "With Background",
      png: logoOsdayBackgroundPng.src,
      src: logoOsdayBackground,
      svg: (logoOsdayBackground as LogoType).src,
    },
  ];

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
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {logos.map((logo) => (
            <div key={logo.label} className="h-full">
              <div className="flex h-full flex-col rounded-md border border-gray-200 bg-slate-200 p-6 sm:p-8">
                <div className="flex min-h-52 items-center justify-center rounded-md p-4 sm:min-h-64">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className="h-auto w-full max-w-52 object-contain sm:max-w-60 md:max-w-52 lg:max-w-60"
                    sizes="(max-width: 767px) 208px, (max-width: 1279px) 192px, 240px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">{logo.label}</p>
                  <br />
                  <a href={logo.svg} download>
                    <Typography as="span" variant="small">
                      Download SVG
                    </Typography>
                  </a>
                  {" | "}
                  <a href={logo.png} download>
                    <Typography as="span" variant="small">
                      Download PNG
                    </Typography>
                  </a>
                </div>
              </div>
            </div>
          ))}
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
              open-source solutions, scheduled for March/April, in Florence,
              Italy. The event aims to introduce open-source technologies to
              public and business institutions, promoting them as secure,
              efficient, and cost-effective alternatives to proprietary
              software.
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
