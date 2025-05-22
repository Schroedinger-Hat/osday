"use client";

import { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Search as SearchIcon } from "lucide-react";
import { SearchDialog } from "./search-dialog";

// Define keyboard shortcut here so it's registered early
const KEYBOARD_SHORTCUT = "cmd+k, ctrl+k";

export function SearchButton() {
  // Only render once mounted on the client
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add global event listener as a fallback
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Register keyboard shortcut at this level with react-hotkeys-hook
  useHotkeys(
    KEYBOARD_SHORTCUT,
    (e) => {
      e.preventDefault();
      setIsSearchOpen(true);
    },
    {
      // These options help ensure the shortcut works globally
      enableOnFormTags: true,
      enableOnContentEditable: true,
      // enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'], // This property isn't supported
      enabled: mounted, // Only enable when component is mounted
      preventDefault: true,
    },
  );

  // Return placeholder during SSR and first render
  if (!mounted) {
    return (
      <button className="flex cursor-pointer items-center rounded-md bg-neutral-100 px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700">
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Search...</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex cursor-pointer items-center rounded-md bg-neutral-100 px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        aria-label="Search (⌘K)"
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="ml-2 hidden rounded px-1.5 font-mono text-xs text-neutral-400 md:inline">
          ⌘K
        </kbd>
      </button>
      <SearchDialog isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
