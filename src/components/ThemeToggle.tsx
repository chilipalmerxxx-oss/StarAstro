import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'nightstarTheme';

function getInitialTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isLight = theme === 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The theme still works for the current session when storage is unavailable.
    }
  }, [theme, isLight]);

  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? 'theme-toggle--light' : ''}`}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={isLight ? 'Activer le thème sombre' : 'Activer le thème clair'}
      aria-pressed={isLight}
      title={isLight ? 'Passer en version sombre' : 'Passer en version claire'}
    >
      <span className="theme-toggle__stars" aria-hidden="true" />
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        <Moon size={13} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        <Sun size={13} strokeWidth={1.8} />
      </span>
      <span className="theme-toggle__orb" aria-hidden="true">
        {isLight ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
      </span>
    </button>
  );
}
