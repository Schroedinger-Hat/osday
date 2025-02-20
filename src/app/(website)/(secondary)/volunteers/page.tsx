import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { constructMetadata } from "~/lib/utils/metadata";
import { Card } from "~/components/ui/card";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { LifeBuoy, Pencil, Ticket, Users } from "lucide-react";

export const metadata = constructMetadata({
  title: "Volunteers",
  description:
    "Join us as a volunteer for OSDay25 and help make open source more accessible",
});

export default function VolunteersPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Become a Volunteer</Heading>
        <Typography variant="h3">
          We are always looking for volunteers to help us make Open Source Day
          possible. Join our community and help make open source more accessible
          to everyone
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <LifeBuoy size={30} className="text-primary" />
              <Heading level={4}>Technical Support</Heading>
            </div>
            <Typography variant="medium">
              Help attendees with technical issues, assist in workshops, and
              provide guidance during hands-on sessions. Your expertise can make
              a difference in someone&apos;s open source journey.
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Ticket size={30} className="text-primary" />
              <Heading level={4}>Event Operations</Heading>
            </div>
            <Typography variant="medium">
              Support event logistics, help with registration, manage rooms and
              spaces, and ensure everything runs smoothly during the conference.
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Users size={30} className="text-primary" />
              <Heading level={4}>Community Outreach</Heading>
            </div>
            <Typography variant="medium">
              Spread the word about OSDay, engage with attendees on social
              media, and help build our community before, during, and after the
              event.
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Pencil size={30} className="text-primary" />
              <Heading level={4}>Content Creation</Heading>
            </div>
            <Typography variant="medium">
              Help create and manage content for our website, social media, and
              documentation. Share your creativity and communication skills.
            </Typography>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="flex flex-col space-y-4">
          {/* <IconHeartHandshake size={60} className="text-primary" /> */}
          <Heading level={3}>Ready to Make an Impact?</Heading>
          <Typography>
            Join our volunteer team and be part of making OSDay25 an amazing
            experience for everyone.
            <br />
            We welcome contributors of all skill levels and backgrounds.
          </Typography>
          <Link
            href="mailto:osday@schroedinger-hat.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Contact Us to Volunteer</Button>
          </Link>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="flex flex-col space-y-4">
          <Heading level={3} className="mb-0 md:mb-0">
            Activate a Membership
          </Heading>
          <Typography>
            Become an official member of Schroedinger Hat to support our
            mission, take part in exclusive member initiatives, and help shape
            our future.
          </Typography>
          <Link
            href="https://schroedinger-hat.org/association/join"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Activate Membership</Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex h-full flex-col p-4">
            <Heading level={4} className="mb-0 md:mb-0">
              Support Our Mission
            </Heading>
            <Typography className="flex-1">
              Your membership helps fund open source initiatives and educational
              programs that make technology accessible to everyone.
            </Typography>
          </Card>
          <Card className="flex h-full flex-col p-4">
            <Heading level={4} className="mb-0 md:mb-0">
              Shape the Future
            </Heading>
            <Typography className="flex-1">
              Contribute to community-driven projects, collaborate with peers,
              and bring new ideas to life through events and workshops.
            </Typography>
          </Card>
          <Card className="flex h-full flex-col p-4">
            <Heading level={4} className="mb-0 md:mb-0">
              Exclusive Initiatives
            </Heading>
            <Typography className="flex-1">
              Unlock opportunities to lead special projects, join private
              discussion groups, and participate in member-only events.
            </Typography>
          </Card>
        </div>
      </SectionContainer>
    </>
  );
}