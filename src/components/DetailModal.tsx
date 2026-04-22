import React from 'react';
import { X } from 'lucide-react';
import { PlanetPosition } from '../services/astrology';
import { PLANET_INFO, SIGN_DETAILED, HOUSE_MEANINGS, getPlanetInSignInterpretation } from '../data/interpretations';

interface DetailModalProps {
  onClose: () => void;
  planetKey: string;
  position: PlanetPosition;
  onNavigateToProfile?: (planetKey: string) => void;
}

export default function DetailModal({ onClose, planetKey, position, onNavigateToProfile }: DetailModalProps) {

  const planetInfo = PLANET_INFO[planetKey];
  const signInfo = SIGN_DETAILED[position.sign];
  const houseInfo = HOUSE_MEANINGS[position.house];
  const interpretation = getPlanetInSignInterpretation(planetKey, position.sign);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">{planetInfo.name}</h2>
            <p className="text-cyan-100 mt-1">en {position.sign} • Maison {position.house}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-slate-800 mb-3">À propos de {planetInfo.name}</h3>
            <p className="text-slate-700 leading-relaxed mb-3">{planetInfo.description}</p>
            <div className="text-sm text-slate-600 italic">{planetInfo.keywords}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{planetInfo.name} en {position.sign}</h3>
            <p className="text-slate-700 leading-relaxed mb-4">{interpretation}</p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-semibold text-slate-700">Élément</div>
                <div className="text-slate-600">{signInfo.element}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-semibold text-slate-700">Qualité</div>
                <div className="text-slate-600">{signInfo.quality}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="font-semibold text-slate-700">Maître</div>
                <div className="text-slate-600">{signInfo.ruler}</div>
              </div>
            </div>
            <p className="text-slate-600 mt-4 text-sm leading-relaxed">{signInfo.description}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Maison {position.house} - {houseInfo.name}</h3>
            <div className="text-sm font-semibold text-purple-700 mb-2">{houseInfo.theme}</div>
            <p className="text-slate-700 leading-relaxed">{houseInfo.description}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Position exacte</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Longitude:</span>
                <span className="ml-2 font-semibold text-slate-800">{position.longitude.toFixed(2)}°</span>
              </div>
              <div>
                <span className="text-slate-600">Position dans le signe:</span>
                <span className="ml-2 font-semibold text-slate-800">{position.signDegree.toFixed(2)}°</span>
              </div>
              <div>
                <span className="text-slate-600">Latitude écliptique:</span>
                <span className="ml-2 font-semibold text-slate-800">{position.latitude.toFixed(2)}°</span>
              </div>
              <div>
                <span className="text-slate-600">Maison:</span>
                <span className="ml-2 font-semibold text-slate-800">{position.house}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600 text-center italic">
              Cette interprétation combine la symbolique de {planetInfo.name}, du signe {position.sign} et de la maison {position.house} pour révéler une facette unique de ta personnalité.
            </p>
          </div>

          {onNavigateToProfile && (
            <button
              onClick={() => {
                onNavigateToProfile(planetKey);
                onClose();
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
            >
              📖 Voir dans ma carte céleste
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
