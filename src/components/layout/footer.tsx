"use client";

import Link from "next/link";
import { Typography } from "../atoms/typography/Typography";
import { Paragraph } from "../atoms/typography/Paragraph";
import { Heading } from "../atoms/typography/Heading";
import { Linkedin, Youtube } from "lucide-react";
import { useFontContext } from "~/lib/context/font-context";
import { cn } from "~/lib/utils";

const footerSections = [
  {
    title: "Event",
    links: [
      { href: "/how-to-reach", label: "How to reach us" },
      { href: "/code-of-conduct", label: "Code of Conduct" },
      { href: "/faqs", label: "FAQs" },
      { href: "/speaker-faqs", label: "Speaker FAQs" },
      { href: "/volunteers", label: "Volunteers" },
      { href: "/jobs", label: "Job Board" },
    ],
  },
  {
    title: "Utils",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/press-kit", label: "Press Kit" },
      { href: "/previous-events", label: "Previous Events" },
      { href: "/contacts", label: "Contacts" },
    ],
  },
];

export function Footer() {
  const { isComicSans, toggleComicSans } = useFontContext();

  return (
    <footer className={cn("border-t", isComicSans && "font-['Comic Sans MS']")}>
      <div className="container mx-auto max-w-7xl">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* First Two Columns from footerSections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <Heading level={3} className="text-sm font-semibold">
                  {section.title}
                </Heading>
                <div className="space-y-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      className="block text-sm hover:underline"
                      href={link.href}
                    >
                      <Paragraph className="m-0 text-sm">
                        {link.label}
                      </Paragraph>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Company Info */}
            <div className="space-y-3">
              <Heading level={3} className="text-sm font-semibold">
                SCHROEDINGER HAT APS
              </Heading>
              <Paragraph className="text-sm text-muted-foreground">
                Via Pino Arpioni 1, Pelago (FI)
              </Paragraph>
              <Paragraph className="text-sm text-muted-foreground">
                IT07355400487
              </Paragraph>
              <div className="mt-4 flex space-x-4">
                <Link
                  href="https://www.linkedin.com/company/schroedinger-hat/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">Linkedin</span>
                </Link>
                <Link
                  href="https://www.youtube.com/c/schrodingerhat"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Line Separator */}
          <div className="mt-12 border-t py-4" />

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-muted-foreground md:justify-between">
            <Typography variant="muted" className="m-0">
              © {new Date().getFullYear()}, Schrödinger Hat
            </Typography>

            <div className="hidden md:block">
              <Typography variant="muted" className="m-0">
                {isComicSans ? (
                  <span>Much better with Comic Sans , right?</span>
                ) : (
                  <span>
                    Annoying font? Could be worse. Could be{" "}
                    <button
                      onClick={toggleComicSans}
                      className="underline hover:text-foreground"
                    >
                      Comic Sans
                    </button>
                    .
                  </span>
                )}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
