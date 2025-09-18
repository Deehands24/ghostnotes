
import React, { useState, useEffect } from 'react';
import { AudioTrack } from '../types';
import AudioCard from './AudioCard';
import { supabase } from '../lib/supabaseClient';

const MarketplacePage: React.FC = () => {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: dbError } = await supabase
          .from('tracks')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbError) {
          throw dbError;
        }

        if (data) {
          const formattedTracks: AudioTrack[] = data.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            price: track.price,
            coverArt: track.cover_art_url,
            audioUrl: track.audio_url,
            sampleStart: track.sample_start,
            sampleEnd: track.sample_end,
          }));
          setTracks(formattedTracks);
        }
      } catch (err: any) {
        setError(`Failed to fetch tracks: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const handlePlayToggle = (trackId: number) => {
    setPlayingTrackId(currentId => (currentId === trackId ? null : trackId));
  };
  
  const handlePurchase = (track: AudioTrack) => {
    console.log(`Simulating purchase for:
      Track ID: ${track.id}
      Title: ${track.title}
      Artist: ${track.artist}
      Price: $${track.price.toFixed(2)}
    `);
    // We can add more logic here later, e.g., calling a Supabase function.
    alert(`Purchase initiated for "${track.title}"! Check the console for details.`);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div className="w-full h-48 bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-center py-10 bg-gray-800 rounded-lg"><p className="text-red-400">{error}</p></div>;
    }

    if (tracks.length === 0) {
      return <div className="text-center py-10 bg-gray-800 rounded-lg"><p className="text-gray-400">No tracks have been uploaded yet. Be the first!</p></div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map(track => (
          <AudioCard 
            key={track.id} 
            track={track}
            isPlaying={playingTrackId === track.id}
            onPlayToggle={() => handlePlayToggle(track.id)}
            onPurchase={() => handlePurchase(track)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Marketplace</h1>
        <p className="mt-4 text-xl text-gray-300">Discover and purchase unique audio files from creators.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default MarketplacePage;
