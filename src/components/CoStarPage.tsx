import { useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { generateCoStarAnalysis } from '../services/astrology';

interface AspectData {
  planet1: string;
  planet2: string;
  type: string;
  symbol: string;
  color: string;
  text: string;
}

interface CoStarPageProps {
  onBack: () => void;
  chartData?: any;
  userName?: string;
}

export default function CoStarPage({ onBack, chartData, userName = 'Ami(e) des étoiles' }: CoStarPageProps) {
  // Générer l'analyse si on a les données du chart
  const analysis = useMemo(() => {
    if (chartData) {
      return generateCoStarAnalysis(chartData, userName);
    }
    return null;
  }, [chartData, userName]);

  const selectedAdvice = analysis?.advice || 'Écoutez votre intuition aujourd\'hui';

  const todayMood = analysis?.mood || ['Curieux', 'Énergique', 'Mystérieux', 'Serein', 'Passionné'][Math.floor(Math.random() * 5)];

  const [openAspects, setOpenAspects] = useState<Set<number>>(new Set());

  const toggleAspect = (index: number) => {
    const next = new Set(openAspects);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setOpenAspects(next);
  };

  const getAspectDescription = (aspect: any) => {
    const planet1 = aspect.planet1;
    const planet2 = aspect.planet2;
    const type = aspect.type;
    const descriptions: Record<string, string> = {
      'Trigone': `${planet1} et ${planet2} forment un trigone harmonieux. Cette configuration apporte de la fluidité et du soutien mutuel entre ces deux énergies planétaires. C'est un aspect favorable qui facilite l'expression naturelle de ces planètes dans votre thème astral.`,
      'Sextile': `${planet1} et ${planet2} sont en sextile, créant une opportunité d'action positive. Cet aspect représente une tension créative qui peut être canalisée pour produire des résultats bénéfiques. C'est le moment idéal pour exploiter cette dynamique constructive.`,
      'Conjonction': `${planet1} et ${planet2} sont conjoints, fusionnant leurs énergies en une seule force puissante. Cette proximité planétaire intensifie l'influence de ces deux astres, créant une concentration d'énergie qui peut être à la fois stimulante et exigeante.`,
      'Carré': `${planet1} et ${planet2} forment un carré, créant une tension dynamique qui demande à être résolue. Cet aspect représente un défi qui, une fois surmonté, apporte croissance et transformation. C'est une opportunité d'évolution personnelle.`,
      'Opposition': `${planet1} et ${planet2} sont en opposition, créant un équilibre entre deux forces complémentaires. Cet aspect demande une intégration consciente des énergies opposées pour trouver l'harmonie. C'est un appel à la synthèse et à l'équilibre.`,
    };
    return descriptions[type] || `${planet1} et ${planet2} sont en ${type}.`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#2A2A33]/50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#1A1A22] rounded-full transition border border-[#2A2A33]/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-light tracking-wide bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">co star</h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
        {/* Your Vibe */}
        <section className="space-y-4">
          <p className="text-sm text-slate-400 uppercase tracking-widest">Votre énergie</p>
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-light leading-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">
              {todayMood}
            </h2>
          </div>
        </section>

        {/* Your Day at a Glance */}
        <section className="space-y-6 border-t border-[#2A2A33]/50 pt-12">
          <p className="text-sm text-slate-400 uppercase tracking-widest">Votre journée en un coup d'œil</p>
          <div className="space-y-4">
            {analysis?.dayAtGlance.split('\n\n').map((paragraph, index) => (
              <p key={index} className={`text-lg leading-relaxed ${paragraph.includes('message') ? 'font-semibold text-slate-200 pt-4' : 'text-slate-300'}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Daily Quote */}
        <section className="space-y-6 border-t border-[#2A2A33]/50 pt-12">
          <p className="text-sm text-slate-400 uppercase tracking-widest">Conseil du jour</p>
          <div className="relative rounded-2xl border border-[#2A2A33]/50 p-8 md:p-12 bg-[#1A1A22]/50 overflow-hidden group hover:shadow-[0_0_30px_rgba(166,176,195,0.12)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-200 mb-6">
                {selectedAdvice}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Message personnel de l'univers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Planetary Aspects */}
        <section className="space-y-6 border-t border-[#2A2A33]/50 pt-12">
          <p className="text-sm text-slate-400 uppercase tracking-widest">Aspects planétaires du jour</p>
          <div className="space-y-3">
            {(analysis?.favorableAspects || []).map((aspect, index) => {
              const isOpen = openAspects.has(index);
              return (
                <div key={index} className="rounded-lg border border-[#2A2A33]/50 bg-[#1A1A22]/30 transition-all duration-300 hover:bg-[#1A1A22]/50 hover:shadow-[0_0_20px_rgba(166,176,195,0.08)]">
                  <button
                    type="button"
                    onClick={() => toggleAspect(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${aspect.color} shadow-lg`}></div>
                      <div>
                        <p className="font-semibold text-slate-200 text-sm">{aspect.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        aspect.type === 'Trigone' || aspect.type === 'Sextile' ? 'text-green-400 bg-green-500/20 border border-green-500/30' :
                        aspect.type === 'Carré' || aspect.type === 'Opposition' ? 'text-red-400 bg-red-500/20 border border-red-500/30' :
                        'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                      }`}>
                        {aspect.type}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-[#2A2A33]/30">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {getAspectDescription(aspect)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-[#2A2A33]/50 pt-8 text-center text-xs text-slate-500">
          <p>Les interprétations astrologiques sont à titre informatif et divertissant.</p>
          <p className="mt-2 text-cyan-400/70">✨ Construis ta destinée, pas seulement découvre-la</p>
        </footer>
      </div>
    </div>
  );
}
