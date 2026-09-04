import tzLookup from 'tz-lookup';

export type LocalDateTimeParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string) {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

function parseDateAndTime(date: string, time: string): LocalDateTimeParts {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) {
    throw new Error('Date ou heure de naissance invalide.');
  }

  const parts = {
    year: Number(dateMatch[1]),
    month: Number(dateMatch[2]),
    day: Number(dateMatch[3]),
    hour: Number(timeMatch[1]),
    minute: Number(timeMatch[2]),
  };
  const daysInMonth = new Date(Date.UTC(parts.year, parts.month, 0)).getUTCDate();

  if (
    parts.year < 1800
    || parts.year > new Date().getUTCFullYear()
    || parts.month < 1
    || parts.month > 12
    || parts.day < 1
    || parts.day > daysInMonth
    || parts.hour < 0
    || parts.hour > 23
    || parts.minute < 0
    || parts.minute > 59
  ) {
    throw new Error('Date ou heure de naissance hors limites.');
  }

  return parts;
}

function partsInTimeZone(date: Date, timeZone: string) {
  const values = Object.fromEntries(
    getFormatter(timeZone)
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  };
}

function getOffsetMilliseconds(date: Date, timeZone: string) {
  const parts = partsInTimeZone(date, timeZone);
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  ) - Math.floor(date.getTime() / 1000) * 1000;
}

export function getTimeZoneFromCoordinates(latitude: number, longitude: number): string {
  if (
    !Number.isFinite(latitude)
    || !Number.isFinite(longitude)
    || latitude < -90
    || latitude > 90
    || longitude < -180
    || longitude > 180
  ) {
    throw new Error('Coordonnées de naissance invalides.');
  }
  return tzLookup(latitude, longitude);
}

/** Convertit une date/heure civile du lieu de naissance en instant UTC. */
export function parseBirthDateTime(date: string, time: string, timeZone: string): Date {
  const requested = parseDateAndTime(date, time);
  const wallClockUtc = Date.UTC(
    requested.year,
    requested.month - 1,
    requested.day,
    requested.hour,
    requested.minute,
  );
  let instant = new Date(wallClockUtc);

  for (let iteration = 0; iteration < 3; iteration += 1) {
    instant = new Date(wallClockUtc - getOffsetMilliseconds(instant, timeZone));
  }

  const resolved = partsInTimeZone(instant, timeZone);
  if (
    resolved.year !== requested.year
    || resolved.month !== requested.month
    || resolved.day !== requested.day
    || resolved.hour !== requested.hour
    || resolved.minute !== requested.minute
  ) {
    throw new Error('Cette heure locale n’existe pas dans le fuseau sélectionné.');
  }

  return instant;
}

export function getTimezoneOffsetHours(instant: Date, timeZone: string): number {
  return getOffsetMilliseconds(instant, timeZone) / 3_600_000;
}

export function getLocalDateTimeParts(date: Date, timeZone: string): LocalDateTimeParts {
  const parts = partsInTimeZone(date, timeZone);
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
  };
}
