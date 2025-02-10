import { cn } from "~/lib/utils";
import { type ReactNode } from "react";
import { AnimatedSection } from "./AnimatedSection";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "tiny" | "narrow" | "medium" | "wide" | "full";
  padding?: "header" | "default" | "little" | "none";
  spacing?: "small" | "medium" | "large" | "none";
  withBackground?: boolean;
  backgroundType?: "default" | "hero";
  notAnimated?: boolean;
  animationDelay?: number;
}

const sizes = {
  tiny: "max-w-2xl",
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  wide: "max-w-7xl",
  full: "",
};

const paddings = {
  header: "py-16 md:py-24",
  default: "py-8 md:py-16",
  little: "py-4 md:py-8",
  none: "py-0 px-0 md:py-0 md:px-0 lg:px-0 2lx:px-0",
};

const spacings = {
  small: "space-y-4 md:space-y-8",
  medium: "space-y-8 md:space-y-16",
  large: "space-y-16 md:space-y-24",
  none: "",
};

export function SectionContainer({
  children,
  className,
  size = "medium",
  padding = "default",
  spacing = "none",
  withBackground = false,
  backgroundType = "default",
  notAnimated = false,
  animationDelay = 0,
}: SectionContainerProps) {
  const contentDiv = !notAnimated ? (
    <AnimatedSection delay={animationDelay}>
      <div
        className={cn(
          "mx-auto px-4 md:px-6 lg:px-8 2xl:px-0",
          sizes[size],
          paddings[padding],
          spacings[spacing],
          {
            container: size !== "full",
          },
          className,
        )}
      >
        {children}
      </div>
    </AnimatedSection>
  ) : (
    <div
      className={cn(
        "mx-auto px-4 md:px-6 lg:px-8 2xl:px-0",
        sizes[size],
        paddings[padding],
        spacings[spacing],
        {
          container: size !== "full",
        },
        className,
      )}
    >
      {children}
    </div>
  );

  if (withBackground) {
    return (
      <div
        className={cn(
          backgroundType === "default"
            ? "bg-almost-ultramarine/80 text-white"
            : "bg-fiery-red text-white",
        )}
      >
        {contentDiv}
      </div>
    );
  }

  return contentDiv;
}
