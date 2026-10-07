const SESSION_KEY = 'astro_session_id';

// crypto.randomUUID n'existe qu'en HTTPS et sur iOS 15.4+ : sans lui, l'app plantait au démarrage
// (ex. test sur téléphone via http://192.168.x.x). getRandomValues est disponible partout.
const createSessionId = (): string =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (char) =>
        (Number(char) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))).toString(16));

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = createSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
