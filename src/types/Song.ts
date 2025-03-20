export interface Song {
    id: string;
    name: string;
    artists: { name: string }[];
    duration_ms: number;
    duration?: string;
    album: {
      images: { url: string }[];
    };
  }
  