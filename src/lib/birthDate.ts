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