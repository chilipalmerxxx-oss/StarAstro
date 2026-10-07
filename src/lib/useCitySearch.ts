import { useEffect, useMemo, useState } from 'react';

export type BirthPlace = {
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
  /** Fuseau IANA (ex. Europe/Paris) ; absent pour les résultats Nominatim, déduit des coordonnées. */
  timeZone?: string;
  aliases?: string[];
  population?: number;
  importance?: number;
};

type NominatimResult = {
  lat: string;
  lon: string;
  name?: string;
  display_name: string;
  type?: string;
  addresstype?: string;
  importance?: number;
  extratags?: { population?: string };
  address?: Record<string, string>;
};

const MAJOR_CITY_NAMES = new Set([
  'amsterdam', 'athenes', 'barcelone', 'berlin', 'bordeaux', 'bruxelles', 'buenos aires',
  'chicago', 'copenhague', 'dubai', 'geneve', 'hong kong', 'istanbul', 'lille', 'lisbonne',
  'londres', 'los angeles', 'lyon', 'madrid', 'marseille', 'melbourne', 'mexico', 'mexico city',
  'milan', 'miami', 'montreal', 'munich', 'nantes', 'new york', 'nice', 'oslo', 'paris', 'pekin',
  'prague', 'rio de janeiro', 'rome', 'san francisco', 'sao paulo', 'seoul', 'singapour',
  'stockholm', 'strasbourg', 'sydney', 'tokyo', 'toronto', 'toulouse', 'vienne', 'varsovie',
  'washington', 'zurich',
]);

const MIN_QUERY_LENGTH = 3;

export const normalizeSearch = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const usesLatinAlphabet = (value: string) =>
  /^[\p{Script=Latin}\p{Mark}\s'’.-]+$/u.test(value.normalize('NFD'));

export const formatBirthPlace = (place: BirthPlace) =>
  (place.region ? `${place.name}, ${place.region}` : place.name);

async function searchNominatim(query: string, limit: number, signal: AbortSignal): Promise<BirthPlace[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    addressdetails: '1',
    extratags: '1',
    limit: '10',
    'accept-language': 'fr',
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`City search failed with ${response.status}`);

  const results = await response.json() as NominatimResult[];
  const settlementResults = results.filter((item) => {
    const address = item.address || {};
    const name = address.city || address.town || item.name || item.display_name.split(',')[0];
    const placeType = item.addresstype || item.type || '';
    const population = Number(String(item.extratags?.population || '').replace(/\D/g, ''));
    const isLargeSettlement = placeType === 'city'
      || placeType === 'town'
      || (placeType === 'administrative' && population >= 50000);
    const isLargeEnough = population === 0 || population >= 15000;
    return Boolean(name && usesLatinAlphabet(name) && isLargeSettlement && isLargeEnough);
  });
  const cities = settlementResults.map((item): BirthPlace => {
    const address = item.address || {};
    return {
      name: address.city || address.town || item.name || item.display_name.split(',')[0],
      region: address.state || address.region || address.county || '',
      country: (address.country_code || address.country || '').toUpperCase(),
      lat: Number(item.lat),
      lon: Number(item.lon),
      population: Number(String(item.extratags?.population || '').replace(/\D/g, '')) || undefined,
      importance: item.importance || 0,
    };
  }).filter((city) => city.name && Number.isFinite(city.lat) && Number.isFinite(city.lon));

  const uniqueCities = Array.from(
    new Map(cities.map((city) => [`${normalizeSearch(city.name)}|${city.country}`, city])).values()
  );
  const queryKey = normalizeSearch(query);
  const cityScore = (city: BirthPlace) => {
    const nameKey = normalizeSearch(city.name);
    const majorCityScore = MAJOR_CITY_NAMES.has(nameKey) ? 1_000_000_000 : 0;
    const nameScore = nameKey === queryKey ? 60_000_000
      : nameKey.startsWith(queryKey) ? 20_000_000
      : 0;
    const populationScore = (city.population || 0) * 4;
    const importanceScore = (city.importance || 0) * 500_000_000;
    return majorCityScore + nameScore + populationScore + importanceScore;
  };
  return uniqueCities.sort((a, b) => cityScore(b) - cityScore(a)).slice(0, limit);
}

/**
 * Recherche de ville de naissance dans le monde entier (Nominatim), avec une liste
 * locale de secours si la recherche échoue ou ne trouve rien. `enabled` à false
 * (ex. ville déjà choisie) coupe la recherche.
 */
export function useCitySearch(
  query: string,
  { enabled = true, localCities = [], limit = 3 }: { enabled?: boolean; localCities?: BirthPlace[]; limit?: number } = {},
) {
  const [remoteSuggestions, setRemoteSuggestions] = useState<BirthPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const trimmedQuery = query.trim();

  const localSuggestions = useMemo(() => {
    const queryKey = normalizeSearch(trimmedQuery);
    if (queryKey.length < MIN_QUERY_LENGTH) return [];
    return localCities
      .filter((city) => normalizeSearch(`${city.name} ${city.region || ''} ${city.country} ${(city.aliases || []).join(' ')}`).includes(queryKey))
      .slice(0, limit);
  }, [limit, localCities, trimmedQuery]);

  useEffect(() => {
    setRemoteSuggestions([]);
    setSearchFailed(false);
    if (trimmedQuery.length < MIN_QUERY_LENGTH || !enabled) {
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      try {
        const cities = await searchNominatim(trimmedQuery, limit, controller.signal);
        setRemoteSuggestions(cities);
        setSearchFailed(cities.length === 0);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setRemoteSuggestions([]);
          setSearchFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsSearching(false);
      }
    }, 550);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [enabled, limit, trimmedQuery]);

  const suggestions = remoteSuggestions.length > 0
    ? remoteSuggestions
    : searchFailed ? localSuggestions : [];

  return {
    suggestions,
    isSearching,
    /** Recherche terminée sans aucun résultat, ni en ligne ni dans la liste locale. */
    noResult: !isSearching && searchFailed && suggestions.length === 0,
  };
}
