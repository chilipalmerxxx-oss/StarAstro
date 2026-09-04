import { createClient, type SupabaseClient } from '@supabase/supabase-js';

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
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (createClient('https://placeholder.supabase.co', 'public-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }) as SupabaseClient);

export const isSupabaseConfigured = hasSupabaseConfig;

let anonymousUserPromise: Promise<string> | null = null;

/** Returns a signed Supabase user id, creating an anonymous account if needed. */
export async function getOrCreateSupabaseUserId(): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error('La sauvegarde en ligne n’est pas configurée.');
  }

  anonymousUserPromise ||= (async () => {
    const { data: sessionData, error: sessionError } = await Supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (sessionData.session?.user.id) return sessionData.session.user.id;

    const { data, error } = await Supabase.auth.signInAnonymously();
    if (error) throw error;
    if (!data.user?.id) throw new Error('Impossible de créer la session utilisateur.');
    return data.user.id;
  })().catch((error: unknown) => {
    anonymousUserPromise = null;
    throw error;
  });

  return anonymousUserPromise;
}
