export interface SanityImageType {
  url: string;
  backgroundColor?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  // Add other relevant image properties as needed
}

export interface Speaker {
  _id: string;
  firstName: string;
  lastName: string;
  pronouns?: string;
  title?: string;
  photo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  biography?: any[]; // Portable Text format
  slug: {
    current: string;
  };
}
