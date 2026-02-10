"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";
import { legalRoutes, mainRoutes, secondaryRoutes } from "./header-data";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "~/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MobileNav() {
  return (
    <div className="lg:hidden">
      <Sheet>
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
        <VisuallyHidden>
          <SheetTitle>OSDAY26</SheetTitle>
        </VisuallyHidden>
        <SheetContent
          side="left"
          className="h-full w-full border-none bg-background p-0"
        >
          <div className="relative h-full">
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between bg-background px-4 sm:px-6">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-title text-3xl">OSDAY26</span>
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

            <div className="h-[calc(100%-3.5rem)] overflow-y-auto px-4 pb-8 sm:px-6">
              {/* Main Navigation */}
              <nav className="mt-8 space-y-6">
                {mainRoutes.map((route) => (
                  <SheetClose key={route.href} asChild>
                    <Link
                      href={route.href}
                      className="relative block font-title text-5xl font-bold tracking-wide after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:origin-left after:-rotate-2 after:bg-primary after:transition-all after:duration-150 hover:after:w-[66.666%]"
                    >
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Secondary Navigation */}
              <nav className="mt-12 space-y-4">
                {secondaryRoutes.map((route) => (
                  <SheetClose key={route.href} asChild>
                    <Link
                      href={route.href}
                      className="block font-title text-xl font-medium hover:text-primary"
                    >
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Legal Navigation */}
              <nav className="mt-8 space-y-4">
                {legalRoutes.map((route) => (
                  <SheetClose key={route.href} asChild>
                    <Link
                      href={route.href}
                      className="block font-title text-xl font-medium hover:text-primary"
                    >
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
