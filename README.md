# StarAstro / Nightstar

Application React + TypeScript de calcul et de présentation de thèmes astraux.

## Installation locale

Prérequis : Node.js 24 et npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Renseignez dans `.env.local` l’URL du projet Supabase et sa clé publique `anon`. Ne placez jamais une clé privée ou une clé de fournisseur d’IA dans une variable `VITE_*` : ces variables sont intégrées au JavaScript envoyé au navigateur.

## Base Supabase

Avant le déploiement :

1. Activez **Anonymous Sign-Ins** dans Supabase Auth.
2. Appliquez les migrations du dossier `supabase/migrations` avec la CLI Supabase.
3. Vérifiez que les politiques RLS de `birth_charts` utilisent `auth.uid()`.

La migration `20260904000000_harden_birth_charts.sql` remplace l’ancien identifiant de session forgeable par des utilisateurs anonymes signés et limite chaque ligne à son propriétaire.

## Contrôles qualité

```bash
npm run check
```

Cette commande exécute le typage TypeScript, ESLint, les tests des dates/fuseaux et du calcul astral, puis le build de production. La même vérification s’exécute sur les pull requests GitHub.

## Déploiement

Le projet peut être déployé sur Vercel. Configurez-y uniquement :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

La PWA est volontairement désactivée pour éviter qu’un ancien service worker ne conserve une version obsolète. `public/sw.js` et `public/go.html` restent temporairement comme mécanismes de désinstallation et de nettoyage pour les utilisateurs déjà concernés.
