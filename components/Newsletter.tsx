import React from 'react';
import { ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="w-full min-h-screen md:h-full flex items-center justify-center bg-black text-white px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-5xl md:text-7xl font-serif mb-8">Inner Circle</h2>
        <p className="text-white/50 mb-12 font-light text-lg">
          Exclusive access to new collections and studio insights.
        </p>

        <form className="relative flex items-center border-b border-white/30 hover:border-white transition-colors duration-500 pb-2">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-transparent py-4 text-xl md:text-2xl outline-none placeholder:text-white/20 text-white font-serif tracking-wide"
          />
          <button type="button" className="ml-4 text-white hover:text-white/70 transition-colors">
            <ArrowRight size={32} strokeWidth={1} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;