import React from "react";
import { Sliders, RefreshCw } from "lucide-react";
import type { CustomOptions, DifficultyLevel, Language } from "../engine/types";
import { starts, races } from "../data";
import { uiTranslations } from "../data/uiTranslations";

interface CustomizerProps {
  options: CustomOptions;
  lang: Language;
  onChange: (options: CustomOptions) => void;
  onGenerate: () => void;
}

export const Customizer: React.FC<CustomizerProps> = ({ 
  options, 
  lang, 
  onChange, 
  onGenerate 
}) => {
  const t = uiTranslations[lang];

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
          {t.configureDestiny}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.difficultyLevel}
          </label>
          <select
            value={options.difficulty === undefined ? "random" : options.difficulty}
            onChange={(e) => handleSelectChange("difficulty", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomFate}</option>
            <option value="0">{lang === "en" ? "Wanderer (Easy)" : lang === "pt" ? "Andarilho (Fácil)" : "Vagabundo (Fácil)"}</option>
            <option value="1">{lang === "en" ? "Survivor (Medium)" : lang === "pt" ? "Sobrevivente (Médio)" : "Superviviente (Medio)"}</option>
            <option value="2">{lang === "en" ? "Brutal (Hard)" : lang === "pt" ? "Brutal (Difícil)" : "Brutal (Difícil)"}</option>
            <option value="3">{lang === "en" ? "Beep (Chaotic)" : lang === "pt" ? "Beep (Caótico)" : "Beep (Caótico)"}</option>
          </select>
        </div>

        {/* Start Scenario */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.startingScenario}
          </label>
          <select
            value={options.start || "random"}
            onChange={(e) => handleSelectChange("start", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomStart}</option>
            {starts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.race}
          </label>
          <select
            value={options.race || "random"}
            onChange={(e) => handleSelectChange("race", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomRace}</option>
            {races.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* Base Building */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.basePreference}
          </label>
          <select
            value={options.baseBuilding || "random"}
            onChange={(e) => handleSelectChange("baseBuilding", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomBasePreference}</option>
            <option value="Allowed">{t.allowedFree}</option>
            <option value="Forbidden">{t.forbiddenNomad}</option>
            <option value="Required">{t.requiredOutpost}</option>
          </select>
        </div>

        {/* Recruitment */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.squadRecruitment}
          </label>
          <select
            value={options.recruitment || "random"}
            onChange={(e) => handleSelectChange("recruitment", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomRecruitLimits}</option>
            <option value="Unlimited">{t.unlimitedRecruitment}</option>
            <option value="Limited">{t.limitedMax5}</option>
            <option value="Solo">{t.soloRun}</option>
          </select>
        </div>

        {/* Ironman Mode */}
        <div>
          <label className="font-heading text-xs tracking-wider text-sand-dark block mb-2">
            {t.ironmanSaving}
          </label>
          <select
            value={options.ironman === undefined ? "random" : String(options.ironman)}
            onChange={(e) => handleSelectChange("ironman", e.target.value)}
            className="select-custom"
          >
            <option value="random">{t.randomSaveRules}</option>
            <option value="true">{t.yesTrueIronman}</option>
            <option value="false">{t.noReloading}</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onGenerate}
          className="btn-metal btn-metal-rust w-full md:w-auto"
        >
          <RefreshCw size={18} />
          {t.generateCustomRun}
        </button>
      </div>
    </div>
  );
};
