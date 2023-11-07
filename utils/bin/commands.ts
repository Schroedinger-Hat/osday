// List of commands that do not require API calls

import * as bin from './index';
import config from '../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, we are Schrodinger Hat! Ping us on our social media`;
};


// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest. 
here are the ways you can support our work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.opencollective}" target="_blank">open collective</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username} - and a beautiful human being`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `not your business`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `you need to ask the permission`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=VTBE_apFI1g', '_blank');
  return `Don't.`;
};

export const rm = async (args?: string[]): Promise<string> => {
  return `Are you hacking us??`;
};

export const sponsor = async (args?: string[]): Promise<string> => {
  return `
  Contact us at events@schrodinger-hat.it

  +------------------------+-----------------+-----------------+-----------------+-----------------+-------------------+
  |                          | community       | silver          | gold            | platinum        | diamond         |
  +--------------------------+-----------------+-----------------+-----------------+-----------------+-----------------+
  | Thank you                | ✔               | ✔               | ✔               | ✔               | ✔               |
  | Social post with logo    | ✔               | ✔               | ✔               | ✔               | ✔               |
  | Logo on website          | ✔               | ✔               | ✔               | ✔               | ✔               |
  | Social Awareness         | ✔               | ✔               | ✔               | ✔               | ✔               |
  | Conference Badge         | ✗               | ✗               | ✔               | ✔               | ✔               |
  | Logo on poster           | ✗               | ✔               | ✔               | ✔               | ✔               |
  | Rollup Logo Print        | ✗               | ✔               | ✔               | ✔               | ✔               |
  | Logo in streaming        | ✗               | ✔               | ✔               | ✔               | ✔               |
  | Job Offer                | ✗               | ✗               | ✔               | ✔               | ✔               |
  | Job Offer in Newsletter  | ✗               | ✗               | ✗               | ✗               | ✔               |
  | Job Offer pinned Discord | ✗               | ✗               | ✗               | ✗               | ✔               |
  | Attendee's list          | ✗               | ✗               | ✗               | ✔               | ✔               |
  | Unattended Booth         | ✗               | ✗               | ✔               | ✗               | ✗               |
  | Stand in Conference Hall | ✗               | ✗               | ✗               | ✔               | ✔               |
  | price                    |     email us    | € 1000 email us | € 2000 email us | € 3000 email us | € 4000 email us |
  +--------------------------+-----------------+-----------------+-----------------+-----------------+

  `;
};

export const gui = async (args?: string[]): Promise<string> => {
  window.open('https://2024.osday.dev');
  return 'redirecting';
};

export const ticket = async (args?: string[]): Promise<string> => {
  window.open(config.social.eventbrite, '_blank');
  return 'redirecting';
};

export const cfp = async (args?: string[]): Promise<string> => {
  window.open(config.social.sessionize, '_blank');
  return 'redirecting';
};

export const pwd = async (args?: string[]): Promise<string> => {
  window.open(config.venue, '_blank');
  return 'P.za di Cestello, 10, 50124 Firenze FI, Italia';
};

// Banner
export const banner = (args?: string[]): string => {
  return `
                    %%%%%#####%%%%                  
              &%%%%%%%%%%%%%%%%%%%%%%%%%            
          &%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%        
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%###&    
     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%####%     
    &%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%######%  
   &%%%%%%%%%%%@@&%%%%%%%%%%%%%%%%%%%&@@%%%#######% 
  &%%%%%%%%%%%&@@@@@@@@@@@@@@@@@@@&@@@@@%%%########&
  %%%%%%%%%%%%&@@@@@@@@@@@@@@@@@@@@@@@@@&%%#########
  %%%%%%%%%%%%@@@@*   (@@@@@@@@# . /@@@@&%%#########
  %%%%%%%%%%%%@@@@#  .%@@@@@@@@/.(.*@@@@@%%#########
  %%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@&%%#########
  %%%%%%%%%%%%%&@@@@@@@@@@@@@@@@@@@@@@@&%%%#########
   %%%%%%%%%%%%%%%&@@@@@@@@@@@@@@@@@&%%%%%%########&
    %%%%%%%%%%%%%%%%%%%%&&&&&&%%%%%%%%%%%%%#######% 
     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%######   
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#####%    
        &%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##%      
           &%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         
                %%%%%%%%%%%%%%%%%%%%%%              
    

Type 'help' to see the list of available commands.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
