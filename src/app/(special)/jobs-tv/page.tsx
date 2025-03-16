import { groq } from "next-sanity";
import { getCacheTag, sanityFetch } from "~/lib/sanity-fetch";
import { constructMetadata } from "~/lib/utils/metadata";
import { JobsDisplay } from "./JobsDisplay";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

const jobsQuery = groq`*[_type == "partnerJobPost" && isActive == true] | order(publishedAt desc) {
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

export const metadata = constructMetadata({
  title: "Jobs TV",
  description: "Auto-rotating job board display for OSDay25",
  path: "/jobs-tv",
});

async function getPartnerJobs(): Promise<PartnerJobPost[]> {
  return sanityFetch(jobsQuery, undefined, {
    cacheDuration: 30, // Cache for 30 seconds
    tags: [getCacheTag.jobs()],
  });
}

export default async function JobsTVPage() {
  const jobs = await getPartnerJobs();

  return (
    <div className="min-h-screen bg-background">
      <JobsDisplay initialJobs={jobs} />
    </div>
  );
}
