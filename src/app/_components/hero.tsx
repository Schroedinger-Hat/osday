import { Heading } from "~/components/atoms/typography/Heading";
import { cn } from "~/lib/utils";
import logo from "~/assets/images/logo.svg";
import Image from "next/image";
import { Typography } from "~/components/atoms/typography/Typography";

const stats = [
  { label: "Speakers", value: "14" },
  { label: "When", value: "21st of March" },
  { label: "Venue", value: "Nana Bianca" },
  { label: "Location", value: "Florence, Italy" },
];

export default function Hero() {
  return (
    <div className="min-h-[80vh] w-full overflow-hidden bg-[#C4493A]">
      <div className="container mx-auto flex max-w-6xl flex-col py-20">
        {/* Name */}
        <div className="mb-16">
          <Image src={logo} alt="Open Source Day" width={100} height={200} />
        </div>

        <Heading level={1} huge>
          FOR WHO LOVES
          <br />
          OPEN SOURCE
        </Heading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={cn("flex flex-col")}>
              <Typography
                variant="small"
                className="mb-0 font-bold uppercase text-background md:mb-0"
              >
                {stat.label}
              </Typography>
              <Typography variant="h3" className="font-semibold">
                {stat.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
