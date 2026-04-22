import { useState } from "react";
import DetailModal from "./DetailModal";

interface NatalChartProps {
  name: string;
  birthDate: Date;
  birthPlace: string;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects: any[];
  onAspectClick?: (aspect: any) => void;
  onPlanetClick?: (planetKey: string) => void;
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

export default function NatalChart({
  name,
  birthDate,
  birthPlace,
  planetPositions,
  houses,
  aspects,
  onAspectClick,
  onPlanetClick,
}: NatalChartProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoveredAspect, setHoveredAspect] = useState<number | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const size = 1600;
  const center = size / 2;
  const radiusOuter = 440;
  const radiusHouses = 310;
  const radiusInner = 240;
  const radiusPlanets = 560;

  const getXY = (angleDeg: number, radius: number) => {
    const rad = ((180 - angleDeg) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const detectConjunctions = () => {
    const conjunctionThreshold = 2; // degrees of separation for conjunction grouping

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
      Conjonction: 4.5,
      Carré: 4.5,
      Opposition: 4.5,
      Trigone: 3.5,
      Sextile: 3.5,
    };
    const base = typeMap[type] || 2.5;
    const ASPECT_STROKE_SCALE = 2.2; // augmenter significativement l'épaisseur
    return Math.round(base * ASPECT_STROKE_SCALE * 10) / 10;
  };

  const getCardinalPoints = () => {
    const points = [
      { label: "ASC", angle: houses[0]?.cusp || 0 },
      { label: "DSC", angle: houses[6]?.cusp || 180 },
      { label: "MC", angle: houses[9]?.cusp || 270 },
      { label: "FC", angle: houses[3]?.cusp || 90 },
    ];
    return points.map((point) => {
      const signIndex = Math.floor(point.angle / 30);
      const signDegree = point.angle % 30;
      const sign = zodiacSigns[signIndex]?.name || "";
      return { ...point, sign, signDegree };
    });
  };

  const cardinalPoints = getCardinalPoints();

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
    <div
      className={`flex flex-col items-center gap-4 md:gap-6 relative overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 bg-neutral-900 flex items-center justify-center" : "rounded-3xl shadow-2xl p-4 md:p-8 bg-neutral-900"}`}
      style={!isFullscreen ? {
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
      {!isFullscreen && (
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6 pb-4 border-b border-slate-700">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {name}
          </h2>
          <div className="space-y-1 text-slate-300">
            <p className="text-sm md:text-base">
              <span className="font-semibold">Date de naissance :</span>{" "}
              {formatBirthInfo()}
            </p>
            <p className="text-sm md:text-base">
              <span className="font-semibold">Lieu de naissance :</span>{" "}
              {birthPlace}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-sm md:text-base font-semibold transition-all shadow-md bg-slate-700 text-white hover:bg-slate-800"
          >
            Plein écran
          </button>
        </div>
      </div>
      )}

      <div className={`relative ${isFullscreen ? 'w-full h-full flex items-center justify-center' : 'w-full flex justify-center px-4'}`}>
        <div className={`${isFullscreen ? 'w-full h-full max-h-[85vh] max-w-[85vh] flex justify-center items-center' : 'w-full max-w-[600px] flex justify-center'}`}>
          <svg
            viewBox="0 0 1600 1600"
            className="drop-shadow-2xl w-full h-auto max-w-full"
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
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient
                id="houseGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodOpacity="0.3"
                />
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
            </defs>

            <circle
              cx={center}
              cy={center}
              r={radiusOuter}
              fill="url(#zodiacGradient)"
              stroke="#0f172a"
              strokeWidth="4"
              filter="url(#shadow)"
            />

            {zodiacSigns.map((sign, i) => {
              const angle = i * 30;

              return (
                <g key={`zodiac-${i}`}>
                  <line
                    x1={getXY(angle, radiusHouses).x}
                    y1={getXY(angle, radiusHouses).y}
                    x2={getXY(angle, radiusOuter).x}
                    y2={getXY(angle, radiusOuter).y}
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                  />

                  <text
                    x={getXY(angle + 15, (radiusHouses + radiusOuter) / 2).x}
                    y={getXY(angle + 15, (radiusHouses + radiusOuter) / 2).y}
                    fontSize="55"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      filter:
                        "drop-shadow(0 0 4px rgba(255,255,255,0.4)) drop-shadow(0 1px 3px rgba(0,0,0,0.3))",
                    }}
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
              stroke="#475569"
              strokeWidth="3"
            />

            {houses.map((house, i) => {
              const angle = house.cusp;
              const { x: x1, y: y1 } = getXY(angle, radiusInner);
              const { x: x2, y: y2 } = getXY(angle, radiusHouses);

              const isCardinal = i === 0 || i === 3 || i === 6 || i === 9;

              return (
                <line
                  key={`house-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isCardinal ? "#1e293b" : "#475569"}
                  strokeWidth={isCardinal ? "3" : "1.5"}
                  strokeDasharray={isCardinal ? "8,4" : "5,3"}
                />
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
                  fontSize="38"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#1e293b"
                  style={{
                    fontFamily: "Times New Roman, Times, serif",
                    letterSpacing: "0.5px",
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
              fill="url(#centerGradient)"
              stroke="#334155"
              strokeWidth="3"
              filter="url(#shadow)"
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
                      ? getAspectStrokeWidth(asp.type) + 2
                      : getAspectStrokeWidth(asp.type)
                  }
                  opacity={isHighlighted ? 0.9 : getAspectOpacity(asp.type)}
                  strokeLinecap="round"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s",
                    filter: isHighlighted
                      ? "drop-shadow(0 0 4px currentColor)"
                      : "none",
                  }}
                  onMouseEnter={() => setHoveredAspect(i)}
                  onMouseLeave={() => setHoveredAspect(null)}
                  onClick={() => {
                    if (onAspectClick) {
                      onAspectClick(asp);
                    }
                    setSelectedAspect(selectedAspect === i ? null : i);
                  }}
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

              return (
                <g key={`planet-${key}`}>
                  <line
                    x1={lineX}
                    y1={lineY}
                    x2={x}
                    y2={y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "48" : "42"}
                    fill={planetColors[key] || "#64748b"}
                    stroke="white"
                    strokeWidth={isHighlighted ? "5" : "3.5"}
                    filter="url(#shadow)"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={() => setHoveredPlanet(key)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                    onClick={() => {
                      if (onPlanetClick) {
                        onPlanetClick(key);
                      } else {
                        setSelectedPlanet(key);
                      }
                    }}
                  />
                  {/* Inner highlight ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "38" : "33"}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                    style={{ pointerEvents: "none" }}
                  />

                  <text
                    x={x}
                    y={y + 2}
                    fontSize={isHighlighted ? "52" : "46"}
                    fontWeight="400"
                    fontFamily="'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Apple Symbols', serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    filter="url(#planetGlow)"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      pointerEvents: "none",
                    }}
                  >
                    {planetGlyphs[key] || "?"}
                  </text>


                </g>
              );
            })}

            {cardinalPoints.map((point, i) => {
              if (point.label !== "ASC") {
                // DSC / MC / FC : simple text marker on outer zodiac ring, no circle in planet zone
                const labelR = radiusOuter + 70;
                const { x: lx, y: ly } = getXY(point.angle, labelR);
                const { x: i1x, y: i1y } = getXY(point.angle, radiusHouses);
                const { x: i2x, y: i2y } = getXY(point.angle, radiusOuter);
                return (
                  <g key={`cardinal-${i}`}>
                    <line x1={i1x} y1={i1y} x2={i2x} y2={i2y}
                      stroke="#334155" strokeWidth="5" strokeLinecap="round" />
                    <text x={lx} y={ly}
                      fontSize="32" fontWeight="900"
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#94a3b8"
                      style={{ fontFamily: "serif", letterSpacing: "1px" }}>
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

              return (
                <g key={`cardinal-${i}`}>
                  <line x1={lineX} y1={lineY} x2={x} y2={y}
                    stroke="#94a3b8" strokeWidth="2" opacity="0.6" />
                  <circle cx={x} cy={y}
                    r={isHighlighted ? "48" : "42"}
                    fill="white" stroke="#1e293b"
                    strokeWidth={isHighlighted ? "5" : "3.5"}
                    filter="url(#shadow)"
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={() => setHoveredPlanet("ascendant")}
                    onMouseLeave={() => setHoveredPlanet(null)}
                    onClick={() => {
                      if (onPlanetClick) { onPlanetClick("ascendant"); }
                      else { setSelectedPlanet("ascendant"); }
                    }}
                  />
                  <text x={x} y={y + 1}
                    fontSize={isHighlighted ? "34" : "30"}
                    fontWeight="900" textAnchor="middle" dominantBaseline="middle"
                    fill="#1e293b"
                    style={{ cursor: "pointer", transition: "all 0.2s", pointerEvents: "none", fontFamily: "serif" }}>
                    ASC
                  </text>

                </g>
              );
            })}
          </svg>
        </div>

        {hoveredPlanet && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-10 border border-slate-700"
            style={{ pointerEvents: "none" }}
          >
            <div className="text-base font-bold">
              {planetNames[hoveredPlanet]} {planetGlyphs[hoveredPlanet]}
            </div>
            <div className="text-sm text-slate-300 mt-1">
              {hoveredPlanet === "ascendant"
                ? `${houses[0]?.sign} ${houses[0]?.signDegree.toFixed(2)}°`
                : `${planetPositions[hoveredPlanet].sign} ${planetPositions[hoveredPlanet].signDegree.toFixed(2)}°`}
            </div>
            <div className="text-sm text-slate-300">
              Maison{" "}
              {hoveredPlanet === "ascendant"
                ? "1"
                : planetPositions[hoveredPlanet].house}
            </div>
          </div>
        )}

        {hoveredAspect !== null && aspects[hoveredAspect] && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-10 border border-slate-700"
            style={{ pointerEvents: "none" }}
          >
            <div className="text-base font-bold">
              {aspects[hoveredAspect].type}
            </div>
            <div className="text-sm text-slate-300 mt-1">
              {planetNames[aspects[hoveredAspect].planet1]}{" "}
              {planetGlyphs[aspects[hoveredAspect].planet1]} -{" "}
              {planetNames[aspects[hoveredAspect].planet2]}{" "}
              {planetGlyphs[aspects[hoveredAspect].planet2]}
            </div>
            <div className="text-sm text-slate-300">
              Orbe: {aspects[hoveredAspect].orb.toFixed(2)}°
            </div>
          </div>
        )}
      </div>

      {!isFullscreen && (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-2 w-full mt-2 md:mt-3">
        <button
          key="ascendant"
          onClick={() => {
            if (onPlanetClick) {
              onPlanetClick("ascendant");
            } else {
              setSelectedPlanet("ascendant");
            }
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
              className={`text-xs truncate hidden md:block ${selectedPlanet === "ascendant" || hoveredPlanet === "ascendant" ? "text-blue-100" : "text-slate-500"}`}
            >
              {houses[0]?.sign} {houses[0]?.signDegree.toFixed(1)}°
            </div>
          </div>
        </button>
        {Object.entries(planetPositions).map(([key, pos]) => (
          <button
            key={key}
            onClick={() => {
              if (onPlanetClick) {
                onPlanetClick(key);
              } else {
                setSelectedPlanet(key);
              }
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
                className={`text-xs truncate hidden md:block ${selectedPlanet === key || hoveredPlanet === key ? "text-blue-100" : "text-slate-500"}`}
              >
                {pos.sign} {pos.signDegree.toFixed(1)}°
              </div>
            </div>
          </button>
        ))}
      </div>
      )}

      {!isFullscreen && (
      <div className="w-full mt-2 p-2 md:p-3 bg-slate-800 rounded-xl shadow-md border border-slate-700">
        <h3 className="text-sm md:text-base font-bold text-white mb-2">
          Légende des signes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm">
          {zodiacSigns.map((sign) => (
            <div key={sign.name} className="flex items-center gap-1">
              <span className="text-xl flex-shrink-0">{sign.emoji}</span>
              <span className="font-medium text-slate-200">{sign.name}</span>
            </div>
          ))}
        </div>
      </div>
      )}

      {!isFullscreen && (
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

      {selectedPlanet && (
        <DetailModal
          planetKey={selectedPlanet}
          position={
            selectedPlanet === "ascendant"
              ? {
                  longitude: houses[0]?.cusp || 0,
                  latitude: 0,
                  distance: 0,
                  sign: houses[0]?.sign || "",
                  signDegree: houses[0]?.signDegree || 0,
                  house: 1,
                }
              : planetPositions[selectedPlanet]
          }
          onClose={() => setSelectedPlanet(null)}
          onNavigateToProfile={onPlanetClick}
        />
      )}
    </div>
  );
}
