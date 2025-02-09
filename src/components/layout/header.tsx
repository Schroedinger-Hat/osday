"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { Menu, X } from "lucide-react";

const mainRoutes = [
  {
    href: "/tickets",
    label: "Tickets",
  },
  {
    href: "/schedule",
    label: "Schedule",
  },
  {
    href: "/sponsors",
    label: "Sponsors",
  },
  {
    href: "/venue",
    label: "Venue",
  },
];

const secondaryRoutes = [
  {
    href: "/faqs",
    label: "FAQs",
  },
  {
    href: "/speakers-faq",
    label: "Speakers FAQ",
  },
  {
    href: "/press-kit",
    label: "Press Kit",
  },
  {
    href: "/code-of-conduct",
    label: "Code of conduct",
  },
  {
    href: "/jobs",
    label: "Job Board",
  },
  {
    href: "/previous-events",
    label: "Previous Events",
  },
  {
    href: "/volunteers",
    label: "Volunteers",
  },
];

const legalRoutes = [
  {
    href: "/page/code-of-conduct",
    label: "Code of Conduct",
  },
  {
    href: "/page/cookie-policy",
    label: "Cookie Policy",
  },
  {
    href: "/page/privacy",
    label: "Privacy Policy",
  },
  {
    href: "/page/contacts",
    label: "Contact",
  },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-title text-3xl">OSDAY25</span>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center">
            <div className="flex">
              <Button
                asChild
                variant="default"
                className="rounded-r-none font-title text-2xl"
              >
                <Link href="/tickets">Tickets</Link>
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    aria-label="Toggle Menu"
                    className="rounded-l-none border-l"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="h-[100dvh] w-screen border-none bg-background p-0"
                  hideCloseButton
                >
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                      <Link href="/" className="flex items-center space-x-2">
                        <span className="font-title text-3xl">OSDAY25</span>
                      </Link>
                      <SheetClose asChild>
                        <Button
                          variant="default"
                          size="icon"
                          aria-label="Close Menu"
                          className="rounded border"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>

                    <div className="mt-24 grid grid-cols-1 gap-4">
                      {/* Main Navigation */}
                      <nav className="mb-20 grid grid-cols-2 gap-x-8 gap-y-8">
                        {mainRoutes.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            className="relative font-title text-7xl font-bold tracking-wide after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:origin-left after:-rotate-2 after:bg-primary after:transition-all after:duration-150 hover:after:w-[66.666%]"
                            onClick={() => setIsOpen(false)}
                          >
                            {route.label}
                          </Link>
                        ))}
                      </nav>

                      {/* Secondary Navigation */}
                      <nav className="mb-4 flex flex-wrap gap-x-12 gap-y-4">
                        {secondaryRoutes.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            className="font-title text-2xl font-medium hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {route.label}
                          </Link>
                        ))}
                      </nav>

                      {/* Legal Navigation */}
                      <nav className="flex flex-wrap gap-x-12 gap-y-4">
                        {legalRoutes.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            className="font-title text-2xl font-medium hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {route.label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
