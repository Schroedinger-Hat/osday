import { Car, MapPin, Plane, Train } from "lucide-react";
import Image from "next/image";
import {
  EmptySectionContainer,
  SectionContainer,
} from "~/components/atoms/layout/SectionContainer";
import Link from "next/link";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { env } from "~/env";
import { constructMetadata } from "~/lib/utils/metadata";

import nanaBig1 from "~/assets/images/venue/nana-big-1.jpg";
import nanaBig2 from "~/assets/images/venue/nana-big-2.jpg";
import nanaSmall1 from "~/assets/images/venue/nana-small-1.jpg";
import nanaSmall2 from "~/assets/images/venue/nana-small-2.jpg";
import nanaSmall3 from "~/assets/images/venue/nana-small-3.jpg";

export const metadata = constructMetadata({
  title: "Venue",
  description: "Venue for OSDay25",
  path: "/venue",
});

export default function VenuePage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Venue</Heading>
        <Typography variant="h3">
          The event is hosted by Nana Bianca, in the heart of Florence
          <br />
        </Typography>
        <Link
          href="https://maps.app.goo.gl/adfauYT9pLbSbWm37"
          className="mt-4 flex items-start space-x-2"
        >
          <MapPin className="mt-1 h-5 w-5 text-white" />
          <Typography variant="large">
            Piazza di Cestello 10, 50124, Florence, Italy
          </Typography>
        </Link>
      </SectionContainer>

      <SectionContainer>
        {/* Nana Bianca Section */}
        <div className="space-y-4">
          <Heading level={2}>About the space</Heading>

          <Typography>
            Nana Bianca is a startup studio and digital innovation hub located
            in a historic building along the Arno River. The space combines
            Florence&apos;s rich heritage with modern technology, providing an
            inspiring environment for innovation and collaboration.
          </Typography>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-md shadow-md">
              <Image
                src={nanaBig1}
                alt="Nana Bianca exterior"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              The coworking space you can use to work between talks
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-md shadow-md">
              <Image
                src={nanaBig2}
                alt="Nana Bianca main hall"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              One of the many room of the conference center
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              src: nanaSmall1,
              alt: "Meeting area",
            },
            {
              src: nanaSmall2,
              alt: "Innovation lab",
            },
            {
              src: nanaSmall3,
              alt: "Networking space",
            },
          ].map((image, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-md shadow-md md:aspect-square"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>How to reach</Heading>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Train className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
            <Typography variant="medium">
              From the main station Firenze SMN, you can reach the venue by walk
              (15min.), or take a bus (lines C4/6 stop: Soderini Torrino Santa
              Rosa)
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Plane className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
              <div className="space-y-4">
                <Typography variant="medium">
                  <b>Florence Airport (FLR)</b>
                  <br />
                  Take the tram line T2, stop: Alamanni - Stazione Santa Maria
                  Novella
                </Typography>

                <Typography variant="medium">
                  <b>Pisa Airport (PSA)</b>
                  <br />
                  Take the PisaMover from the airport to Pisa Centrale. Then
                  take a train to Firenze Santa Maria Novella (1h/1h30m)
                </Typography>

                <Typography variant="medium">
                  <b>Bologna Airport (BLQ)</b>
                  <br />
                  There is a minibus that can get you to Bologna Centrale train
                  station. Then you can choose to reach Florence by bus(1:30h)
                  or by train(30m / 1h).
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Car className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
            <Typography variant="medium">
              Here a list of{" "}
              <Link
                href="https://www.fipark.com/"
                target="_blank"
                className="underline"
              >
                paid parking.
              </Link>{" "}
              The nearest to the venue are: Porta al Prato - Leopolda, Stazione
              S.M.N and S. Lorenzo - Mercato Centrale
            </Typography>
          </div>
        </div>

        <Typography variant="muted" className="mt-4 border-t pt-4">
          If you need help, or need more information send us an{" "}
          <Link href="mailto:osday@schroedinger-hat.org" className="underline">
            email
          </Link>
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="overflow-hidden rounded-md shadow-md">
          {env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <GoogleMapsEmbed
              apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              height={400}
              width="100%"
              mode="place"
              q="Nana+Bianca,Firenze"
            />
          )}
        </div>
      </SectionContainer>

      <EmptySectionContainer />
    </>
  );
}
