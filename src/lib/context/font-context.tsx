"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FontContextType = {
  isComicSans: boolean;
  toggleComicSans: () => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [isComicSans, setIsComicSans] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (isComicSans) {
      // Store original fonts in data attributes for restoration
      root.dataset.originalInter =
        getComputedStyle(root).getPropertyValue("--font-inter");
      root.dataset.originalCartoonTown = getComputedStyle(
        root,
      ).getPropertyValue("--font-cartoon-town");

      // Replace both fonts with Comic Sans
      root.style.setProperty("--font-inter", "'Comic Sans MS', cursive");
      root.style.setProperty("--font-cartoon-town", "'Comic Sans MS', cursive");
    } else {
      // Restore original fonts from data attributes
      if (root.dataset.originalInter) {
        root.style.setProperty("--font-inter", root.dataset.originalInter);
      }
      if (root.dataset.originalCartoonTown) {
        root.style.setProperty(
          "--font-cartoon-town",
          root.dataset.originalCartoonTown,
        );
      }
    }
  }, [isComicSans]);

  const toggleComicSans = () => {
    setIsComicSans((prev) => !prev);
  };

  return (
    <FontContext.Provider value={{ isComicSans, toggleComicSans }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFontContext() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFontContext must be used within a FontProvider");
  }
  return context;
}
