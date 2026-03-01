import { DashedLine01Icon, StarIcon } from "hugeicons-react";
import Link from "next/link";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";

interface PricingFeature {
  name: string;
  community: boolean;
  gold: boolean;
  diamond: boolean;
}

function FeatureIcon({ isEnabled }: { isEnabled: boolean }) {
  return isEnabled ? (
    <StarIcon className="text-green-500" />
  ) : (
    <DashedLine01Icon className="text-gray-500" />
  );
}

export default function PricingTable() {
  const features: PricingFeature[] = [
    { name: "Thank you", community: true, gold: true, diamond: true },
    {
      name: "Social post with logo",
      community: true,
      gold: true,
      diamond: true,
    },
    { name: "Logo on website", community: true, gold: true, diamond: true },
    { name: "Social Awareness", community: false, gold: true, diamond: true },
    { name: "Conference Badge", community: false, gold: true, diamond: true },
    { name: "Logo on poster", community: false, gold: true, diamond: true },
    { name: "Rollup Logo Print", community: true, gold: true, diamond: true },
    { name: "Logo in streaming", community: false, gold: true, diamond: true },
    { name: "Job Offer", community: false, gold: true, diamond: true },
    {
      name: "Job Offer in Newsletter",
      community: false,
      gold: false,
      diamond: true,
    },
    {
      name: "Job Offer pinned Discord",
      community: false,
      gold: false,
      diamond: true,
    },
    { name: "Attendee's list", community: false, gold: false, diamond: true },
    {
      name: "Stand in Conference Hall (limited availability)",
      community: false,
      gold: false,
      diamond: true,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-x-4">
        {/* Header */}
        <div className="col-span-1" />
        <div className="flex items-center justify-center rounded-md bg-fiery-red p-4 text-white shadow-md">
          <Heading level={4} className="mb-0">
            Community
          </Heading>
        </div>
        <div className="flex items-center justify-center rounded-md bg-fiery-red p-4 text-white shadow-md">
          <Heading level={4} className="mb-0">
            Gold
          </Heading>
        </div>
        <div className="flex items-center justify-center rounded-md bg-fiery-red p-4 text-white shadow-md">
          <Heading level={4} className="mb-0">
            Diamond
          </Heading>
        </div>

        {/* Features Grid - Desktop */}
        {features.map((feature, index) => (
          <>
            <div
              key={`name-${index}`}
              className="flex items-center border-b border-gray-800 py-4"
            >
              <Typography variant="small" className="font-bold uppercase">
                {feature.name}
              </Typography>
            </div>
            <div
              key={`community-${index}`}
              className="flex justify-center border-b border-gray-800 py-4"
            >
              <FeatureIcon isEnabled={feature.community} />
            </div>
            <div
              key={`gold-${index}`}
              className="flex justify-center border-b border-gray-800 py-4"
            >
              <FeatureIcon isEnabled={feature.gold} />
            </div>
            <div
              key={`diamond-${index}`}
              className="flex justify-center border-b border-gray-800 py-4"
            >
              <FeatureIcon isEnabled={feature.diamond} />
            </div>
          </>
        ))}

        {/* Pricing - Desktop */}
        <div className="col-span-1" />
        <div className="p-4 text-center">
          <Link
            href="mailto:osday@schroedinger-hat.org"
            className="italic text-red-500 hover:underline"
          >
            email us
          </Link>
        </div>
        <div className="p-4 text-center">
          <Link
            href="mailto:osday@schroedinger-hat.org"
            className="italic text-red-500 hover:underline"
          >
            email us
          </Link>
        </div>
        <div className="p-4 text-center">
          <Link
            href="mailto:osday@schroedinger-hat.org"
            className="italic text-red-500 hover:underline"
          >
            email us
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col space-y-8 md:hidden">
        {/* Community Plan */}
        <div className="rounded-md border border-gray-200 shadow-md">
          <div className="bg-fiery-red p-4 text-center text-white">
            <Heading level={4} className="mb-0">
              Community
            </Heading>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center justify-between">
                  <Typography variant="small" className="font-bold uppercase">
                    {feature.name}
                  </Typography>
                  <FeatureIcon isEnabled={feature.community} />
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="mailto:osday@schroedinger-hat.org"
                className="italic text-red-500 hover:underline"
              >
                email us
              </Link>
            </div>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="rounded-md border border-gray-200 shadow-md">
          <div className="bg-fiery-red p-4 text-center text-white">
            <Heading level={4} className="mb-0">
              Gold
            </Heading>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center justify-between">
                  <Typography variant="small" className="font-bold uppercase">
                    {feature.name}
                  </Typography>
                  <FeatureIcon isEnabled={feature.gold} />
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="mailto:osday@schroedinger-hat.org"
                className="italic text-red-500 hover:underline"
              >
                email us
              </Link>
            </div>
          </div>
        </div>

        {/* Diamond Plan */}
        <div className="rounded-md border border-gray-200 shadow-md">
          <div className="bg-fiery-red p-4 text-center text-white">
            <Heading level={4} className="mb-0">
              Diamond
            </Heading>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center justify-between">
                  <Typography variant="small" className="font-bold uppercase">
                    {feature.name}
                  </Typography>
                  <FeatureIcon isEnabled={feature.diamond} />
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="mailto:osday@schroedinger-hat.org"
                className="italic text-red-500 hover:underline"
              >
                email us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
