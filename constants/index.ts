export type TTalkCard = {
  id: string;
  description: string;
  link?: string;
  picture?: string;
  talkClass?: string;
};

export type TTypeCard = {
  id: string;
  title: string;
  typeClass: string;
};

export const previousTalks: TTalkCard[] = [
  {
    id: 'riva2021',
    description:
      'Zero effort, high performances and secure GraphQL APIs with Hasura',
    link: 'https://www.youtube.com/watch?v=8z6CRK61JLA&t=2675s',
    picture: '',
    talkClass: 'riva'
  },
  {
    id: 'bartolesi2021',
    description: 'How to create awesome VSCode extensions',
    link: 'https://www.youtube.com/watch?v=8z6CRK61JLA&t=6850s',
    picture: '',
    talkClass: 'bartolesi'
  },
  {
    id: 'kerberus2021',
    description:
      'Project Kerberus for self-service resource provisioning and managament',
    link: 'https://www.youtube.com/watch?v=8z6CRK61JLA&t=4275s',
    picture: '',
    talkClass: 'soligo'
  },
  {
    id: 'opensource2021',
    description: 'Contribute to Open Source: the right way',
    link: 'https://www.youtube.com/watch?v=8z6CRK61JLA&t=1157s',
    picture: '',
    talkClass: 'scasciafratte'
  },
  {
    id: 'augmentedreality2021',
    description: '3D e Argumented Reality with google model-viewer',
    link: 'https://www.youtube.com/watch?v=8z6CRK61JLA&t=10020s',
    picture: '',
    talkClass: 'faye_franceschini'
  }
];
<<<<<<< HEAD
=======

export const cfpTypes: TTypeCard[] = [
  {
    id: 'jsts',
    title: 'Javascript / Typescript',
    typeClass: 'jsts'
  },
  {
    id: 'opensource',
    title: "Open Source (you don't say!)",
    typeClass: 'opensource'
  },
  {
    id: 'cloud',
    title: 'Cloud and Serverless',
    typeClass: 'cloud'
  },
  {
    id: 'rustgopython',
    title: 'Rust / Go / Python',
    typeClass: 'rustgopython'
  },
  {
    id: 'dei',
    title: 'Diversity and Inclusion',
    typeClass: 'dei'
  },
  {
    id: 'a11y',
    title: 'Accessibility',
    typeClass: 'a11y'
  },
  {
    id: 'greensustainability',
    title: 'Green and Sustainable Development',
    typeClass: 'greensustainability'
  }
];
>>>>>>> 03b022b56ba5a9589afbc62bfff07b3e25801cb3
