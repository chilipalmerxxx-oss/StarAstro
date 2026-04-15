import React from 'react';
import { Sun, Moon, MessageCircle } from 'lucide-react';
import { PlanetPosition, Aspect } from '../services/astrology';
import { getPlanetInSignInterpretation, PLANET_INFO } from '../data/interpretations';

interface InterpretationProps {
  name: string;
  planetPositions: Record<string, PlanetPosition>;
  aspects: Aspect[];
}

export default function Interpretation({ name, planetPositions, aspects }: InterpretationProps) {
  const sun = planetPositions.sun;
  const moon = planetPositions.moon;
  const mercury = planetPositions.mercury;

  const majorAspects = aspects
    .filter(a => ['Conjonction', 'Trigone', 'Carré', 'Opposition'].includes(a.type))
    .slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Interprétation pour {name}</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-400 p-2 rounded-lg">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Soleil en {sun.sign}</h3>
              <p className="text-xs text-slate-600">Votre cœur et votre ego, votre vitalité et votre créativité</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {getPlanetInSignInterpretation('sun', sun.sign)}
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Position : {sun.signDegree.toFixed(0)}° • Maison {sun.house}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-400 p-2 rounded-lg">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Lune en {moon.sign}</h3>
              <p className="text-xs text-slate-600">L'humeur intérieure qui exerce une profonde influence sur votre bien-être émotionnel</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {getPlanetInSignInterpretation('moon', moon.sign)}
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Position : {moon.signDegree.toFixed(0)}° • Maison {moon.house}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-400 p-2 rounded-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Mercure en {mercury.sign}</h3>
              <p className="text-xs text-slate-600">Votre pensée et la manière dont vous vous exprimez</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {getPlanetInSignInterpretation('mercury', mercury.sign)}
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Position : {mercury.signDegree.toFixed(0)}° • Maison {mercury.house}
          </p>
        </div>

      </div>
    </div>
  );
}
