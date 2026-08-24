import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { Language } from "../engine/types";
import { uiTranslations } from "../data/uiTranslations";

const MESSAGES_BY_LANG: Record<Language, string[]> = {
  en: [
    "Rationing Chewbread...",
    "Avoiding Beak Things...",
    "Escaping Rebirth...",
    "Mining Copper for Cats...",
    "Bribing United Cities Nobles...",
    "Consulting the Flotsam Ninjas...",
    "Dodge-rolling away from Skeletons...",
    "Dodging Acid Rain...",
    "DETERMINING YOUR FATE...",
  ],
  pt: [
    "Racionando Pão de Mastigar...",
    "Evitando Beak Things...",
    "Escapando de Rebirth...",
    "Minerando Cobre por Cats...",
    "Subornando Nobres de Cidades Unidas...",
    "Consultando as Ninjas Flotsam...",
    "Desviando de Skeletons...",
    "Esquivando da Chuva Ácida...",
    "DETERMINANDO SEU DESTINO...",
  ],
  es: [
    "Racionando Pan de Mascar...",
    "Evitando Beak Things...",
    "Escapando de Rebirth...",
    "Minando Cobre por Cats...",
    "Sobornando a Nobles de Ciudades Unidas...",
    "Consultando a las Ninjas Flotsam...",
    "Esquivando Esqueletos...",
    "Evitando la Lluvia Ácida...",
    "DETERMINANDO TU DESTINO...",
  ],
};

interface FateLoaderProps {
  lang: Language;
}

export const FateLoader: React.FC<FateLoaderProps> = ({ lang }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = MESSAGES_BY_LANG[lang] || MESSAGES_BY_LANG.en;
  const t = uiTranslations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 180);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="w-full iron-panel py-16 px-6 text-center flex flex-col items-center justify-center min-h-[400px] anim-fade-in">
      {/* Decorative rivets */}
      <div className="rivet rivet-tl"></div>
      <div className="rivet rivet-tr"></div>
      <div className="rivet rivet-bl"></div>
      <div className="rivet rivet-br"></div>

      <div className="relative mb-6">
        <Loader2 size={48} className="text-rust animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-rust rounded-full animate-ping"></div>
        </div>
      </div>

      <h3 className="font-heading text-xl md:text-2xl text-rust-light tracking-widest animate-pulse mb-3 uppercase">
        {messages[messageIndex]}
      </h3>
      <p className="font-monospace text-xs text-sand-dark italic max-w-xs leading-relaxed">
        {t.settleWinds}
      </p>
    </div>
  );
};
