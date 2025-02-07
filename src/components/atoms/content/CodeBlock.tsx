"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "~/lib/utils";

interface CodeBlockProps {
  value: {
    code: string;
    language?: string;
    filename?: string;
  };
}

export function CodeBlock({ value }: CodeBlockProps) {
  const { code, language = "typescript", filename } = value;

  return (
    <div className="group relative my-6 rounded-lg bg-gray-900">
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-700 bg-gray-800 px-4 py-2 text-gray-200">
          <span>{filename}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
          lineHeight: "2",
        }}
        className={cn(
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600",
          "[&>code]:line-height-tight [&>code]:bg-transparent [&>code]:text-xs [&>code]:font-normal [&>code]:leading-normal",
        )}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
