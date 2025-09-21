import React, { useRef, useEffect, useState } from 'react';
import { AudioTrack } from '../types';
import { PlayIcon, PauseIcon, ShoppingCartIcon } from './icons/Icons';

interface AudioCardProps {
  track: AudioTrack;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onPurchase: () => void;
}

const AudioCard: React.FC<AudioCardProps> = ({ track, isPlaying, onPlayToggle, onPurchase }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(track.sampleStart);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= track.sampleEnd) {
        onPlayToggle();
      } else {
        setCurrentTime(audio.currentTime);
      }
    };

    if (isPlaying) {
      audio.currentTime = track.sampleStart;
      setCurrentTime(track.sampleStart);
      audio.play().catch(e => console.error("Audio play failed:", e));
      audio.addEventListener('timeupdate', handleTimeUpdate);
    } else {
      audio.pause();
      audio.currentTime = track.sampleStart;
      setCurrentTime(track.sampleStart);
    }
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying, track.sampleStart, track.sampleEnd, onPlayToggle]);
  
  const formatSampleTime = (timeInSeconds: number) => {
    const seconds = Math.floor(Math.max(0, timeInSeconds));
    return `0:${String(seconds).padStart(2, '0')}`;
  };

  const sampleDuration = track.sampleEnd - track.sampleStart;
  const currentSampleTime = currentTime - track.sampleStart;
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-teal-500/20 group">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" />
      <div className="relative">
        <img src={track.coverArt} alt={track.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={onPlayToggle}
            className="w-16 h-16 bg-teal-500/80 rounded-full flex items-center justify-center text-white hover:bg-teal-500 transition-transform transform hover:scale-110"
            aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
          >
            {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
          </button>
        </div>
        {isPlaying && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-md">
            <span>
              {formatSampleTime(currentSampleTime)} / {formatSampleTime(sampleDuration)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{track.title}</h3>
        <p className="text-sm text-gray-400">{track.artist}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-teal-400">${track.price.toFixed(2)}</span>
          <button 
            onClick={onPurchase}
            className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-teal-600 transition-colors"
            aria-label={`Buy ${track.title} for $${track.price.toFixed(2)}`}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;