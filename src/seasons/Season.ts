export interface Season {
  name: string;
  season_number: number;
  year: number;
  episodes: string[];
}

export interface Seasons {
  seasons: Season[];
}
