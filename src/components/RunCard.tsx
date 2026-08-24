import React, { useState } from "react";
import { 
  Copy, 
  Share2, 
  RefreshCw, 
  Sword, 
  Shield, 
  Scroll, 
  User, 
  Sliders, 
  Skull, 
  Flame, 
  Check, 
  Info 
} from "lucide-react";
import type { PlaythroughRun } from "../engine/types";

interface RunCardProps {
  run: PlaythroughRun;
  onGenerateNew: () => void;
}

export const RunCard: React.FC<RunCardProps> = ({ run, onGenerateNew }) => {
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopySeed = () => {
    navigator.clipboard.writeText(run.seed);
    setCopiedSeed(true);
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const handleShareRun = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?seed=${run.seed}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 anim-slide-up">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 iron-panel p-4">
        {/* Decorative rivets */}
        <div className="rivet rivet-tl"></div>
        <div className="rivet rivet-tr"></div>
        <div className="rivet rivet-bl"></div>
        <div className="rivet rivet-br"></div>

        <div className="flex items-center gap-3">
          <span className="font-heading text-sm text-sand-dark">Seed:</span>
          <span className="font-bold text-rust bg-coal px-3 py-1 font-monospace border border-iron-light">{run.seed}</span>
          <button 
            onClick={handleCopySeed}
            className="btn-metal py-1.5 px-3 text-xs"
            title="Copy Seed to clipboard"
          >
            {copiedSeed ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
            {copiedSeed ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleShareRun}
            className="btn-metal py-1.5 px-3 text-xs"
            title="Copy sharing link"
          >
            {copiedShare ? <Check size={12} className="text-green-500" /> : <Share2 size={12} />}
            {copiedShare ? "Link Copied!" : "Share Run"}
          </button>
          <button 
            onClick={onGenerateNew}
            className="btn-metal py-1.5 px-3 text-xs border-rust text-rust hover:bg-rust hover:text-coal"
            title="Generate a brand new campaign"
          >
            <RefreshCw size={12} />
            Generate Another
          </button>
        </div>
      </div>

      {/* Main Campaign Parchment */}
      <div className="parchment-contract">
        <div className="parchment-contract-inner">
          
          {/* Header Title */}
          <div className="text-center border-b-2 border-dashed border-sand-dark pb-6 mb-8">
            <div className="flex justify-center mb-2">
              <span className={`badge-diff badge-diff-${run.difficulty.level}`}>
                Difficulty: {run.difficulty.name}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark tracking-wider mb-2">
              {run.title}
            </h2>
            <p className="text-xs md:text-sm text-stone-700 italic max-w-xl mx-auto leading-relaxed">
              "{run.description}"
            </p>
          </div>

          {/* Two-Column Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Origins & Identity */}
            <div className="flex flex-col gap-6">
              
              {/* Origin Block */}
              <div>
                <h3 className="metal-header">
                  <Scroll size={16} className="inline mr-2 -mt-1" />
                  Origin
                </h3>
                <div className="pl-2 border-l border-sand-dark/40 flex flex-col gap-2">
                  <div>
                    <span className="font-bold text-xs uppercase text-stone-600 block">Starting Scenario</span>
                    <span className="font-semibold text-text-dark">{run.start.name}</span>
                    <p className="text-xs text-stone-600 mt-0.5">{run.start.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="font-bold text-xs uppercase text-stone-600 block">Race</span>
                      <span className="font-semibold text-text-dark">{run.race.name}</span>
                    </div>
                    <div>
                      <span className="font-bold text-xs uppercase text-stone-600 block">Squad size</span>
                      <span className="font-semibold text-text-dark">{run.startingSquad}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity Block */}
              <div>
                <h3 className="metal-header">
                  <User size={16} className="inline mr-2 -mt-1" />
                  Identity
                </h3>
                <div className="pl-2 border-l border-sand-dark/40 flex flex-col gap-2">
                  <div>
                    <span className="font-bold text-xs uppercase text-stone-600 block">Archetype</span>
                    <span className="font-semibold text-text-dark">{run.archetype.name}</span>
                    <p className="text-xs text-stone-600 mt-0.5">{run.archetype.description}</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase text-stone-600 block">Profession / Lifestyle</span>
                    <span className="font-semibold text-text-dark">{run.profession.name}</span>
                    <p className="text-xs text-stone-600 mt-0.5">{run.profession.description}</p>
                  </div>
                </div>
              </div>

              {/* Combat Block */}
              <div>
                <h3 className="metal-header">
                  <Sword size={16} className="inline mr-2 -mt-1" />
                  Combat & Gear
                </h3>
                <div className="pl-2 border-l border-sand-dark/40 grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-xs uppercase text-stone-600 block">Primary Weapon</span>
                    <span className="font-semibold text-text-dark">{run.weapon.name}</span>
                    <span className="text-xxs uppercase bg-stone-300/60 px-1 py-0.5 rounded block w-max mt-1 text-stone-700">
                      Class: {run.weapon.type}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase text-stone-600 block">Armor Class</span>
                    <span className="font-semibold text-text-dark">{run.armor.name}</span>
                    <span className="text-xxs uppercase bg-stone-300/60 px-1 py-0.5 rounded block w-max mt-1 text-stone-700">
                      Weight: {run.armor.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* World Factions */}
              <div>
                <h3 className="metal-header">
                  <Shield size={16} className="inline mr-2 -mt-1" />
                  Wasteland Politics
                </h3>
                <div className="pl-2 border-l border-sand-dark/40 flex flex-col gap-3">
                  <div>
                    <span className="font-bold text-xs uppercase text-green-700 block">Allied Faction</span>
                    <span className="font-semibold text-text-dark">{run.alliedFaction.name}</span>
                    <p className="text-xs text-stone-600 mt-0.5">{run.alliedFaction.description}</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase text-red block">Hostile Faction</span>
                    <span className="font-semibold text-text-dark">{run.enemyFaction.name}</span>
                    <p className="text-xs text-stone-600 mt-0.5">{run.enemyFaction.description}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Rules & Campaign Objectives */}
            <div className="flex flex-col gap-6">
              
              {/* Campaign Rules */}
              <div>
                <h3 className="metal-header">
                  <Sliders size={16} className="inline mr-2 -mt-1" />
                  Code of Conduct
                </h3>
                <div className="pl-2 border-l border-sand-dark/40 flex flex-col gap-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-bold uppercase text-stone-600 block">Recruitment</span>
                      <span className="font-semibold text-text-dark">{run.rules.recruitment.name}</span>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-stone-600 block">Outposts</span>
                      <span className="font-semibold text-text-dark">{run.rules.baseBuilding.name}</span>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-stone-600 block">Economy</span>
                      <span className="font-semibold text-text-dark">{run.rules.economy.name}</span>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-stone-600 block">Cybernetics</span>
                      <span className="font-semibold text-text-dark">{run.rules.prosthetics.name}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-sand-dark/20 text-xs">
                    <span className="font-bold uppercase text-stone-600 block">Save Rule</span>
                    <span className="font-semibold text-text-dark">{run.rules.saveRules.name}</span>
                    <p className="text-xxs text-stone-600 italic mt-0.5">{run.rules.saveRules.description}</p>
                  </div>
                </div>
              </div>

              {/* Restrictions Block */}
              <div>
                <h3 className="metal-header">
                  <Skull size={16} className="inline mr-2 -mt-1" />
                  Restrictions
                </h3>
                <ul className="pl-4 list-disc border-l border-sand-dark/40 flex flex-col gap-2.5 text-xs text-text-dark font-semibold">
                  {run.restrictions.map((r, i) => (
                    <li key={r.id || i} className="leading-snug">
                      <span className="text-red font-bold">{r.name}:</span>{" "}
                      <span className="font-medium text-stone-700">{r.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Objectives Block */}
              <div>
                <h3 className="metal-header">
                  <Info size={16} className="inline mr-2 -mt-1" />
                  Milestones
                </h3>
                <ol className="pl-4 list-decimal border-l border-sand-dark/40 flex flex-col gap-2.5 text-xs text-text-dark font-semibold">
                  {run.objectives.map((o, i) => (
                    <li key={o.id || i} className="leading-snug">
                      <span className="font-bold text-stone-800">{o.name}:</span>{" "}
                      <span className="font-medium text-stone-700">{o.description}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Final Objective Block */}
              <div className="mt-2 bg-stone-300/40 p-4 border border-sand-dark/30 rounded-sm">
                <h3 className="text-lg font-heading text-red flex items-center gap-2 mb-2">
                  <Flame size={18} className="fill-current animate-pulse" />
                  Final Objective
                </h3>
                <div className="pl-1">
                  <span className="font-bold text-xs uppercase text-stone-700 block">The Destiny's Call</span>
                  <span className="font-bold text-sm text-text-dark leading-tight block mt-1">
                    {run.finalObjective.name}
                  </span>
                  <p className="text-xs text-stone-700 mt-1.5 font-medium leading-relaxed">
                    {run.finalObjective.description}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Stamped Date or Seed Identifier */}
          <div className="text-right border-t border-dashed border-sand-dark pt-4 mt-8 flex justify-between items-center text-xxs text-stone-500 font-monospace uppercase">
            <span>Kenshi Fate campaign contract</span>
            <span>{run.dateStr ? `Daily Challenge: ${run.dateStr}` : `Seed: ${run.seed}`}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
