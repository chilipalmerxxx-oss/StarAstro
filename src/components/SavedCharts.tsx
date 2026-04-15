import { useState, useEffect } from 'react';
import { History, X, Calendar, MapPin } from 'lucide-react';
import { Supabase } from '../lib/supabase';

interface SavedChart {
  id: string;
  name: string;
  birth_date: string;
  birth_place: string;
  created_at: string;
  planet_positions: any;
  houses: any;
  aspects: any;
}

interface SavedChartsProps {
  onLoadChart: (chart: any) => void;
  onClose: () => void;
}

export default function SavedCharts({ onLoadChart, onClose }: SavedChartsProps) {
  const [charts, setCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    setLoading(true);
    try {
      const { data, error } = await Supabase
        .from('birth_charts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error loading charts:', error);
      } else {
        setCharts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChart = (chart: SavedChart) => {
    onLoadChart({
      name: chart.name,
      birthDate: new Date(chart.birth_date),
      birthPlace: chart.birth_place,
      planetPositions: chart.planet_positions,
      houses: chart.houses,
      aspects: chart.aspects,
    });
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-800">Cartes sauvegardées</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : charts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Aucune carte sauvegardée</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charts.map((chart) => (
                <button
                  key={chart.id}
                  onClick={() => handleSelectChart(chart)}
                  className="bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {chart.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(chart.birth_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{chart.birth_place}</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    Créée le {formatDate(chart.created_at)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
