import { createClient } from '@supabase/supabase-js';

// Default to dummy strings to prevent runtime crash when environment variables are missing.
// For real authentication, please add your credentials to .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
