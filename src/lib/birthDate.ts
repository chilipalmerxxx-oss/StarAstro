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
    return new Date(Date.UTC(year, month - 1, day, hours - offsetHours, minutes));
  }

  return new Date(`${date}T${time}`);
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
    return hours >= 0 ? hours + minutes : hours - minutes;
  } catch {
    return 0;
  }
}
