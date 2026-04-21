import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Button } from "~/components/ui/button";
import { constructMetadata } from "~/lib/utils/metadata";

export const metadata = constructMetadata({
  title: "Live",
  description: "Quick links and attendee info for OSDAY26",
  path: "/live",
});

const quickLinks = [
  {
    title: "Schedule",
    description: "See talks, timings, and what is happening next.",
    href: "/schedule",
    icon: CalendarDays,
    accent: "bg-fiery-red text-white",
  },
  {
    title: "Venue",
    description: "Open directions, address details, and travel info.",
    href: "/venue",
    icon: MapPin,
    accent: "bg-dark-navy text-white",
  },
  {
    title: "Membership",
    description: "Join Schroedinger Hat and support the community.",
    href: "https://schroedinger-hat.org/association/join",
    icon: UserRoundPlus,
    accent: "bg-almost-ultramarine text-white",
  },
] as const;

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function LivePage() {
  return (
    <>
      <SectionContainer
        withBackground
        backgroundType="hero"
        className="pb-8 pt-10 md:pb-12 md:pt-16"
      >
        <div className="space-y-5">
          <div className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            OSDAY26 Live
          </div>
          <Heading level={1} className="mb-0 max-w-xl text-5xl md:text-7xl">
            Everything attendees need, one tap away.
          </Heading>
          <Typography
            variant="large"
            className="max-w-2xl text-base font-medium text-white/90 md:text-xl"
          >
            Built for phones first, so you can jump straight to the essentials
            during the event.
          </Typography>

          <div className="grid gap-3 pt-2 md:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  target={isExternalLink(link.href) ? "_blank" : undefined}
                  rel={
                    isExternalLink(link.href)
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`${link.accent} group rounded-3xl p-5 shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-white/15 p-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 opacity-80 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-6 space-y-2">
                    <Typography
                      variant="h3"
                      className="text-2xl font-semibold tracking-tight text-white"
                    >
                      {link.title}
                    </Typography>
                    <Typography className="text-sm leading-6 text-white/85">
                      {link.description}
                    </Typography>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          {quickLinks.map((link) => (
            <Button
              key={link.title}
              asChild
              variant="outline"
              size="sm"
              className="h-11 rounded-2xl bg-background"
            >
              <Link
                href={link.href}
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(link.href) ? "noopener noreferrer" : undefined
                }
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
