import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSessionId } from './session';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseConfig) {
  console.error(
    '[Nightstar] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Chart save/load will be disabled until env vars are set on Vercel.',
  );
}

// Never throw at module load: a missing env must not blank the whole mobile app.
export const Supabase: SupabaseClient = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        headers: {
          'x-session-id': getSessionId(),
        },
      },
    })
  : (createClient('https://placeholder.supabase.co', 'public-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }) as SupabaseClient);

export const isSupabaseConfigured = hasSupabaseConfig;
