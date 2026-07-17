import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

interface NatalChartProps {
  name: string;
  birthDate: Date;
  birthPlace: string;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects: any[];
  onAspectClick?: (aspect: any) => void;
  onPlanetClick?: (planetKey: string) => void;
  fullscreenMode?: boolean;
  enableNavigation?: boolean;
}

const zodiacSigns = [
  { symbol: "♈", name: "Bélier", emoji: "🐏" },
  { symbol: "♉", name: "Taureau", emoji: "🐂" },
  { symbol: "♊", name: "Gémeaux", emoji: "👯" },
  { symbol: "♋", name: "Cancer", emoji: "🦀" },
  { symbol: "♌", name: "Lion", emoji: "🦁" },
  { symbol: "♍", name: "Vierge", emoji: "🌸" },
  { symbol: "♎", name: "Balance", emoji: "⚖️" },
  { symbol: "♏", name: "Scorpion", emoji: "🦂" },
  { symbol: "♐", name: "Sagittaire", emoji: "🏹" },
  { symbol: "♑", name: "Capricorne", emoji: "🐐" },
  { symbol: "♒", name: "Verseau", emoji: "🏺" },
  { symbol: "♓", name: "Poissons", emoji: "🐟" },
];

const planetGlyphs: Record<string, string> = {
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
  ascendant: "ASC",
};

const planetGlyphSizes: Record<string, number> = {
  sun: 48,
  moon: 52,
  mercury: 49,
  venus: 50,
  mars: 50,
  saturn: 49,
  uranus: 48,
  neptune: 49,
  pluto: 48,
};

const planetGlyphOffsets: Record<string, { x: number; y: number }> = {
  sun: { x: 1, y: 4 },
  moon: { x: 3, y: 3 },
  mercury: { x: 0, y: 4 },
  venus: { x: 0, y: 3 },
  mars: { x: 0, y: 4 },
  jupiter: { x: -2, y: -3 },
  saturn: { x: 0, y: 4 },
  uranus: { x: 0, y: 6 },
  neptune: { x: 0, y: 3 },
  pluto: { x: 0, y: 6 },
};

const planetNames: Record<string, string> = {
  sun: "Soleil",
  moon: "Lune",
  mercury: "Mercure",
  venus: "Vénus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturne",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluton",
  ascendant: "Ascendant",
};

const planetColors: Record<string, string> = {
  sun: "#F59E0B",
  moon: "#9CA3AF",
  mercury: "#06B6D4",
  venus: "#EC4899",
  mars: "#EF4444",
  jupiter: "#10B981",
  saturn: "#8B7355",
  uranus: "#3B82F6",
  neptune: "#8B5CF6",
  pluto: "#A855F7",
  ascendant: "#1e293b",
};

const planetMicroDescriptions: Record<string, string> = {
  sun: "Il décrit ton centre vital, ton besoin de créer et la manière dont tu affirmes ta présence. Là où il se place, tu cherches à rayonner avec cohérence.",
  moon: "Elle révèle ton monde intérieur, tes besoins affectifs et la façon dont tu cherches la sécurité. Elle parle de mémoire, d’instinct et de protection.",
  mercury: "Il montre ta manière de penser, d’apprendre et de transmettre. Sa position précise ton langage mental, ta curiosité et ton rapport aux idées.",
  venus: "Elle indique ton rapport à l’amour, au plaisir et à la valeur personnelle. Elle révèle ce qui t’attire, ce que tu désires et ce que tu veux préserver.",
  mars: "Il représente ton énergie d’action, ton courage et ta manière d’affirmer tes désirs. Il montre comment tu avances, combats et prends position.",
  jupiter: "Il ouvre les zones d’expansion, de confiance et d’opportunité. Sa position montre où tu grandis, où tu espères et où tu cherches du sens.",
  saturn: "Il parle de structure, de maturité et de responsabilité. Là où il se place, la vie demande rigueur, patience et construction durable.",
  uranus: "Il indique ton besoin de liberté, d’innovation et de rupture avec les automatismes. Il réveille ce qui refuse d’être enfermé.",
  neptune: "Il révèle l’imaginaire, l’intuition et la part invisible de ton thème. Sa position parle d’idéal, d’inspiration et de sensibilité subtile.",
  pluto: "Il symbolise les transformations profondes, le pouvoir intérieur et les renaissances. Il montre où tu changes radicalement de peau.",
  ascendant: "Il décrit ton entrée dans le monde, ton style spontané et l’impression que tu dégages. C’est la première vibration de ton thème.",
};

