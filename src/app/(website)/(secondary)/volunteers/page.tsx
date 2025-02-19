import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { constructMetadata } from "~/lib/utils/metadata";
import { IconCode, IconHeartHandshake, IconClipboardCheck, IconSocial, IconPencil } from "@tabler/icons-react";
import { Card } from "~/components/ui/card";

export const metadata = constructMetadata({
  title: "Volunteers",
  description: "Join us as a volunteer for OSDay25 and help make open source more accessible",
});

export default function VolunteersPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Become a Volunteer</Heading>
        <Typography variant="h3">
          Join our community and help make open source more accessible to everyone
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <IconCode size={40} className="text-primary" />
              <Typography variant="h4">Technical Support</Typography>
              <Typography>
                Help attendees with technical issues, assist in workshops, and provide guidance during hands-on sessions.
                Your expertise can make a difference in someone's open source journey.
              </Typography>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <IconClipboardCheck size={40} className="text-primary" />
              <Typography variant="h4">Event Operations</Typography>
              <Typography>
                Support event logistics, help with registration, manage rooms and spaces, and ensure everything runs smoothly
                during the conference.
              </Typography>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <IconSocial size={40} className="text-primary" />
              <Typography variant="h4">Community Outreach</Typography>
              <Typography>
                Spread the word about OSDay, engage with attendees on social media, and help build our community
                before, during, and after the event.
              </Typography>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <IconPencil size={40} className="text-primary" />
              <Typography variant="h4">Content Creation</Typography>
              <Typography>
                Help create and manage content for our website, social media, and documentation. Share your creativity
                and communication skills.
              </Typography>
            </div>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="flex flex-col items-center gap-6 text-center">
          <IconHeartHandshake size={60} className="text-primary" />
          <Heading level={3}>Ready to Make an Impact?</Heading>
          <Typography>
            Join our volunteer team and be part of making OSDay25 an amazing experience for everyone.
            We welcome contributors of all skill levels and backgrounds.
          </Typography>
          <a
            href="mailto:osday@schroedinger-hat.org"
            className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us to Volunteer
          </a>
        </div>
      </SectionContainer>

      <SectionContainer withBackground backgroundType="alternative">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading level={3}>Activate a Membership</Heading>
          <Typography>
            Become an official member of Schroedinger Hat to support our mission,
            take part in exclusive member initiatives, and help shape our future.
          </Typography>
          <a
            href="https://schroedinger-hat.org/association/join"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Activate Membership
          </a>
        </div>

        <div className="md:columns-2 lg:columns-3 space-y-4 mt-8">
          <Card className="break-inside-avoid p-6">
            <Heading level={4}>Support Our Mission</Heading>
            <Typography>
              Your membership helps fund open source initiatives and educational
              programs that make technology accessible to everyone.
            </Typography>
          </Card>
          <Card className="break-inside-avoid p-6">
            <Heading level={4}>Shape the Future</Heading>
            <Typography>
              Contribute to community-driven projects, collaborate with peers,
              and bring new ideas to life through events and workshops.
            </Typography>
          </Card>
          <Card className="break-inside-avoid p-6">
            <Heading level={4}>Exclusive Initiatives</Heading>
            <Typography>
              Unlock opportunities to lead special projects, join private discussion
              groups, and participate in member-only events.
            </Typography>
          </Card>
        </div>
      </SectionContainer>
    </>
  );
}
