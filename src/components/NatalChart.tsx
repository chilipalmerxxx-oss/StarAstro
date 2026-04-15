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
    const stackSpacing = 75; // px between stacked items (circle radius 28 → no overlap)

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
      className={`flex flex-col items-center gap-4 md:gap-6 relative overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 bg-neutral-900 flex items-center justify-center" : "rounded-3xl shadow-2xl p-4 md:p-8"}`}
      style={!isFullscreen ? {
        backgroundImage: `
          radial-gradient(ellipse at 80% 20%, rgba(120, 40, 200, 0.35) 0%, transparent 45%),
          radial-gradient(ellipse at 10% 80%, rgba(60, 20, 140, 0.3) 0%, transparent 40%),
          radial-gradient(ellipse at 60% 60%, rgba(30, 10, 80, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 30%, rgba(180, 100, 255, 0.12) 0%, transparent 35%),
          radial-gradient(2px 2px at 10%, 15%, rgba(255,255,255,0.9), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 20%, 25%, rgba(255,255,255,0.7), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 35%, 10%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
          radial-gradient(2px 2px at 40%, 40%, rgba(255,255,255,0.6), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 50%, 20%, rgba(255,255,255,0.9), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 65%, 35%, rgba(255,255,255,0.7), rgba(255,255,255,0)),
          radial-gradient(2px 2px at 75%, 15%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 85%, 45%, rgba(255,255,255,0.6), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 15%, 60%, rgba(255,255,255,0.7), rgba(255,255,255,0)),
          radial-gradient(2px 2px at 45%, 70%, rgba(255,255,255,0.5), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 70%, 60%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 25%, 85%, rgba(255,255,255,0.6), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 80%, 80%, rgba(255,255,255,0.7), rgba(255,255,255,0)),
          radial-gradient(2px 2px at 55%, 90%, rgba(255,255,255,0.5), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 90%, 70%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 5%, 50%, rgba(255,255,255,0.6), rgba(255,255,255,0)),
          radial-gradient(1.5px 1.5px at 92%, 30%, rgba(255,255,255,0.7), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 60%, 5%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
          radial-gradient(1px 1px at 33%, 55%, rgba(200,180,255,0.6), rgba(255,255,255,0)),
          linear-gradient(135deg, #03000f 0%, #080010 30%, #06000e 60%, #000008 100%)
        `,
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundColor: '#03000f',
        boxShadow: '0 0 60px rgba(120, 40, 200, 0.3), 0 0 120px rgba(60, 20, 140, 0.15), inset 0 0 80px rgba(80, 20, 160, 0.1)',
        border: '1px solid rgba(150, 80, 255, 0.2)',
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
        <div className={`${isFullscreen ? 'w-full h-full max-h-[95vh] flex justify-center items-center' : 'w-full max-w-[450px] flex justify-center'}`}>
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
                    r={isHighlighted ? "32" : "28"}
                    fill={planetColors[key] || "#64748b"}
                    stroke="white"
                    strokeWidth={isHighlighted ? "4" : "3"}
                    filter="url(#shadow)"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={() => setHoveredPlanet(key)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                    onClick={() => setSelectedPlanet(key)}
                  />

                  <text
                    x={x}
                    y={y + 1}
                    fontSize={isHighlighted ? "40" : "38"}
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      pointerEvents: "none",
                    }}
                  >
                    {planetGlyphs[key] || "?"}
                  </text>

                  {/* Degree label outside planet circle */}
                  {(() => {
                    const degText = `${pos.signDegree.toFixed(1)}°`;
                    const approxCharWidth = 10;
                    const paddingX = 10;
                    const paddingY = 6;
                    const rectWidth = Math.max(36, degText.length * approxCharWidth + paddingX * 2);
                    const rectHeight = 20 + paddingY;
                    const circleRadius = 28; // Same as planet circle radius

                    const pPos = conjunctionPositions[key];
                    const baseRadius = pPos?.stackRadius ?? radiusPlanets;
                    const degRadius = baseRadius + 105;
                    const dx = (pPos?.x ?? center) - center;
                    const dy = (pPos?.y ?? center) - center;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    let degX = center + (dx / dist) * degRadius;
                    let degY = center + (dy / dist) * degRadius;

                    // Check if rectangle overlaps with any planet circle
                    const checkOverlap = (testX: number, testY: number) => {
                      for (const [otherKey, otherPos] of Object.entries(conjunctionPositions)) {
                        if (otherKey === key) continue;
                        const cx = otherPos.x;
                        const cy = otherPos.y;
                        const closestX = Math.max(testX - rectWidth / 2, Math.min(testX + rectWidth / 2, cx));
                        const closestY = Math.max(testY - rectHeight / 2, Math.min(testY + rectHeight / 2, cy));
                        const distToPlanet = Math.sqrt((closestX - cx) ** 2 + (closestY - cy) ** 2);
                        if (distToPlanet < circleRadius + 10) return true;
                      }
                      return false;
                    };

                    // Try alternatives if overlap detected
                    if (checkOverlap(degX, degY)) {
                      const offset = 90;
                      const alternatives = [
                        { x: degX, y: degY + offset }, // Below
                        { x: degX - offset, y: degY }, // Left
                        { x: degX + offset, y: degY }, // Right
                      ];
                      for (const alt of alternatives) {
                        if (!checkOverlap(alt.x, alt.y)) {
                          degX = alt.x;
                          degY = alt.y;
                          break;
                        }
                      }
                    }

                    // Clamp to canvas bounds
                    const paddingEdge = 14;
                    degX = Math.max(paddingEdge + rectWidth / 2, Math.min(size - paddingEdge - rectWidth / 2, degX));
                    degY = Math.max(paddingEdge + rectHeight / 2, Math.min(size - paddingEdge - rectHeight / 2, degY));

                    const rectX = degX - rectWidth / 2;
                    const rectY = degY - rectHeight / 2;

                    return (
                      <g key={`deg-${key}`} pointerEvents="none">
                        <rect
                          x={rectX}
                          y={rectY}
                          width={rectWidth}
                          height={rectHeight}
                          rx={10}
                          ry={10}
                          fill="#0f172a"
                          opacity={0.92}
                          stroke="#FFD600"
                          strokeWidth={1.5}
                        />
                        <text
                          x={degX}
                          y={degY + 1}
                          fontSize="15"
                          fontWeight="700"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFD600"
                          style={{ paintOrder: "stroke fill" }}
                        >
                          {degText}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {cardinalPoints.map((point, i) => {
              const stackedPos = conjunctionPositions[point.label];
              const x = stackedPos?.x ?? getXY(point.angle, radiusPlanets).x;
              const y = stackedPos?.y ?? getXY(point.angle, radiusPlanets).y;
              const { x: lineX, y: lineY } = getXY(point.angle, radiusOuter);
              const isAscendant = point.label === "ASC";
              const isHovered = hoveredPlanet === "ascendant" && isAscendant;
              const isSelected = selectedPlanet === "ascendant" && isAscendant;
              const isHighlighted = isAscendant && (isHovered || isSelected);

              return (
                <g key={`cardinal-${i}`}>
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
                    r={isHighlighted ? "32" : "28"}
                    fill="white"
                    stroke={isAscendant ? "#1e293b" : "#64748b"}
                    strokeWidth={isHighlighted ? "4" : "3"}
                    filter="url(#shadow)"
                    style={
                      isAscendant
                        ? {
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }
                        : {}
                    }
                    onMouseEnter={
                      isAscendant
                        ? () => setHoveredPlanet("ascendant")
                        : undefined
                    }
                    onMouseLeave={
                      isAscendant ? () => setHoveredPlanet(null) : undefined
                    }
                    onClick={
                      isAscendant
                        ? () => setSelectedPlanet("ascendant")
                        : undefined
                    }
                  />
                  <text
                    x={x}
                    y={y + 1}
                    fontSize={isHighlighted ? "28" : "26"}
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isAscendant ? "#1e293b" : "#64748b"}
                    style={{
                      cursor: isAscendant ? "pointer" : "default",
                      transition: "all 0.2s",
                      pointerEvents: "none",
                    }}
                  >
                    {point.label}
                  </text>
                  {/* Degree label only for Ascendant */}
                  {point.label === "ASC" && (() => {
                    const degText = `${point.signDegree?.toFixed(1) ?? 0}°`;
                    const sr = stackedPos?.stackRadius ?? radiusPlanets;
                    const degRadius = sr + 105;
                    const dx = x - center;
                    const dy = y - center;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    let degX = center + (dx / dist) * degRadius;
                    let degY = center + (dy / dist) * degRadius;

                    const approxCharWidth = 9;
                    const paddingX = 8;
                    const paddingY = 6;
                    const rectWidth = Math.max(34, degText.length * approxCharWidth + paddingX * 2);
                    const rectHeight = 18 + paddingY;
                    const circleRadius = 28; // Same as cardinal circle radius

                    // Check if rectangle overlaps with any planet/cardinal circle
                    const checkOverlap = (testX: number, testY: number) => {
                      for (const [otherKey, otherPos] of Object.entries(conjunctionPositions)) {
                        if (otherKey === "ASC") continue;
                        const cx = otherPos.x;
                        const cy = otherPos.y;
                        const closestX = Math.max(testX - rectWidth / 2, Math.min(testX + rectWidth / 2, cx));
                        const closestY = Math.max(testY - rectHeight / 2, Math.min(testY + rectHeight / 2, cy));
                        const distToPlanet = Math.sqrt((closestX - cx) ** 2 + (closestY - cy) ** 2);
                        if (distToPlanet < circleRadius + 10) return true;
                      }
                      return false;
                    };

                    // Try alternatives if overlap detected
                    if (checkOverlap(degX, degY)) {
                      const offset = 90;
                      const alternatives = [
                        { x: degX, y: degY + offset }, // Below
                        { x: degX - offset, y: degY }, // Left
                        { x: degX + offset, y: degY }, // Right
                      ];
                      for (const alt of alternatives) {
                        if (!checkOverlap(alt.x, alt.y)) {
                          degX = alt.x;
                          degY = alt.y;
                          break;
                        }
                      }
                    }

                    // Clamp to viewbox
                    const padEdge = 10;
                    degX = Math.max(padEdge + rectWidth / 2, Math.min(size - padEdge - rectWidth / 2, degX));
                    degY = Math.max(padEdge + rectHeight / 2, Math.min(size - padEdge - rectHeight / 2, degY));

                    const rectX = degX - rectWidth / 2;
                    const rectY = degY - rectHeight / 2;

                    return (
                      <g key={`cardinal-deg-${i}`} pointerEvents="none">
                        <rect
                          x={rectX}
                          y={rectY}
                          width={rectWidth}
                          height={rectHeight}
                          rx={8}
                          ry={8}
                          fill="#0f172a"
                          opacity={0.92}
                          stroke="#FFD600"
                          strokeWidth={1}
                        />
                        <text
                          x={degX}
                          y={degY + 1}
                          fontSize="14"
                          fontWeight="700"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFD600"
                          style={{ paintOrder: "stroke fill" }}
                        >
                          {degText}
                        </text>
                      </g>
                    );
                  })()}
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
          onClick={() => setSelectedPlanet("ascendant")}
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
            onClick={() => setSelectedPlanet(key)}
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
        />
      )}
    </div>
  );
}
