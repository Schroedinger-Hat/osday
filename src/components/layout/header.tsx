"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
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
    href: "/speakers",
    label: "Speakers",
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
    href: "/2024",
    label: "2024 Edition",
  },
  {
    href: "/contact",
    label: "Contact us",
  },
  {
    href: "/faqs",
    label: "FAQs",
  },
  {
    href: "/refund-policies",
    label: "Refund Policies",
  },
  {
    href: "/code-of-conduct",
    label: "Code of conduct",
  },
  {
    href: "/visa",
    label: "Visa",
  },
  {
    href: "/t-shirt",
    label: "T-Shirt",
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
          <div className="flex items-center space-x-4">
            <Button asChild variant="default" className="font-title text-2xl">
              <Link href="/tickets">Tickets</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="h-[100dvh] w-screen border-none bg-background p-0"
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                      <span className="font-title text-3xl">OSDAY25</span>
                    </Link>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close Menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="mt-20 grid grid-cols-1 gap-20">
                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-8">
                      {mainRoutes.map((route) => (
                        <Link
                          key={route.href}
                          href={route.href}
                          className="text-6xl font-bold tracking-tight hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {route.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Secondary Navigation */}
                    <nav className="flex flex-wrap gap-x-8 gap-y-4">
                      {secondaryRoutes.map((route) => (
                        <Link
                          key={route.href}
                          href={route.href}
                          className="text-sm font-medium text-muted-foreground hover:text-primary"
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
    </header>
  );
}
