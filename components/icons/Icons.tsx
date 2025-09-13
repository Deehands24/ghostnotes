
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SoundWaveIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h.008v.008h-.008V12zm3.75 0h.008v.008h-.008V12zm3.75 0h.008v.008h-.008V12zm3.75 0h.008v.008h-.008V12zm3.75 0h.008v.008h-.008V12z" />
  </svg>
);

export const UploadCloudIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M17.25 12a4.5 4.5 0 01-9 0 4.5 4.5 0 019 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l-3 3m0 0l-3-3m3 3V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5l3 3m0 0l3-3m-3 3V3" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75v3.75m0 0H4.125M7.5 16.5h3.375m-3.375 0V15m3.375 1.5v-1.5m0 0h.008v.008H10.875v-.008zm0 0h.008v.008H10.875v-.008zM16.5 12.75v3.75m0 0H13.125m3.375 0V15m-3.375 1.5v-1.5m0 0h.008v.008H13.125v-.008zm0 0h.008v.008H13.125v-.008z" />
    </svg>
);

export const PlayIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.835a.5.5 0 00-.47-.665H5.25" />
    </svg>
);

export const MusicNoteIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.5c0 1.25-1.007 2.25-2.25 2.25S15 13.75 15 12.5s1.007-2.25 2.25-2.25 2.25 1.007 2.25 2.25zM9 9V3l10.5 3M9 9v11.25a2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25V15m-4.5 6.75v-6.75" />
    </svg>
);
