export interface Card {
  id: string;
  set: string;
  name: string;
  supertype: string;
  subtypes: string[];
  types: string[];
  number: string;
  rarity: string;
  images: {
    large: string;
  };
}
