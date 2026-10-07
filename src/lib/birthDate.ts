/**
 * Construit un instant UTC à partir de la date/heure locales du lieu de naissance.
 * `timezoneOffset` est l'écart en heures par rapport à UTC (ex. +1 pour Paris en hiver).
 */
export function parseBirthDateTime(
  date: string,
  time: string,
  timezoneOffset = 0,
): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = (time || '12:00').split(':').map(Number);
  const offsetHours = Number.isFinite(timezoneOffset) ? timezoneOffset : 0;

  if (
    Number.isFinite(year) &&
    Number.isFinite(month) &&
    Number.isFinite(day) &&
    Number.isFinite(hours) &&
    Number.isFinite(minutes)
  ) {
    // En minutes : Date.UTC tronque les heures fractionnaires (ex. Inde UTC+5:30).
    return new Date(Date.UTC(year, month - 1, day, hours, minutes - Math.round(offsetHours * 60)));
  }

  return new Date(`${date}T${time}`);
}

/**
 * Date et heure civiles au lieu de naissance à partir de l'instant UTC enregistré.
 * Sans décalage connu, repli sur le fuseau du navigateur.
 */
export function getBirthLocalParts(birthDate: Date, timezoneOffset?: number) {
  if (timezoneOffset === undefined || !Number.isFinite(timezoneOffset)) {
    return {
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour: birthDate.getHours(),
      minute: birthDate.getMinutes(),
    };
  }
  const local = new Date(birthDate.getTime() + Math.round(timezoneOffset * 60) * 60_000);
  return {
    year: local.getUTCFullYear(),
    month: local.getUTCMonth() + 1,
    day: local.getUTCDate(),
    hour: local.getUTCHours(),
    minute: local.getUTCMinutes(),
  };
}

export function getTimezoneFromLongitude(longitude: number): number {
  return Math.round(longitude / 15);
}

/**
 * Calcule le décalage UTC réel (en heures) d'un fuseau IANA pour une date précise,
 * en tenant compte de l'heure d'été/hiver — contrairement à un simple offset fixe
 * à l'année (ex. Paris n'est pas toujours UTC+1 : c'est UTC+2 l'été).
 *
 * `naiveUtcDate` doit être construit à partir des chiffres du formulaire de
 * naissance traités comme si c'était déjà de l'UTC (ex. `new Date(Date.UTC(year,
 * month - 1, day, hour, minute))`) — on s'en sert uniquement pour savoir quel
 * décalage s'appliquait à cette date civile précise dans le fuseau demandé.
 */
export function getUtcOffsetHours(naiveUtcDate: Date, timeZone: string): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
    }).formatToParts(naiveUtcDate);
    const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+0';
    const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) / 60 : 0;
    // Le signe vient du texte : "GMT-0:44" donne hours = -0, qui passerait le test `hours >= 0`.
    return match[1].startsWith('-') ? hours - minutes : hours + minutes;
  } catch {
    return 0;
  }
}

/**
 * Décalage UTC (en heures) en vigueur dans `timeZone` à la date/heure civile
 * de naissance (`YYYY-MM-DD`, `HH:mm`). Deux passes pour que l'heure locale,
 * et non l'heure UTC naïve, décide de l'heure d'été/hiver.
 * Retourne `null` si le fuseau est inconnu du navigateur.
 */
export function getBirthUtcOffsetHours(date: string, time: string, timeZone: string): number | null {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
  } catch {
    return null;
  }

  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = (time || '12:00').split(':').map(Number);
  const naiveUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const firstGuess = getUtcOffsetHours(naiveUtc, timeZone);
  return getUtcOffsetHours(new Date(naiveUtc.getTime() - firstGuess * 3_600_000), timeZone);
}
