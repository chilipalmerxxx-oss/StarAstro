import { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, History, User } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BirthDataForm from './components/BirthDataForm';
import NatalChart from './components/NatalChart';
import Interpretation from './components/Interpretation';
import AspectsList from './components/AspectsList';
import SavedCharts from './components/SavedCharts';
import TheVoid from './components/TheVoid';
import AstralProfile from './components/AstralProfile';
import FriendsPage from './components/FriendsPage';
import CoStarPage from './components/CoStarPage';
import BottomNavBar, { type TabId } from './components/BottomNavBar';
import { calculateBirthChart } from './services/astrology';
import { Supabase } from './lib/supabase';
import { getSessionId } from './lib/session';

interface ChartData {
  name: string;
  birthDate: Date;
  birthPlace: string;
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

function App() {
  const savedChart = loadChartFromLocalStorage();
  const [showLanding, setShowLanding] = useState(!savedChart);
  const [showVoid, setShowVoid] = useState(false);
  const [showCoStar, setShowCoStar] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(savedChart);
  const [loading, setLoading] = useState(false);
  const [showSavedCharts, setShowSavedCharts] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Sauvegarder les données quand chartData change
  useEffect(() => {
    saveChartToLocalStorage(chartData);
  }, [chartData]);

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
        planetPositions: chart.planetPositions,
        houses: chart.houses,
        aspects: chart.aspects,
      });
    } catch (error) {
      console.error('Error calculating chart:', error);
      alert('Une erreur est survenue lors du calcul du thème astral.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChartData(null);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
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
      setActiveTab('profile');
      return;
    }
    if (tab === 'home') {
      setShowVoid(false);
      setShowCoStar(false);
      setShowLanding(true);
      setActiveTab('home');
      return;
    }
    setShowLanding(false);
    setShowVoid(false);
    setActiveTab(tab);
  };

  if (showCoStar) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pb-20">
        <CoStarPage 
          onBack={() => {
            setShowCoStar(false);
            setActiveTab('home');
          }} 
          chartData={chartData} 
          userName={chartData?.name} 
        />
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (showVoid) {
    return <TheVoid onBack={() => { setShowVoid(false); setActiveTab('home'); }} />;
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pb-20">
        <LandingPage
          onGetStarted={handleGetStarted}
          onOpenVoid={() => setShowVoid(true)}
          onOpenCoStar={() => setShowCoStar(true)}
        />
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // ── Friends tab ──
  if (activeTab === 'friends') {
    return (
      <div className="min-h-screen bg-[#0A0A0F]">
        <FriendsPage onBack={() => setActiveTab('home')} />
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // ── Profile / Astral tab ──
  if (activeTab === 'profile' && chartData) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pb-20">
        <AstralProfile
          name={chartData.name}
          birthDate={chartData.birthDate}
          birthPlace={chartData.birthPlace}
          planetPositions={chartData.planetPositions}
          houses={chartData.houses}
          aspects={chartData.aspects}
          onOpenFriends={() => setActiveTab('friends')}
        />
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour à l'accueil
            </button>
            <button
              onClick={() => setShowSavedCharts(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition shadow-md"
            >
              <History className="w-5 h-5" />
              Historique
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-cyan-600" />
            <h1 className="text-5xl font-bold text-white">AstroThème</h1>
          </div>
          <p className="text-lg text-slate-300">
            Découvrez votre thème astral basé sur des calculs astronomiques précis
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {!chartData ? (
            <BirthDataForm onSubmit={handleSubmit} loading={loading} />
          ) : (
            <>
              <div className="flex gap-3 relative z-50">
                <button
                  onClick={handleReset}
                  className="bg-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition"
                >
                  Nouveau thème
                </button>
                <button
                  onClick={() => setShowCoStar(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition shadow-md"
                >
                  <Sparkles className="w-5 h-5" />
                  Co Star
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition shadow-md"
                >
                  <User className="w-5 h-5" />
                  Interprétations
                </button>
              </div>

              <NatalChart
                name={chartData.name}
                birthDate={chartData.birthDate}
                birthPlace={chartData.birthPlace}
                planetPositions={chartData.planetPositions}
                houses={chartData.houses}
                aspects={chartData.aspects}
              />

              <Interpretation
                name={chartData.name}
                planetPositions={chartData.planetPositions}
                aspects={chartData.aspects}
              />

              <AspectsList aspects={chartData.aspects} />
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

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
