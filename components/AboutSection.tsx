import React from 'react';

const AboutSection: React.FC = () => {
  const aboutImage = "/about-philosophy.jpg";

  return (
    <section className="w-full bg-[#f4f4f4] relative overflow-hidden flex flex-col min-h-screen md:h-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">

          {/* Image Side */}
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] max-h-[40vh] md:max-h-[70vh] overflow-hidden group flex-shrink-0">
            <img
              src={aboutImage}
              alt="Our Philosophy"
              className="w-full h-full object-cover saturate-[0.85] hover:saturate-100 transition-all duration-700 ease-in-out"
            />
            <div className="absolute top-6 right-6 md:bottom-6 md:right-auto md:left-6 bg-white/90 backdrop-blur px-6 py-2 z-10">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">The Atelier</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-10 z-10 pb-12 md:pb-0">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
              Our Philosophy
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-black leading-[0.9]">
              Beauty in the <br />
              <span className="italic text-gray-500">Imperfect.</span>
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-md">
              Every piece in the ZIZI collection is a dialogue between raw material and refined vision.
              We believe that true luxury lies in the unique character of handcrafted artifacts.
            </p>

            <div className="pt-4 md:pt-8">
              <button className="border-b border-black pb-1 text-xs md:text-sm font-medium tracking-[0.2em] uppercase hover:text-gray-600 hover:border-gray-600 transition-colors">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;