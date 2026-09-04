import { Supabase, isSupabaseConfigured } from './supabase';
import { getSessionId } from './session';

// Synchronisation cross-device pour The Void : thème de naissance + historique
// des questions/réponses. localStorage reste la source instantanée (lecture
// synchrone au montage, écriture immédiate) ; Supabase est une copie best-effort
// qui permet de retrouver ses données sur un autre appareil ou après un cache
// vidé. Aucune de ces fonctions ne doit jamais faire planter l'app : en cas
// d'erreur ou d'absence de config Supabase, on se contente de logger et de
// continuer avec le localStorage local.

export interface VoidCloudData {
  birthData: unknown | null;
  history: unknown[];
}

const TABLE = 'void_data';

async function getOwnRowId(): Promise<string | null> {
  try {
    const { data, error } = await Supabase.from(TABLE).select('id').limit(1).maybeSingle();
    if (error) { console.error('[Void sync] getOwnRowId:', error); return null; }
    return data?.id ?? null;
  } catch (err) {
    console.error('[Void sync] getOwnRowId exception:', err);
    return null;
  }
}

/** Récupère les données Void de l'utilisateur (ou de sa session anonyme) depuis Supabase. */
export async function fetchVoidCloudData(): Promise<VoidCloudData | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await Supabase.from(TABLE).select('*').limit(1).maybeSingle();
    if (error) { console.error('[Void sync] fetch error:', error); return null; }
    if (!data) return null;
    return {
      birthData: data.birth_data ?? null,
      history: Array.isArray(data.history) ? data.history : [],
    };
  } catch (err) {
    console.error('[Void sync] fetch exception:', err);
    return null;
  }
}

/**
 * Pousse (best-effort, sans jamais bloquer l'UI ni remonter d'erreur à l'appelant)
 * les données Void vers Supabase. N'écrase que les champs fournis.
 */
export async function pushVoidCloudData(payload: Partial<VoidCloudData>): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { data: userData } = await Supabase.auth.getUser();
    const user = userData?.user ?? null;
    const rowId = await getOwnRowId();

    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (payload.birthData !== undefined) patch.birth_data = payload.birthData;
    if (payload.history !== undefined) patch.history = payload.history;

    if (rowId) {
      const { error } = await Supabase.from(TABLE).update(patch).eq('id', rowId);
      if (error) console.error('[Void sync] update error:', error);
    } else {
      const { error } = await Supabase.from(TABLE).insert({
        ...patch,
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
      });
      if (error) console.error('[Void sync] insert error:', error);
    }
  } catch (err) {
    console.error('[Void sync] push exception:', err);
  }
}
