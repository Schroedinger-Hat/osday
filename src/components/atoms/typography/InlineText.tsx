"use client";

import { cn } from "~/lib/utils";

interface InlineTextProps {
  children: React.ReactNode;
  variant: "strong" | "em" | "code";
  className?: string;
}

export function InlineText({ children, variant, className }: InlineTextProps) {
  const styles = {
    strong: "font-bold",
    em: "italic",
    code: "rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800",
  };

  const Component =
    variant === "strong" ? "strong" : variant === "em" ? "em" : "code";

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  );
}
