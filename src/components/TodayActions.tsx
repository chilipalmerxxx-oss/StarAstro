import { useEffect, useState } from 'react';
import { Bell, Share } from 'lucide-react';
import {
  disableDailyNotification,
  enableDailyNotification,
  getNotificationAvailability,
  getNotificationState,
  type NotificationState,
} from '../lib/notifications';
import { shareDailyStory, type StoryContent } from '../lib/shareStory';

export function MorningReminderToggle() {
  const availability = getNotificationAvailability();
  const [state, setState] = useState<NotificationState | 'loading'>('loading');
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (availability !== 'ready') {
      setState('off');
      return;
    }
    getNotificationState().then(setState).catch(() => setState('off'));
  }, [availability]);

  if (availability === 'unsupported') return null;

  if (availability === 'needs-install') {
    return (
      <p className="today-reminder__note">
        <Bell size={14} strokeWidth={1.6} aria-hidden="true" />
        Ajoute l’app à ton écran d’accueil pour recevoir ton défi chaque matin.
      </p>
    );
  }

  const isOn = state === 'on';

  const toggle = async () => {
    setNote(null);
    if (availability === 'not-configured') {
      setNote('Le rappel du matin sera actif dès la mise en ligne.');
      return;
    }
    setState('loading');
    try {
      const next = isOn ? await disableDailyNotification() : await enableDailyNotification();
      setState(next);
      if (next === 'denied') setNote('Notifications bloquées : réactive-les dans les réglages du téléphone.');
      if (next === 'on') setNote('C’est noté. Ton défi t’attendra chaque matin à 8 h.');
    } catch {
      setState('off');
      setNote('Activation impossible pour le moment. Réessaie plus tard.');
    }
  };

  return (
    <div className="today-reminder">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        className={`today-reminder__toggle${isOn ? ' is-on' : ''}`}
        onClick={toggle}
        disabled={state === 'loading'}
      >
        <Bell size={15} strokeWidth={1.6} aria-hidden="true" />
        <span>Me rappeler mon défi chaque matin</span>
        <span className="today-reminder__switch" aria-hidden="true" />
      </button>
      {note && <p className="today-reminder__note" role="status">{note}</p>}
    </div>
  );
}

// Builds the content at click time so the story reflects the challenge state.
export function ShareStoryButton({ getContent }: { getContent: () => StoryContent }) {
  const [status, setStatus] = useState<'idle' | 'working' | 'downloaded' | 'error'>('idle');

  const share = async () => {
    setStatus('working');
    try {
      const outcome = await shareDailyStory(getContent());
      setStatus(outcome === 'downloaded' ? 'downloaded' : 'idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="story-share">
      <button type="button" className="story-share__button" onClick={share} disabled={status === 'working'}>
        <Share className="story-share__icon" size={13} strokeWidth={1.8} aria-hidden="true" />
        <span className="story-share__label">{status === 'working' ? 'Préparation…' : 'Partager en story'}</span>
      </button>
      {status === 'downloaded' && <p className="story-share__note" role="status">Image enregistrée. Ajoute-la à ta story.</p>}
      {status === 'error' && <p className="story-share__note" role="status">Le partage n’a pas fonctionné. Réessaie.</p>}
    </div>
  );
}
