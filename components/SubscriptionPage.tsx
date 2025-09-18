import React from 'react';
import { SoundWaveIcon, LockIcon } from './icons/Icons';

interface SubscriptionPageProps {
  onSubscribe: () => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onSubscribe }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <div className="flex justify-center">
            <SoundWaveIcon className="w-16 h-16 text-teal-400"/>
        </div>
        <h1 className="text-4xl font-extrabold text-white">Welcome to Ghost Notes</h1>
        <p className="text-gray-300">
          The exclusive marketplace for high-quality audio files. Access requires an active subscription.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onSubscribe}
            className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 shadow-lg"
          >
            <LockIcon className="w-6 h-6 mr-3" />
            Join Ghost Notes (Simulate Subscription)
          </button>
          <p className="text-xs text-gray-500">This is a simulation. No payment required.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;