const planetPreviewVisuals: Record<string, { accent: string; surface: string; glow: string; ring?: boolean }> = {
  sun: {
    accent: "#F7D85A",
    glow: "rgba(247, 216, 90, 0.45)",
    surface: "radial-gradient(circle at 34% 26%, #fff8b7 0 9%, transparent 20%), radial-gradient(circle at 55% 52%, #ffb43a 0 28%, #f25a23 58%, #4d1208 100%)",
  },
  moon: {
    accent: "#DDE7F5",
    glow: "rgba(221, 231, 245, 0.34)",
    surface: "radial-gradient(circle at 35% 25%, #ffffff 0 7%, transparent 18%), radial-gradient(circle at 64% 38%, rgba(51,60,72,.72) 0 8%, transparent 13%), radial-gradient(circle at 50% 54%, #d9dde4 0 20%, #828d9b 56%, #252c36 100%)",
  },
  mercury: {
    accent: "#D6B985",
    glow: "rgba(214, 185, 133, 0.34)",
    surface: "radial-gradient(circle at 32% 25%, #f8dfb7 0 7%, transparent 18%), radial-gradient(circle at 66% 46%, rgba(54,39,30,.62) 0 9%, transparent 14%), radial-gradient(circle at 50% 54%, #c6a06e 0 18%, #7e6045 52%, #2d2521 100%)",
  },
  venus: {
    accent: "#F1D082",
    glow: "rgba(241, 208, 130, 0.38)",
    surface: "radial-gradient(circle at 34% 25%, #fff0c2 0 8%, transparent 19%), repeating-linear-gradient(-18deg, #f4d89a 0 10px, #bf8046 11px 19px, #f0bf77 20px 31px)",
  },
  mars: {
    accent: "#F2734E",
    glow: "rgba(242, 115, 78, 0.38)",
    surface: "radial-gradient(circle at 34% 25%, #ffd2a0 0 7%, transparent 18%), radial-gradient(circle at 65% 50%, rgba(65,23,15,.7) 0 11%, transparent 18%), linear-gradient(145deg, #d85f35, #8c3325 52%, #2c1514)",
  },
  jupiter: {
    accent: "#F4D66D",
    glow: "rgba(244, 214, 109, 0.34)",
    surface: "radial-gradient(ellipse at 70% 58%, #a5442e 0 7%, transparent 17%), repeating-linear-gradient(0deg, #7f4928 0 9px, #dda264 10px 19px, #f3d49a 20px 31px)",
  },
  saturn: {
    accent: "#F3D879",
    glow: "rgba(243, 216, 121, 0.34)",
    ring: true,
    surface: "radial-gradient(circle at 34% 25%, #fff1b8 0 7%, transparent 18%), repeating-linear-gradient(0deg, #84673d 0 9px, #d9ba76 10px 20px, #f2dca2 21px 31px)",
  },
  uranus: {
    accent: "#A8F3F2",
    glow: "rgba(168, 243, 242, 0.3)",
    ring: true,
    surface: "radial-gradient(circle at 34% 25%, #ffffff 0 7%, transparent 18%), radial-gradient(circle at 54% 54%, #b8f2f4 0 21%, #53c8d8 58%, #17495f 100%)",
  },
  neptune: {
    accent: "#78AFFF",
    glow: "rgba(120, 175, 255, 0.36)",
    surface: "radial-gradient(circle at 34% 25%, #dcecff 0 7%, transparent 18%), radial-gradient(circle at 58% 58%, #4ca7ff 0 24%, #245bdc 58%, #0b1b6a 100%)",
  },
  pluto: {
    accent: "#D0A6FF",
    glow: "rgba(208, 166, 255, 0.32)",
    surface: "radial-gradient(circle at 34% 25%, #f1d9ff 0 7%, transparent 18%), radial-gradient(circle at 58% 48%, #c8a480 0 14%, transparent 26%), linear-gradient(145deg, #a48676, #593d48 50%, #201329)",
  },
  ascendant: {
    accent: "#B8D8FF",
    glow: "rgba(184, 216, 255, 0.34)",
    ring: true,
    surface: "radial-gradient(circle at 34% 25%, #ffffff 0 7%, transparent 18%), radial-gradient(circle at 58% 55%, #7258ff 0 18%, transparent 34%), linear-gradient(145deg, #23314d, #101725 50%, #050812)",
  },
};

