"use client";

import { cn } from "~/lib/utils";

interface ListProps {
  children: React.ReactNode;
  variant: "bullet" | "number" | "none";
  className?: string;
}

export function List({ children, variant, className }: ListProps) {
  const Component = variant === "bullet" ? "ul" : "ol";

  return (
    <Component
      className={cn(
        "mb-4 pl-6 text-xl leading-relaxed",
        {
          "list-disc": variant === "bullet",
          "list-decimal": variant === "number",
          "list-none": variant === "none",
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}
