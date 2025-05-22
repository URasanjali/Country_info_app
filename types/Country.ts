export interface Country {
  name: { common: string };
  flags: { png: string };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages?: Record<string, string>;
}