export default function NatalChart({
  name,
  birthDate,
  birthPlace,
  planetPositions,
  houses,
  aspects,
  onAspectClick,
  onPlanetClick,
  fullscreenMode = false,
}: NatalChartProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoveredAspect, setHoveredAspect] = useState<number | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<number | null>(null);

  const handlePlanetSelection = (key: string) => {
    setSelectedPlanet(key);
    onPlanetClick?.(key);
  };

  const handleAspectSelection = (aspect: (typeof aspects)[number], index: number) => {
    setSelectedAspect(index);
    onAspectClick?.(aspect);
  };
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileWheel, setIsMobileWheel] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobileWheel(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const size = 1440; // -10%
  const center = size / 2;
  const radiusOuter = 396; // -10%
  const radiusHouses = 279; // -10%
  const radiusInner = 216; // -10%
  const radiusPlanets = 504; // -10%

  const getXY = (angleDeg: number, radius: number) => {
    const rad = ((180 - angleDeg) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const getAnnularSectorPath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number,
  ) => {
    const outerStart = getXY(startAngle, outerRadius);
    const outerEnd = getXY(endAngle, outerRadius);
    const innerEnd = getXY(endAngle, innerRadius);
    const innerStart = getXY(startAngle, innerRadius);

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 0 1 ${innerStart.x} ${innerStart.y}`,
      "Z",
    ].join(" ");
  };

  const detectConjunctions = () => {
    const conjunctionThreshold = 5; // degrees of separation for overlap prevention

    // Collect planets + cardinal points in one array
    const cardinals = [
      { key: "ASC", longitude: houses[0]?.cusp ?? 0 },
      { key: "DSC", longitude: houses[6]?.cusp ?? 180 },
      { key: "MC",  longitude: houses[9]?.cusp ?? 270 },
      { key: "FC",  longitude: houses[3]?.cusp ?? 90 },
    ];
    const allBodies = [
      ...Object.entries(planetPositions).map(([key, pos]) => ({ key, longitude: pos.longitude as number })),
      ...cardinals,
    ].sort((a, b) => a.longitude - b.longitude);

    // Group bodies that are angularly close
    const groups: typeof allBodies[] = [];
    const used = new Set<string>();

    for (const body of allBodies) {
      if (used.has(body.key)) continue;
      const group = [body];
      used.add(body.key);

      for (const other of allBodies) {
        if (used.has(other.key)) continue;
        let angDiff = Math.abs(body.longitude - other.longitude);
        if (angDiff > 180) angDiff = 360 - angDiff;
        if (angDiff <= conjunctionThreshold) {
          group.push(other);
          used.add(other.key);
        }
      }
      groups.push(group);
    }

    // Stack each group radially outward along the average direction
    const bodyPositions: Record<string, { x: number; y: number; stackRadius: number; lineAngle: number }> = {};
    const stackSpacing = 110; // px between stacked items (circle radius 42 → no overlap)

    for (const group of groups) {
      const avgLongitude = group.reduce((sum, p) => sum + p.longitude, 0) / group.length;
      const rad = ((180 - avgLongitude) * Math.PI) / 180;

      group.forEach((body, index) => {
        const sr = radiusPlanets + index * stackSpacing;
        bodyPositions[body.key] = {
          x: center + sr * Math.cos(rad),
          y: center + sr * Math.sin(rad),
          stackRadius: sr,
          lineAngle: avgLongitude,  // Use average angle for straight lines
        };
      });
    }

    return { bodyPositions };
  };

  const { bodyPositions: conjunctionPositions } = detectConjunctions();

  const getAspectColor = (type: string): string => {
    const typeMap: Record<string, string> = {
      Conjonction: "#F97316",
      Sextile: "#3B82F6",
      Carré: "#EF4444",
      Trigone: "#10B981",
      Opposition: "#EF4444",
    };
    return typeMap[type] || "#9E9E9E";
  };

  const getAspectOpacity = (type: string): number => {
    const typeMap: Record<string, number> = {
      Conjonction: 0.6,
      Sextile: 0.5,
      Carré: 0.7,
      Trigone: 0.6,
      Opposition: 0.7,
    };
    return typeMap[type] || 0.4;
  };

  const getAspectStrokeWidth = (type: string): number => {
    const typeMap: Record<string, number> = {
      Conjonction: 3.2,
      Carré: 3.2,
      Opposition: 3.2,
      Trigone: 2.4,
      Sextile: 2.4,
    };
    return typeMap[type] || 2;
  };

  const getCardinalPoints = () => {
    const points = [
      { label: "ASC", angle: houses[0]?.cusp || 0 },
      { label: "MC", angle: houses[9]?.cusp || 270 },
    ];
    return points.map((point) => {
      const signIndex = Math.floor(point.angle / 30);
      const signDegree = point.angle % 30;
      const sign = zodiacSigns[signIndex]?.name || "";
      return { ...point, sign, signDegree };
    });
  };

  const cardinalPoints = getCardinalPoints();
  const focusedPlanet = hoveredPlanet || selectedPlanet;
  const activePlanet = hoveredPlanet || selectedPlanet;
  const activePlanetPosition = activePlanet
    ? activePlanet === "ascendant"
      ? {
          sign: houses[0]?.sign || "",
          signDegree: houses[0]?.signDegree || 0,
          house: 1,
        }
      : planetPositions[activePlanet]
    : null;
  const activePlanetVisual = activePlanet
    ? planetPreviewVisuals[activePlanet] || planetPreviewVisuals.ascendant
    : null;
  const aspectTouchesFocusedPlanet = (aspect: any) => (
    !focusedPlanet ||
    aspect.planet1 === focusedPlanet ||
    aspect.planet2 === focusedPlanet
  );

  const formatBirthInfo = () => {
    const date = new Date(birthDate);
    const day = date.getDate();
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} à ${hours}:${minutes}`;
  };

  return (
    <>
      {!isFullscreen && (
      <div className={`natal-identity-panel natal-top-compact ${fullscreenMode ? 'natal-identity-panel--fullscreen' : ''}`}>
        <div className="natal-identity-panel__header">
          <h2 className="natal-chart-name">
            {name}
          </h2>
        </div>

        <div className="natal-identity-panel__meta natal-birth-compact">
          <span>{formatBirthInfo()}</span>
          <span>{birthPlace}</span>
        </div>

        <div className="natal-identity-panel__actions">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="natal-chart-fullscreen-btn hidden md:inline-flex"
            aria-label="Afficher la carte en plein ecran"
            title="Plein ecran"
          >
            <Maximize2 size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
      )}

    <div
      className={`natal-chart-card ${fullscreenMode ? 'w-full flex flex-col' : isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : ''} flex flex-col items-center gap-3 md:gap-6 relative ${isFullscreen && !fullscreenMode ? "bg-neutral-900 overflow-hidden flex items-center justify-center" : fullscreenMode ? "bg-neutral-900" : "rounded-3xl shadow-2xl p-2.5 md:p-8 bg-neutral-900 overflow-hidden"}`}
      style={!isFullscreen && !fullscreenMode ? {
        boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), 0 0 120px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      } : {}}
    >
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-[60] px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
        >
          ✕ Quitter
        </button>
      )}
      <div className="natal-chart-wheel-stage">
        <div className="natal-chart-wheel-frame">
          <svg
            viewBox="60 60 1320 1320"
            preserveAspectRatio="xMidYMid meet"
            className="natal-chart-svg natal-chart-svg-mobile-fit drop-shadow-2xl"
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 'min(90vw, 1100px)', height: 'auto' }}
          >
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEFCE8" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </radialGradient>

              <linearGradient
                id="zodiacGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#17130F" />
                <stop offset="46%" stopColor="#08090D" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>

              <linearGradient id="goldRingGradient" x1="16%" y1="8%" x2="86%" y2="92%">
                <stop offset="0%" stopColor="#FFF7D7" />
                <stop offset="23%" stopColor="#CFAF6C" />
                <stop offset="52%" stopColor="#F7E7B6" />
                <stop offset="72%" stopColor="#AEBBD1" />
                <stop offset="100%" stopColor="#FFF2C8" />
              </linearGradient>

              <linearGradient id="champagneRingGradient" x1="10%" y1="0%" x2="92%" y2="100%">
                <stop offset="0%" stopColor="#FFF9DE" />
                <stop offset="28%" stopColor="#D2B574" />
                <stop offset="56%" stopColor="#F4E8C2" />
                <stop offset="78%" stopColor="#B9C7DC" />
                <stop offset="100%" stopColor="#FFF1BF" />
              </linearGradient>

              <linearGradient id="planetBevelGradient" x1="12%" y1="6%" x2="88%" y2="94%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="22%" stopColor="#FFE9AE" />
                <stop offset="54%" stopColor="#B78F45" />
                <stop offset="78%" stopColor="#D8E3F8" />
                <stop offset="100%" stopColor="#FFF2C8" />
              </linearGradient>

              <radialGradient id="wheelSurfaceGlow" cx="38%" cy="26%" r="72%">
                <stop offset="0%" stopColor="rgba(255, 246, 218, 0.16)" />
                <stop offset="36%" stopColor="rgba(188, 168, 120, 0.07)" />
                <stop offset="74%" stopColor="rgba(30, 32, 40, 0.02)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>

              <radialGradient id="planetDiscGradient" cx="38%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#27252B" />
                <stop offset="48%" stopColor="#090A10" />
                <stop offset="100%" stopColor="#020307" />
              </radialGradient>

              <linearGradient
                id="houseGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2A2621" />
                <stop offset="48%" stopColor="#3A342D" />
                <stop offset="100%" stopColor="#181512" />
              </linearGradient>

              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodOpacity="0.3"
                />
              </filter>

              <filter id="zodiacGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="planetGlow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset dx="0" dy="1" result="offsetBlur" />
                <feFlood floodColor="rgba(0,0,0,0.5)" result="color" />
                <feComposite in2="offsetBlur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="planetGlyphGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="premiumPlanetGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feFlood floodColor="#FFB86B" floodOpacity="0.6" result="goldenColor" />
                <feComposite in="goldenColor" in2="coloredBlur" operator="in" result="goldenBlur" />
                <feMerge>
                  <feMergeNode in="goldenBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <radialGradient id="premiumPlanetGradient" cx="40%" cy="35%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
              </radialGradient>

              <linearGradient id="zodiacBandSoft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(10, 11, 15, 0.42)" />
                <stop offset="52%" stopColor="rgba(2, 3, 7, 0.36)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0.32)" />
              </linearGradient>

              <radialGradient id="zodiacEmojiPlate" cx="50%" cy="42%" r="58%">
                <stop offset="0%" stopColor="rgba(238, 244, 255, 0.18)" />
                <stop offset="58%" stopColor="rgba(150, 180, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(3, 7, 14, 0.34)" />
              </radialGradient>

              <radialGradient id="natalPortalGlow" cx="50%" cy="50%" r="52%">
                <stop offset="0%" stopColor="rgba(120, 126, 140, 0.12)" />
                <stop offset="36%" stopColor="rgba(62, 66, 78, 0.08)" />
                <stop offset="72%" stopColor="rgba(26, 28, 36, 0.04)" />
                <stop offset="100%" stopColor="rgba(26, 28, 36, 0)" />
              </radialGradient>

              <radialGradient id="natalCenterInk" cx="50%" cy="48%" r="58%">
                <stop offset="0%" stopColor="rgba(32, 34, 40, 0.78)" />
                <stop offset="48%" stopColor="rgba(18, 20, 27, 0.76)" />
                <stop offset="100%" stopColor="rgba(7, 8, 12, 0.84)" />
              </radialGradient>

              <filter id="planetDepthShadow" x="-70%" y="-70%" width="240%" height="240%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.66" />
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#000000" floodOpacity="0.42" />
              </filter>

              <filter id="planetDiscShine" x="-70%" y="-70%" width="240%" height="240%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.62" />
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#000000" floodOpacity="0.36" />
                <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#FFE6AD" floodOpacity="0.26" />
                <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#FFB86B" floodOpacity="0.12" />
              </filter>

              <filter id="wheelGrain" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="17" result="noise" />
                <feColorMatrix
                  in="noise"
                  type="matrix"
                  values="0 0 0 0 0.95 0 0 0 0 0.86 0 0 0 0 0.68 0 0 0 0.28 0"
                  result="grain"
                />
                <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
              </filter>
            </defs>

            <circle
              cx={center}
              cy={center}
              r={radiusPlanets + 25}
              fill="none"
              stroke="rgba(210, 222, 245, 0.14)"
              strokeWidth="1.5"
              strokeDasharray="2 18"
              opacity="0.86"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter + 14}
              fill="none"
              stroke="rgba(255, 241, 191, 0.18)"
              strokeWidth="1.2"
              strokeDasharray="1 14"
              opacity="0.72"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter + 7}
              fill="none"
              stroke="url(#champagneRingGradient)"
              strokeWidth="1.1"
              opacity="0.62"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter}
              fill="url(#zodiacGradient)"
              stroke="url(#champagneRingGradient)"
              strokeWidth="4.4"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter - 4}
              fill="url(#wheelSurfaceGlow)"
              opacity="0.82"
              style={{ pointerEvents: "none" }}
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter - 8}
              fill="rgba(255, 255, 255, 0.035)"
              filter="url(#wheelGrain)"
              opacity="0.68"
              style={{ pointerEvents: "none" }}
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter - 18}
              fill="none"
              stroke="rgba(244, 232, 194, 0.34)"
              strokeWidth="1.15"
              opacity="0.86"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusOuter - 30}
              fill="none"
              stroke="rgba(185, 199, 220, 0.18)"
              strokeWidth="0.9"
              opacity="0.82"
            />

            {Array.from({ length: 72 }, (_, i) => {
              const angle = i * 5;
              const isMajor = i % 6 === 0;
              const isMedium = i % 2 === 0;
              const outer = getXY(angle, radiusOuter - 5);
              const inner = getXY(angle, radiusOuter - (isMajor ? 30 : isMedium ? 22 : 14));

              return (
                <line
                  key={`degree-tick-${i}`}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke={isMajor ? "#F4E8C2" : isMedium ? "rgba(210, 222, 245, 0.42)" : "rgba(232, 215, 168, 0.34)"}
                  strokeWidth={isMajor ? "1.9" : isMedium ? "1.15" : "0.7"}
                  opacity={isMajor ? "0.9" : isMedium ? "0.58" : "0.36"}
                  strokeLinecap="round"
                />
              );
            })}

            {zodiacSigns.map((sign, i) => {
              const angle = i * 30;
              const mid = angle + 15;
              const signPoint = getXY(mid, (radiusHouses + radiusOuter) / 2);
              const compactSignEmojis = new Set(["Cancer", "Lion", "Vierge", "Sagittaire"]);
              const largeSignEmojis = new Set(["Taureau", "Scorpion", "Poissons"]);
              const signEmojiSize = compactSignEmojis.has(sign.name)
                ? "51"
                : largeSignEmojis.has(sign.name)
                  ? "59"
                  : "55";

              return (
                <g key={`zodiac-${i}`}>
                  <path
                    d={getAnnularSectorPath(angle, angle + 30, radiusHouses + 4, radiusOuter - 4)}
                    fill="url(#zodiacBandSoft)"
                    opacity="0.58"
                  />

                  {/* Zodiac sign separator line */}
                  <line
                    x1={getXY(angle, radiusHouses).x}
                    y1={getXY(angle, radiusHouses).y}
                    x2={getXY(angle, radiusOuter).x}
                    y2={getXY(angle, radiusOuter).y}
                    stroke="rgba(244, 232, 194, 0.62)"
                    strokeWidth="1.8"
                    opacity="0.82"
                    strokeLinecap="round"
                  />

                  <text
                    x={signPoint.x}
                    y={signPoint.y + 2}
                    fontSize={signEmojiSize}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.92)) drop-shadow(0 0 7px rgba(120, 128, 150, 0.18))" }}
                  >
                    {sign.emoji}
                  </text>
                </g>
              );
            })}

            <circle
              cx={center}
              cy={center}
              r={radiusHouses}
              fill="url(#houseGradient)"
              stroke="url(#champagneRingGradient)"
              strokeWidth="2.6"
              opacity="0.82"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusHouses + 8}
              fill="none"
              stroke="rgba(255, 241, 191, 0.28)"
              strokeWidth="0.9"
              opacity="0.72"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusHouses - 9}
              fill="none"
              stroke="rgba(185, 199, 220, 0.18)"
              strokeWidth="0.8"
              opacity="0.78"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusHouses - 18}
              fill="none"
              stroke="rgba(210, 222, 245, 0.14)"
              strokeWidth="1"
              strokeDasharray="10 12"
              opacity="0.8"
            />

            {houses.map((house, i) => {
              const angle = house.cusp;
              const { x: x1, y: y1 } = getXY(angle, radiusInner);
              const { x: x2, y: y2 } = getXY(angle, radiusHouses);
              const { x: sx1, y: sy1 } = getXY(angle, radiusInner - 8);
              const { x: sx2, y: sy2 } = getXY(angle, radiusInner + 20);

              return (
                <g key={`house-${i}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F4E8C2"
                    strokeWidth="1.45"
                    strokeDasharray="none"
                    opacity="0.64"
                  />
                  <line
                    x1={sx1}
                    y1={sy1}
                    x2={sx2}
                    y2={sy2}
                    stroke="rgba(244, 232, 194, 0.58)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </g>
              );
            })}

            {houses.map((house, i) => {
              const nextHouse = houses[(i + 1) % 12];
              let midAngle = (house.cusp + nextHouse.cusp) / 2;
              if (nextHouse.cusp < house.cusp) {
                midAngle = ((house.cusp + nextHouse.cusp + 360) / 2) % 360;
              }
              const { x, y } = getXY(
                midAngle,
                (radiusHouses + radiusInner) / 2,
              );
              return (
                <text
                  key={`house-num-${i}`}
                  x={x}
                  y={y}
                  fontSize="35"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#E8D7A8"
                  style={{
                    fontFamily: "Times New Roman, Times, serif",
                    letterSpacing: "0.5px",
                    filter: "drop-shadow(0 0 4px rgba(150, 180, 255, 0.22))",
                  }}
                >
                  {i + 1}
                </text>
              );
            })}

            <circle
              cx={center}
              cy={center}
              r={radiusInner}
              fill="url(#natalCenterInk)"
              stroke="url(#champagneRingGradient)"
              strokeWidth="1.8"
              opacity="0.9"
              filter="url(#zodiacGlow)"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusInner + 9}
              fill="none"
              stroke="rgba(255, 241, 191, 0.22)"
              strokeWidth="0.9"
              opacity="0.76"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusInner - 12}
              fill="none"
              stroke="rgba(185, 199, 220, 0.16)"
              strokeWidth="0.8"
              opacity="0.78"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusInner - 28}
              fill="none"
              stroke="rgba(132, 138, 154, 0.2)"
              strokeWidth="0.9"
              strokeDasharray="2 12"
              opacity="0.62"
            />

            <circle
              cx={center}
              cy={center}
              r={radiusInner - 18}
              fill="url(#natalPortalGlow)"
              opacity="0.88"
            />

            {aspects.map((asp, i) => {
              let lon1, lon2;

              if (asp.planet1 === "ascendant") {
                lon1 = houses[0]?.cusp || 0;
              } else {
                const p1 = planetPositions[asp.planet1];
                if (!p1) return null;
                lon1 = p1.longitude;
              }

              if (asp.planet2 === "ascendant") {
                lon2 = houses[0]?.cusp || 0;
              } else {
                const p2 = planetPositions[asp.planet2];
                if (!p2) return null;
                lon2 = p2.longitude;
              }

              const a = getXY(lon1, radiusInner);
              const b = getXY(lon2, radiusInner);

              const isHovered = hoveredAspect === i;
              const isSelected = selectedAspect === i;
              const isHighlighted = isHovered || isSelected;
              const isFocused = aspectTouchesFocusedPlanet(asp);

              return (
                <line
                  key={`aspect-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={getAspectColor(asp.type)}
                  strokeWidth={
                    isHighlighted
                      ? getAspectStrokeWidth(asp.type) + 1.8
                      : isFocused
                        ? getAspectStrokeWidth(asp.type) + (focusedPlanet ? 0.7 : 0)
                        : 1.1
                  }
                  opacity={
                    isHighlighted
                      ? 0.92
                      : isFocused
                        ? focusedPlanet
                          ? Math.min(getAspectOpacity(asp.type) + 0.22, 0.82)
                          : getAspectOpacity(asp.type)
                        : 0.12
                  }
                  strokeLinecap="round"
                  style={{
                    cursor: onAspectClick ? "pointer" : "default",
                    transition: "stroke-width 0.32s ease, opacity 0.32s ease, filter 0.32s ease",
                    filter: isHighlighted || (focusedPlanet && isFocused)
                      ? "drop-shadow(0 0 4px currentColor)"
                      : "none",
                  }}
                  onMouseEnter={() => setHoveredAspect(i)}
                  onMouseLeave={() => setHoveredAspect(null)}
                  onClick={() => handleAspectSelection(asp, i)}
                />
              );
            })}

            {Object.entries(planetPositions).map(([key, pos]) => {
              const stackedPos = conjunctionPositions[key];
              const { x, y } = stackedPos || getXY(pos.longitude, radiusPlanets);
              const lineAngle = stackedPos?.lineAngle ?? pos.longitude;
              const { x: lineX, y: lineY } = getXY(lineAngle, radiusOuter);

              const isHovered = hoveredPlanet === key;
              const isSelected = selectedPlanet === key;
              const isHighlighted = isHovered || isSelected;
              const isDimmed = Boolean(focusedPlanet && focusedPlanet !== key);
              const glyphOffset = planetGlyphOffsets[key] || { x: 0, y: 2 };

              return (
                <g
                  key={`planet-${key}`}
                  opacity={isDimmed ? 0.38 : 1}
                  style={{
                    transition: "opacity 0.32s ease, filter 0.32s ease",
                    filter: isHighlighted
                      ? "drop-shadow(0 0 10px rgba(255, 230, 173, 0.34))"
                      : "none",
                  }}
                >
                  <line
                    x1={lineX}
                    y1={lineY}
                    x2={x}
                    y2={y}
                    stroke={isHighlighted ? "#FFB86B" : "#E8D7A8"}
                    strokeWidth={isHighlighted ? "2.4" : "1.4"}
                    opacity={isDimmed ? "0.18" : isHighlighted ? "0.78" : "0.42"}
                    strokeLinecap="round"
                  />

                  {/* Outer glow halo */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "56" : "50"}
                    fill={planetColors[key] || "#64748b"}
                    opacity={isDimmed ? "0.04" : isHighlighted ? "0.16" : "0.08"}
                    filter="url(#premiumPlanetGlow)"
                    style={{ pointerEvents: "none" }}
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "52" : "46"}
                    fill="none"
                    stroke="url(#planetBevelGradient)"
                    strokeWidth={isHighlighted ? "2.7" : "1.8"}
                    opacity={isDimmed ? "0.1" : isHighlighted ? "0.82" : "0.58"}
                    filter="url(#premiumPlanetGlow)"
                    style={{ pointerEvents: "none" }}
                  />

                  {/* Main circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "48" : "42"}
                    fill="url(#planetDiscGradient)"
                    stroke="url(#planetBevelGradient)"
                    strokeWidth={isHighlighted ? "4" : "2.9"}
                    filter="url(#planetDiscShine)"
                    style={{
                      transition: "all 0.32s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePlanetSelection(key)}
                    onMouseEnter={() => setHoveredPlanet(key)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                  />

                  {/* Premium 3D highlight overlay */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "38" : "33"}
                    fill={planetColors[key] || "#64748b"}
                    opacity={isHighlighted ? "0.54" : "0.36"}
                    style={{ pointerEvents: "none" }}
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "44" : "38"}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="0.8"
                    opacity={isDimmed ? "0.08" : "0.62"}
                    style={{ pointerEvents: "none" }}
                  />

                  {/* Inner luminous ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "40" : "35"}
                    fill="none"
                    stroke={isHighlighted ? "rgba(255, 241, 191, 0.78)" : "rgba(255, 241, 191, 0.34)"}
                    strokeWidth={isHighlighted ? "1.2" : "0.9"}
                    style={{ pointerEvents: "none" }}
                  />

                  <ellipse
                    cx={x - 13}
                    cy={y - 15}
                    rx={isHighlighted ? "15" : "11"}
                    ry={isHighlighted ? "6" : "4.5"}
                    fill="rgba(255, 255, 255, 0.26)"
                    opacity={isDimmed ? "0.06" : isHighlighted ? "0.46" : "0.24"}
                    transform={`rotate(-24 ${x - 13} ${y - 15})`}
                    style={{ pointerEvents: "none" }}
                  />

                  {key === "jupiter" ? (
                    <g
                      transform={`translate(${x + glyphOffset.x}, ${y + glyphOffset.y}) scale(${isMobileWheel ? (isHighlighted ? 0.66 : 0.58) : (isHighlighted ? 0.6 : 0.52)}) translate(-4, 6)`}
                      style={{
                        pointerEvents: "none",
                        transition: "all 0.32s ease",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 5px rgba(150, 180, 255, 0.45))",
                      }}
                    >
                      <path d="M -22,-8 C -22,-44 8,-44 8,-8" stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round"/>
                      <path d="M 8,-8 C 4,4 -10,8 -18,8 L 30,8" stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round"/>
                      <line x1="22" y1="-25" x2="22" y2="32" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round"/>
                    </g>
                  ) : (
                    <text
                      x={x + glyphOffset.x}
                      y={y + glyphOffset.y}
                      fontSize={isMobileWheel ? (
                        key === "neptune"
                          ? 56
                          : ["sun", "venus"].includes(key)
                          ? 60
                          : ["moon", "mercury", "mars", "saturn", "uranus"].includes(key)
                            ? 63
                            : 57
                      ) + (isHighlighted ? 4 : 0) : (key === "neptune" ? 48 : planetGlyphSizes[key] || 50) + (isHighlighted ? 6 : 0)}
                      fontWeight={key === "neptune" ? "400" : "500"}
                      fontFamily="'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Apple Symbols', serif"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFFFFF"
                      stroke={key === "neptune" ? (isMobileWheel ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.10)") : "rgba(255, 255, 255, 0.16)"}
                      strokeWidth={key === "neptune" ? (isMobileWheel ? "0.1" : "0.25") : "0.5"}
                      paintOrder="stroke fill"
                      filter="url(#premiumPlanetGlow)"
                      style={{
                        transition: "all 0.32s ease",
                        pointerEvents: "none",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.42)) drop-shadow(0 0 12px rgba(150, 180, 255, 0.38))",
                      }}
                    >
                      {planetGlyphs[key] || "?"}
                    </text>
                  )}


                </g>
              );
            })}

            {cardinalPoints.map((point, i) => {
              if (point.label !== "ASC") {
                // DSC / MC / FC : simple text marker on outer zodiac ring, no circle in planet zone
                const labelR = radiusOuter + 70;
                const { x: lx, y: ly } = getXY(point.angle, labelR);
                return (
                  <g key={`cardinal-${i}`}>
                    <text
                      x={lx}
                      y={ly}
                      fontSize="30"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#F4E8C2"
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif",
                        letterSpacing: "1.1px",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.58)) drop-shadow(0 0 3px rgba(255, 232, 180, 0.18))",
                      }}
                    >
                      {point.label}
                    </text>
                  </g>
                );
              }

              // ASC only — interactive circle in planet zone
              const stackedPos = conjunctionPositions["ASC"];
              const x = stackedPos?.x ?? getXY(point.angle, radiusPlanets).x;
              const y = stackedPos?.y ?? getXY(point.angle, radiusPlanets).y;
              const { x: lineX, y: lineY } = getXY(point.angle, radiusOuter);
              const isHovered = hoveredPlanet === "ascendant";
              const isSelected = selectedPlanet === "ascendant";
              const isHighlighted = isHovered || isSelected;
              const isDimmed = Boolean(focusedPlanet && focusedPlanet !== "ascendant");

              return (
                <g
                  key={`cardinal-${i}`}
                  opacity={isDimmed ? 0.38 : 1}
                  style={{
                    transition: "opacity 0.32s ease, filter 0.32s ease",
                    filter: isHighlighted
                      ? "drop-shadow(0 0 10px rgba(255, 230, 173, 0.3))"
                      : "none",
                  }}
                >
                  <line x1={lineX} y1={lineY} x2={x} y2={y}
                    stroke={isHighlighted ? "#FFB86B" : "#E8D7A8"}
                    strokeWidth={isHighlighted ? "2.4" : "1.4"}
                    opacity={isDimmed ? "0.18" : isHighlighted ? "0.78" : "0.42"}
                    strokeLinecap="round" />
                  <circle cx={x} cy={y}
                    r={isHighlighted ? "54" : "48"}
                    fill="#1e293b"
                    opacity={isDimmed ? "0.04" : isHighlighted ? "0.14" : "0.08"}
                    filter="url(#premiumPlanetGlow)"
                    style={{ pointerEvents: "none" }}
                  />
                  <circle cx={x} cy={y}
                    r={isHighlighted ? "50" : "44"}
                    fill="none"
                    stroke="url(#planetBevelGradient)"
                    strokeWidth={isHighlighted ? "2.4" : "1.7"}
                    opacity={isDimmed ? "0.1" : isHighlighted ? "0.78" : "0.54"}
                    filter="url(#premiumPlanetGlow)"
                    style={{ pointerEvents: "none" }}
                  />
                  <circle cx={x} cy={y}
                    r={isHighlighted ? "48" : "42"}
                    fill="url(#planetDiscGradient)"
                    stroke="url(#planetBevelGradient)"
                    strokeWidth={isHighlighted ? "3.8" : "2.7"}
                    filter="url(#planetDiscShine)"
                    style={{ transition: "all 0.32s ease", cursor: "pointer" }}
                    onClick={() => handlePlanetSelection("ascendant")}
                    onMouseEnter={() => setHoveredPlanet("ascendant")}
                    onMouseLeave={() => setHoveredPlanet(null)}
                  />
                  <circle cx={x} cy={y}
                    r={isHighlighted ? "40" : "35"}
                    fill="none"
                    stroke={isHighlighted ? "rgba(255, 241, 191, 0.72)" : "rgba(255, 241, 191, 0.34)"}
                    strokeWidth={isHighlighted ? "1.1" : "0.9"}
                    style={{ pointerEvents: "none" }}
                  />
                  <ellipse
                    cx={x - 13}
                    cy={y - 15}
                    rx={isHighlighted ? "14" : "10"}
                    ry={isHighlighted ? "5.8" : "4.2"}
                    fill="rgba(255, 255, 255, 0.24)"
                    opacity={isDimmed ? "0.06" : isHighlighted ? "0.44" : "0.22"}
                    transform={`rotate(-24 ${x - 13} ${y - 15})`}
                    style={{ pointerEvents: "none" }}
                  />
                  <text x={x} y={y + 1}
                    fontSize={isHighlighted ? "32" : "28"}
                    fontWeight="700" textAnchor="middle" dominantBaseline="middle"
                    fill="#F4E8C2"
                    style={{
                      transition: "all 0.32s ease",
                      pointerEvents: "none",
                      fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif",
                      letterSpacing: "0.8px",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.84)) drop-shadow(0 0 4px rgba(255, 232, 180, 0.26))",
                    }}>
                    ASC
                  </text>

                </g>
              );
            })}
          </svg>

        </div>

        {activePlanet && activePlanetPosition && activePlanetVisual && (
          <div
            className="absolute left-1/2 top-3 z-20 w-[min(92vw,390px)] -translate-x-1/2 overflow-hidden rounded-[28px]"
            style={{
              pointerEvents: selectedPlanet === activePlanet ? "auto" : "none",
              minHeight: 198,
              padding: "22px 22px 20px",
              border: `1px solid ${activePlanetVisual.accent}52`,
              background:
                "radial-gradient(circle at 84% 12%, rgba(246, 217, 91, 0.19), transparent 34%), linear-gradient(145deg, rgba(4, 5, 6, 0.98), rgba(17, 16, 10, 0.94) 52%, rgba(2, 2, 2, 0.98))",
              boxShadow: `0 26px 70px rgba(0, 0, 0, 0.64), 0 0 24px ${activePlanetVisual.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
              backdropFilter: "blur(20px)",
              color: "#FFFFFF",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, transparent 0 20%, rgba(247, 216, 90, 0.28) 21% 22%, transparent 23% 100%), linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
                backgroundSize: "100% 100%, 28px 28px, 28px 28px",
              }}
            />

            <div
              className="absolute right-5 top-5 h-[88px] w-[88px]"
              style={{ filter: `drop-shadow(0 0 18px ${activePlanetVisual.glow})` }}
            >
              {activePlanetVisual.ring && (
                <div
                  className="absolute left-1/2 top-1/2 h-[22px] w-[112px] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border"
                  style={{ borderColor: `${activePlanetVisual.accent}99` }}
                />
              )}
              <div
                className="absolute inset-2 overflow-hidden rounded-full border border-white/20"
                style={{
                  background: activePlanetVisual.surface,
                  boxShadow: "inset -14px -16px 22px rgba(0,0,0,.74), inset 8px 7px 13px rgba(255,255,255,.2)",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,.42),transparent_22%),radial-gradient(circle_at_78%_76%,rgba(0,0,0,.88),transparent_52%)]" />
              </div>
            </div>

            {selectedPlanet === activePlanet && (
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute right-3 top-3 z-30 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
                aria-label="Fermer l'encart"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className="relative z-10 max-w-[225px] pr-4">
              <div
                className="mb-4 h-px w-20 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${activePlanetVisual.accent}, transparent)`,
                  boxShadow: `0 0 14px ${activePlanetVisual.glow}`,
                }}
              />
              <div
                className="text-[2.05rem] font-medium leading-none tracking-[0.01em]"
                style={{
                  color: "#FAF7EC",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  textShadow: "0 2px 14px rgba(0,0,0,.72)",
                }}
              >
                {planetNames[activePlanet]}
              </div>
              <div
                className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                {activePlanetPosition.sign} {activePlanetPosition.signDegree.toFixed(1)}° / Maison {activePlanetPosition.house}
              </div>
              <p
                className="mt-4 max-w-[268px] text-[0.88rem] font-normal leading-[1.55]"
                style={{
                  color: "rgba(246, 242, 226, 0.84)",
                  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {planetMicroDescriptions[activePlanet]}
              </p>
            </div>

            <div
              className="absolute bottom-4 right-5 h-1 w-20 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${activePlanetVisual.accent}, #ffffff)`,
                boxShadow: `0 0 16px ${activePlanetVisual.glow}`,
              }}
            />
          </div>
        )}

        {hoveredAspect !== null && aspects[hoveredAspect] && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
            style={{
              pointerEvents: "none",
              minWidth: 220,
              padding: "12px 16px",
              border: "1px solid rgba(232, 215, 168, 0.28)",
              borderRadius: 14,
              background: "linear-gradient(180deg, rgba(8, 12, 22, 0.94), rgba(3, 6, 13, 0.88))",
              boxShadow: "0 18px 42px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(14px)",
              color: "#F8FAFC",
            }}
          >
            <div
              className="text-base font-bold"
              style={{
                color: "#F4E8C2",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.05rem",
                letterSpacing: "0.02em",
              }}
            >
              {aspects[hoveredAspect].type}
            </div>
            <div className="text-sm mt-1" style={{ color: "rgba(210, 222, 245, 0.82)" }}>
              {planetNames[aspects[hoveredAspect].planet1]}{" "}
              {planetGlyphs[aspects[hoveredAspect].planet1]} -{" "}
              {planetNames[aspects[hoveredAspect].planet2]}{" "}
              {planetGlyphs[aspects[hoveredAspect].planet2]}
            </div>
            <div className="text-sm" style={{ color: "rgba(232, 215, 168, 0.72)" }}>
              Orbe: {aspects[hoveredAspect].orb.toFixed(2)}°
            </div>
          </div>
        )}
      </div>



      {!isFullscreen && !fullscreenMode && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-2 w-full mt-2 md:mt-3">
            <button
              key="ascendant"
              onClick={() => {
                handlePlanetSelection("ascendant");
              }}
              onMouseEnter={() => setHoveredPlanet("ascendant")}
              onMouseLeave={() => setHoveredPlanet(null)}
              className={`flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md transition-all shadow-sm ${
                selectedPlanet === "ascendant" || hoveredPlanet === "ascendant"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <div
                className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0"
                style={{ backgroundColor: planetColors["ascendant"] }}
              >
                {planetGlyphs["ascendant"]}
              </div>
              <div className="text-left text-xs min-w-0 flex-1">
                <div
                  className={`font-bold truncate ${selectedPlanet === "ascendant" || hoveredPlanet === "ascendant" ? "text-white" : "text-slate-800"}`}
                >
                  {planetNames["ascendant"]}
                </div>
                <div
                  className={`text-xs truncate ${selectedPlanet === "ascendant" || hoveredPlanet === "ascendant" ? "text-blue-100" : "text-slate-600"}`}
                >
                  {houses[0]?.sign} {houses[0]?.signDegree.toFixed(1)}°
                </div>
              </div>
            </button>
            {Object.entries(planetPositions).map(([key, pos]) => (
              <button
                key={key}
                onClick={() => {
                  handlePlanetSelection(key);
                }}
                onMouseEnter={() => setHoveredPlanet(key)}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md transition-all shadow-sm ${
                  selectedPlanet === key || hoveredPlanet === key
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0"
                  style={{ backgroundColor: planetColors[key] }}
                >
                  {planetGlyphs[key]}
                </div>
                <div className="text-left text-xs min-w-0 flex-1">
                  <div
                    className={`font-bold truncate ${selectedPlanet === key || hoveredPlanet === key ? "text-white" : "text-slate-800"}`}
                  >
                    {planetNames[key]}
                  </div>
                  <div
                    className={`text-xs truncate ${selectedPlanet === key || hoveredPlanet === key ? "text-blue-100" : "text-slate-600"}`}
                  >
                    {pos.sign} {pos.signDegree.toFixed(1)}°
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Micro-séparateur doré juste après la liste des planètes */}
          <div className="w-full flex items-center justify-center my-2">
            <div style={{ width: '60%', height: 1, background: 'linear-gradient(90deg,transparent,#FFD70088,#FFD700,#FFD70088,transparent)', borderRadius: 2, opacity: 0.85 }} />
          </div>
        </>
      )}


      {/* Accordéon aspects annulé, retour à l'affichage initial */}

      {!isFullscreen && !fullscreenMode && (
      <div className="w-full mt-2 p-4 md:p-5 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-md border border-blue-800">
        <h3 className="text-base md:text-lg font-bold text-white mb-2">
          Partager cette carte
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={window.location.href}
            readOnly
            className="flex-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Lien copié !");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Copier
          </button>
        </div>
      </div>
      )}

    </div>
    </>
  );
}
