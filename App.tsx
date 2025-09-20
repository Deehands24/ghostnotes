import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import type { Session } from '@supabase/supabase-js';

// A placeholder for your main marketplace component
const Marketplace = ({ session }: { session: Session }) => (
  <div>
    <h1>Ghostnotes Marketplace</h1>
    <p>Welcome, {session.user.email}</p>
    <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    {/* Your audio track trading components will go here */}
  </div>
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Immediately check for an existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    // Listen for changes in auth state (login/logout)
    const { data } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session ?? null);
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      if (data?.subscription && typeof data.subscription.unsubscribe === 'function') {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  if (!session) {
    // If no session, show the Supabase Auth UI
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />;
  } else {
    // If session exists, show the protected marketplace
    return <Marketplace session={session} />;
  }
}