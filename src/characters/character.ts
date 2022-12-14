export interface Character {
  name: string;
  species: string;
  location: string;
  gender: string;
  alive: boolean;
}

export interface Characters {
  characters: Character[];
}
