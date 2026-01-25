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
    <section className="relative w-screen max-w-full h-[100dvh] bg-black overflow-hidden">
      {/* Background Image - Immersive Experience */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <picture className="block w-full h-full">
          <source srcSet="/images/home/hero-mobile.png" media="(max-width: 768px)" />
          <img
            src="/zizi-webp/dior-eloise-hero.webp"
            alt="Dior – Éloise"
            className="w-full h-full object-cover object-bottom md:object-center scale-[1.02] animate-slow-zoom"
          />
        </picture>

        {/* Cinematic Overlays - Lighter on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 md:from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/5 md:bg-black/10" />
      </div>

      {/* Hero Content - Award Winning Placement */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4 animate-fade-in-up">
          {/* Metadata */}
          <h2 className="text-white text-lg md:text-2xl font-serif italic tracking-wide">
            Dior – Éloise
          </h2>

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

    </section>
  );
};

export default Hero;