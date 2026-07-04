import { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BirthDataForm from './components/BirthDataForm';
import NatalChart from './components/NatalChart';
import SavedCharts from './components/SavedCharts';
import TheVoid from './components/TheVoid';
import AstralProfile from './components/AstralProfile';
import You2Page from './components/You2Page';
import FriendsPage from './components/FriendsPage';
import CoStarPage from './components/CoStarPage';
import CoStarPagePreview from './components/CoStarPagePreview';
import CoStarHeroPreview from './components/CoStarHeroPreview';
import CoStarBackgroundExamplesPage from './components/CoStarBackgroundExamplesPage';
import YouPageWheelPreview from './components/YouPageWheelPreview';
import LandingOrnamentPreview from './components/LandingOrnamentPreview';
import LandingTitlePreview from './components/LandingTitlePreview';
import HomeDashboard from './components/HomeDashboard';
import LovePage from './components/LovePage';
import XPage from './components/XPage';
import TestCompatibilityPage from './components/TestCompatibilityPage';
import compatibilityArtwork from './assets/compatibilite-premium-astrologie.png';
import BottomNavBar, { type TabId } from './components/BottomNavBar';
import type { OnboardingBirthData } from './components/Onboarding';
import PremiumOnboardingY from './components/PremiumOnboardingY';
import { calculateBirthChart } from './services/astrology';
import { Supabase } from './lib/supabase';
import { getSessionId } from './lib/session';

interface ChartData {
  name: string;
  birthDate: Date;
  birthPlace: string;
  latitude?: number;
  longitude?: number;
  timezoneOffset?: number;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects: any[];
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

  const savedChart = loadChartFromLocalStorage();
  const [showLanding, setShowLanding] = useState(!savedChart);
  const [showVoid, setShowVoid] = useState(false);
  const [showCoStar, setShowCoStar] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(savedChart);
  const [loading, setLoading] = useState(false);
  const [showSavedCharts, setShowSavedCharts] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedPlanetForProfile, setSelectedPlanetForProfile] = useState<string | null>(null);

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

  const handleSubmit = async (data: {
    name: string;
    date: string;
    time: string;
    place: string;
    latitude: number;
    longitude: number;
    timezoneOffset: number;
  }) => {
    setLoading(true);

    try {
      const birthDateTime = new Date(`${data.date}T${data.time}`);

      const chart = calculateBirthChart({
        date: birthDateTime,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      const { data: { user } } = await Supabase.auth.getUser();

      const { error } = await Supabase.from('birth_charts').insert({
        name: data.name,
        birth_date: birthDateTime.toISOString(),
        birth_place: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone_offset: data.timezoneOffset,
        planet_positions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
      });

      if (error) {
        console.error('Error saving to database:', error);
      }

      setChartData({
        name: data.name,
        birthDate: birthDateTime,
        birthPlace: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezoneOffset: data.timezoneOffset,
        planetPositions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
      });
      setShowLanding(false);
      setShowVoid(false);
      setShowCoStar(false);
      setActiveTab('profile');
    } catch (error) {
      console.error('Error calculating chart:', error);
      alert('Une erreur est survenue lors du calcul du thème astral.');
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = useCallback(async (data: OnboardingBirthData) => {
    setLoading(true);

    try {
      const birthDateTime = new Date(`${data.date}T${data.time}`);
      const chart = calculateBirthChart({
        date: birthDateTime,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      const { data: { user } } = await Supabase.auth.getUser();

      const { error } = await Supabase.from('birth_charts').insert({
        name: data.name,
        birth_date: birthDateTime.toISOString(),
        birth_place: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone_offset: data.timezoneOffset,
        planet_positions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
      });

      if (error) {
        console.error('Error saving onboarding chart to database:', error);
      }

      setChartData({
        name: data.name,
        birthDate: birthDateTime,
        birthPlace: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezoneOffset: data.timezoneOffset,
        planetPositions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
      });
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setShowLanding(false);
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
      const birthDateTime = new Date(`${data.date}T${data.time}`);
      const chart = calculateBirthChart({
        date: birthDateTime,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      const { data: { user } } = await Supabase.auth.getUser();

      const { error } = await Supabase.from('birth_charts').insert({
        name: data.name,
        birth_date: birthDateTime.toISOString(),
        birth_place: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone_offset: data.timezoneOffset,
        planet_positions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
      });

      if (error) {
        console.error('Error saving edited chart to database:', error);
      }

      setChartData({
        name: data.name,
        birthDate: birthDateTime,
        birthPlace: data.place,
        latitude: data.latitude,
        longitude: data.longitude,
        timezoneOffset: data.timezoneOffset,
        planetPositions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
      });
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

  const handleReset = () => {
    setChartData(null);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowVoid(false);
    setShowCoStar(false);
    setActiveTab('home');
  };

  const handleBackToHome = () => {
    setShowLanding(true);
    setChartData(null);
  };

  const handleLoadChart = (chart: ChartData) => {
    setChartData(chart);
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

  const handlePlanetClick = (planetKey: string) => {
    if (!chartData) return;
    setSelectedPlanetForProfile(planetKey);
    setShowLanding(false);
    setShowVoid(false);
    setShowCoStar(false);
    setActiveTab('profile');
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
            chartData={chartData} 
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
        <div className="app-shell app-shell--home-dashboard">
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
      <div className="app-shell app-shell--you">
        <div className="app-content app-content--you">
          <AstralProfile
            name={chartData.name}
            birthDate={chartData.birthDate}
            birthPlace={chartData.birthPlace}
            birthLatitude={chartData.latitude}
            birthLongitude={chartData.longitude}
            birthTimezoneOffset={chartData.timezoneOffset}
            planetPositions={chartData.planetPositions}
            houses={chartData.houses}
            aspects={chartData.aspects}
            initialActivePlanet={selectedPlanetForProfile as any}
            fullscreenMode={true}
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

  return (
    <div className="app-shell">
      <div className="app-content">
      <div className={chartData ? "natal-chart-screen" : "container mx-auto px-4 py-12"}>
        <div className={chartData ? "natal-chart-screen__header" : "text-center mb-12"}>
          <div className="flex items-center justify-between mb-6">
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-cyan-600" />
            <h1 className="text-5xl font-bold text-white">AstroThème</h1>
          </div>
          <p className="text-lg text-slate-300">
            Découvrez votre thème astral basé sur des calculs astronomiques précis
          </p>
        </div>

        <div className={chartData ? "natal-chart-screen__body" : "flex flex-col items-center gap-8"}>
          {!chartData ? (
            <BirthDataForm onSubmit={handleSubmit} loading={loading} />
          ) : (
            <>
              <NatalChart
                name={chartData.name}
                birthDate={chartData.birthDate}
                birthPlace={chartData.birthPlace}
                planetPositions={chartData.planetPositions}
                houses={chartData.houses}
                aspects={chartData.aspects}
              />

            </>
          )}
        </div>

        <footer className="text-center mt-16 text-sm text-slate-400">
          <p>Calculs astronomiques réalisés avec astronomy-engine</p>
          <p className="mt-1">Les positions planétaires sont calculées avec précision scientifique</p>
        </footer>
      </div>

      {showSavedCharts && (
        <SavedCharts
          onLoadChart={handleLoadChart}
          onClose={() => setShowSavedCharts(false)}
        />
      )}
      </div>
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
