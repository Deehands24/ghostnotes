import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SoundWaveIcon } from './icons/Icons';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <div className="flex justify-center">
          <SoundWaveIcon className="w-16 h-16 text-teal-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">Welcome to Ghost Notes</h1>

        {isSubmitted ? (
          <div className="text-gray-300">
            <h2 className="text-2xl font-semibold text-white">Check your email!</h2>
            <p className="mt-2">
              A magic link has been sent to <span className="font-bold text-teal-400">{email}</span>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-300">
              The exclusive marketplace for high-quality audio files. Sign in or create an account to continue.
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Continue with Email'}
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">
              We use passwordless login. A magic link will be sent to your email.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
