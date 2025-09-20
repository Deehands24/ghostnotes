import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SoundWaveIcon } from './icons/Icons';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up (Supabase v2)
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email to verify your account!');
      } else {
        // Sign In (Supabase v2)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Successful sign-in is handled by the onAuthStateChange listener in AuthContext
      }
    } catch (err: any) {
      setError(err.error_description || err.message);
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

        {message ? (
          <div className="text-gray-300">
            <h2 className="text-2xl font-semibold text-white">Success!</h2>
            <p className="mt-2 text-teal-400">{message}</p>
          </div>
        ) : (
          <>
            <p className="text-gray-300">
              {isSignUp
                ? 'Create an account to get started.'
                : 'Sign in to access the marketplace.'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setMessage(null);
                }}
                className="font-medium text-teal-400 hover:text-teal-300"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;