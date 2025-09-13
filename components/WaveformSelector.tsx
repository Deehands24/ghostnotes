
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PlayIcon, PauseIcon } from './icons/Icons';

// Because we're using a CDN, WaveSurfer and its plugins are on the window object.
// We declare them here to satisfy TypeScript.
declare const WaveSurfer: any;
declare const RegionsPlugin: any;

interface WaveformSelectorProps {
  audioUrl: string;
  onSampleUpdate: (start: number, end: number) => void;
}

const WaveformSelector: React.FC<WaveformSelectorProps> = ({ audioUrl, onSampleUpdate }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<any>(null);
  const regionRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [regionTimes, setRegionTimes] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    if (!waveformRef.current) return;
    setIsLoading(true);

    // Destroy previous instance if it exists
    if (wavesurfer.current) {
        wavesurfer.current.destroy();
    }
    
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgb(107 114 128)', // gray-500
      progressColor: 'rgb(20 184 166)', // teal-500
      url: audioUrl,
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      height: 120,
    });
    wavesurfer.current = ws;

    const wsRegions = ws.registerPlugin(RegionsPlugin.create());

    ws.on('ready', (newDuration: number) => {
      setDuration(newDuration);
      
      // Create a single draggable region
      const start = 0;
      const end = Math.min(14, newDuration);
      regionRef.current = wsRegions.addRegion({
        start,
        end,
        color: 'rgba(20, 184, 166, 0.2)',
        drag: true,
        resize: true,
      });

      const initialTimes = {start: regionRef.current.start, end: regionRef.current.end};
      setRegionTimes(initialTimes);
      onSampleUpdate(initialTimes.start, initialTimes.end);
      setIsLoading(false);
    });

    let debounceTimer: number;
    wsRegions.on('region-updated', (region: any) => {
        let start = region.start;
        let end = region.end;
        if (end - start > 14) {
            end = start + 14;
            region.setOptions({end});
        }
        
        const newTimes = {start, end};
        setRegionTimes(newTimes);
        
        // Debounce the update to parent to avoid excessive re-renders
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => {
            onSampleUpdate(newTimes.start, newTimes.end);
        }, 100);
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    return () => {
      ws.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer.current && regionRef.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        regionRef.current.play();
      }
    }
  }, [isPlaying]);

  const sampleDuration = regionTimes.end - regionTimes.start;

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <p className="text-sm font-medium text-gray-300 mb-2">Create Your 14-Second Sample</p>
      <p className="text-xs text-gray-400 mb-4">Click and drag on the waveform to select your sample. You can also drag the edges to resize it.</p>
      
      {isLoading && <div className="h-[120px] flex items-center justify-center text-gray-400">Loading waveform...</div>}
      <div ref={waveformRef} style={{ display: isLoading ? 'none' : 'block' }}></div>
      
      {!isLoading && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePlayPause}
            className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors"
          >
            {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
            <span>Play Sample</span>
          </button>
          <div className="text-right text-sm">
            <p className="font-mono text-gray-300">
                <span className="font-semibold">Start:</span> {formatTime(regionTimes.start)} | <span className="font-semibold">End:</span> {formatTime(regionTimes.end)}
            </p>
            <p className={`font-mono ${sampleDuration > 14 ? 'text-red-400' : 'text-teal-400'}`}>
              <span className="font-semibold">Duration:</span> {sampleDuration.toFixed(2)}s / 14.00s
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaveformSelector;
