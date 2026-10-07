import { useState, useEffect, useCallback, useRef } from 'react';
import LandingPage from './components/LandingPage';
import TheVoid from './components/TheVoid';
import AstralProfile from './components/AstralProfile';
import You2Page from './components/You2Page';
import FriendsPage from './components/FriendsPage';
import CoStarPage from './components/CoStarPage';
import CoStarPagePreview from './components/CoStarPagePreview';
import CoStarHeroPreview from './components/CoStarHeroPreview';
import CoStarBackgroundExamplesPage from './components/CoStarBackgroundExamplesPage';
import YouPageWheelPreview from './components/YouPageWheelPreview';
import BackgroundLab, { YOU_BACKGROUND_OPTIONS, parseBackgroundOption } from './components/BackgroundLab';
import LandingOrnamentPreview from './components/LandingOrnamentPreview';
import LandingTitlePreview from './components/LandingTitlePreview';
import LoveDesignPreview from './components/LoveDesignPreview';
import HomeDashboard from './components/HomeDashboard';
import LovePage from './components/LovePage';
import XPage from './components/XPage';
import BottomNavBar, { type TabId } from './components/BottomNavBar';
import type { OnboardingBirthData } from './components/Onboarding';
import PremiumOnboardingY from './components/PremiumOnboardingY';
import { calculateBirthChart } from './services/astrology';
import { getBirthLocalParts, parseBirthDateTime } from './lib/birthDate';
import { getBirthOffsetAt, resolveBirthTimeZone } from './lib/birthTimezone';
import { announceChartRecalculation } from './lib/chartRecalcEvents';
import { Supabase, isSupabaseConfigured } from './lib/supabase';
import { getSessionId } from './lib/session';

interface ChartData {
  name: string;
  birthDate: Date;
  birthPlace: string;
  latitude?: number;
  longitude?: number;
  timezoneOffset?: number;
  /** Heure de naissance inconnue (12:00 par convention) : Ascendant et maisons non fiables. */
  birthTimeUnknown?: boolean;
  /** Version du calcul (voir CHART_CALC_VERSION) ; absente pour les thèmes calculés avant. */
  calcVersion?: number;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects: any[];
}

interface StoredBirthChart {
  name: string;
  birth_date: string;
  birth_place: string;
  latitude: number | string;
  longitude: number | string;
  timezone_offset: number | string;
  birth_time_unknown?: boolean | null;
  planet_positions: Record<string, unknown> | null;
  houses: unknown[] | null;
  aspects: unknown[] | null;
}

// Fonctions pour la persistance des données
const saveChartToLocalStorage = (chart: ChartData | null) => {
  if (!chart) {
    localStorage.removeItem('astroThemeChart');
    return;
  }

  const dataToSave = {
    ...chart,
    birthDate: chart.birthDate.toISOString(), // Convertir Date en string
  };
  localStorage.setItem('astroThemeChart', JSON.stringify(dataToSave));
};

const loadChartFromLocalStorage = (): ChartData | null => {
  try {
    const saved = localStorage.getItem('astroThemeChart');
    if (!saved) return null;

    const data = JSON.parse(saved);
    return {
      ...data,
      birthDate: new Date(data.birthDate), // Convertir string en Date
    };
  } catch (error) {
    console.error('Error loading chart from localStorage:', error);
    return null;
  }
};

const ONBOARDING_STORAGE_KEY = 'nightstarOnboardingComplete';

const mapStoredBirthChart = (stored: StoredBirthChart): ChartData => ({
  name: stored.name,
  birthDate: new Date(stored.birth_date),
  birthPlace: stored.birth_place,
  latitude: Number(stored.latitude),
  longitude: Number(stored.longitude),
  timezoneOffset: Number(stored.timezone_offset),
  birthTimeUnknown: Boolean(stored.birth_time_unknown),
  planetPositions: stored.planet_positions ?? {},
  houses: Array.isArray(stored.houses) ? stored.houses : [],
  aspects: Array.isArray(stored.aspects) ? stored.aspects : [],
});

// 2 = décalage horaire réel du lieu de naissance (fuseau IANA, heure d'été comprise).
// Les thèmes antérieurs utilisaient un décalage fixe et sont recalculés au chargement.
const CHART_CALC_VERSION = 2;

const padTime = (value: number) => String(value).padStart(2, '0');

