"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypewriterText({
  text,
  className,
  delay = 0,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, 20); // Faster typing speed

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  useEffect(() => {
    // Initial delay before starting the animation
    const initialDelay = setTimeout(() => {
      setDisplayText("");
      setCurrentIndex(0);
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [delay]);

  return (
    <pre
      className={cn(
        "w-full whitespace-pre-wrap break-words font-mono leading-relaxed",
        className,
      )}
    >
      {displayText}
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-[blink_1s_infinite] bg-current" />
    </pre>
  );
}
