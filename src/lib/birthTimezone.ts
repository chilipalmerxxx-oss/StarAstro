import { getBirthUtcOffsetHours, getTimezoneFromLongitude } from './birthDate';

/**
 * Fuseau IANA du lieu de naissance (ex. Europe/Paris). `knownTimeZone` évite la
 * recherche quand la ville le fournit déjà ; sinon il est déduit des coordonnées
 * (base des fuseaux chargée à la demande). `null` si introuvable.
 */
export async function resolveBirthTimeZone(
  latitude: number,
  longitude: number,
  knownTimeZone?: string,
): Promise<string | null> {
  if (knownTimeZone) return knownTimeZone;
  try {
    const { default: tzlookup } = await import('@photostructure/tz-lookup');
    return tzlookup(latitude, longitude);
  } catch (error) {
    console.warn('Timezone lookup failed, falling back to longitude', error);
    return null;
  }
}

/** Décalage UTC (heures) au lieu de naissance pour cette date/heure civile, repli sur la longitude. */
export function getBirthOffsetAt(
  date: string,
  time: string,
  timeZone: string | null,
  longitude: number,
): number {
  return (timeZone ? getBirthUtcOffsetHours(date, time, timeZone) : null)
    ?? getTimezoneFromLongitude(longitude);
}
