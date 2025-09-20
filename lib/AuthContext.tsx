import React, { createContext, useContext, useState, useEffect, PropsWithChildren, FC } from 'react';
// FIX: Removed Session and User imports as they are not exported in older Supabase versions causing errors.
// import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

interface AuthContextType {
  // FIX: Changed types to `any` as `Session` and `User` types could not be imported.
  session: any | null;
  user: any | null;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // FIX: Changed types to `any` for state variables.
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Refactored to use Supabase v1 auth API.
    // Fetched initial session synchronously with `supabase.auth.session()`.
    const initialSession = supabase.auth.session();
    setSession(initialSession);
    setUser(initialSession?.user ?? null);
    setLoading(false);

    // Set up auth state change listener.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      // FIX: Corrected the unsubscribe call for v1 API.
      // `authListener` is the subscription itself.
      authListener?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
