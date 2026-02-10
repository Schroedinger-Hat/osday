import { SectionContainer } from "~/components/atoms/layout/SectionContainer";
import { Heading } from "~/components/atoms/typography/Heading";
import { Typography } from "~/components/atoms/typography/Typography";
import { constructMetadata } from "~/lib/utils/metadata";
import { Card } from "~/components/ui/card";
import { Trophy, Star, Target, Award } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Gamification",
  description:
    "Learn about the gamification elements at OSDAY26 and how you can earn points and awards",
  path: "/gamification",
});

export default function GamificationPage() {
  return (
    <>
      <SectionContainer withBackground backgroundType="hero">
        <Heading level={2}>Gamification at OSDAY26</Heading>
        <Typography variant="h3">
          Make your conference experience more exciting by participating in our
          gamification system. Earn points, redeem awards, and compete with
          other attendees!
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Trophy size={30} className="text-primary" />
              <Heading level={4}>Points System</Heading>
            </div>
            <Typography variant="medium">
              Earn points by attending sessions, participating in Q&A,
              contributing to giving feedback, engaging with speakers and
              sponsors and many more activities. Track your progress on our
              leaderboard.
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Star size={30} className="text-primary" />
              <Heading level={4}>Redeemable Awards</Heading>
            </div>
            <Typography variant="medium">
              Redeem your points for special awards, from conference merchandise
              to sponsor giveaways. Show off your awards on your social media
              profile!
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Target size={30} className="text-primary" />
              <Heading level={4}>Challenges</Heading>
            </div>
            <Typography variant="medium">
              Take part in the challenges to earn bonus points and special
              rewards. New challenges are announced during the conference.
            </Typography>
          </Card>

          <Card className="p-6">
            <div className="flex flex-row gap-2">
              <Award size={30} className="text-primary" />
              <Heading level={4}>Special Rewards</Heading>
            </div>
            <Typography variant="medium">
              Top performers will receive special recognition and exclusive
              prizes. Stay engaged throughout the conference to maximize your
              chances!
            </Typography>
          </Card>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <Heading level={3}>How to Participate</Heading>
          <Typography>
            Getting started is easy! Use our mobile web app to track your
            progress and see where you stand on the leaderboard.
          </Typography>
          <Link
            href="https://gamification.osday.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Open Gamification App</Button>
          </Link>
        </div>
      </SectionContainer>
    </>
  );
}
