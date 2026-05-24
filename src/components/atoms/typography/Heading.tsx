"use client";

import { cn } from "~/lib/utils";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  huge?: boolean;
  boost?: boolean;
  className?: string;
}

export function Heading({
  level = 1,
  children,
  huge = false,
  boost = false,
  className,
}: HeadingProps) {
  const baseStyles = "font-title font-medium";
  const hugeStyles =
    "font-title mb-8 font-medium leading-none text-5xl md:text-7xl xl2:text-9xl";

  // Normal styles
  const level1Styles = "mb-2 md:mb-6 text-4xl md:text-7xl";
  const level2Styles = "mb-2 md:mb-4 text-2xl md:text-5xl";
  const level3Styles = "mb-2 md:mb-4 text-2xl md:text-3xl";
  const level4Styles = "mb-2 md:mb-4 text-2xl";

  // Boosted styles
  const level1StylesBoosted = "mb-2 md:mb-6 text-5xl md:text-6xl";
  const level2StylesBoosted = "mb-2 md:mb-4 text-3xl md:text-4xl";
  const level3StylesBoosted = "mb-2 md:mb-4 text-2xl md:text-3xl";
  const level4StylesBoosted = "mb-2 md:mb-4 text-xl md:text-2xl";

  const Component = `h${level}` as const;

  const getLevelStyles = () => {
    if (boost) {
      if (level === 1) return level1StylesBoosted;
      if (level === 2) return level2StylesBoosted;
      if (level === 3) return level3StylesBoosted;
      return level4StylesBoosted;
    }

    if (level === 1) return level1Styles;
    if (level === 2) return level2Styles;
    if (level === 3) return level3Styles;
    return level4Styles;
  };

  return (
    <Component
      className={cn(
        baseStyles,
        getLevelStyles(),
        {
          [hugeStyles]: huge,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}
