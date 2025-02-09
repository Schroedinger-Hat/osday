"use client";

import { cn } from "~/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ElementType } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 border-slate-300 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl",
      large: "text-lg font-semibold",
      medium: "text-base font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm",
      link: "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
      navigation: "text-sm font-semibold leading-none uppercase",
      navigationMobile: "text-xl font-semibold",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
  },
});

type TypographyProps<C extends ElementType> = {
  children: React.ReactNode;
  as?: C;
  variant?: VariantProps<typeof typographyVariants>["variant"];
  weight?: VariantProps<typeof typographyVariants>["weight"];
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<C>,
  "as" | "variant" | "weight" | "className"
>;

export function Typography<C extends ElementType = "p">({
  children,
  variant,
  weight,
  as,
  className,
  ...props
}: TypographyProps<C>) {
  const Component = as ?? getDefaultElement(variant);

  return (
    <Component
      className={cn(typographyVariants({ variant, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

function getDefaultElement(variant: string | null | undefined): ElementType {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "blockquote":
      return "blockquote";
    case "list":
      return "ul";
    default:
      return "p";
  }
}
