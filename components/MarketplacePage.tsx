
import React, { useState } from 'react';
import { AudioTrack } from '../types';
import AudioCard from './AudioCard';

const mockTracks: AudioTrack[] = [
  { id: 1, title: 'Future Bass Drop', artist: 'SynthWave', price: 1.99, coverArt: 'https://picsum.photos/seed/track1/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', sampleStart: 10, sampleEnd: 24 },
  { id: 2, title: 'Lo-Fi Chill Beat', artist: 'Beatnik', price: 0.99, coverArt: 'https://picsum.photos/seed/track2/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', sampleStart: 30, sampleEnd: 44 },
  { id: 3, title: 'Epic Cinematic Score', artist: 'Orchestra', price: 2.49, coverArt: 'https://picsum.photos/seed/track3/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', sampleStart: 50, sampleEnd: 64 },
  { id: 4, title: 'Acoustic Guitar Melody', artist: 'Strings', price: 1.49, coverArt: 'https://picsum.photos/seed/track4/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', sampleStart: 25, sampleEnd: 39 },
  { id: 5, title: '8-bit Retro Game Loop', artist: 'PixelPop', price: 0.99, coverArt: 'https://picsum.photos/seed/track5/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', sampleStart: 5, sampleEnd: 19 },
  { id: 6, title: 'Hard Rock Riff', artist: 'Shredder', price: 1.99, coverArt: 'https://picsum.photos/seed/track6/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', sampleStart: 15, sampleEnd: 29 },
];

const MarketplacePage: React.FC = () => {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);

  const handlePlayToggle = (trackId: number) => {
    setPlayingTrackId(currentId => (currentId === trackId ? null : trackId));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Marketplace</h1>
        <p className="mt-4 text-xl text-gray-300">Discover and purchase unique audio files from creators.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockTracks.map(track => (
          <AudioCard 
            key={track.id} 
            track={track}
            isPlaying={playingTrackId === track.id}
            onPlayToggle={() => handlePlayToggle(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
