
export interface AudioTrack {
  id: number;
  title: string;
  artist: string;
  price: number;
  coverArt: string;
  audioUrl: string; // URL to the full audio file
  sampleStart: number; // Start time of the sample in seconds
  sampleEnd: number; // End time of the sample in seconds
}

export enum Page {
  Subscription,
  Marketplace,
  Upload,
}
