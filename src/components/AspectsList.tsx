import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Aspect } from "../services/astrology";
import { PLANET_INFO, getAspectInterpretation } from "../data/interpretations";

interface AspectsListProps {
  aspects: Aspect[];
}

const PLANET_SYMBOLS: Record<string, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
};

const ASPECT_SYMBOLS: Record<string, string> = {
  Conjonction: "☌",
  Opposition: "☍",
  Trigone: "△",
  Carré: "□",
  Sextile: "⚹",
};

export default function AspectsList({ aspects }: AspectsListProps) {
  const [expandedAspect, setExpandedAspect] = useState<number | null>(null);

  const majorAspects = aspects
    .filter((a) =>
      ["Conjonction", "Trigone", "Carré", "Opposition"].includes(a.type),
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full space-y-8">
      {majorAspects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Aspects Majeurs
          </h2>
          <div className="space-y-2">
            {majorAspects.map((aspect, index) => {
              const planet1Name =
                PLANET_INFO[aspect.planet1]?.name || aspect.planet1;
              const planet2Name =
                PLANET_INFO[aspect.planet2]?.name || aspect.planet2;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-slate-200 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {PLANET_SYMBOLS[aspect.planet1]}
                    </span>
                    <span className="font-medium text-slate-800">
                      {planet1Name}
                    </span>
                    <span className="text-slate-500">{aspect.type}</span>
                    <span className="text-lg">
                      {PLANET_SYMBOLS[aspect.planet2]}
                    </span>
                    <span className="font-medium text-slate-800">
                      {planet2Name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {aspect.orb.toFixed(1)}° d'orbe
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 italic">
              Ces aspects ont besoin de plus de temps pour se stabiliser. Ce
              sont principalement l'effet des planètes lentes sur les planètes
              plus rapides dans votre thème.
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Aspects Planétaires
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Les aspects, ou connexions, sont les liens qui relient les planètes
          dans votre carte natale. Ils décrivent des accords harmonieux entre
          les différentes énergies planétaires dans votre carte natale ou
          identifient les formes de conflit qui nécessitent des compromis et un
          travail personnel pour être surmontés.
        </p>

        <div className="space-y-2">
          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <h3 className="font-semibold text-slate-800 mb-2">
              Aspects Majeurs (Standard)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ASPECT_SYMBOLS["Conjonction"]}</span>
                <span className="text-slate-800">Soleil</span>
                <span className="text-lg">{ASPECT_SYMBOLS["Conjonction"]}</span>
                <span className="text-slate-800">Neptune</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{ASPECT_SYMBOLS["Sextile"]}</span>
                <span className="text-slate-800">Soleil</span>
                <span className="text-lg">{ASPECT_SYMBOLS["Sextile"]}</span>
                <span className="text-slate-800">Vénus</span>
              </div>
            </div>
          </div>

          {aspects.slice(0, 15).map((aspect, index) => {
            const isExpanded = expandedAspect === index;
            const planet1Name =
              PLANET_INFO[aspect.planet1]?.name || aspect.planet1;
            const planet2Name =
              PLANET_INFO[aspect.planet2]?.name || aspect.planet2;

            return (
              <div
                key={index}
                className="border border-slate-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedAspect(isExpanded ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {PLANET_SYMBOLS[aspect.planet1]}
                    </span>
                    <span className="font-medium text-slate-800">
                      {planet1Name}
                    </span>
                    <span className="text-slate-500">{aspect.type}</span>
                    <span className="text-lg">
                      {PLANET_SYMBOLS[aspect.planet2]}
                    </span>
                    <span className="font-medium text-slate-800">
                      {planet2Name}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      (orbe {aspect.orb.toFixed(1)}°)
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-200 bg-slate-50">
                    <div className="pt-4 space-y-3">
                      {getAspectInterpretation(
                        aspect.planet1,
                        aspect.planet2,
                        aspect.type,
                      ).split('\n\n').filter(Boolean).map((paragraph, i) => (
                        <p key={i} className="text-sm text-slate-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-slate-500 mt-4 text-center italic">
          Veuillez noter que certaines interprétations d'ici Zet Astrologie dans
          cette partie peuvent ne pas apparaître si l'aspect n'était pas assez
          pertinent.
        </p>
      </div>

      {aspects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">
            Aucun aspect majeur détecté dans ce thème natal.
          </p>
        </div>
      )}
    </div>
  );
}
