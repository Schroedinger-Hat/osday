import Image from "next/image";
import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Paragraph } from "~/components/atoms/typography/Paragraph";
import { Typography } from "~/components/atoms/typography/Typography";
import schroddySticker from "~/assets/images/schroddy-sticker.png";
export default function HomePage() {
  return (
    <main>
      <SectionContainer>
        <Heading level={1} huge className="text-center">
          For who loves open source
        </Heading>
        <Paragraph>
          Open Source Day is a tech conference focused on the open source
          community.
          <br />
          2025 edition will be in <strong>Florence</strong>
        </Paragraph>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Typography variant="lead" className="mb-1">
              Speakers
            </Typography>
            <Typography variant="h4" className="m-0 text-2xl font-bold">
              11
            </Typography>
          </div>

          <div>
            <Typography variant="lead" className="mb-1">
              People Attending
            </Typography>
            <Typography variant="h4" className="m-0 text-2xl font-bold">
              349
            </Typography>
          </div>

          <div>
            <Typography variant="lead" className="mb-1">
              Venue
            </Typography>
            <Typography variant="h4" className="m-0 text-2xl font-bold">
              Nana Bianca
            </Typography>
          </div>

          <div>
            <Typography variant="lead" className="mb-1">
              Location
            </Typography>
            <Typography variant="h4" className="m-0 text-2xl font-bold">
              Florence, Italy
            </Typography>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Speakers</Heading>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Talks</Heading>
      </SectionContainer>

      <SectionContainer>
        <Heading level={2}>Sponsors</Heading>
        <Paragraph>
          Open Source Day is made possible by the generous support of our
          sponsors.
        </Paragraph>
      </SectionContainer>

      <SectionContainer className="flex justify-center">
        <Image src={schroddySticker} alt="Schroddy" width={240} height={240} />
      </SectionContainer>
    </main>
  );
}
