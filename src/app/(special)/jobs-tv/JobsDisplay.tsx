"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";

type PartnerJobPost = {
  _id: string;
  title: string;
  description: any[];
  tags: string[];
  publishedAt: string;
  ctaConfig?: {
    title: string;
    link: string;
  };
  partner: {
    name: string;
    website?: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
};

interface JobsDisplayProps {
  initialJobs: PartnerJobPost[];
}

const ROTATION_INTERVAL = 30000;
const UPDATE_INTERVAL = 33; // 33ms, 30fps

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp!;
  }
  return shuffled;
}

export function JobsDisplay({ initialJobs }: JobsDisplayProps) {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [jobs] = useState(() => shuffleArray(initialJobs));
  const [progress, setProgress] = useState(0);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
      h1: ({ children }) => (
        <h1 className="mb-4 text-3xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-4 text-2xl font-semibold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-3 text-xl font-semibold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-2 text-lg font-semibold">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="mb-2 text-base font-medium">{children}</h5>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-4 pl-4 italic">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc pl-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-decimal pl-6">{children}</ol>
      ),
    },
  };

  useEffect(() => {
    const intervalDuration = UPDATE_INTERVAL; // Update progress every 100ms for smooth animation
    const progressIncrement = (intervalDuration / ROTATION_INTERVAL) * 100;

    const progressInterval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          return 0;
        }
        return Math.min(current + progressIncrement, 100);
      });
    }, intervalDuration);

    const rotationInterval = setInterval(() => {
      setCurrentJobIndex((current) => (current + 1) % jobs.length);
      setProgress(0);
    }, ROTATION_INTERVAL);

    return () => {
      clearInterval(progressInterval);
      clearInterval(rotationInterval);
    };
  }, [jobs.length]);

  const currentJob = jobs[currentJobIndex];

  if (!currentJob) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No job posts available at the moment.
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 flex h-screen max-h-[1080px] flex-col bg-background">
      <div className="grid flex-1 grid-cols-4 overflow-hidden">
        {/* Job List - 1/4 width */}
        <div className="h-full overflow-y-auto border-r border-border bg-muted/50">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "cursor-pointer border-l-2 p-4 transition-all hover:bg-muted",
                index === currentJobIndex
                  ? "border-l-primary bg-muted"
                  : "border-l-transparent",
              )}
              onClick={() => {
                setCurrentJobIndex(index);
                setProgress(0);
              }}
            >
              <div className="space-y-2">
                <h3 className="font-semibold">{job.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {job.partner.name}
                </div>
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Details - 3/4 width */}
        <div className="col-span-3 h-full overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentJob._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-5xl space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <motion.time
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground"
                  >
                    Posted{" "}
                    {format(new Date(currentJob.publishedAt), "MMM d, yyyy")}
                  </motion.time>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-4xl font-bold"
                  >
                    {currentJob.title}
                  </motion.h1>
                </div>
                {currentJob.partner.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Image
                      src={currentJob.partner.image.asset.url}
                      alt={currentJob.partner.name}
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </div>

              {currentJob.tags && currentJob.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2"
                >
                  {currentJob.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-gray dark:prose-invert max-w-none"
              >
                <PortableText
                  value={currentJob.description}
                  components={components}
                />
              </motion.div>

              {currentJob.partner.website && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href={currentJob.partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Visit company website
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <Progress
        value={progress}
        className="absolute left-0 top-0 h-1.5 rounded-none border-none bg-muted"
        indicatorClassName="bg-fiery-red"
      />
    </div>
  );
}
