import React from "react";
import { Heart } from "lucide-react";

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className="inline"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between anim-fade-in">
      {/* Header Panel */}
      <header className="iron-panel py-8 px-6 text-center border-b-4 border-rust shadow-lg">
        {/* Decorative rivets */}
        <div className="rivet rivet-tl"></div>
        <div className="rivet rivet-tr"></div>
        <div className="rivet rivet-bl"></div>
        <div className="rivet rivet-br"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h1 
            onClick={onNavigateHome}
            className="text-4xl md:text-5xl font-extrabold tracking-widest text-rust hover:text-rust-light cursor-pointer select-none transition-colors duration-150"
            style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.8)" }}
          >
            Kenshi Fate
          </h1>
          <p className="font-heading text-lg md:text-xl tracking-wider text-sand-light mt-2 uppercase">
            Let fate decide your next run.
          </p>
          <div className="h-1 w-32 bg-rust mt-4"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center py-8 px-4 md:px-8">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>

      {/* Footer Panel */}
      <footer className="iron-panel py-6 px-6 mt-8 border-t-2 border-iron-light text-center text-xs text-sand-dark">
        {/* Decorative rivets */}
        <div className="rivet rivet-tl"></div>
        <div className="rivet rivet-tr"></div>
        <div className="rivet rivet-bl"></div>
        <div className="rivet rivet-br"></div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-xl">
            <p className="leading-relaxed">
              Kenshi Fate is an unofficial fan-made project and is not affiliated with or endorsed by Lo-Fi Games.
            </p>
            <p className="mt-1 text-rust-dark font-semibold">
              Made with <Heart size={10} className="inline fill-current" /> for the Kenshi Community.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/ThiagoBerenger/kenshi-fate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-metal py-2 px-4 text-xs flex items-center gap-2"
              title="View on GitHub"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
