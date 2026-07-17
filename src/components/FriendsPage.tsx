import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import './FriendsPage.css';

interface FriendsPageProps {
  onBack: () => void;
}

type Friend = {
  id: string;
  name: string;
  addedAt: string;
};

const STORAGE_KEY = 'nightstar-friends-v1';

const loadFriends = (): Friend[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Friend[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const formatName = (value: string) => {
  const clean = value.trim().replace(/\s+/g, ' ');
  if (!clean) return '';
  return clean
    .split(' ')
    .map((part) => part.charAt(0).toLocaleUpperCase('fr-FR') + part.slice(1))
    .join(' ');
};

export default function FriendsPage({ onBack }: FriendsPageProps) {
  const [friends, setFriends] = useState<Friend[]>(() => loadFriends());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [open]);

  const canAdd = name.trim().length >= 2;
  const alreadyExists = useMemo(() => {
    const clean = name.trim().toLocaleLowerCase('fr-FR');
    if (!clean) return false;
    return friends.some((f) => f.name.toLocaleLowerCase('fr-FR') === clean);
  }, [friends, name]);

  const sorted = useMemo(
    () => [...friends].sort((a, b) => a.name.localeCompare(b.name, 'fr')),
    [friends],
  );

  const close = () => {
    setOpen(false);
    setName('');
  };

  const openSheet = () => {
    setOpen(true);
    if ('vibrate' in navigator) navigator.vibrate(6);
  };

  const addFriend = () => {
    const clean = formatName(name);
    if (clean.length < 2 || alreadyExists) return;
    setFriends((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: clean,
        addedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    if ('vibrate' in navigator) navigator.vibrate([8, 16, 8]);
    close();
  };

  const removeFriend = (id: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={`friends-page ${open ? 'is-sheet-open' : ''}`}>
      <header className="friends-page__header">
        <button type="button" className="friends-page__icon-btn" onClick={onBack} aria-label="Retour">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <h1 className="friends-page__title">Amis</h1>
        <button
          type="button"
          className="friends-page__icon-btn friends-page__icon-btn--add"
          onClick={openSheet}
          aria-label="Ajouter un ami"
        >
          <Plus size={18} strokeWidth={1.6} />
        </button>
      </header>

      {sorted.length === 0 ? (
        <section className="friends-page__empty">
          <h2 className="friends-page__empty-title">Ajoute quelqu’un</h2>
          <p className="friends-page__empty-text">
            Comparez vos thèmes et découvrez si vous êtes faits pour vous entendre.
          </p>
          <button type="button" className="friends-page__cta" onClick={openSheet}>
            <span className="friends-page__cta-aura" aria-hidden="true" />
            <span className="friends-page__cta-glow" aria-hidden="true" />
            <span className="friends-page__cta-sparkles" aria-hidden="true" />
            <span className="friends-page__cta-label">Ajouter un ami</span>
          </button>
        </section>
      ) : (
        <section className="friends-page__list-wrap">
          <div className="friends-page__list-meta">
            <p>
              {sorted.length} {sorted.length > 1 ? 'personnes' : 'personne'}
            </p>
            <button type="button" className="friends-page__text-action" onClick={openSheet}>
              Ajouter
            </button>
          </div>
          <ul className="friends-page__list">
            {sorted.map((friend) => (
              <li key={friend.id} className="friends-page__row">
                <span className="friends-page__initial" aria-hidden="true">
                  {friend.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="friends-page__name">{friend.name}</span>
                <button
                  type="button"
                  className="friends-page__remove"
                  onClick={() => removeFriend(friend.id)}
                  aria-label={`Retirer ${friend.name}`}
                >
                  <X size={14} strokeWidth={1.6} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {open && (
        <div className="friends-sheet" role="dialog" aria-modal="true" aria-label="Ajouter un ami">
          <button type="button" className="friends-sheet__scrim" onClick={close} aria-label="Fermer" />
          <div className="friends-sheet__panel">
            <div className="friends-sheet__bar" aria-hidden="true" />
            <div className="friends-sheet__head">
              <h2 className="friends-sheet__title">Nouvel ami</h2>
              <p className="friends-sheet__subtitle">Juste un prénom pour commencer.</p>
            </div>
            <label className="friends-sheet__field">
              <span>Prénom</span>
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Camille"
                autoComplete="given-name"
                maxLength={40}
                enterKeyHint="done"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canAdd && !alreadyExists) addFriend();
                }}
              />
            </label>
            {alreadyExists && (
              <p className="friends-sheet__error" role="status">
                Cette personne est déjà dans ta liste.
              </p>
            )}
            <button
              type="button"
              className="friends-page__cta friends-page__cta--block"
              disabled={!canAdd || alreadyExists}
              onClick={addFriend}
            >
              <span className="friends-page__cta-aura" aria-hidden="true" />
              <span className="friends-page__cta-glow" aria-hidden="true" />
              <span className="friends-page__cta-sparkles" aria-hidden="true" />
              <span className="friends-page__cta-label">Ajouter un ami</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
