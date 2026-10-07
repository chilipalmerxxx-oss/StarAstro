import { useEffect, useMemo, useState } from 'react';
import type { DailyMission } from '../services/dailySky';
import {
  readMissions,
  readVisits,
  recordVisit,
  subscribeRitual,
  writeMission,
  type MissionState,
} from '../lib/dailyRitual';
import './DailyRitual.css';

const WEEKDAY_INITIALS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const SPARKS = Array.from({ length: 12 }, (_, index) => index);

const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const useRitualSnapshot = () => {
  const [snapshot, setSnapshot] = useState(() => ({ visits: readVisits(), missions: readMissions() }));
  useEffect(() => subscribeRitual(() => setSnapshot({ visits: readVisits(), missions: readMissions() })), []);
  return snapshot;
};

// The current week (Monday first): a gold dot for each visit, a small star for
// each completed challenge. Discreet regularity, no streak counter.
export function WeekRitual({ dateKey }: { dateKey: string }) {
  const { visits, missions } = useRitualSnapshot();

  useEffect(() => {
    recordVisit(dateKey);
  }, [dateKey]);

  const week = useMemo(() => {
    const today = new Date(`${dateKey}T12:00:00`);
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return WEEKDAY_INITIALS.map((initial, index) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + index);
      const key = toDateKey(day);
      return {
        key,
        initial,
        visited: visits.includes(key) || key === dateKey,
        done: missions[key] === 'done',
        isToday: key === dateKey,
      };
    });
  }, [dateKey, visits, missions]);

  const doneCount = week.filter((day) => day.done).length;

  return (
    <div className="week-ritual" aria-label={`${doneCount} défi${doneCount > 1 ? 's' : ''} relevé${doneCount > 1 ? 's' : ''} cette semaine`}>
      {week.map((day) => (
        <span
          key={day.key}
          className={`week-ritual__day${day.visited ? ' is-visited' : ''}${day.done ? ' is-done' : ''}${day.isToday ? ' is-today' : ''}`}
        >
          <span className="week-ritual__mark" />
          <span className="week-ritual__initial">{day.initial}</span>
        </span>
      ))}
    </div>
  );
}

interface DailyMissionCardProps {
  dateKey: string;
  mission: DailyMission;
  footer?: React.ReactNode;
}

export function DailyMissionCard({ dateKey, mission, footer }: DailyMissionCardProps) {
  const { missions } = useRitualSnapshot();
  const state: MissionState = missions[dateKey] ?? 'idle';
  const done = state === 'done';
  const [celebrating, setCelebrating] = useState(false);

  const toggle = () => {
    const next = done ? 'idle' : 'done';
    writeMission(dateKey, next);
    if (next === 'done') {
      setCelebrating(true);
      navigator.vibrate?.(24);
      window.setTimeout(() => setCelebrating(false), 1400);
    }
  };

  return (
    <div className={`mission${done ? ' is-done' : ''}${celebrating ? ' is-celebrating' : ''}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        className="mission__check"
        onClick={toggle}
        aria-label={done ? 'Décocher le défi' : 'Cocher le défi comme relevé'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 12.5l4 4 8-9" />
        </svg>
        {celebrating && (
          <span className="mission__sparks" aria-hidden="true">
            {SPARKS.map((index) => (
              <span key={index} style={{ '--spark-angle': `${index * 30}deg` } as React.CSSProperties} />
            ))}
          </span>
        )}
      </button>

      <div className="mission__body">
        <p className="mission__text">{mission.text}</p>
        <p className="mission__reason">{mission.reason}</p>
        {done && (
          <p className="mission__status" role="status">
            Défi relevé. Une étoile s’allume dans ta semaine.
          </p>
        )}
      </div>

      {footer && <div className="mission__footer">{footer}</div>}
    </div>
  );
}

export function DailyYesNo({ oui, non }: { oui: string[]; non: string[] }) {
  return (
    <div className="yesno">
      <div className="yesno__column yesno__column--oui">
        <p className="yesno__label">Oui</p>
        <ul>
          {oui.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="yesno__column yesno__column--non">
        <p className="yesno__label">Non</p>
        <ul>
          {non.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
