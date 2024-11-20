export type TTalkCard = {
  id: string;
  description: string;
  link?: string;
  picture?: string;
  author?: string;
};

export type TTypeCard = {
  id: string;
  title: string;
  typeClass: string;
};

export const previousTalks: TTalkCard[] = [
  {
    id: "riva2021",
    description:
      "Zero effort, high performances and secure GraphQL APIs with Hasura",
    link: "https://www.youtube.com/watch?v=8z6CRK61JLA&t=2675s",
    picture: "",
  },
  {
    id: "bartolesi2021",
    description: "How to create awesome VSCode extensions",
    link: "https://www.youtube.com/watch?v=8z6CRK61JLA&t=6850s",
    picture: "",
  },
  {
    id: "kerberus2021",
    description:
      "Project Kerberus for self-service resource provisioning and managament",
    link: "https://www.youtube.com/watch?v=8z6CRK61JLA&t=4275s",
    picture: "",
  },
  {
    id: "opensource2021",
    description: "Contribute to Open Source: the right way",
    link: "https://www.youtube.com/watch?v=8z6CRK61JLA&t=1157s",
    picture: "",
  },
  {
    id: "augmentedreality2021",
    description: "3D e Augmented Reality with google model-viewer",
    link: "https://www.youtube.com/watch?v=8z6CRK61JLA&t=10020s",
    picture: "",
  },
  {
    id: "operatorkerberus2021",
    description: "Capsule, storia di un operator kubernetes open source",
    link: "https://youtu.be/8z6CRK61JLA",
    picture: "",
  },
];

export const cfpTypes: TTypeCard[] = [
  {
    id: "jsts",
    title: "Javascript / Typescript",
    typeClass: "jsts",
  },
  {
    id: "opensource",
    title: "Open Source (you don't say!)",
    typeClass: "opensource",
  },
  {
    id: "cloud",
    title: "Cloud and Serverless",
    typeClass: "cloud",
  },
  {
    id: "rustgopython",
    title: "Rust / Go / Python",
    typeClass: "rustgopython",
  },
  {
    id: "dei",
    title: "Diversity and Inclusion",
    typeClass: "dei",
  },
  {
    id: "a11y",
    title: "Accessibility",
    typeClass: "a11y",
  },
  {
    id: "greensustainability",
    title: "Green and Sustainable Development",
    typeClass: "greensustainability",
  },
];

export const talks2024: TTalkCard[] = [
  {
    id: "fiorucci1",
    description:
      "Stefano Fiorucci - Large Language Models for Devs: from zero to your first LLM application",
    link: "https://www.youtube.com/watch?v=L6sUztYJXT8",
    picture: "",
    author: "fiorucci",
  },
  {
    id: "agata1",
    description: "Agata Hidalgo - Open Debate: AI",
    link: "https://www.youtube.com/watch?v=uY1rqVR-Tts",
    picture: "",
    author: "agata",
  },
  {
    id: "napoletano1",
    description:
      "Francesco Napoletano - 10 secrets to still be a rockstar developer after 40 - #7 will surprise you!",
    link: "https://www.youtube.com/watch?v=FuvbGNPPBLw",
    picture: "",
    author: "napoletano",
  },
  {
    id: "christina1",
    description:
      "Christina Dahlén - Why Writing To Disk Is Faster: Building a Message Broker",
    link: "https://www.youtube.com/watch?v=dHAggkzaMTE",
    picture: "",
    author: "christina",
  },
  {
    id: "albano1",
    description:
      "Alessandro Albano - 🇮🇹 Designing Accessible and Inclusive Software: An Opportunity for All",
    link: "https://www.youtube.com/watch?v=11Mji2mbBUk",
    picture: "",
    author: "albano",
  },
  {
    id: "corti2",
    description:
      "Francesco Corti - From the origin to the future of open source model and business",
    link: "https://www.youtube.com/watch?v=di9796xHIkE",
    picture: "",
    author: "corti2",
  },
  {
    id: "roman1",
    description: "Roman Khavronenko - How to monitor the monitoring",
    link: "https://www.youtube.com/watch?v=CJcKUIoD-gs",
    picture: "",
    author: "roman",
  },
  {
    id: "irine1",
    description: "Irine Kokilashvili - Nanocl: Our Open Source Story",
    link: "https://www.youtube.com/watch?v=nlzsSHcTZVI",
    picture: "",
    author: "irine",
  },
  {
    id: "omar1",
    description:
      "Omar Diop - Perfect Pitch: Unveiling the Mathematical Symphony Behind a Guitar Tuner",
    link: "https://www.youtube.com/watch?v=W9HBHDogaFU",
    picture: "",
    author: "omar",
  },
  {
    id: "pj1",
    description: "PJ Hagerty - Open Source Isn't What It Used to Be",
    link: "https://www.youtube.com/watch?v=49gIHFsFBiQ",
    picture: "",
    author: "pj",
  },
];

