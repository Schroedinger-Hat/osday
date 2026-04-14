"use client";

import { cn } from "~/lib/utils";

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ListItem({ children, className }: ListItemProps) {
  return <li className={cn("leading-relaxed", className)}>{children}</li>;
}
