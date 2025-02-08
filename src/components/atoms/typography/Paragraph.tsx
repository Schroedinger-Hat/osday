"use client";

import { cn } from "~/lib/utils";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p className={cn("mb-4 text-xl leading-relaxed text-gray-700", className)}>
      {children}
    </p>
  );
}