const computeChartData = (data: OnboardingBirthData): ChartData => {
  const birthDateTime = parseBirthDateTime(data.date, data.time, data.timezoneOffset);
  const chart = calculateBirthChart({
    date: birthDateTime,
    latitude: data.latitude,
    longitude: data.longitude,
  });
  return {
    name: data.name,
    birthDate: birthDateTime,
    birthPlace: data.place,
    latitude: data.latitude,
    longitude: data.longitude,
    timezoneOffset: data.timezoneOffset,
    birthTimeUnknown: data.timeUnknown,
    calcVersion: CHART_CALC_VERSION,
    planetPositions: chart.planetPositions,
    houses: chart.houses,
    aspects: chart.aspects,
  };
};

const saveChartToSupabase = async (chart: ChartData) => {
  const { data: { user } } = await Supabase.auth.getUser();
  const row: Record<string, unknown> = {
    name: chart.name,
    birth_date: chart.birthDate.toISOString(),
    birth_place: chart.birthPlace,
    latitude: chart.latitude,
    longitude: chart.longitude,
    timezone_offset: chart.timezoneOffset,
    birth_time_unknown: Boolean(chart.birthTimeUnknown),
    planet_positions: chart.planetPositions,
    houses: chart.houses,
    aspects: chart.aspects,
    user_id: user?.id || null,
    session_id: user ? null : getSessionId(),
  };

  let { error } = await Supabase.from('birth_charts').insert(row);
  // Migration birth_time_unknown pas encore appliquée : la colonne est inconnue, on réessaie sans.
  if (error?.message?.includes('birth_time_unknown')) {
    delete row.birth_time_unknown;
    ({ error } = await Supabase.from('birth_charts').insert(row));
  }
  return error;
};

/**
 * Recalcule un thème antérieur à CHART_CALC_VERSION : l'heure civile saisie se retrouve
 * avec l'ancien décalage, puis le décalage réel du lieu (heure d'été comprise) est appliqué.
 * `null` si le recalcul est impossible pour l'instant (coordonnées absentes, fuseau introuvable).
 */
const recalculateLegacyChart = async (chart: ChartData): Promise<ChartData | null> => {
  const { latitude, longitude, timezoneOffset, birthDate } = chart;
  if (
    latitude === undefined || longitude === undefined || timezoneOffset === undefined
    || !Number.isFinite(latitude) || !Number.isFinite(longitude) || !Number.isFinite(timezoneOffset)
    || Number.isNaN(birthDate.getTime())
  ) {
    return null;
  }

  const local = getBirthLocalParts(birthDate, timezoneOffset);
  const date = `${local.year}-${padTime(local.month)}-${padTime(local.day)}`;
  const time = `${padTime(local.hour)}:${padTime(local.minute)}`;
  const timeZone = await resolveBirthTimeZone(latitude, longitude);
  if (!timeZone) return null;

  const offset = getBirthOffsetAt(date, time, timeZone, longitude);
  if (offset === timezoneOffset) return { ...chart, calcVersion: CHART_CALC_VERSION };

  return computeChartData({
    name: chart.name,
    date,
    time,
    place: chart.birthPlace,
    latitude,
    longitude,
    timezoneOffset: offset,
    timeUnknown: chart.birthTimeUnknown,
  });
};

const describeRecalculation = (before: ChartData, after: ChartData) => {
  const intro = 'Ton thème a été recalculé avec l’heure légale exacte de ton lieu de naissance, heure d’été comprise.';
  if (after.birthTimeUnknown) return intro;
  const previousAscendant = before.houses?.[0]?.sign;
  const ascendant = after.houses?.[0]?.sign;
  if (previousAscendant && ascendant && previousAscendant !== ascendant) {
    return `${intro} Ton Ascendant passe de ${previousAscendant} à ${ascendant}.`;
  }
  return ascendant
    ? `${intro} Ton Ascendant reste en ${ascendant} ; ses degrés et tes maisons ont été affinés.`
    : intro;
};

