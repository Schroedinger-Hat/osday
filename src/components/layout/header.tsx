"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useScrollDirection } from "~/hooks/use-scroll-direction";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Get initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}

export function Header() {
  const scrollDirection = useScrollDirection();
  const scrollPosition = useScrollPosition();
  const pathname = usePathname();

  const showLogo = pathname === "/" ? scrollPosition > 400 : true;

  return (
    <header
      className={`sticky w-full bg-fiery-red transition-all duration-300 ${
        scrollDirection === "down" ? "-top-16" : "top-0"
      } z-50`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-opacity duration-300 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="font-title text-3xl text-white">OSDAY26</span>
          </Link>

          <div className="flex items-center">
            <MobileNav />
            <DesktopNav />
          </div>
        </div>
      </div>
    </header>
  );
}
