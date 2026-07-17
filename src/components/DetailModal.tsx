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

type PlanetVisual = {
  surface: string;
  glow: string;
  accent: string;
  ring?: boolean;
  ringTint?: string;
};

const PLANET_SHORT_DESCRIPTIONS: Record<string, string> = {
  sun: "Le centre de gravité de ton thème: vitalité, volonté, rayonnement et direction profonde.",
  moon: "Ta météo intérieure: instinct, besoins affectifs, mémoire et façon de chercher la sécurité.",
  mercury: "Ton interface mentale: pensée, langage, curiosité et manière de capter les signaux.",
  venus: "Ton magnétisme relationnel: amour, plaisir, goût, valeurs et façon d'attirer.",
  mars: "Ton moteur d'action: désir, courage, impulsion, colère et capacité à foncer.",
  jupiter: "Ton champ d'expansion: confiance, chance, vision, foi et appétit de grandir.",
  saturn: "Ton architecture intime: limites, temps, discipline, responsabilité et solidité.",
  uranus: "Ton courant électrique: liberté, rupture, invention et refus des cadres trop étroits.",
  neptune: "Ton océan subtil: rêve, intuition, inspiration, idéal et connexion à l'invisible.",
  pluto: "Ton réacteur profond: transformation, pouvoir, intensité et renaissance intérieure.",
  ascendant: "Ton signal d'entrée: première impression, posture, présence et façon d'aborder le monde.",
};

const PLANET_KEYWORDS: Record<string, string[]> = {
  sun: ["Identité", "Vitalité", "Volonté"],
  moon: ["Émotion", "Intuition", "Sécurité"],
  mercury: ["Mental", "Langage", "Curiosite"],
  venus: ["Amour", "Valeurs", "Désir"],
  mars: ["Action", "Courage", "Feu"],
  jupiter: ["Expansion", "Chance", "Sens"],
  saturn: ["Structure", "Temps", "Maîtrise"],
  uranus: ["Liberté", "Innovation", "Réveil"],
  neptune: ["Rêve", "Mystère", "Inspiration"],
  pluto: ["Pouvoir", "Mutation", "Profondeur"],
  ascendant: ["Présence", "Style", "Départ"],
};

