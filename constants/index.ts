export type TTalkCard = {
  id: string;
  description: string;
  link?: string;
  picture?: string;
  talkClass?: string;
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
