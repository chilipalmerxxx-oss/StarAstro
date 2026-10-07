/*
  # Heure de naissance inconnue

  1. Schema Changes
    - Add `birth_time_unknown` to `birth_charts`
      - true : le thème est calculé à 12:00 par convention ; l'app masque
        l'Ascendant et les maisons et signale la Lune comme approximative
      - false par défaut : les thèmes existants gardent leur heure

  2. Notes
    - Les politiques RLS existantes portent sur les lignes, pas sur les colonnes :
      aucune modification nécessaire
    - L'app reste compatible tant que cette migration n'est pas appliquée
      (elle réessaie l'insertion sans la colonne)
*/

ALTER TABLE birth_charts
  ADD COLUMN IF NOT EXISTS birth_time_unknown boolean NOT NULL DEFAULT false;
