"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn, disableAnimations } from "~/lib/utils";
import { DURATION_TEN_FRAMES } from "./const";
import { env } from "~/env";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [shouldAnimate, setShouldAnimate] = useState(
    disableAnimations ? true : false,
  );

  useEffect(() => {
    // Apply delay only on initial mount and when not in CI
    if (!disableAnimations) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  // In CI, render without animation wrapper
  if (disableAnimations) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView && shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{
        duration: DURATION_TEN_FRAMES,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