function App() {
  const isCoStarPreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#costar-preview-v2';
  const isCoStarHeroPreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#costar-hero-preview-v1';
  const isCoStarBackgroundExamplesRoute =
    typeof window !== 'undefined' && window.location.hash === '#costar-background-examples';
  const isYouPageWheelPreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#you-page-preview-v1';
  const isLandingOrnamentPreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#landing-ornaments';
  const isLandingTitlePreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#landing-title-designs';
  const isLoveDesignPreviewRoute =
    typeof window !== 'undefined' && window.location.hash === '#love-designs';
  const isCompatibilityTestRoute =
    typeof window !== 'undefined' && window.location.hash === '#compatibility-test';

  const savedChart = loadChartFromLocalStorage();
  const initialChartRef = useRef<ChartData | null>(savedChart);
  // ?youbg opens the YOU tab directly with the background switcher.
  const youBgLabParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('youbg') : null;
  const opensYouBgLab = youBgLabParam !== null && savedChart !== null;
  const [youBgVariant, setYouBgVariant] = useState(() =>
    parseBackgroundOption(YOU_BACKGROUND_OPTIONS, youBgLabParam),
  );
  const [showLanding, setShowLanding] = useState(!opensYouBgLab);
  const [showVoid, setShowVoid] = useState(false);
  const [showCoStar, setShowCoStar] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(initialChartRef.current);
  const [isRestoringChart, setIsRestoringChart] = useState(
    initialChartRef.current === null && isSupabaseConfigured,
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>(opensYouBgLab ? 'profile' : 'home');
  const [selectedPlanetForProfile, setSelectedPlanetForProfile] = useState<string | null>(null);

  // Sauvegarder les données quand chartData change
  useEffect(() => {
    saveChartToLocalStorage(chartData);
  }, [chartData]);

  // If iOS did not expose the local PWA storage, restore the latest chart
  // belonging to the signed-in user or to this anonymous browser session.
  useEffect(() => {
    if (initialChartRef.current || !isSupabaseConfigured) {
      setIsRestoringChart(false);
      return;
    }

    let cancelled = false;

    const restoreLatestChart = async () => {
      try {
        const { data: { user } } = await Supabase.auth.getUser();
        let query = Supabase
          .from('birth_charts')
          // `*` plutôt qu'une liste : reste valide avant comme après la migration birth_time_unknown.
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        query = user
          ? query.eq('user_id', user.id)
          : query.eq('session_id', getSessionId());

        const { data, error } = await query.maybeSingle();
        if (error) throw error;
        if (!data || cancelled) return;

        const restoredChart = mapStoredBirthChart(data as StoredBirthChart);
        saveChartToLocalStorage(restoredChart);
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
        setChartData(restoredChart);
        setShowLanding(true);
        setActiveTab('home');
      } catch (error) {
        console.error('Error restoring saved chart:', error);
      } finally {
        if (!cancelled) setIsRestoringChart(false);
      }
    };

    void restoreLatestChart();
    return () => {
      cancelled = true;
    };
  }, []);

  // Thèmes calculés avant le fuseau réel : recalcul unique, enregistré et annoncé s'il change.
  useEffect(() => {
    if (!chartData || (chartData.calcVersion ?? 1) >= CHART_CALC_VERSION) return;
    let cancelled = false;

    const upgradeChart = async () => {
      try {
        const recalculated = await recalculateLegacyChart(chartData);
        if (!recalculated || cancelled) return;
        setChartData(recalculated);
        if (recalculated.timezoneOffset === chartData.timezoneOffset) return;

        announceChartRecalculation(describeRecalculation(chartData, recalculated));
        if (isSupabaseConfigured) {
          const error = await saveChartToSupabase(recalculated);
          if (error) console.error('Error saving recalculated chart to database:', error);
        }
      } catch (error) {
        console.error('Error recalculating legacy chart:', error);
      }
    };

    void upgradeChart();
    return () => {
      cancelled = true;
    };
  }, [chartData]);

  // Scroll en haut à chaque changement d'onglet
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const root = document.getElementById('root');
      if (root) root.scrollTop = 0;
      // Cible le conteneur scrollable principal (.app-content)
      const appContent = document.querySelector('.app-content') as HTMLElement | null;
      if (appContent) appContent.scrollTop = 0;
    };
    scrollToTop();
    // Retry après le rendu React
    requestAnimationFrame(scrollToTop);
    const t = setTimeout(scrollToTop, 50);
    return () => clearTimeout(t);
  }, [activeTab, showCoStar, showVoid, showLanding]);

  const handleOnboardingComplete = useCallback(async (data: OnboardingBirthData) => {
    setLoading(true);

    try {
      const completedChart = computeChartData(data);
      const error = await saveChartToSupabase(completedChart);
      if (error) {
        console.error('Error saving onboarding chart to database:', error);
      }

      saveChartToLocalStorage(completedChart);
      setChartData(completedChart);
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setShowLanding(true);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Une erreur est survenue lors de la création de ton thème.');
      setShowLanding(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOnboardingAccountSkip = useCallback(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setShowLanding(false);
    setShowVoid(false);
    setShowCoStar(false);
    setActiveTab('home');
  }, []);

  const handleEditBirthData = useCallback(async (data: OnboardingBirthData) => {
    setLoading(true);

    try {
      const editedChart = computeChartData(data);
      const error = await saveChartToSupabase(editedChart);
      if (error) {
        console.error('Error saving edited chart to database:', error);
      }

      saveChartToLocalStorage(editedChart);
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setChartData(editedChart);
      setSelectedPlanetForProfile(null);
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('profile');
    } catch (error) {
      console.error('Error editing chart:', error);
      alert('Une erreur est survenue lors de la mise a jour du theme.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetStarted = () => {
    // New visitors must enter the current onboarding — never the legacy AstroThème form.
    setShowLanding(false);
    setShowVoid(false);
    setShowCoStar(false);
    setActiveTab('y');
  };

  const handleTabChange = (tab: TabId) => {
    if (tab === 'void') {
      setShowLanding(false);
      setShowVoid(true);
      setShowCoStar(false);
      setActiveTab('void');
      return;
    }
    if (tab === 'costar') {
      if (!chartData) {
        setShowLanding(true);
        setActiveTab('home');
        alert('Crée d\'abord ton thème astral pour accéder à CoStar');
        return;
      }
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(true);
      setActiveTab('costar');
      return;
    }
    if (tab === 'profile') {
      if (!chartData) {
        setShowLanding(true);
        setActiveTab('home');
        alert('Crée d\'abord ton thème astral pour voir ton profil');
        return;
      }
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('profile');
      return;
    }
    if (tab === 'you2') {
      if (!chartData) {
        setShowLanding(true);
        setActiveTab('home');
        alert('Crée d\'abord ton thème astral pour voir You 2');
        return;
      }
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('you2');
      return;
    }
    if (tab === 'home') {
      setShowVoid(false);
      setShowCoStar(false);
      setShowLanding(true);
      setActiveTab('home');
      return;
    }
    if (tab === 'love') {
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('love');
      return;
    }
    if (tab === 'x') {
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('x');
      return;
    }
    setShowLanding(false);
    setShowVoid(false);
    setShowCoStar(false);
    setActiveTab(tab);
  };

  if (isCoStarPreviewRoute) {
    return (
      <CoStarPagePreview
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isCoStarHeroPreviewRoute) {
    return (
      <CoStarHeroPreview
        userName={savedChart?.name}
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isCoStarBackgroundExamplesRoute) {
    return (
      <CoStarBackgroundExamplesPage
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isYouPageWheelPreviewRoute) {
    return (
      <YouPageWheelPreview
        userName={savedChart?.name || chartData?.name || 'Gil'}
        birthDateLabel={savedChart?.birthDate ? savedChart.birthDate.toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }) : undefined}
        birthPlaceLabel={savedChart?.birthPlace || chartData?.birthPlace || 'Paris, France'}
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isLandingOrnamentPreviewRoute) {
    return (
      <LandingOrnamentPreview
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isLandingTitlePreviewRoute) {
    return (
      <LandingTitlePreview
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isLoveDesignPreviewRoute) {
    return (
      <LoveDesignPreview
        onClosePreview={() => {
          window.location.hash = '';
          window.location.reload();
        }}
      />
    );
  }

  if (isCompatibilityTestRoute) {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
        onSkipAccount={handleOnboardingAccountSkip}
        onExit={() => {
          window.location.hash = '';
          handleTabChange('home');
        }}
      />
    );
  }

  if (isRestoringChart) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          minHeight: '100svh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          color: 'rgba(255, 250, 241, 0.72)',
          background: '#08090c',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '18px',
          letterSpacing: '0.04em',
        }}
      >
        Ouverture de ton ciel…
      </div>
    );
  }

  if (showCoStar) {
    return (
      <div className="app-shell app-shell--costar">
        <div className="app-content app-content--costar">
          <CoStarPage 
            onBack={() => {
              setShowCoStar(false);
              setActiveTab('home');
            }} 
            chartData={chartData} 
            userName={chartData?.name} 
            onExplore={() => handleTabChange('profile')}
          />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (showVoid) {
    return <TheVoid onBack={() => { setShowVoid(false); setActiveTab('home'); }} />;
  }

  if (showLanding) {
    if (chartData) {
      return (
        <div className="app-shell app-shell--home-dashboard app-shell--tide-home">
          <div className="app-content app-content--home-dashboard">
            <HomeDashboard
              chartData={chartData}
              onNavigate={(tab) => handleTabChange(tab)}
            />
          </div>
          <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      );
    }

    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onOpenVoid={() => setShowVoid(true)}
      />
    );
  }

  // ── Friends tab ──
  if (activeTab === 'friends') {
    return (
      <div className="app-shell">
        <div className="app-content">
          <FriendsPage onBack={() => setActiveTab('home')} />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // ── Love tab ──
  if (activeTab === 'love') {
    return (
      <div className="app-shell">
        <div className="app-content">
          <LovePage />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (activeTab === 'x') {
    return (
      <div className="app-shell app-shell--x-report">
        <div className="app-content app-content--x-report">
          <XPage />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (activeTab === 'test') {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
        onSkipAccount={handleOnboardingAccountSkip}
        onExit={() => handleTabChange('home')}
      />
    );
  }

  if (activeTab === 'y') {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
        onSkipAccount={handleOnboardingAccountSkip}
        onExit={() => handleTabChange('home')}
      />
    );
  }

  // ── Profile / Astral tab ──
  if (activeTab === 'you2' && chartData) {
    return (
      <div className="app-shell app-shell--you2">
        <div className="app-content app-content--you2">
          <You2Page
            name={chartData.name}
            birthDate={chartData.birthDate}
            birthPlace={chartData.birthPlace}
            birthLatitude={chartData.latitude}
            birthLongitude={chartData.longitude}
            birthTimezoneOffset={chartData.timezoneOffset}
            birthTimeUnknown={chartData.birthTimeUnknown}
            planetPositions={chartData.planetPositions}
            houses={chartData.houses}
            aspects={chartData.aspects}
            initialActivePlanet={selectedPlanetForProfile as any}
            onEditBirthData={handleEditBirthData}
            editBirthDataLoading={loading}
          />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={(tab) => {
          setSelectedPlanetForProfile(null);
          handleTabChange(tab);
        }} />
      </div>
    );
  }

  if (activeTab === 'profile' && chartData) {
    return (
      <div className="app-shell app-shell--you" data-you-bg={youBgVariant || undefined}>
        <div className="app-content app-content--you">
          <AstralProfile
            name={chartData.name}
            birthDate={chartData.birthDate}
            birthPlace={chartData.birthPlace}
            birthLatitude={chartData.latitude}
            birthLongitude={chartData.longitude}
            birthTimezoneOffset={chartData.timezoneOffset}
            birthTimeUnknown={chartData.birthTimeUnknown}
            planetPositions={chartData.planetPositions}
            houses={chartData.houses}
            aspects={chartData.aspects}
            initialActivePlanet={selectedPlanetForProfile as any}
            fullscreenMode={true}
            onEditBirthData={handleEditBirthData}
            editBirthDataLoading={loading}
          />
        </div>
        {youBgLabParam !== null && (
          <BackgroundLab
            param="youbg"
            options={YOU_BACKGROUND_OPTIONS}
            value={youBgVariant}
            onChange={setYouBgVariant}
          />
        )}
        <BottomNavBar activeTab={activeTab} onTabChange={(tab) => {
          setSelectedPlanetForProfile(null);
          handleTabChange(tab);
        }} />
      </div>
    );
  }

  // Fallback: no matching screen — never show the legacy AstroThème form to visitors.
  if (!chartData) {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
        onSkipAccount={handleOnboardingAccountSkip}
        onExit={() => {
          setShowLanding(true);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="app-shell app-shell--you" data-you-bg={youBgVariant || undefined}>
      <div className="app-content app-content--you">
        <AstralProfile
          name={chartData.name}
          birthDate={chartData.birthDate}
          birthPlace={chartData.birthPlace}
          birthLatitude={chartData.latitude}
          birthLongitude={chartData.longitude}
          birthTimezoneOffset={chartData.timezoneOffset}
          birthTimeUnknown={chartData.birthTimeUnknown}
          planetPositions={chartData.planetPositions}
          houses={chartData.houses}
          aspects={chartData.aspects}
          fullscreenMode={true}
          onEditBirthData={handleEditBirthData}
          editBirthDataLoading={loading}
        />
      </div>
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedPlanetForProfile(null);
          handleTabChange(tab);
        }}
      />
    </div>
  );
}

export default App;
