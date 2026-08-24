import { useState, useEffect } from "react";
import { Dices, Sliders, Calendar, ArrowLeft } from "lucide-react";
import { Layout } from "./components/Layout";
import { RunCard } from "./components/RunCard";
import { Customizer } from "./components/Customizer";
import { History } from "./components/History";
import { FateLoader } from "./components/FateLoader";
import { generateRun } from "./engine/generator";
import { generateRandomSeed } from "./engine/seededRandom";
import type { PlaythroughRun, CustomOptions, Language } from "./engine/types";
import { uiTranslations } from "./data/uiTranslations";

const LOCAL_STORAGE_KEY = "kenshi-fate-runs-history";
const LANG_STORAGE_KEY = "kenshi-fate-language";

function App() {
  const [lang, setLang] = useState<Language>(() => {
    // 1. Check local storage
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "en" || saved === "pt" || saved === "es") {
      return saved as Language;
    }
    // 2. Check browser locale
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "pt") return "pt";
    if (browserLang === "es") return "es";
    return "en";
  });

  const [view, setView] = useState<"home" | "run">("home");
  const [currentRun, setCurrentRun] = useState<PlaythroughRun | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState<CustomOptions>({
    difficulty: "random",
    race: "random",
    start: "random",
    baseBuilding: "random",
    recruitment: "random",
    ironman: "random",
  });
  const [history, setHistory] = useState<PlaythroughRun[]>([]);

  const t = uiTranslations[lang];

  // 1. Initial Load: Check URL Seed & Load History
  useEffect(() => {
    // Load history
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load runs history", e);
    }

    // Check seed in URL
    const params = new URLSearchParams(window.location.search);
    const seed = params.get("seed");
    if (seed) {
      triggerGeneration(seed);
    }

    // Listen to back/forward navigation
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const s = p.get("seed");
      if (s) {
        triggerGeneration(s, true); // skip loading to make navigation fast
      } else {
        setView("home");
        setCurrentRun(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 2. Language Change handler
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (e) {
      console.error(e);
    }
  };

  // 3. Generation Trigger
  const triggerGeneration = (seed: string, skipLoader = false, options?: CustomOptions) => {
    if (skipLoader) {
      resolveRun(seed, options);
    } else {
      setIsLoading(true);
      setView("run");
      setTimeout(() => {
        resolveRun(seed, options);
        setIsLoading(false);
      }, 950); // Thematic wait time for the wind to settle
    }
  };

  const resolveRun = (seed: string, options?: CustomOptions) => {
    const run = generateRun(seed, options);
    
    // Check if it's a daily run to format its date info
    if (seed.startsWith("daily-")) {
      run.dateStr = seed.replace("daily-", "");
    }
    
    setCurrentRun(run);
    setView("run");

    // Update URL seed param silently
    const params = new URLSearchParams(window.location.search);
    if (params.get("seed") !== seed) {
      window.history.pushState({ seed }, "", `?seed=${seed}`);
    }

    // Save to history (don't repeat, keep latest on top)
    setHistory((prev) => {
      const filtered = prev.filter((x) => x.seed !== seed);
      const updated = [run, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save runs history", e);
      }
      return updated;
    });
  };

  // 4. Game Mode Triggers
  const handleRandomRun = () => {
    const seed = generateRandomSeed();
    triggerGeneration(seed);
  };

  const handleCustomRun = () => {
    const seed = generateRandomSeed();
    triggerGeneration(seed, false, customOptions);
  };

  const handleDailyChallenge = () => {
    const d = new Date();
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const seed = `daily-${year}-${month}-${day}`;
    triggerGeneration(seed);
  };

  const handleNavigateHome = () => {
    setView("home");
    setCurrentRun(null);
    window.history.pushState(null, "", window.location.pathname);
  };

  const handleSelectHistoryRun = (run: PlaythroughRun) => {
    triggerGeneration(run.seed, true);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout lang={lang} onLanguageChange={handleLanguageChange} onNavigateHome={handleNavigateHome}>
      {isLoading ? (
        <FateLoader lang={lang} />
      ) : view === "run" && currentRun ? (
        <div className="flex flex-col gap-4">
          <div>
            <button
              onClick={handleNavigateHome}
              className="btn-metal py-2 px-4 text-xs inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={12} />
              {t.returnToCamp}
            </button>
          </div>
          <RunCard run={currentRun} lang={lang} onGenerateNew={handleRandomRun} />
        </div>
      ) : (
        /* Home Screen */
        <div className="flex flex-col gap-8 anim-slide-up text-center">
          <div className="iron-panel p-8 flex flex-col items-center">
            {/* Decorative rivets */}
            <div className="rivet rivet-tl"></div>
            <div className="rivet rivet-tr"></div>
            <div className="rivet rivet-bl"></div>
            <div className="rivet rivet-br"></div>

            <h2 className="text-2xl font-heading text-rust mb-2">
              {t.heroSubtitle}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-sand-light/95 font-monospace">
              {t.heroDescription}
            </p>

            <div className="mt-8">
              <button
                onClick={handleRandomRun}
                className="btn-metal btn-metal-rust text-lg px-8 py-4 animate-pulse hover:animate-none"
              >
                <Dices size={20} />
                {t.generateRun}
              </button>
            </div>
          </div>

          {/* Three Ways to Play Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Random Run */}
            <div 
              onClick={handleRandomRun}
              className="iron-panel p-6 cursor-pointer hover:border-rust/60 hover:translate-y-[-2px] transition-all group"
            >
              <div className="rivet rivet-tl"></div>
              <div className="rivet rivet-tr"></div>
              <div className="rivet rivet-bl"></div>
              <div className="rivet rivet-br"></div>
              
              <div className="flex flex-col items-center">
                <Dices size={24} className="text-rust mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg text-sand-light mb-1">{t.randomRun}</h3>
                <p className="text-xs text-sand-dark">
                  {t.randomRunDesc}
                </p>
              </div>
            </div>

            {/* Card 2: Custom Run */}
            <div 
              onClick={() => setCustomizerOpen(!customizerOpen)}
              className={`iron-panel p-6 cursor-pointer hover:border-rust/60 hover:translate-y-[-2px] transition-all group ${customizerOpen ? 'border-rust bg-iron-light/20' : ''}`}
            >
              <div className="rivet rivet-tl"></div>
              <div className="rivet rivet-tr"></div>
              <div className="rivet rivet-bl"></div>
              <div className="rivet rivet-br"></div>

              <div className="flex flex-col items-center">
                <Sliders size={24} className="text-rust mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg text-sand-light mb-1">{t.customRun}</h3>
                <p className="text-xs text-sand-dark">
                  {t.customRunDesc}
                </p>
              </div>
            </div>

            {/* Card 3: Daily Challenge */}
            <div 
              onClick={handleDailyChallenge}
              className="iron-panel p-6 cursor-pointer hover:border-rust/60 hover:translate-y-[-2px] transition-all group"
            >
              <div className="rivet rivet-tl"></div>
              <div className="rivet rivet-tr"></div>
              <div className="rivet rivet-bl"></div>
              <div className="rivet rivet-br"></div>

              <div className="flex flex-col items-center">
                <Calendar size={24} className="text-rust mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg text-sand-light mb-1">{t.dailyChallenge}</h3>
                <p className="text-xs text-sand-dark">
                  {t.dailyChallengeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Conditional Customizer Panel */}
          {customizerOpen && (
            <Customizer
              options={customOptions}
              lang={lang}
              onChange={setCustomOptions}
              onGenerate={handleCustomRun}
            />
          )}

          {/* Local History Panel */}
          <History
            runs={history}
            lang={lang}
            onSelectRun={handleSelectHistoryRun}
            onClearHistory={handleClearHistory}
          />
        </div>
      )}
    </Layout>
  );
}

export default App;
