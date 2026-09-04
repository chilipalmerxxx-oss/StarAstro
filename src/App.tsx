import { lazy, useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import compatibilityArtwork from './assets/compatibilite-premium-astrologie.png';
import BottomNavBar, { type TabId } from './components/BottomNavBar';
import { getTimeZoneFromCoordinates, getTimezoneOffsetHours, parseBirthDateTime } from './lib/birthDate';
import { getOrCreateSupabaseUserId, isSupabaseConfigured, Supabase } from './lib/supabase';
import type { BirthInput, ChartData } from './types/chart';
import type { Aspect, House, PlanetPosition } from './services/astrology';

const TheVoid = lazy(() => import('./components/TheVoid'));
const AstralProfile = lazy(() => import('./components/AstralProfile'));
const You2Page = lazy(() => import('./components/You2Page'));
const FriendsPage = lazy(() => import('./components/FriendsPage'));
const CoStarPage = lazy(() => import('./components/CoStarPage'));
const CoStarPagePreview = lazy(() => import('./components/CoStarPagePreview'));
const CoStarHeroPreview = lazy(() => import('./components/CoStarHeroPreview'));
const CoStarBackgroundExamplesPage = lazy(() => import('./components/CoStarBackgroundExamplesPage'));
const YouPageWheelPreview = lazy(() => import('./components/YouPageWheelPreview'));
const LandingOrnamentPreview = lazy(() => import('./components/LandingOrnamentPreview'));
const LandingTitlePreview = lazy(() => import('./components/LandingTitlePreview'));
const HomeDashboard = lazy(() => import('./components/HomeDashboard'));
const LovePage = lazy(() => import('./components/LovePage'));
const XPage = lazy(() => import('./components/XPage'));
const TestCompatibilityPage = lazy(() => import('./components/TestCompatibilityPage'));
const PremiumOnboardingY = lazy(() => import('./components/PremiumOnboardingY'));

type CalculatedChart = {
  planetPositions: Record<string, PlanetPosition>;
  houses: House[];
  aspects: Aspect[];
};

// Fonctions pour la persistance des données
const saveChartToLocalStorage = (chart: ChartData | null) => {
  try {
    if (!chart) {
      localStorage.removeItem('astroThemeChart');
      return;
    }

    localStorage.setItem('astroThemeChart', JSON.stringify({
      ...chart,
      birthDate: chart.birthDate.toISOString(),
    }));
  } catch (error) {
    console.error('Unable to persist chart locally:', error);
  }
};

const loadChartFromLocalStorage = (): ChartData | null => {
  try {
    const saved = localStorage.getItem('astroThemeChart');
    if (!saved) return null;

    const data = JSON.parse(saved) as Partial<ChartData> & { birthDate?: string };
    const birthDate = new Date(data.birthDate || '');
    if (
      !data.name
      || !data.birthPlace
      || !Number.isFinite(birthDate.getTime())
      || !Number.isFinite(data.latitude)
      || !Number.isFinite(data.longitude)
      || Number(data.latitude) < -90
      || Number(data.latitude) > 90
      || Number(data.longitude) < -180
      || Number(data.longitude) > 180
      || !data.planetPositions
      || typeof data.planetPositions !== 'object'
      || Array.isArray(data.planetPositions)
      || !Array.isArray(data.houses)
      || !Array.isArray(data.aspects)
    ) {
      localStorage.removeItem('astroThemeChart');
      return null;
    }

    const latitude = data.latitude as number;
    const longitude = data.longitude as number;
    const timeZone = data.timeZone || getTimeZoneFromCoordinates(latitude, longitude);
    return {
      id: data.id,
      name: data.name,
      birthDate,
      birthPlace: data.birthPlace,
      latitude,
      longitude,
      timeZone,
      timezoneOffset: data.timezoneOffset ?? getTimezoneOffsetHours(birthDate, timeZone),
      planetPositions: data.planetPositions,
      houses: data.houses,
      aspects: data.aspects,
    };
  } catch (error) {
    console.error('Error loading chart from localStorage:', error);
    return null;
  }
};

async function saveChartOnline(
  input: BirthInput,
  birthDate: Date,
  calculated: CalculatedChart,
  existingId?: string,
): Promise<string | undefined> {
  if (!isSupabaseConfigured) return existingId;

  const userId = await getOrCreateSupabaseUserId();
  const payload = {
    name: input.name,
    birth_date: birthDate.toISOString(),
    birth_place: input.place,
    latitude: input.latitude,
    longitude: input.longitude,
    timezone_offset: input.timezoneOffset,
    planet_positions: calculated.planetPositions,
    houses: calculated.houses,
    aspects: calculated.aspects,
    user_id: userId,
    session_id: null,
  };

  const query = existingId
    ? Supabase.from('birth_charts').update(payload).eq('id', existingId)
    : Supabase.from('birth_charts').insert(payload);
  const { data, error } = await query.select('id').single();
  if (error) throw error;
  return data.id as string;
}

async function calculateAndSaveChart(input: BirthInput, existingId?: string) {
  const timeZone = getTimeZoneFromCoordinates(input.latitude, input.longitude);
  const birthDate = parseBirthDateTime(input.date, input.time, timeZone);
  const normalizedInput: BirthInput = {
    ...input,
    timeZone,
    timezoneOffset: getTimezoneOffsetHours(birthDate, timeZone),
  };
  const { calculateBirthChart } = await import('./services/astrology');
  const calculated = calculateBirthChart({
    date: birthDate,
    latitude: input.latitude,
    longitude: input.longitude,
  });
  let onlineSaveFailed = false;
  let id = existingId;

  try {
    id = await saveChartOnline(normalizedInput, birthDate, calculated, existingId);
  } catch (error) {
    onlineSaveFailed = true;
    console.error('Online chart save failed:', error);
  }

  const chart: ChartData = {
    id,
    name: normalizedInput.name,
    birthDate,
    birthPlace: normalizedInput.place,
    latitude: input.latitude,
    longitude: input.longitude,
    timeZone: normalizedInput.timeZone,
    timezoneOffset: normalizedInput.timezoneOffset,
    planetPositions: calculated.planetPositions,
    houses: calculated.houses,
    aspects: calculated.aspects,
  };

  return { chart, onlineSaveFailed };
}

const ONBOARDING_STORAGE_KEY = 'nightstarOnboardingComplete';

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
  const isCompatibilityTestRoute =
    typeof window !== 'undefined' && window.location.hash === '#compatibility-test';

  const [showLanding, setShowLanding] = useState(true);
  const [showVoid, setShowVoid] = useState(false);
  const [showCoStar, setShowCoStar] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(() => loadChartFromLocalStorage());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Sauvegarder les données quand chartData change
  useEffect(() => {
    saveChartToLocalStorage(chartData);
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

  const handleOnboardingComplete = useCallback(async (data: BirthInput) => {
    setLoading(true);

    try {
      const { chart, onlineSaveFailed } = await calculateAndSaveChart(data);
      setChartData(chart);
      if (onlineSaveFailed) {
        alert('Votre thème reste disponible sur cet appareil, mais la sauvegarde en ligne a échoué.');
      }
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setShowLanding(true);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Une erreur est survenue lors de la création de votre thème.');
      setShowLanding(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditBirthData = useCallback(async (data: BirthInput) => {
    setLoading(true);

    try {
      const { chart, onlineSaveFailed } = await calculateAndSaveChart(data, chartData?.id);
      setChartData(chart);
      if (onlineSaveFailed) {
        alert('Les modifications sont enregistrées sur cet appareil, mais pas encore en ligne.');
      }
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
  }, [chartData?.id]);

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
      setActiveTab('void');
      return;
    }
    if (tab === 'costar') {
      if (!chartData) {
        setShowLanding(true);
        setActiveTab('home');
        alert('Veuillez d\'abord créer votre thème astral pour accéder à CoStar');
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
        alert('Veuillez d\'abord créer votre thème astral pour voir votre profil');
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
        alert('Veuillez d\'abord creer votre theme astral pour voir You 2');
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
        userName={chartData?.name}
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
        userName={chartData?.name || 'Gil'}
        birthDateLabel={chartData?.birthDate ? chartData.birthDate.toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: chartData.timeZone }) : undefined}
        birthPlaceLabel={chartData?.birthPlace || 'Paris, France'}
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

  if (isCompatibilityTestRoute) {
    return (
      <div className="app-shell app-shell--test">
        <div className="app-content app-content--test">
          <TestCompatibilityPage imageSrc={compatibilityArtwork} />
        </div>
        <BottomNavBar
          activeTab="test"
          onTabChange={(tab) => {
            window.location.hash = '';
            handleTabChange(tab);
          }}
        />
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
            chartData={chartData ?? undefined}
            userName={chartData?.name} 
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
      <div className="app-shell app-shell--test">
        <div className="app-content app-content--test">
          <TestCompatibilityPage imageSrc={compatibilityArtwork} />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (activeTab === 'y') {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
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
            birthTimeZone={chartData.timeZone}
            planetPositions={chartData.planetPositions}
            houses={chartData.houses}
            aspects={chartData.aspects}
            onEditBirthData={handleEditBirthData}
            editBirthDataLoading={loading}
          />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (activeTab === 'profile' && chartData) {
    return (
      <div className="app-shell app-shell--you">
        <div className="app-content app-content--you">
          <AstralProfile
            name={chartData.name}
            birthDate={chartData.birthDate}
            birthPlace={chartData.birthPlace}
            birthLatitude={chartData.latitude}
            birthLongitude={chartData.longitude}
            birthTimeZone={chartData.timeZone}
            planetPositions={chartData.planetPositions}
            houses={chartData.houses}
            aspects={chartData.aspects}
            fullscreenMode={true}
            onEditBirthData={handleEditBirthData}
            editBirthDataLoading={loading}
          />
        </div>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Fallback: no matching screen — never show the legacy AstroThème form to visitors.
  if (!chartData) {
    return (
      <PremiumOnboardingY
        onComplete={handleOnboardingComplete}
        onExit={() => {
          setShowLanding(true);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="app-shell app-shell--you">
      <div className="app-content app-content--you">
        <AstralProfile
          name={chartData.name}
          birthDate={chartData.birthDate}
          birthPlace={chartData.birthPlace}
          birthLatitude={chartData.latitude}
          birthLongitude={chartData.longitude}
          birthTimeZone={chartData.timeZone}
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
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default App;
