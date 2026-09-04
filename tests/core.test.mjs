import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getTimeZoneFromCoordinates,
  getTimezoneOffsetHours,
  parseBirthDateTime,
} from '../src/lib/birthDate.ts';
import { calculateBirthChart, generateCoStarAnalysis } from '../src/services/astrology.ts';

test('convertit correctement une heure de Paris en hiver et en été', () => {
  const winter = parseBirthDateTime('2025-01-15', '12:00', 'Europe/Paris');
  const summer = parseBirthDateTime('2025-07-15', '12:00', 'Europe/Paris');

  assert.equal(winter.toISOString(), '2025-01-15T11:00:00.000Z');
  assert.equal(summer.toISOString(), '2025-07-15T10:00:00.000Z');
  assert.equal(getTimezoneOffsetHours(winter, 'Europe/Paris'), 1);
  assert.equal(getTimezoneOffsetHours(summer, 'Europe/Paris'), 2);
});

test('déduit le fuseau IANA à partir de coordonnées valides', () => {
  assert.equal(getTimeZoneFromCoordinates(48.8566, 2.3522), 'Europe/Paris');
  assert.equal(getTimeZoneFromCoordinates(40.7128, -74.006), 'America/New_York');
});

test('refuse les dates normalisées silencieusement par JavaScript', () => {
  assert.throws(
    () => parseBirthDateTime('2025-02-31', '12:00', 'Europe/Paris'),
    /hors limites/,
  );
  assert.throws(
    () => parseBirthDateTime('2025-03-30', '02:30', 'Europe/Paris'),
    /n’existe pas/,
  );
  assert.throws(() => getTimeZoneFromCoordinates(95, 2), /Coordonnées/);
});

test('produit un thème astral complet avec des valeurs finies', () => {
  const chart = calculateBirthChart({
    date: new Date('1990-01-01T11:00:00.000Z'),
    latitude: 48.8566,
    longitude: 2.3522,
  });

  assert.equal(Object.keys(chart.planetPositions).length, 10);
  assert.equal(chart.houses.length, 12);
  assert.ok(chart.aspects.length > 0);
  for (const position of Object.values(chart.planetPositions)) {
    assert.ok(Number.isFinite(position.longitude));
    assert.ok(position.longitude >= 0 && position.longitude < 360);
    assert.ok(position.house >= 1 && position.house <= 12);
  }

  const dailyAnalysis = generateCoStarAnalysis(
    {
      ...chart,
      birthDate: new Date('1990-01-01T11:00:00.000Z'),
      birthPlace: 'Paris, France',
    },
    'Camille',
    '2026-09-04',
  );
  assert.ok(dailyAnalysis.mood.length > 0);
  assert.ok(dailyAnalysis.dailyMove.length > 0);
  assert.ok(dailyAnalysis.dayAtGlance.length > 0);
  assert.ok(dailyAnalysis.personalizationSeed.includes('camille'));
});
