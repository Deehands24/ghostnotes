export interface AudioTrack {
  id: number;
  title: string;
  artist: string;
  price: number;
  coverArt: string;
  audioUrl: string;
  sampleStart: number;
  sampleEnd: number;
}

export enum Page {
  Marketplace,
  Upload,
}