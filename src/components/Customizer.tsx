import React from "react";
import { Sliders, RefreshCw } from "lucide-react";
import type { CustomOptions, DifficultyLevel } from "../engine/types";
import { starts, races } from "../data";

interface CustomizerProps {
  options: CustomOptions;
  onChange: (options: CustomOptions) => void;
  onGenerate: () => void;
}

export const Customizer: React.FC<CustomizerProps> = ({ options, onChange, onGenerate }) => {
  const handleSelectChange = (key: keyof CustomOptions, value: any) => {
    let parsedValue = value;
    if (value === "true") parsedValue = true;
    if (value === "false") parsedValue = false;
    if (value === "random") parsedValue = "random";
    if (key === "difficulty" && value !== "random") parsedValue = parseInt(value, 10) as DifficultyLevel;

    onChange({
      ...options,
      [key]: parsedValue,
    });
  };

  return (
    <div className="w-full iron-panel p-6 anim-slide-up">
      {/* Decorative rivets */}
      <div className="rivet rivet-tl"></div>
      <div className="rivet rivet-tr"></div>
      <div className="rivet rivet-bl"></div>
      <div className="rivet rivet-br"></div>

      <div className="flex items-center gap-2 border-b border-iron-light pb-3 mb-6">
        <Sliders size={20} className="text-rust" />
        <h2 className="text-xl font-heading text-sand-light tracking-wider">
          Configure Your Destiny
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Difficulty Level
          </label>
          <select
            value={options.difficulty === undefined ? "random" : options.difficulty}
            onChange={(e) => handleSelectChange("difficulty", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Fate</option>
            <option value="0">Wanderer (Easy)</option>
            <option value="1">Survivor (Medium)</option>
            <option value="2">Brutal (Hard)</option>
            <option value="3">Beep (Chaotic)</option>
          </select>
        </div>

        {/* Start Scenario */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Starting Scenario
          </label>
          <select
            value={options.start || "random"}
            onChange={(e) => handleSelectChange("start", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Start</option>
            {starts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Main Character Race
          </label>
          <select
            value={options.race || "random"}
            onChange={(e) => handleSelectChange("race", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Race</option>
            {races.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Base Building */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Base Building Preference
          </label>
          <select
            value={options.baseBuilding || "random"}
            onChange={(e) => handleSelectChange("baseBuilding", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Outpost Preference</option>
            <option value="Allowed">Allowed / Free choice</option>
            <option value="Forbidden">Forbidden (City Dwellers)</option>
            <option value="Required">Required Outpost</option>
          </select>
        </div>

        {/* Recruitment */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Squad Recruitment
          </label>
          <select
            value={options.recruitment || "random"}
            onChange={(e) => handleSelectChange("recruitment", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Recruit Limits</option>
            <option value="Unlimited">Unlimited Recruitment</option>
            <option value="Limited">Limited (Max 5)</option>
            <option value="Solo">Solo Run (No Recruits)</option>
          </select>
        </div>

        {/* Ironman Mode */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            Ironman Saving Rule
          </label>
          <select
            value={options.ironman === undefined ? "random" : String(options.ironman)}
            onChange={(e) => handleSelectChange("ironman", e.target.value)}
            className="select-custom"
          >
            <option value="random">Random Save Rules</option>
            <option value="true">Yes (True Ironman)</option>
            <option value="false">No (Reloading Allowed)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onGenerate}
          className="btn-metal btn-metal-rust w-full md:w-auto"
        >
          <RefreshCw size={18} />
          Generate Custom Run
        </button>
      </div>
    </div>
  );
};
