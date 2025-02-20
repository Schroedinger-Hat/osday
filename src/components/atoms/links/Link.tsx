"use client";

import { cn } from "~/lib/utils";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className }: LinkProps) {
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("text-blue-600 hover:underline", className)}
    >
      {children}
    </a>
  );
}
