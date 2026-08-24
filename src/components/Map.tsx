import React from "react";
import type { PlaythroughRun, Language } from "../engine/types";
import { locations } from "../data/locations";
import { uiTranslations } from "../data/uiTranslations";

interface MapProps {
  run: PlaythroughRun;
  lang: Language;
}

export const Map: React.FC<MapProps> = ({ run, lang }) => {
  const t = uiTranslations[lang];

  // Resolve starting location
  const startLoc = locations.find((l) => l.id === run.start.startingLocationId);
  // Resolve final objective target location
  const targetLoc = locations.find((l) => l.id === run.finalObjective.targetLocationId);

  return (
    <div className="relative w-full overflow-hidden border border-sand-dark/50 bg-parchment-dark p-2 rounded-sm shadow-md" style={{ backgroundColor: "#dfd0b8" }}>
      {/* Map title header */}
      <div className="flex items-center justify-between border-b border-stone-400 pb-1 mb-2 text-xxs font-monospace uppercase text-stone-700 font-bold">
        <span>🗺️ {t.journey}</span>
        <span>Kenshi Continent</span>
      </div>

      <div className="relative" style={{ aspectRatio: "4 / 3", width: "100%" }}>
        <svg
          viewBox="0 0 100 75"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gridlines */}
          <line x1="25" y1="0" x2="25" y2="75" stroke="#c0b098" strokeWidth="0.25" strokeDasharray="2 2" />
          <line x1="50" y1="0" x2="50" y2="75" stroke="#c0b098" strokeWidth="0.25" strokeDasharray="2 2" />
          <line x1="75" y1="0" x2="75" y2="75" stroke="#c0b098" strokeWidth="0.25" strokeDasharray="2 2" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#c0b098" strokeWidth="0.25" strokeDasharray="2 2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#c0b098" strokeWidth="0.25" strokeDasharray="2 2" />

          {/* Compass Rose */}
          <g transform="translate(90, 15)">
            <circle cx="0" cy="0" r="6" stroke="#5a5246" strokeWidth="0.5" strokeDasharray="1 1" fill="none" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#5a5246" strokeWidth="0.75" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#5a5246" strokeWidth="0.75" />
            <polygon points="0,-8 -2,-2 0,0 2,-2" fill="#5a5246" />
            <polygon points="0,8 -2,2 0,0 2,2" fill="#5a5246" />
            <polygon points="8,0 2,-2 0,0 2,2" fill="#5a5246" />
            <polygon points="-8,0 -2,-2 0,0 -2,2" fill="#5a5246" />
            <text x="0" y="-10" textAnchor="middle" fontSize="3" fontFamily="Courier Prime" fill="#5a5246" fontWeight="bold">N</text>
          </g>

          {/* Map Scale */}
          <g transform="translate(5, 70)">
            <line x1="0" y1="0" x2="15" y2="0" stroke="#5a5246" strokeWidth="0.75" />
            <line x1="0" y1="-1" x2="0" y2="1" stroke="#5a5246" strokeWidth="0.75" />
            <line x1="7.5" y1="-1" x2="7.5" y2="1" stroke="#5a5246" strokeWidth="0.75" />
            <line x1="15" y1="-1" x2="15" y2="1" stroke="#5a5246" strokeWidth="0.75" />
            <text x="7.5" y="-2" textAnchor="middle" fontSize="2.5" fontFamily="Courier Prime" fill="#5a5246">100 miles</text>
          </g>

          {/* Continent Landmass Outline (Simplified Kenshi crescent map) */}
          <path
            d="M 15 45 
               C 10 32, 18 18, 35 15 
               C 50 12, 68 8, 85 18 
               C 92 24, 95 38, 88 50 
               C 82 60, 86 70, 72 72 
               C 60 74, 45 68, 38 65
               C 32 62, 28 66, 22 62
               C 16 58, 20 50, 15 45 Z
               M 40 40 
               C 38 48, 48 54, 52 48 
               C 56 42, 45 32, 40 40 Z"
            fill="#e2d4bd"
            stroke="#5a5246"
            strokeWidth="1.25"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Inner Bay / Gulf / Islands Details */}
          {/* Northern Island (World's End area peak) */}
          <path d="M 45 10 C 48 8, 52 10, 50 12 C 48 14, 44 12, 45 10 Z" fill="#e2d4bd" stroke="#5a5246" strokeWidth="0.5" />
          {/* Southern/East Island (Catun area) */}
          <path d="M 60 74 C 62 72, 65 73, 64 75 C 63 77, 59 76, 60 74 Z" fill="#e2d4bd" stroke="#5a5246" strokeWidth="0.5" />

          {/* Mountain sketches (triangular details inside map) */}
          {/* World's End Ridge */}
          <path d="M 42 16 L 45 13 L 48 16 M 46 16 L 49 12 L 52 16" stroke="#7a6f5e" strokeWidth="0.5" fill="none" />
          {/* Border Zone hills */}
          <path d="M 22 54 L 25 50 L 28 54 M 26 54 L 29 49 L 32 54" stroke="#7a6f5e" strokeWidth="0.5" fill="none" />
          {/* Fog Islands */}
          <path d="M 12 36 C 14 34, 16 38, 14 40" stroke="#7a6f5e" strokeWidth="0.5" fill="none" />

          {/* Dotted Route Line connecting Start to Target */}
          {startLoc && targetLoc && (
            <path
              d={`M ${startLoc.x} ${startLoc.y * 0.75} Q ${(startLoc.x + targetLoc.x) / 2} ${((startLoc.y + targetLoc.y) / 2) * 0.75 - 5}, ${targetLoc.x} ${targetLoc.y * 0.75}`}
              fill="none"
              stroke="#c2593f"
              strokeWidth="1.25"
              strokeDasharray="2 2"
              strokeLinecap="round"
            />
          )}

          {/* Draw all key location anchor points in sand-dark color */}
          {locations.map((loc) => {
            const isStart = startLoc?.id === loc.id;
            const isTarget = targetLoc?.id === loc.id;
            // Only draw visual nodes for selected locations to keep the tavern map clean
            if (!isStart && !isTarget) return null;

            return (
              <g key={loc.id} className="transition-all duration-150">
                {isStart && (
                  <g transform={`translate(${loc.x}, ${loc.y * 0.75})`}>
                    {/* Ripple animation */}
                    <circle cx="0" cy="0" r="4" stroke="#4a7c59" strokeWidth="0.5" fill="none" opacity="0.6" className="animate-ping" style={{ transformOrigin: "center" }} />
                    {/* Camp outline / Cross */}
                    <polygon points="0,-4 -4,3 4,3" fill="#4a7c59" stroke="#1e1a17" strokeWidth="0.5" />
                    <line x1="0" y1="-4" x2="0" y2="3" stroke="#1e1a17" strokeWidth="0.5" />
                    {/* Label */}
                    <rect x="5" y="-6" width="30" height="7" fill="#f2e7d5" stroke="#5a5246" strokeWidth="0.5" rx="1" />
                    <text x="7" y="-2" fontSize="3.5" fontFamily="Special Elite" fill="#1e1a17" fontWeight="bold">
                      {t.startLocation}
                    </text>
                    <text x="0" y="7" textAnchor="middle" fontSize="3.5" fontFamily="Courier Prime" fill="#1e1a17" fontWeight="bold">
                      {loc.name[lang]}
                    </text>
                  </g>
                )}

                {isTarget && (
                  <g transform={`translate(${loc.x}, ${loc.y * 0.75})`}>
                    {/* Ripple animation */}
                    <circle cx="0" cy="0" r="4" stroke="#b92525" strokeWidth="0.5" fill="none" opacity="0.6" className="animate-ping" style={{ transformOrigin: "center" }} />
                    {/* Danger Flag outline */}
                    <polygon points="-2,-5 4,-2.5 -2,0" fill="#b92525" stroke="#1e1a17" strokeWidth="0.5" />
                    <line x1="-2" y1="-5" x2="-2" y2="4" stroke="#1e1a17" strokeWidth="0.75" />
                    {/* Label */}
                    <rect x="5" y="-6" width="32" height="7" fill="#f2e7d5" stroke="#b92525" strokeWidth="0.5" rx="1" />
                    <text x="7" y="-2" fontSize="3.5" fontFamily="Special Elite" fill="#b92525" fontWeight="bold">
                      {t.targetLocation}
                    </text>
                    <text x="0" y="8" textAnchor="middle" fontSize="3.5" fontFamily="Courier Prime" fill="#b92525" fontWeight="bold">
                      {loc.name[lang]}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Legend */}
      <div className="flex justify-center gap-4 mt-2 pt-1.5 border-t border-stone-400 text-xxs font-monospace text-stone-700">
        {startLoc && (
          <div className="flex items-center gap-1.5">
            <span style={{ display: "inline-block", width: "0", height: "0", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: "7px solid #4a7c59" }}></span>
            <span>{startLoc.name[lang]} ({t.startLocation})</span>
          </div>
        )}
        {targetLoc && (
          <div className="flex items-center gap-1.5">
            <span style={{ display: "inline-block", width: "6px", height: "6px", backgroundColor: "#b92525", transform: "rotate(45deg)" }}></span>
            <span>{targetLoc.name[lang]} ({t.targetLocation})</span>
          </div>
        )}
      </div>
    </div>
  );
};
