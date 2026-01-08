import React from 'react';

interface HeroProps {
  onNavigateProduct?: (slug: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateProduct }) => {
  const handleExplore = () => {
    if (onNavigateProduct) {
      onNavigateProduct('dior-eloise');
    }
  };

  return (
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden">
      {/* Background Image - Immersive Experience */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/zizi-webp/eloise-mobile.webp" media="(max-width: 768px)" />
          <img
            src="/zizi-webp/dior-eloise-hero.webp"
            alt="Dior – Éloise"
            className="w-full h-full object-cover object-center scale-105 animate-slow-zoom blur-[1px]"
          />
        </picture>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Hero Content - Award Winning Placement */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Metadata */}
          <div className="space-y-2">
            <span className="text-white/60 text-[10px] tracking-[0.5em] uppercase font-bold">The Archive</span>
            <h2 className="text-white text-lg md:text-2xl font-serif italic tracking-wide">
              Dior – Éloise
            </h2>
          </div>

          {/* CTA */}
          <button
            onClick={handleExplore}
            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden rounded-full transition-all duration-700 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-all duration-500 group-hover:bg-white group-hover:border-white" />
            <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white transition-colors duration-500 group-hover:text-black">
              View Composition
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white to-white/0 animate-scroll-line" />
      </div>
    </section>
  );
};

export default Hero;