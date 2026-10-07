import './BackgroundLab.css';
import './YouBackgroundLab.css';

export interface BackgroundLabOption {
  id: string;
  label: string;
}

export const YOU_BACKGROUND_OPTIONS: BackgroundLabOption[] = [
  { id: '', label: 'Actuel' },
  { id: 'eclipse', label: 'Éclipse dorée' },
  { id: 'nebula', label: 'Nébuleuse' },
  { id: 'bronze', label: 'Bronze' },
];

export const parseBackgroundOption = (options: BackgroundLabOption[], value: string | null) =>
  options.some((option) => option.id === value) ? (value as string) : '';

interface BackgroundLabProps {
  param: string;
  options: BackgroundLabOption[];
  value: string;
  onChange: (id: string) => void;
}

// Preview-only switcher, shown when `param` is present in the URL.
export default function BackgroundLab({ param, options, value, onChange }: BackgroundLabProps) {
  const select = (id: string) => {
    onChange(id);
    const url = new URL(window.location.href);
    url.searchParams.set(param, id);
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="bg-lab" role="radiogroup" aria-label="Choix du fond">
      {options.map((option) => (
        <button
          key={option.id || 'current'}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          className={`bg-lab__option${value === option.id ? ' bg-lab__option--active' : ''}`}
          onClick={() => select(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
