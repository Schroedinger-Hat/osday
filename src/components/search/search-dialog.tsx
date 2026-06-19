"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search as SearchIcon, X as XIcon, Loader2 } from "lucide-react";
import { searchClient, INDEX_NAME } from "~/lib/search";
import type { SearchResponse } from "algoliasearch/lite";
import { cn } from "~/lib/utils";

// Define the structure of a search hit
interface SearchHit {
  objectID: string;
  title: string;
  url: string;
  type: string;
  description?: string | Record<string, unknown>; // Can be plain text or Sanity content
  image?: string;
  lastModified?: string;
  source?: string; // Added to identify content source (e.g., "osday")
}

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to safely extract text from complex Sanity objects
function extractTextFromSanityObject(obj: unknown): string {
  // If it's a string, return it directly
  if (typeof obj === "string") return obj;

  // If it's null/undefined, return empty string
  if (!obj) return "";

  // If it's an array (common in Sanity content), recursively extract text from each item
  if (Array.isArray(obj)) {
    return obj.map((item) => extractTextFromSanityObject(item)).join(" ");
  }

  const objTyped = obj as Record<string, unknown>;

  // If it has a text property (common in Sanity spans)
  if (objTyped.text && typeof objTyped.text === "string") return objTyped.text;

  // If it has children (common in Sanity blocks), recursively extract from children
  if (objTyped.children) {
    return extractTextFromSanityObject(objTyped.children);
  }

  // For other objects, try to extract from their values
  if (typeof obj === "object" && obj !== null) {
    try {
      const keys = Object.keys(objTyped);
      return keys.length > 0
        ? keys
            .map((key) => {
              const val = objTyped[key];
              return extractTextFromSanityObject(val);
            })
            .filter(Boolean)
            .join(" ")
        : "";
    } catch {
      return "";
    }
  }

  // Fallback: convert to string safely
  try {
    // For primitive values only
    if (typeof obj === "number" || typeof obj === "boolean") {
      return String(obj);
    }
    return "";
  } catch {
    return "";
  }
}

export function SearchDialog({ isOpen, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isMac, setIsMac] = useState(false);

  // Initialize client-side values
  useEffect(() => {
    // Detect platform
    setIsMac(navigator?.platform?.includes("Mac") ?? false);
  }, []);

  // Close dialog with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Handle search query changes
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const searchResponse = await searchClient.search<SearchHit>({
        requests: [
          {
            indexName: INDEX_NAME,
            query: value,
            hitsPerPage: 10,
            attributesToRetrieve: [
              "title",
              "url",
              "type",
              "description",
              "image",
              "lastModified",
            ],
            filters: "source:osday",
          },
        ],
      });
      const result = searchResponse.results[0] as
        | SearchResponse<SearchHit>
        | undefined;
      setResults(result?.hits ?? []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Search error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
  };

  // Navigate to a search result
  const handleResultClick = (url: string) => {
    handleClose();
    window.location.href = url;
  };

  // Get description text safely, handling complex Sanity objects
  const getDescriptionText = (description: any): string => {
    if (!description) return "";

    return extractTextFromSanityObject(description);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Title />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-50 w-[90%] max-w-3xl -translate-x-1/2 rounded-lg bg-white p-4 shadow-xl dark:bg-neutral-900 md:w-full">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for pages, speakers, talks..."
                value={query}
                onChange={handleSearch}
                className={cn(
                  "w-full rounded-md border border-neutral-300 bg-white px-4 py-2 pr-10 text-base outline-none transition-colors placeholder:text-neutral-500",
                  "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400",
                  "focus:border-fiery-red focus:ring-1 focus:ring-fiery-red",
                )}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-neutral-400" />
                )}
              </div>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {query && results.length > 0 ? (
                <div>
                  {results.map((hit) => {
                    const descriptionText = getDescriptionText(hit.description);

                    return (
                      <div
                        key={hit.objectID}
                        onClick={() => handleResultClick(hit.url)}
                        className="block cursor-pointer px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-fiery-red">
                              {typeof hit.title === "string"
                                ? hit.title
                                : extractTextFromSanityObject(hit.title)}
                            </span>
                            {hit.type && (
                              <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-700">
                                {typeof hit.type === "string"
                                  ? hit.type.replace(/_/g, " ")
                                  : extractTextFromSanityObject(hit.type)}
                              </span>
                            )}
                          </div>
                          {descriptionText && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {descriptionText.length > 120
                                ? `${descriptionText.substring(0, 120)}...`
                                : descriptionText}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : query ? (
                <div className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  Search for pages, speakers, talks, and more...
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-end">
              <a
                href="https://www.algolia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                Powered by{" "}
                <img
                  src="https://res.cloudinary.com/hilnmyskv/image/upload/v1629378924/Algolia_com_Website_assets/images/shared/algolia_logo/logo-algolia-nebula-blue-full.svg"
                  alt="Algolia"
                  className="mx-1 h-4"
                />
              </a>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
