import { useMemo, useState, useEffect, useRef } from 'react';
import { Sparkles, User } from 'lucide-react';
import { generateCoStarAnalysis } from '../services/astrology';
import './CoStarLunarPreview.css';
import PremiumPortraitCard from './PremiumPortraitCard';
import DailySkyCarousel from './DailySkyCarousel';
import { DailyMissionCard, DailyYesNo } from './DailyRitual';
import { ShareStoryButton } from './TodayActions';
import {
  getDailyRitual,
  getDailySkyTransits,
  getMoonSign,
  getTomorrowSkyTransit,
} from '../services/dailySky';
import { readMissions } from '../lib/dailyRitual';
import type { StoryContent } from '../lib/shareStory';

interface CoStarPageProps {
  onBack: () => void;
  onExplore?: () => void;
  chartData?: any;
  userName?: string;
}

const getLocalDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const getMsUntilNextLocalMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.max(0, nextMidnight.getTime() - now.getTime()) + 50;
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 0x9e3779b1);
  }
  return Math.abs(hash);
};

const getDateOrdinal = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
};

const pickDailyText = (items: string[], seed: string, dateKey: string) =>
  items[(getDateOrdinal(dateKey) + hashString(seed)) % items.length];

export default function CoStarPage({ chartData, userName = 'Ami des étoiles', onExplore }: CoStarPageProps) {
  const [dateKey, setDateKey] = useState(() => getLocalDateKey());
  const costarPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: number | undefined;

    const syncDateKey = () => {
      setDateKey(prev => {
        const next = getLocalDateKey();
        return prev === next ? prev : next;
      });
    };

    const scheduleNextMidnight = () => {
      timeoutId = window.setTimeout(() => {
        syncDateKey();
        scheduleNextMidnight();
      }, getMsUntilNextLocalMidnight());
    };

    scheduleNextMidnight();
    window.addEventListener('focus', syncDateKey);
    document.addEventListener('visibilitychange', syncDateKey);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener('focus', syncDateKey);
      document.removeEventListener('visibilitychange', syncDateKey);
    };
  }, []);

  const analysis = useMemo(() => {
    if (chartData) {
      return generateCoStarAnalysis(chartData, userName, dateKey);
    }
    return null;
  }, [chartData, userName, dateKey]);

  const personalizationSeed = analysis?.personalizationSeed ?? `${userName.trim().toLocaleLowerCase('fr-FR')}|costar-fallback`;
  const selectedAdvice = analysis?.advice || 'Écoute ton intuition aujourd\'hui';

  const todayMood = analysis?.mood || (() => {
    const fallbackMoods = ['Curieux', 'Énergique', 'Mystérieux', 'Serein', 'Passionné'];
    return pickDailyText(fallbackMoods, `${personalizationSeed}|fallback-mood`, dateKey);
  })();

  // Superpouvoir & Défi adaptés à l'énergie du jour
  const natalPositions = chartData?.planetPositions;
  // Fast-planet transits drive the carousel; the challenge and the yes/no list
  // come from the chart areas they touch (stable all day, new every day).
  const dailySky = useMemo(() => {
    if (!natalPositions) return null;
    const now = new Date();
    const transits = getDailySkyTransits(natalPositions, now);
    return {
      transits,
      tomorrow: getTomorrowSkyTransit(natalPositions, transits.map((item) => item.id), now),
      ritual: getDailyRitual(natalPositions, dateKey),
      moonSign: getMoonSign(now),
    };
  }, [natalPositions, dateKey]);

  useEffect(() => {
    const page = costarPageRef.current;
    if (!page) return undefined;

    const scroller = page.closest<HTMLElement>('.app-content--costar');
    let frame: number | null = null;
    let lastProgress = -1;

    const readScrollTop = () =>
      scroller?.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;

    const syncBackgroundScroll = () => {
      frame = null;
      const viewportHeight = scroller?.clientHeight || window.innerHeight || 1;
      const rawProgress = readScrollTop() / Math.max(1, viewportHeight * 0.42);
      const clamped = Math.min(1, Math.max(0, rawProgress));
      const eased = 1 - Math.pow(1 - clamped, 3);
      const nextProgress = Math.round(eased * 1000) / 1000;

      if (Math.abs(nextProgress - lastProgress) >= 0.004) {
        page.style.setProperty('--costar-scroll-progress', nextProgress.toFixed(3));
        page.style.setProperty('--costar-scroll-offset', `${(-6.5 * nextProgress).toFixed(3)}svh`);
        page.style.setProperty('--costar-background-opacity', (1 - nextProgress * 0.58).toFixed(3));
        page.style.setProperty('--costar-readability-opacity', (nextProgress * 0.92).toFixed(3));
        lastProgress = nextProgress;
      }
    };

    const requestSync = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(syncBackgroundScroll);
      }
    };

    syncBackgroundScroll();
    const scrollTarget = scroller ?? window;
    scrollTarget.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      scrollTarget.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      page.style.removeProperty('--costar-scroll-progress');
      page.style.removeProperty('--costar-scroll-offset');
      page.style.removeProperty('--costar-background-opacity');
      page.style.removeProperty('--costar-readability-opacity');
    };
  }, []);

  const headerDate = (() => {
    const label = new Date(`${dateKey}T12:00:00`).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return label.charAt(0).toLocaleUpperCase('fr-FR') + label.slice(1);
  })();
  const moodTitle = todayMood.replace(/\s+—\s+/g, ', ');
  const ritual = dailySky?.ritual;

  const getStoryContent = (): StoryContent => ({
    dateLabel: headerDate,
    mood: moodTitle,
    mission: ritual?.mission
      ? { text: ritual.mission.text, done: readMissions()[dateKey] === 'done' }
      : undefined,
    oui: ritual?.yesNo.oui ?? [],
    non: ritual?.yesNo.non ?? [],
  });

  return (
    <div ref={costarPageRef} className="costar-page min-h-screen bg-[#131314] text-white relative pb-8">
      <div className="costar-scroll-planet" aria-hidden="true" />
      {/* Header — Eclipse Logo */}
      <div className="costar-header costar-header--astrolabe">
        <button className="costar-header-profile" type="button" aria-label="Profil">
          <User size={17} strokeWidth={1.45} />
        </button>
        <div className="costar-header-balance" aria-hidden="true"></div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 pt-4 pb-4 md:pt-6 md:pb-6 space-y-12">
        {/* Énergie + Défi — occupe toute la première page */}
        <section className="costar-daily-hero max-w-2xl mx-auto">
          <div className="space-y-3 text-center">
            <p className="costar-section-title text-sm uppercase tracking-widest -translate-y-2">Ton énergie du jour</p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight bg-gradient-to-r from-sky-300 via-rose-300 to-violet-400 bg-clip-text text-transparent">
              {moodTitle}
            </h2>
          </div>

          {ritual?.mission && (
            <>
              <div className="costar-challenge-separator h-px w-24 bg-gradient-to-r from-transparent via-[#FFD699]/45 to-transparent"></div>
              <div className="w-full space-y-2 text-center">
                <p className="costar-section-title text-sm uppercase tracking-widest -translate-y-2">Ton défi du jour</p>
                <DailyMissionCard dateKey={dateKey} mission={ritual.mission} />
              </div>
            </>
          )}
        </section>

        <div className="costar-section-divider" aria-hidden="true"></div>

        {/* Your Day at a Glance */}
        {dailySky && dailySky.transits.length > 0 && (
          <DailySkyCarousel transits={dailySky.transits} tomorrow={dailySky.tomorrow} dateKey={dateKey} />
        )}

        {ritual && ritual.yesNo.oui.length > 0 && (
          <>
            <div className="costar-section-divider" aria-hidden="true"></div>
            <section className="space-y-4 text-center" aria-label="Oui / Non du jour">
              <p className="costar-section-title text-sm uppercase tracking-widest">Oui / Non du jour</p>
              <DailyYesNo oui={ritual.yesNo.oui} non={ritual.yesNo.non} />
              <ShareStoryButton getContent={getStoryContent} />
            </section>
          </>
        )}

        <div className="costar-section-divider" aria-hidden="true"></div>

        {/* Daily Quote */}
        <section className="costar-daily-advice space-y-6 border-t border-[#1E2035]/60 pt-12">
          <p className="costar-section-title text-sm uppercase tracking-widest -translate-y-2">Conseil du jour</p>
          <div className="costar-daily-advice-card relative rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,160,80,0.20)]" style={{ border: '1px solid rgba(200,170,110,0.5)', background: 'linear-gradient(135deg, #FAF6EE 0%, #F3EDD8 100%)', padding: '2rem 3rem' }}>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)' }}></div>
            <div className="relative">
              <p className="costar-daily-advice-quote text-xl md:text-2xl font-light leading-relaxed mb-6" style={{ color: '#3b2f1e' }}>
                {selectedAdvice}
              </p>
              <div className="costar-daily-advice-signature flex items-center gap-2 text-sm" style={{ color: '#a07840' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#c8860a' }} />
                <span>Message personnel de l'univers</span>
              </div>
            </div>
          </div>
        </section>

        <div className="costar-section-divider" aria-hidden="true"></div>

        {/* Premium portrait — ivory editorial card */}
        <section className="costar-premium-section" aria-label="Premium">
          <PremiumPortraitCard onExplore={onExplore} />
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-[#1E2035]/60 pt-8 text-center text-xs text-zinc-600">
          {/* Star field animation */}
          <div className="relative h-16 mb-4 overflow-hidden">
            <style>{`
              @keyframes twinkle {
                0%, 100% { opacity: 0.1; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
              }
              @keyframes drift {
                0% { transform: translateX(0px) translateY(0px); }
                33% { transform: translateX(4px) translateY(-3px); }
                66% { transform: translateX(-3px) translateY(2px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
              .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--dur, 3s) var(--delay, 0s) ease-in-out infinite, drift calc(var(--dur, 3s) * 2.5) var(--delay, 0s) ease-in-out infinite; }
            `}</style>
            {[
              { left:'5%',  top:'30%', size:1,   dur:'2.1s', delay:'0s'    },
              { left:'12%', top:'70%', size:1.5, dur:'3.4s', delay:'0.5s'  },
              { left:'20%', top:'20%', size:1,   dur:'2.8s', delay:'1.2s'  },
              { left:'28%', top:'60%', size:2,   dur:'4.0s', delay:'0.3s'  },
              { left:'35%', top:'40%', size:1,   dur:'2.5s', delay:'1.8s'  },
              { left:'42%', top:'80%', size:1.5, dur:'3.1s', delay:'0.7s'  },
              { left:'50%', top:'25%', size:2.5, dur:'2.3s', delay:'0.0s'  },
              { left:'57%', top:'65%', size:1,   dur:'3.7s', delay:'1.4s'  },
              { left:'64%', top:'35%', size:1.5, dur:'2.9s', delay:'0.9s'  },
              { left:'72%', top:'75%', size:1,   dur:'4.2s', delay:'0.2s'  },
              { left:'80%', top:'45%', size:2,   dur:'2.6s', delay:'1.0s'  },
              { left:'88%', top:'20%', size:1,   dur:'3.3s', delay:'1.6s'  },
              { left:'94%', top:'60%', size:1.5, dur:'2.7s', delay:'0.4s'  },
            ].map((s, i) => (
              <span
                key={i}
                className="star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: `${s.size * 2}px`,
                  height: `${s.size * 2}px`,
                  '--dur': s.dur,
                  '--delay': s.delay,
                  opacity: 0.15,
                } as React.CSSProperties}
              />
            ))}
            {/* Central larger star */}
            <span style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              color:'rgba(251,191,36,0.5)',
              fontSize:'1.1rem',
              animation:'twinkle 2.8s ease-in-out infinite',
            } as React.CSSProperties}>✦</span>
          </div>
          <div style={{ perspective: '200px', perspectiveOrigin: '50% 0%', marginTop: '36px' }}>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FFE81F',
              textShadow: '0 0 12px rgba(255,232,31,0.5), 0 0 30px rgba(255,232,31,0.2)',
              transform: 'rotateX(18deg)',
              transformOrigin: '50% 100%',
              display: 'inline-block',
            }}>La Force du cosmos traverse ton thème natal</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
