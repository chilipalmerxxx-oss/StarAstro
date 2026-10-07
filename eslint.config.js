import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Seul le code de l'app est vérifié : sauvegardes, maquettes et builds sont exclus.
    ignores: [
      'dist', 'dev-dist', 'tmp', 'project_temp', 'ui-mocks', 'mcps', '.codex-backups', '.vercel*',
      'Nightstar-roue-interactive-loaded', 'costar-background-proposals', 'costar-premium-art-proposals',
      // Sauvegardes et outil de design annexe rangés dans .github (pas de code de l'app).
      '.github',
      // Code Deno (Edge Functions Supabase) : autre environnement d'exécution.
      'supabase/functions',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Préfixe « _ » : variable ou paramètre volontairement ignoré.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  }
);
