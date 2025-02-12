import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { ArrowLeft01Icon, Globe02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { sanityClient } from "~/sanity/lib/client";

type JobPost = {
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

const jobQuery = groq`*[_type == "partnerJobPost" && _id == $id][0] {
  _id,
  title,
  description,
  tags,
  publishedAt,
  ctaConfig,
  partner->{
    name,
    website,
    image {
      asset->{
        url
      }
    }
  }
}`;

async function getJob(id: string): Promise<JobPost | null> {
  if (!sanityClient) throw new Error("Sanity client is not initialized");
  return sanityClient.fetch<JobPost>(jobQuery, { id });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <div className="relative">
          <div className="space-y-4">
            <time className="block font-title text-2xl tracking-wider text-white/90">
              Posted {format(new Date(job.publishedAt), "MMM d, yyyy")}
            </time>
            <Heading level={1}>{job.title}</Heading>
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
            >
              <ArrowLeft01Icon className="h-4 w-4" />
              <Typography variant="muted" className="font-bold uppercase">
                Back to Job Board
              </Typography>
            </Link>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="col-span-3 space-y-8">
            <div className="prose prose-invert max-w-none">
              <PortableText value={job.description} />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <Card className="overflow-hidden bg-dark-navy text-white">
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <Heading level={3} className="mb-0">
                    {job.partner.name}
                  </Heading>
                  {job.partner.image && (
                    <figure className="flex flex-col items-center gap-1">
                      <Image
                        src={job.partner.image.asset.url}
                        alt={job.partner.name}
                        width={128}
                        height={64}
                        className="object-cover"
                      />
                    </figure>
                  )}
                </div>

                <div className="space-y-4">
                  {job.partner.website && (
                    <a
                      href={job.partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Globe02Icon className="h-4 w-4" />
                      <span>Visit company website</span>
                    </a>
                  )}

                  {job.ctaConfig?.link && (
                    <Link
                      href={job.ctaConfig.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="secondary" className="w-full">
                        {job.ctaConfig.title || "Apply for this position"}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </SectionContainer>
    </>
  );
}

export async function generateStaticParams() {
  const jobs = await sanityClient.fetch<{ _id: string }[]>(
    groq`*[_type == "partnerJobPost" && isActive == true]._id`,
  );

  return jobs.map((job) => ({
    id: job._id,
  }));
}
