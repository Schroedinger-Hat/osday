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
    // Apply Comic Sans to the html element
    if (isComicSans) {
      document.documentElement.style.fontFamily = "'Comic Sans MS', cursive";
    } else {
      document.documentElement.style.fontFamily = "";
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
