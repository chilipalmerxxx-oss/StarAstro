import React, { useEffect, useRef } from 'react';
import { Sparkles, Moon, Sun, Star, Compass, BookOpen, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenVoid: () => void;
  onOpenCoStar: () => void;
}

export default function LandingPage({ onGetStarted, onOpenVoid, onOpenCoStar }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.7;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#1C1333]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#2A0F1F]/18 rounded-full blur-[120px] animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#0F241C]/18 rounded-full blur-[120px] animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-12 z-10">
        <header className="text-center mb-12 md:mb-20 pt-8 md:pt-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 relative px-4">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
              AstroThème
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 blur-3xl"></div>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-blue-200 mb-6 md:mb-8 max-w-3xl mx-auto font-light px-4">
            Découvrez les secrets de votre destinée à travers les étoiles
          </p>

          <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Calculs astronomiques précis • Interprétations détaillées • Carte du ciel personnalisée
          </p>

          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-2 md:gap-3 bg-[#1C1333] text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-base md:text-xl font-bold hover:bg-[#2A0F1F] transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(166,176,195,0.22)]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span className="relative z-10">Créer mon thème astral</span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </button>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20 max-w-6xl mx-auto">
          <div
            onClick={onOpenVoid}
            className="group relative bg-[#1A1A22] rounded-3xl p-6 md:p-8 border border-[#2A2A33]/80 hover:border-[#A6B0C3]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(166,176,195,0.12)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_30px_rgba(251,146,60,0.4)] group-hover:shadow-[0_10px_40px_rgba(251,146,60,0.6)] transition-all duration-500">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-amber-300">The Void</h3>
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-amber-400/70 font-medium group-hover:text-amber-300 transition-colors">
                Entrer →
              </span>
            </div>
          </div>

          <div className="group relative bg-[#1A1A22] rounded-3xl p-6 md:p-8 border border-[#2A2A33]/80 hover:border-[#A6B0C3]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(166,176,195,0.12)]">
            <div className="absolute inset-0 bg-[#0A0A0F] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="bg-[#0F241C] w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_30px_rgba(15,36,28,0.4)] group-hover:shadow-[0_10px_40px_rgba(15,36,28,0.6)] transition-all duration-500">
                <Moon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-200">Carte du Ciel</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Visualisez votre thème natal avec une représentation interactive des 12 maisons et des positions planétaires.
              </p>
            </div>
          </div>

          <div className="group relative bg-[#1A1A22] rounded-3xl p-6 md:p-8 border border-[#2A2A33]/80 hover:border-[#A6B0C3]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(166,176,195,0.12)]">
            <div className="absolute inset-0 bg-[#0A0A0F] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="bg-[#1C1333] w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_30px_rgba(28,19,51,0.4)] group-hover:shadow-[0_10px_40px_rgba(28,19,51,0.6)] transition-all duration-500">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-200">Interprétations</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Analyses personnalisées de vos positions planétaires et aspects majeurs pour mieux vous comprendre.
              </p>
            </div>
          </div>

          <div
            onClick={onOpenCoStar}
            className="group relative bg-[#1A1A22] rounded-3xl p-6 md:p-8 border border-[#2A2A33]/80 hover:border-[#A6B0C3]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(166,176,195,0.12)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_30px_rgba(244,63,94,0.4)] group-hover:shadow-[0_10px_40px_rgba(244,63,94,0.6)] transition-all duration-500">
                <Sun className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-pink-300">Co Star</h3>
              <p className="text-xs md:text-sm text-pink-400/70 leading-relaxed">
                Découvrez votre énergie du jour
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="relative bg-[#1A1A22] rounded-3xl p-6 md:p-12 border border-[#2A2A33]/80 shadow-[0_0_40px_rgba(166,176,195,0.12)]">
            <div className="absolute inset-0 bg-[#0A0A0F] opacity-70 rounded-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Votre Thème Astral Complet
              </h2>
              <div className="space-y-4 md:space-y-6 text-slate-200">
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-2.5 md:p-3 mt-1 shadow-[0_5px_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_5px_30px_rgba(6,182,212,0.5)] transition-all duration-300 flex-shrink-0">
                    <Compass className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg md:text-xl text-white mb-1 md:mb-2">10 Corps Célestes</h4>
                    <p className="text-sm md:text-base text-slate-400">Soleil, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune et Pluton</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 md:p-3 mt-1 shadow-[0_5px_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_5px_30px_rgba(59,130,246,0.5)] transition-all duration-300 flex-shrink-0">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg md:text-xl text-white mb-1 md:mb-2">12 Maisons Astrologiques</h4>
                    <p className="text-sm md:text-base text-slate-400">Système de maisons calculé selon votre lieu et heure de naissance exacte</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2.5 md:p-3 mt-1 shadow-[0_5px_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_5px_30px_rgba(168,85,247,0.5)] transition-all duration-300 flex-shrink-0">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg md:text-xl text-white mb-1 md:mb-2">Aspects Planétaires</h4>
                    <p className="text-sm md:text-base text-slate-400">Conjonctions, sextiles, carrés, trigones et oppositions pour comprendre les dynamiques énergétiques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <p className="text-slate-500 mb-4 md:mb-6 text-base md:text-lg px-4">Prêt à explorer votre carte du ciel ?</p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 md:gap-3 bg-[#1C1333]/90 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-[#2A0F1F]/90 transition-all duration-300 border border-[#2A2A33]/70 hover:border-[#A6B0C3]/40 hover:shadow-[0_0_30px_rgba(166,176,195,0.2)]"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
            Commencer maintenant
          </button>
        </div>

        <footer className="text-center text-slate-500 text-xs md:text-sm border-t border-[#2A2A33] pt-6 md:pt-8 px-4">
          <p>Calculs basés sur des données astronomiques réelles</p>
          <p className="mt-2">Une fusion entre science et tradition millénaire</p>
        </footer>
      </div>

      <div className="absolute top-20 left-10 animate-pulse">
        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
      </div>
      <div className="absolute top-40 right-20 animate-pulse delay-100">
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-pulse delay-200">
        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"></div>
      </div>
      <div className="absolute bottom-20 right-40 animate-pulse delay-300">
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]"></div>
      </div>
      <div className="absolute top-1/3 right-1/3 animate-pulse delay-500">
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-700">
        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]"></div>
      </div>
    </div>
  );
}
