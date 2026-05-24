"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";
import { legalRoutes, mainRoutes, secondaryRoutes } from "./header-data";

export function DesktopNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isOpen) {
    return (
      <div className="hidden lg:block">
        <Button
          variant="default"
          size="icon"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <Button
        variant="default"
        size="icon"
        aria-label="Toggle Menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="fixed inset-0 z-50 bg-background">
        <div className="mx-auto h-full max-w-7xl px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-title text-3xl">OSDAY26</span>
            </Link>
            <Button
              variant="default"
              size="icon"
              aria-label="Close Menu"
              className="rounded border"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-y-auto py-24">
            {/* Main Navigation */}
            <nav className="mb-16 grid grid-cols-2 gap-x-8 gap-y-6">
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
            <nav className="mb-8 flex flex-wrap gap-x-12 gap-y-4">
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
      </div>
    </div>
  );
}
