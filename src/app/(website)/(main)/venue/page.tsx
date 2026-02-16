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

import tshBig1 from "~/assets/images/venue/tsh-big-1.jpg";
import tshBig2 from "~/assets/images/venue/tsh-big-2.jpg";
import tshSmall1 from "~/assets/images/venue/tsh-small-1.jpg";
import tshSmall2 from "~/assets/images/venue/tsh-small-2.jpg";
import tshSmall3 from "~/assets/images/venue/tsh-small-3.jpg";

export const metadata = constructMetadata({
  title: "Venue",
  description: "Venue for OSDAY26",
  path: "/venue",
});

export default function VenuePage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Venue</Heading>
        <Typography variant="h3">
          We're at The Social Hub Firenze Belfiore! close to the city center.
          <br />
        </Typography>
        <Link
          href="https://maps.app.goo.gl/4N8HSAX6DERG8tDQ8"
          className="mt-4 flex items-start space-x-2"
          target="_blank"
        >
          <MapPin className="mt-1 h-5 w-5 text-white" />
          <Typography variant="large">
            Viale Belfiore, 55, 50144, Florence, Italy
          </Typography>
        </Link>
      </SectionContainer>

      <SectionContainer>
        {/* The Social Hub Section */}
        <div className="space-y-4">
          <Heading level={2}>About the space</Heading>

          <Typography>
            <b>The Social Hub Firenze Belfiore</b> is not your typical venue—
            it&apos;s where community meets creativity! This innovative nine-floor
            space blends hotel accommodation, dynamic coworking areas, and vibrant
            event spaces into one buzzing ecosystem. With a stunning rooftop pool
            and bar offering panoramic Florence views, an on-site gym, games room,
            restaurant (Ammodino), and bakery (Menchetti), it&apos;s designed for
            connection, collaboration, and celebration. Hosting around 600 events
            annually, The Social Hub is the perfect playground for open source
            enthusiasts to learn, network, and innovate together!
          </Typography>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-md shadow-md">
              <Image
                src={tshBig1}
                alt="Coworking space"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Event and conference spaces for our talks and workshops
            </p>  
          </div>
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-md shadow-md">
              <Image
                src={tshBig2}
                alt="Conference room"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              src: tshSmall1,
              alt: "Community spaces",
            },
            {
              src: tshSmall2,
              alt: "Collaboration areas",
            },
            {
              src: tshSmall3,
              alt: "Event spaces",
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
              (approximately 10 minutes), or take the tram T2 (direction Piazza
              dell&apos;Unità, stop: Belfiore)
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
              The nearest parking to the venue are: Fortezza da Basso, Porta al
              Prato - Leopolda, and Stazione S.M.N
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
              q="The+Social+Hub+Firenze+Belfiore"
            />
          )}
        </div>
      </SectionContainer>

      <EmptySectionContainer />
    </>
  );
}
