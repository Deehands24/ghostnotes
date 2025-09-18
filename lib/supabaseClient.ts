import { createClient } from '@supabase/supabase-js';

// The Supabase project URL and public anon key are configured.
// It is recommended to store these in environment variables for security.
const supabaseUrl = 'https://rjtstwosfflemgqipkts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdHN0d29zZmZsZW1ncWlwa3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjgyMDcsImV4cCI6MjA2Mzg0NDIwN30.zpz7LrvKt2Bs1MOM8gs-5jHjlmYA6EeDW7M_N0PLRIM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);