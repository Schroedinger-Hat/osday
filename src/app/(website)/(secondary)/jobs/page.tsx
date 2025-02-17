import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { constructMetadata } from "~/lib/utils/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PartnerJobPost = {
  _id: string;
  title: string;
  description: any[];
  tags: string[];
  publishedAt: string;
  partner: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
};

const jobsQuery = groq`*[_type == "partnerJobPost" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  description[0..1],
  tags,
  publishedAt,
  partner->{
    name,
    image {
      asset->{
        url
      }
    }
  }
}`;

export const metadata = constructMetadata({
  title: "Job Board",
  description: "Job Board for OSDay25",
});

async function getPartnerJobs(): Promise<PartnerJobPost[]> {
  return sanityFetch(jobsQuery, undefined, {
    cacheDuration: 30, // Cache for 30 seconds
    tags: [getCacheTag.jobs()],
  });
}

export default async function JobBoardPage() {
  const jobs = await getPartnerJobs();

  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Job Board</Heading>
        <Typography variant="h3">
          Take a look at the job board with all the latest job opportunities
          from our partners.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="grid gap-6">
          {jobs?.map((job) => (
            <Card key={job._id} className="group relative overflow-hidden p-8">
              <div className="flex items-center justify-between gap-4">
                <Heading level={3} className="flex-1">
                  {job.title}
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
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    Posted {format(new Date(job.publishedAt), "MMM d, yyyy")}
                  </span>
                </div>

                {job.tags && job.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <PortableText value={job.description} />
              </div>

              <div className="mt-6">
                <Button asChild>
                  <Link href={`/jobs/${job._id}`}>View Full Description</Link>
                </Button>
              </div>
            </Card>
          ))}

          {(!jobs || jobs.length === 0) && (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No job posts available at the moment.
              </CardContent>
            </Card>
          )}
        </div>
      </SectionContainer>
    </>
  );
}
