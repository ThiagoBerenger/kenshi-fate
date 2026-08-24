import React, { useState } from "react";
import type { PlaythroughRun, Language } from "../engine/types";
import { locations } from "../data/locations";
import type { LocationItem } from "../data/locations";
import { uiTranslations } from "../data/uiTranslations";

interface MapProps {
  run: PlaythroughRun;
  lang: Language;
}

export const Map: React.FC<MapProps> = ({ run, lang }) => {
  const t = uiTranslations[lang];
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // 1. Resolve start and target locations
  const startLoc = locations.find((l) => l.id === run.start.startingLocationId);
  const finalTargetLoc = locations.find((l) => l.id === run.finalObjective.targetLocationId);

  // 2. Resolve intermediate objective locations
  const objectiveLocs = run.objectives
    .map((o) => {
      if (!o.targetLocationId) return null;
      const loc = locations.find((l) => l.id === o.targetLocationId);
      if (!loc) return null;
      return {
        ...loc,
        objectiveName: o.name[lang],
      };
    })
    .filter(Boolean) as (LocationItem & { objectiveName: string })[];

  // 3. Resolve danger location (enemy faction capital if not already start/final objective)
  const factionCapitals: Record<string, string> = {
    united_cities: "heft",
    holy_nation: "blister_hill",
    shek_kingdom: "admag",
    skin_bandits: "ashlands",
  };
  const enemyCapitalId = factionCapitals[run.enemyFaction.id];
  const dangerLoc = enemyCapitalId ? locations.find((l) => l.id === enemyCapitalId) : null;
  const showDangerLoc = dangerLoc && dangerLoc.id !== startLoc?.id && dangerLoc.id !== finalTargetLoc?.id;

  // 4. Assemble all active markers
  const markers: {
    id: string;
    x: number;
    y: number;
    name: string;
    region?: string;
    type: "start" | "objective" | "danger" | "final_target";
    labelText: string;
    subText?: string;
  }[] = [];

  if (startLoc) {
    markers.push({
      id: `start-${startLoc.id}`,
      x: startLoc.x,
      y: startLoc.y,
      name: startLoc.name[lang],
      region: startLoc.region?.[lang],
      type: "start",
      labelText: lang === "en" ? "START" : lang === "pt" ? "PARTIDA" : "INICIO",
      subText: run.start.name[lang],
    });
  }

  objectiveLocs.forEach((o, i) => {
    markers.push({
      id: `obj-${o.id}-${i}`,
      x: o.x,
      y: o.y,
      name: o.name[lang],
      region: o.region?.[lang],
      type: "objective",
      labelText: lang === "en" ? "OBJECTIVE" : lang === "pt" ? "OBJETIVO" : "OBJETIVO",
      subText: o.objectiveName,
    });
  });

  if (showDangerLoc && dangerLoc) {
    markers.push({
      id: `danger-${dangerLoc.id}`,
      x: dangerLoc.x,
      y: dangerLoc.y,
      name: dangerLoc.name[lang],
      region: dangerLoc.region?.[lang],
      type: "danger",
      labelText: lang === "en" ? "DANGER" : lang === "pt" ? "PERIGO" : "PELIGRO",
      subText: `${run.enemyFaction.name[lang]} Capital`,
    });
  }

  if (finalTargetLoc) {
    markers.push({
      id: `final-${finalTargetLoc.id}`,
      x: finalTargetLoc.x,
      y: finalTargetLoc.y,
      name: finalTargetLoc.name[lang],
      region: finalTargetLoc.region?.[lang],
      type: "final_target",
      labelText: lang === "en" ? "FINAL TARGET" : lang === "pt" ? "ALVO FINAL" : "OBJETIVO FINAL",
      subText: run.finalObjective.name[lang],
    });
  }

  // 5. Build sequential path points for drawing the dotted journey route
  const journeyPoints = [
    startLoc,
    ...objectiveLocs,
    finalTargetLoc,
  ].filter(Boolean) as LocationItem[];

  // Helper to generate a curved SVG path connecting journey points
  const getBezierPath = (points: LocationItem[]) => {
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const offset = 4; // perpendicular curve offset
      const cx = midX - (dy / len) * offset;
      const cy = midY + (dx / len) * offset;
      path += ` Q ${cx} ${cy}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  // Helper to handle map clicks and output coordinates in dev mode
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (import.meta.env.DEV) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      console.log(`x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);
    }
  };

  // Helper to render custom marker icon
  const renderMarkerIcon = (type: string) => {
    switch (type) {
      case "start":
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-stone-900 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M5 5 C 10 10, 14 14, 19 19 M19 5 C 15 10, 10 14, 5 19" />
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        );
      case "danger":
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-800 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <polygon points="12,3 22,20 2,20" fill="currentColor" fillOpacity="0.1" />
            <line x1="12" y1="9" x2="12" y2="14" strokeWidth="3.5" />
            <circle cx="12" cy="17" r="1.5" fill="currentColor" />
          </svg>
        );
      case "final_target":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-950 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] animate-pulse" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="9" strokeWidth="3" />
            <circle cx="12" cy="12" r="5" strokeWidth="1.5" strokeDasharray="2 2" />
            <polygon points="12,7 13.5,10.5 17,11 14.5,13.5 15,17 12,15 9,17 9.5,13.5 7,11 10.5,10.5" fill="currentColor" />
          </svg>
        );
      case "objective":
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-850 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
      {/* Map Container */}
      <div 
        className="relative w-full overflow-hidden border border-sand-dark/50 bg-parchment-dark shadow-md select-none"
        style={{ backgroundColor: "#dfd0b8" }}
      >
        {/* Map Header */}
        <div className="flex items-center justify-between border-b border-stone-400/40 p-2 bg-stone-300/10 text-xxs font-monospace uppercase text-stone-750 font-bold">
          <span>🗺️ {t.journey}</span>
          <span>Kenshi Continent</span>
        </div>

        {/* Map Image & Overlays */}
        <div className="relative w-full" onClick={handleMapClick}>
          {/* Main Map Background */}
          <img 
            src="/assets/maps/kenshi-world-map.webp" 
            alt="Kenshi World Map" 
            className="w-full h-auto block"
            loading="lazy"
          />

          {/* Dotted Journey Path Overlay */}
          {journeyPoints.length >= 2 && (
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path 
                d={getBezierPath(journeyPoints)} 
                fill="none" 
                stroke="#913a25" 
                strokeWidth="2.5" 
                strokeDasharray="4 4" 
                strokeLinecap="round" 
                style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.45))" }}
              />
            </svg>
          )}

          {/* Markers overlay */}
          {markers.map((marker) => {
            const isHovered = activeTooltip === marker.id;
            
            // Align tooltips relative to marker position to avoid edge clipping
            const tooltipClass = `absolute bottom-full mb-2 w-44 bg-parchment text-text-dark border border-sand-dark p-2.5 shadow-lg z-50 text-left rounded-sm font-monospace pointer-events-auto transition-all duration-150 ${
              marker.x < 25 
                ? "left-0" 
                : marker.x > 75 
                  ? "right-0" 
                  : "left-1/2 -translate-x-1/2"
            }`;

            return (
              <div
                key={marker.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, zIndex: isHovered ? 40 : 10 }}
                onMouseEnter={() => setActiveTooltip(marker.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(activeTooltip === marker.id ? null : marker.id);
                }}
              >
                {/* Marker Emblem */}
                <div className="hover:scale-115 active:scale-95 transition-transform duration-100 flex items-center justify-center">
                  {renderMarkerIcon(marker.type)}
                </div>

                {/* Desktop static label */}
                <span className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-bold text-stone-900 bg-parchment/80 px-1 border border-sand-dark/30 rounded-sm whitespace-nowrap pointer-events-none font-monospace select-none">
                  {marker.name}
                </span>

                {/* Tooltip Overlay */}
                {isHovered && (
                  <div 
                    className={tooltipClass}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="font-bold text-[9px] tracking-wider text-rust-dark uppercase border-b border-sand-dark/40 pb-0.5 mb-1">
                      {marker.labelText}
                    </div>
                    <div className="font-bold text-xs text-stone-900 leading-tight">
                      {marker.name}
                    </div>
                    {marker.region && (
                      <div className="text-[10px] text-stone-600 font-medium mt-0.5">
                        {marker.region}
                      </div>
                    )}
                    {marker.subText && (
                      <div className="text-[9px] italic text-stone-750 font-bold border-t border-dashed border-sand-dark/30 pt-1 mt-1">
                        {marker.subText}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Attribution */}
      <div className="flex justify-between items-center px-1 text-[10px] font-monospace text-stone-500">
        <span>Map source / credits: Community Map Placeholder</span>
        {import.meta.env.DEV && (
          <span className="text-rust font-bold">(Dev Mode: Click map for coordinates)</span>
        )}
      </div>
    </div>
  );
};
