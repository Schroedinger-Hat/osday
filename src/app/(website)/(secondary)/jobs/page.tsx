import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { Tag } from "lucide-react";
import Image from "next/image";
import { groq } from "next-sanity";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { sanityClient } from "~/sanity/lib/client";

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
  description,
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

async function getPartnerJobs(): Promise<PartnerJobPost[]> {
  if (!sanityClient) throw new Error("Sanity client is not initialized");
  return sanityClient.fetch<PartnerJobPost[]>(jobsQuery);
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
            <Card key={job._id} className="p-8">
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
