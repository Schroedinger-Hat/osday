import React from 'react';
import Image from "next/image";

type TSponsorTable = {
  isVisible: boolean
};

interface Sponsor {
  alt: string;
  height?: number;
  href: string;
  src: string;
  width?: number;
}

const communitySponsors: Sponsor[] = [
  {
    alt: "TheRedCode",
    href: "https://www.theredcode.it/",
    src: "/the-red-code.png",
    width: 300,
  },
  {
    alt: "KubeEvents Logo",
    height: 100,
    href: "https://kube.events/",
    src: "/kube-events.svg",
    width: 100,
  },
  {
    alt: "KubeCareers Logo",
    height: 80,
    href: "https://kube.careers/",
    src: "/kube-careers.svg",
    width: 80,
  }
];

const goldSponsors: Sponsor[] = [
  {
    alt: "Gadfly logo",
    href: "https://gadfly.ai",
    src: "/sponsors/2025/gadfly.svg",
    width: 300,
    height: 125
  },
  {
    alt: "Nethesis logo",
    href: "https://www.nethesis.it/",
    src: "/sponsors/2025/nethesis.svg",
    width: 300,
    height: 125
  }
]

const diamondSponsors: Sponsor[] = [
  {
    alt: "HeroDevs logo",
    href: "https://www.herodevs.com/",
    src: "/sponsors/2025/herodevs.svg",
    width: 300,
    height: 100
  },
  {
    alt: "Aruba Logo",
    href: "https://www.aruba.it/",
    src: "/sponsors/2025/arubait.png",
    width: 200,
    height: 100
  }
]

const supporterSponsor: Sponsor[] = [
  {
    alt: "Nana Bianca",
    href: "https://www.nanabianca.it/",
    src: "/nanabianca_logo.svg",
    width: 400,
    height: 200
  }
]

interface SponsorTier {
  name: string;
  sponsors: Sponsor[];
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "Supporter",
    sponsors: supporterSponsor
  },
  {
    name: 'Diamond',
    sponsors: diamondSponsors
  },
  {
    name: "Gold",
    sponsors: goldSponsors
  },
  {
    name: "Community",
    sponsors: communitySponsors
  }
];

const SponsorTable = ({isVisible}: TSponsorTable) => {
  if (!isVisible) return null;

  return (
    <section className="current_sponsors">
      <h2 className="sponsors_thanks" style={{textAlign: "center"}}>Thanks to our sponsors</h2>

      {sponsorTiers.map((tier) => (
        <div key={tier.name}>
          <h3 className="sponsors_tier">{tier.name}</h3>
          <div className="sponsors_logo">
            {tier.sponsors.map((sponsor) => (
              <a key={sponsor.href} href={sponsor.href} target="_blank" rel="noreferrer">
                <Image
                  width={sponsor.width ?? 80}
                  height={sponsor.height ?? 80}
                  src={sponsor.src}
                  alt={sponsor.alt}
                />
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SponsorTable;