export const talks2023: TTalkCard[] = [
  {
    id: "liran1",
    description: "The Unexpected Demise of Open Source Libraries - Liran Tal",
    link: "https://www.youtube.com/watch?v=ijqCliQQvrY",
    picture: "",
    author: "liran",
  },
  {
    id: "alina1",
    description:
      "Ensuring IoT Application Edge Resilience with the Open Source AWS IoT Device Client - Alina Dima",
    link: "https://www.youtube.com/watch?v=xz2St9pxiQw",
    picture: "",
    author: "alina",
  },
  {
    id: "rivagonzaga1",
    description:
      "5 Ways You Could Have Hacked Node js - Rafael Gonzaga, Michele Riva",
    link: "https://www.youtube.com/watch?v=Y1jiF430k2Q",
    picture: "",
    author: "riva",
  },
  {
    id: "grebowski1",
    description:
      "This Open Source Tool Turns Building Access Management from Scary to Simple - Filip Grebowski",
    link: "https://www.youtube.com/watch?v=-0pGBLFP0Kw",
    picture: "",
    author: "grebowski",
  },
  {
    id: "terzi1",
    description:
      "Challenges of Cross Platform Development in Rust - Federico Terzi",
    link: "https://www.youtube.com/watch?v=hXSH6YRs950",
    picture: "",
    author: "terzi",
  },
  {
    id: "dellalucezuccala1",
    description:
      "Reliable and Cost effective Cloud Security with Falco - Jason Dellaluce, Michele Zuccala",
    link: "https://www.youtube.com/watch?v=DpQH-h3HcHA",
    picture: "",
    author: "dellaluce",
  },
  {
    id: "sensini1",
    description: "One library a day keeps the doctor away - Serena Sensini",
    link: "https://www.youtube.com/watch?v=K0M06pR4Gz0",
    picture: "",
    author: "sensini",
  },
  {
    id: "paolinelli1",
    description: "How to tame a maintainer - Federico Paolinelli",
    link: "https://www.youtube.com/watch?v=VN8V2mgiVj4",
    picture: "",
    author: "paolinelli",
  },
  {
    id: "collina1",
    description:
      "Why are there no incentives for security in Open Source? - Matteo Collina",
    link: "https://www.youtube.com/watch?v=c37PWKBhDsI",
    picture: "",
    author: "collina",
  },
  {
    id: "corti1",
    description:
      "Organization and challenges with best practices behind a successful os project - Francesco Corti",
    link: "https://www.youtube.com/watch?v=vZXsv2Q7K_w",
    picture: "",
    author: "corti",
  },
];

export type TicketImage = {
  name: string;
  year: string;
  dates: string;
};

interface MapStream {
  [key: string]: string;
}

export const YT_LIVE_LINKS: MapStream = {
  alpha1: "https://youtube.com/live/_mA4mvYpU68",
  alpha2: "https://youtube.com/live/8owI4xBEIl0",
  beta1: "https://youtube.com/live/te8tNwnej0M",
  beta2: "https://youtube.com/live/Va6vIYCVxj0",
};
