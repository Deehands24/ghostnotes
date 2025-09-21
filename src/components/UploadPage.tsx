import React, { useState, useCallback } from 'react';
import WaveformSelector from './WaveformSelector';
import { UploadCloudIcon, MusicNoteIcon, PhotoIcon, CurrencyDollarIcon } from './icons/Icons';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/AuthContext';

const UploadPage: React.FC = () => {
  const { user } = useAuth();

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [sample, setSample] = useState<{ start: number; end: number } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setTitle('');
    setArtist('');
    setPrice('');
    setAudioFile(null);
    setCoverArtFile(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    if (coverArtUrl) URL.revokeObjectURL(coverArtUrl);
    setCoverArtUrl(null);
    setSample(null);
  }, [audioUrl, coverArtUrl]);

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(file));
      setUploadSuccess(false);
      setError(null);
      setSample(null);
    } else {
      setAudioFile(null);
      setAudioUrl(null);
      if (file) alert('Please select a valid audio file.');
    }
  };

  const handleCoverArtFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverArtFile(file);
      if (coverArtUrl) URL.revokeObjectURL(coverArtUrl);
      setCoverArtUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setCoverArtFile(null);
      setCoverArtUrl(null);
      if (file) alert('Please select a valid image file.');
    }
  };

  const handleSampleUpdate = useCallback((start: number, end: number) => {
    setSample({ start, end });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to upload a track.");
      return;
    }
    if (!audioFile || !coverArtFile || !title || !artist || price === '' || !sample) {
      setError("Please fill all fields, select files, and create a 14-second sample.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setUploadSuccess(false);

    try {
      // Upload audio file
      const audioFilePath = `${user.id}/${Date.now()}_${audioFile.name}`;
      const { error: audioUploadError } = await supabase.storage
        .from('tracks')
        .upload(audioFilePath, audioFile);
      if (audioUploadError) throw new Error(`Audio upload failed: ${audioUploadError.message}`);

      // Get audio file public URL
      const { data: audioUrlData } = supabase.storage
        .from('tracks')
        .getPublicUrl(audioFilePath);
      
      // Upload cover art file
      const coverArtPath = `${user.id}/${Date.now()}_${coverArtFile.name}`;
      const { error: coverArtUploadError } = await supabase.storage
        .from('cover_art')
        .upload(coverArtPath, coverArtFile);
      if (coverArtUploadError) throw new Error(`Cover art upload failed: ${coverArtUploadError.message}`);

      // Get cover art public URL
      const { data: coverArtUrlData } = supabase.storage
        .from('cover_art')
        .getPublicUrl(coverArtPath);

      // Insert track metadata into the database
      const { error: dbError } = await supabase
        .from('tracks')
        .insert({
          title,
          artist,
          price,
          audio_url: audioUrlData.publicUrl,
          cover_art_url: coverArtUrlData.publicUrl,
          sample_start: sample.start,
          sample_end: sample.end,
          user_id: user.id,
        });
      
      if (dbError) throw new Error(`Database insert failed: ${dbError.message}`);

      setUploadSuccess(true);
      resetForm();

    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Sell Your Audio</h1>
        <p className="mt-4 text-xl text-gray-300">Upload your track, set a price, and create a sample to get started.</p>
      </div>

      {uploadSuccess && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your audio file has been submitted and is now live on the marketplace.</span>
        </div>
      )}

      {error && (
         <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Track Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={inputClass} 
            required 
          />
          <input 
            type="text" 
            placeholder="Artist Name" 
            value={artist} 
            onChange={(e) => setArtist(e.target.value)} 
            className={inputClass} 
            required 
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input 
            type="number" 
            placeholder="Price (e.g., 1.99)" 
            value={price} 
            onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} 
            min="0" 
            step="0.01" 
            className={`${inputClass} pl-10`} 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Audio File</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <MusicNoteIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="audio-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none">
                    <span>{audioFile ? 'Change file' : 'Upload a file'}</span>
                    <input 
                      id="audio-upload" 
                      name="audio-upload" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleAudioFileChange} 
                      accept="audio/*" 
                    />
                  </label>
                  {!audioFile && <p className="pl-1">or drag and drop</p>}
                </div>
                <p className="text-xs text-gray-500">MP3, WAV, FLAC</p>
              </div>
            </div>
            {audioFile && <p className="text-sm text-gray-400 mt-2">Selected: {audioFile.name}</p>}
          </div>

          {/* Cover Art Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Art</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {coverArtUrl ? (
                    <img src={coverArtUrl} alt="Cover art preview" className="w-24 h-24 object-cover mx-auto rounded-md" />
                ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="cover-art-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none">
                     <span>{coverArtFile ? 'Change image' : 'Upload an image'}</span>
                    <input 
                      id="cover-art-upload" 
                      name="cover-art-upload" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleCoverArtFileChange} 
                      accept="image/*" 
                    />
                  </label>
                   {!coverArtFile && <p className="pl-1">or drag and drop</p>}
                </div>
                <p className="text-xs text-gray-500">JPEG, PNG, GIF</p>
              </div>
            </div>
             {coverArtFile && <p className="text-sm text-gray-400 mt-2">Selected: {coverArtFile.name}</p>}
          </div>
        </div>

        {audioUrl && (
          <WaveformSelector 
            audioUrl={audioUrl} 
            onSampleUpdate={handleSampleUpdate} 
          />
        )}
        
        <div className="text-right">
          <button 
            type="submit" 
            disabled={isSubmitting || !sample} 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <UploadCloudIcon className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Track'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;