const PLANET_VISUALS: Record<string, PlanetVisual> = {
  sun: {
    accent: "#FFC35A",
    glow: "rgba(255, 151, 43, 0.72)",
    surface:
      "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.95) 0 5%, transparent 14%), radial-gradient(circle at 62% 58%, rgba(255,92,29,0.95) 0 14%, transparent 30%), radial-gradient(circle at 48% 45%, #FFE9A6 0 18%, #FFB646 39%, #FF6B2A 66%, #6F180E 100%)",
  },
  moon: {
    accent: "#DDE7F5",
    glow: "rgba(204, 220, 240, 0.42)",
    surface:
      "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.88) 0 6%, transparent 16%), radial-gradient(circle at 62% 34%, rgba(72,82,96,0.72) 0 8%, transparent 13%), radial-gradient(circle at 42% 68%, rgba(55,61,72,0.68) 0 7%, transparent 12%), radial-gradient(circle at 58% 54%, #D6DADE 0 12%, #9EA7B3 43%, #525B67 72%, #1E242C 100%)",
  },
  mercury: {
    accent: "#D0B995",
    glow: "rgba(198, 172, 132, 0.48)",
    surface:
      "radial-gradient(circle at 30% 25%, rgba(255,242,214,0.72) 0 5%, transparent 14%), radial-gradient(circle at 64% 44%, rgba(61,47,38,0.62) 0 8%, transparent 13%), radial-gradient(circle at 35% 68%, rgba(83,65,49,0.62) 0 6%, transparent 12%), radial-gradient(circle at 50% 45%, #C9AD82 0 15%, #83684F 48%, #3A302B 100%)",
  },
  venus: {
    accent: "#F4DAB2",
    glow: "rgba(255, 207, 148, 0.5)",
    surface:
      "radial-gradient(circle at 34% 26%, rgba(255,255,255,0.72) 0 7%, transparent 17%), repeating-linear-gradient(-18deg, rgba(255,238,199,0.95) 0 9px, rgba(214,159,99,0.9) 10px 18px, rgba(255,216,154,0.9) 19px 29px), radial-gradient(circle at 54% 48%, #F7D8A6 0 22%, #D39355 58%, #6A3C24 100%)",
  },
  mars: {
    accent: "#F1774D",
    glow: "rgba(255, 93, 51, 0.5)",
    surface:
      "radial-gradient(circle at 32% 24%, rgba(255,219,172,0.78) 0 5%, transparent 15%), radial-gradient(circle at 68% 52%, rgba(82,31,20,0.72) 0 10%, transparent 17%), radial-gradient(circle at 38% 68%, rgba(255,154,92,0.45) 0 9%, transparent 18%), linear-gradient(145deg, #D96D3E 0%, #9F3D28 45%, #4A201C 100%)",
  },
  jupiter: {
    accent: "#F1C27A",
    glow: "rgba(255, 194, 122, 0.5)",
    surface:
      "radial-gradient(ellipse at 70% 58%, rgba(159,67,45,0.96) 0 6%, rgba(235,160,99,0.74) 7% 10%, transparent 17%), radial-gradient(circle at 34% 24%, rgba(255,255,255,0.58) 0 5%, transparent 14%), repeating-linear-gradient(0deg, #8B522E 0 10px, #E7B070 11px 20px, #F6D6A7 21px 31px, #B87545 32px 42px)",
  },
  saturn: {
    accent: "#E8C98A",
    glow: "rgba(255, 213, 142, 0.48)",
    ring: true,
    ringTint: "rgba(246, 218, 166, 0.76)",
    surface:
      "radial-gradient(circle at 32% 25%, rgba(255,255,255,0.62) 0 6%, transparent 16%), repeating-linear-gradient(0deg, #8F7047 0 9px, #DDBF7E 10px 19px, #F3DDA7 20px 31px, #B99155 32px 40px)",
  },
  uranus: {
    accent: "#9FEAF3",
    glow: "rgba(107, 221, 238, 0.45)",
    ring: true,
    ringTint: "rgba(160, 239, 245, 0.5)",
    surface:
      "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.82) 0 6%, transparent 17%), radial-gradient(circle at 55% 52%, #B7F2F5 0 18%, #5FCBDA 58%, #1B5B75 100%)",
  },
  neptune: {
    accent: "#6AA8FF",
    glow: "rgba(72, 124, 255, 0.56)",
    surface:
      "radial-gradient(circle at 34% 24%, rgba(255,255,255,0.72) 0 5%, transparent 15%), radial-gradient(ellipse at 62% 58%, rgba(25,52,165,0.72) 0 11%, transparent 22%), linear-gradient(145deg, #4CA7FF 0%, #1F5BDB 42%, #0B1B6A 100%)",
  },
  pluto: {
    accent: "#C9A4FF",
    glow: "rgba(183, 119, 255, 0.42)",
    surface:
      "radial-gradient(circle at 33% 25%, rgba(255,255,255,0.7) 0 5%, transparent 14%), radial-gradient(circle at 58% 46%, rgba(208,173,135,0.82) 0 12%, transparent 24%), linear-gradient(145deg, #BFA58F 0%, #6B4A4A 46%, #24182B 100%)",
  },
  ascendant: {
    accent: "#B8D8FF",
    glow: "rgba(120, 172, 255, 0.45)",
    ring: true,
    ringTint: "rgba(184, 216, 255, 0.58)",
    surface:
      "radial-gradient(circle at 34% 24%, rgba(255,255,255,0.82) 0 6%, transparent 16%), radial-gradient(circle at 56% 56%, rgba(128,88,255,0.68) 0 16%, transparent 34%), linear-gradient(145deg, #23314D 0%, #121827 44%, #040812 100%)",
  },
};

const FALLBACK_PLANET = {
  name: "Point céleste",
  description: "Un point sensible de ton thème natal.",
  keywords: "Thème natal",
};

const DEFAULT_SIGN = {
  element: "-",
  quality: "-",
  ruler: "-",
  description: "",
};

const DEFAULT_HOUSE = {
  name: "Maison astrologique",
  theme: "Zone de vie",
  description: "",
};

