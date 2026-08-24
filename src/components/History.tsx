import React from "react";
import { History as HistoryIcon, Trash2, ArrowRight } from "lucide-react";
import type { PlaythroughRun, Language } from "../engine/types";
import { uiTranslations } from "../data/uiTranslations";

interface HistoryProps {
  runs: PlaythroughRun[];
  lang: Language;
  onSelectRun: (run: PlaythroughRun) => void;
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ 
  runs, 
  lang, 
  onSelectRun, 
  onClearHistory 
}) => {
  const t = uiTranslations[lang];

  if (runs.length === 0) {
    return null;
  }

  return (
    <div className="w-full iron-panel p-6 mt-8 anim-slide-up">
      {/* Decorative rivets */}
      <div className="rivet rivet-tl"></div>
      <div className="rivet rivet-tr"></div>
      <div className="rivet rivet-bl"></div>
      <div className="rivet rivet-br"></div>

      <div className="flex items-center justify-between border-b border-iron-light pb-3 mb-4">
        <div className="flex items-center gap-2">
          <HistoryIcon size={18} className="text-rust" />
          <h2 className="text-lg font-heading text-sand-light tracking-wider">
            {t.recentRuns}
          </h2>
        </div>
        <button
          onClick={onClearHistory}
          className="btn-metal py-1 px-3 text-xxs flex items-center gap-1 border-red/40 hover:border-red hover:bg-red/10 text-red-light"
          title="Clear all saved history"
        >
          <Trash2 size={10} />
          {t.clearHistory}
        </button>
      </div>

      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
        {runs.map((run, index) => (
          <div
            key={`${run.seed}-${index}`}
            onClick={() => onSelectRun(run)}
            className="flex items-center justify-between bg-coal/50 hover:bg-iron-light/30 border border-iron-light/60 hover:border-rust/40 p-3 cursor-pointer transition-all duration-150 group"
          >
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-semibold text-xs font-typewriter text-sand-light group-hover:text-rust transition-colors">
                  {run.title[lang]}
                </span>
                <span className={`badge-diff badge-diff-${run.difficulty.level} px-1.5 py-0.5 text-xxs`}>
                  {run.difficulty.name[lang]}
                </span>
              </div>
              <span className="text-xxs text-sand-dark">
                {run.start.name[lang]} • {run.race.name[lang]} • {run.seed}
              </span>
            </div>
            <ArrowRight size={14} className="text-sand-dark group-hover:text-rust group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
