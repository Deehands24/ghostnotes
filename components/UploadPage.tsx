
import React, { useState, useCallback } from 'react';
import WaveformSelector from './WaveformSelector';
import { UploadCloudIcon, MusicNoteIcon } from './icons/Icons';

const UploadPage: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [sample, setSample] = useState<{ start: number; end: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setUploadSuccess(false);
      setSample(null); // Reset sample on new file
    } else {
      alert('Please select a valid audio file.');
      setAudioFile(null);
      setAudioUrl(null);
    }
  };

  const handleSampleUpdate = useCallback((start: number, end: number) => {
    setSample({ start, end });
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile || !title || !artist || !sample) {
      alert("Please fill all fields and select a 14-second sample.");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting:", {
      title,
      artist,
      fileName: audioFile.name,
      sampleStart: sample.start,
      sampleEnd: sample.end
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setUploadSuccess(true);
      // Reset form
      setTitle('');
      setArtist('');
      setAudioFile(null);
      setAudioUrl(null);
      setSample(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Sell Your Audio</h1>
        <p className="mt-4 text-xl text-gray-300">Upload your track, set a price, and create a sample to get started.</p>
      </div>

      {uploadSuccess && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your audio file has been submitted for review.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Track Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Audio File</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <MusicNoteIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="audio/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">MP3, WAV, FLAC up to 20MB</p>
            </div>
          </div>
          {audioFile && <p className="text-sm text-gray-400 mt-2">Selected: {audioFile.name}</p>}
        </div>

        {audioUrl && (
          <WaveformSelector 
            audioUrl={audioUrl} 
            onSampleUpdate={handleSampleUpdate} 
          />
        )}
        
        <div className="text-right">
          <button type="submit" disabled={isSubmitting || !sample} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
            <UploadCloudIcon className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Track'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
