import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADER_MESSAGES = [
  "Rationing Chewbread...",
  "Avoiding Beak Things...",
  "Escaping Rebirth...",
  "Mining Copper for Cats...",
  "Bribing United Cities Nobles...",
  "Consulting the Flotsam Ninjas...",
  "Dodge-rolling away from Skeletons...",
  "Dodging Acid Rain...",
  "DETERMINING YOUR FATE...",
];

export const FateLoader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADER_MESSAGES.length);
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full iron-panel py-16 px-6 text-center flex flex-col items-center justify-center min-h-[400px] anim-fade-in">
      {/* Decorative rivets */}
      <div className="rivet rivet-tl"></div>
      <div className="rivet rivet-tr"></div>
      <div className="rivet rivet-bl"></div>
      <div className="rivet rivet-br"></div>

      <div className="relative mb-6">
        {/* Grungy compass spin */}
        <Loader2 size={48} className="text-rust animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-rust rounded-full animate-ping"></div>
        </div>
      </div>

      <h3 className="font-heading text-xl md:text-2xl text-rust-light tracking-widest animate-pulse mb-3 uppercase">
        {LOADER_MESSAGES[messageIndex]}
      </h3>
      <p className="font-monospace text-xs text-sand-dark italic max-w-xs leading-relaxed">
        Please wait while the desert winds settle...
      </p>
    </div>
  );
};
