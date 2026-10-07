/** Délai entre deux lettres de <WrittenText> : 25 ms, plus rapide pour les textes longs (1,5 s maximum). */
export const getWritingInterval = (text: string) => Math.min(25, 1500 / Math.max(1, Array.from(text).length));

/** Durée totale d'écriture d'un texte par <WrittenText>, en millisecondes. */
export const getWritingDuration = (text: string) => Array.from(text).length * getWritingInterval(text);
