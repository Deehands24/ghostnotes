import React from 'react';
import { Page } from '../types';
import { SoundWaveIcon, UploadCloudIcon, LogOutIcon } from './icons/Icons';
import { useAuth } from '../lib/AuthContext';

interface HeaderProps {
  navigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  const { signOut } = useAuth();
  
  const navItemClasses = (page: Page) => 
    `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer ${
      currentPage === page 
      ? 'bg-teal-500 text-white shadow-lg' 
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(Page.Marketplace)}>
           <SoundWaveIcon className="w-8 h-8 text-teal-400" />
           <h1 className="text-2xl font-bold text-white">Ghost Notes</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(Page.Marketplace)} className={navItemClasses(Page.Marketplace)}>
            <SoundWaveIcon className="w-5 h-5" />
            <span>Marketplace</span>
          </button>
          <button onClick={() => navigate(Page.Upload)} className={navItemClasses(Page.Upload)}>
            <UploadCloudIcon className="w-5 h-5" />
            <span>Upload</span>
          </button>
          <button onClick={signOut} className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 text-gray-300 hover:bg-red-500/80 hover:text-white">
            <LogOutIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;