function PlanetImage3D({ planetKey, name }: { planetKey: string; name: string }) {
  const visual = PLANET_VISUALS[planetKey] ?? PLANET_VISUALS.ascendant;
  const ringStyle: React.CSSProperties = {
    borderColor: visual.ringTint ?? "rgba(255, 231, 184, 0.62)",
    boxShadow: `0 0 18px ${visual.glow}, inset 0 0 12px rgba(255,255,255,0.1)`,
  };

  return (
    <div
      role="img"
      aria-label={`Image 3D de ${name}`}
      className="pointer-events-none absolute right-4 top-14 h-28 w-28 sm:right-8 sm:top-7 sm:h-40 sm:w-40"
    >
      <div
        className="absolute inset-[-24%] rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${visual.glow} 0%, transparent 62%)` }}
      />
      {visual.ring && (
        <>
          <div
            className="absolute left-1/2 top-1/2 z-0 h-[34%] w-[152%] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border"
            style={ringStyle}
          />
          <div
            className="absolute left-1/2 top-1/2 z-20 h-[18%] w-[104%] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border-t"
            style={{ borderColor: "rgba(5, 8, 17, 0.78)" }}
          />
        </>
      )}
      <div
        className="absolute inset-[10%] z-10 overflow-hidden rounded-full border border-white/20"
        style={{
          background: visual.surface,
          boxShadow: `inset -24px -24px 34px rgba(0,0,0,0.72), inset 14px 10px 18px rgba(255,255,255,0.18), 0 0 34px ${visual.glow}, 0 26px 44px rgba(0,0,0,0.55)`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.42),transparent_22%),radial-gradient(circle_at_74%_74%,rgba(0,0,0,0.82),transparent_48%)]" />
        <div className="absolute inset-0 rounded-full opacity-35 mix-blend-soft-light bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.45)_0_1px,transparent_2px),radial-gradient(circle_at_64%_58%,rgba(255,255,255,0.28)_0_1px,transparent_2px)]" />
      </div>
    </div>
  );
}

export default function DetailModal({ onClose, planetKey, position, onNavigateToProfile }: DetailModalProps) {
  const planetInfo = PLANET_INFO[planetKey] ?? FALLBACK_PLANET;
  const signInfo = SIGN_DETAILED[position.sign] ?? DEFAULT_SIGN;
  const houseInfo = HOUSE_MEANINGS[position.house] ?? DEFAULT_HOUSE;
  const interpretation = getPlanetInSignInterpretation(planetKey, position.sign);
  const visual = PLANET_VISUALS[planetKey] ?? PLANET_VISUALS.ascendant;
  const shortDescription = PLANET_SHORT_DESCRIPTIONS[planetKey] ?? planetInfo.description;
  const keywords = PLANET_KEYWORDS[planetKey] ?? [planetInfo.keywords];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-xl sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[#050812] text-white shadow-[0_30px_110px_rgba(0,0,0,0.76)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(77,182,255,0.22),transparent_34%),radial-gradient(circle_at_8%_0%,rgba(255,197,105,0.14),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] bg-[size:42px_42px]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <PlanetImage3D planetKey={planetKey} name={planetInfo.name} />

        <div className="relative max-h-[90vh] overflow-y-auto">
          <header className="relative min-h-[250px] px-5 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
            <div
              className="mb-5 inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
              style={{
                borderColor: `${visual.accent}55`,
                color: visual.accent,
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              Analyse orbitale
            </div>

            <div className="pr-28 sm:pr-48">
              <h2 className="text-4xl font-semibold tracking-[0.02em] text-white sm:text-5xl">
                {planetInfo.name}
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-100/70">
                {position.sign} · Maison {position.house}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {shortDescription}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pr-20 sm:pr-0">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </header>

          <div className="relative grid gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
            <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                  Signature
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-200/40 to-transparent" />
              </div>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                {interpretation}
              </p>
            </section>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Élément
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{signInfo.element}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Qualité
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{signInfo.quality}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Maître
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{signInfo.ruler}</div>
              </div>
            </div>

            <section className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <h3 className="text-lg font-semibold text-white">
                  {planetInfo.name} en {position.sign}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {signInfo.description}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <h3 className="text-lg font-semibold text-white">
                  Maison {position.house}
                </h3>
                <div className="mt-2 text-sm font-semibold" style={{ color: visual.accent }}>
                  {houseInfo.theme}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {houseInfo.description}
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Coordonnées exactes
              </h3>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl bg-white/[0.055] px-3 py-2">
                  <span className="text-slate-400">Longitude</span>
                  <span className="font-semibold text-white">{position.longitude.toFixed(2)}°</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/[0.055] px-3 py-2">
                  <span className="text-slate-400">Dans le signe</span>
                  <span className="font-semibold text-white">{position.signDegree.toFixed(2)}°</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/[0.055] px-3 py-2">
                  <span className="text-slate-400">Latitude</span>
                  <span className="font-semibold text-white">{position.latitude.toFixed(2)}°</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/[0.055] px-3 py-2">
                  <span className="text-slate-400">Maison</span>
                  <span className="font-semibold text-white">{position.house}</span>
                </div>
              </div>
            </section>

            {onNavigateToProfile && (
              <button
                onClick={() => {
                  onNavigateToProfile(planetKey);
                  onClose();
                }}
                className="w-full rounded-2xl border border-amber-200/30 bg-gradient-to-r from-amber-400/90 to-cyan-300/80 px-5 py-3 font-semibold text-slate-950 shadow-[0_0_28px_rgba(255,193,94,0.2)] transition hover:brightness-110"
              >
                Voir dans ma carte céleste
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
