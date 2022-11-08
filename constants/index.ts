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
    link: '',
    picture: '',
    talkClass: 'riva'
  },
  {
    id: 'bartolesi2021',
    description: 'How to create awesome VSCode extensions',
    link: '',
    picture: '',
    talkClass: 'bartolesi'
  },
  {
    id: 'kerberus2021',
    description:
      'Project Kerberus for self-service resource provisioning and managament',
    link: '',
    picture: ''
  },
  {
    id: 'opensource2021',
    description: 'Contribute to Open Source: the right way',
    link: '',
    picture: ''
  },
  {
    id: 'augmentedreality2021',
    description: '3D e Argumented Reality with google model-viewer',
    link: '',
    picture: ''
  }
];
