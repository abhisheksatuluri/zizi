import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Absolutely love my ZIZI piece. It's the kind of detail that makes the whole room feel special.",
    author: "Emily Harper",
    image: "/zizi-webp/collector-dior-eloise.webp"
  },
  {
    quote: "We weren't expecting something this unique. It's become a conversation starter.",
    author: "The Marshalls",
    image: "/zizi-webp/collector-fendi-vittoria.webp"
  },
  {
    quote: "Clean, bold, and beautifully made. Feels like something from a gallery.",
    author: "Daniel Reid",
    image: "/zizi-webp/collector-lv-aurele.webp"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="h-full w-full bg-cream relative overflow-hidden flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-20 md:pt-24 pb-8 flex flex-col min-h-0">
        <h2 className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-gray-400 text-center mb-8 md:mb-12 flex-shrink-0">
          Collector Notes
        </h2>

        <div className="flex-1 flex md:grid md:grid-cols-3 gap-8 md:gap-12 items-center overflow-x-auto md:overflow-visible scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 min-h-0 snap-x snap-mandatory">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-auto flex flex-col h-full justify-center group snap-center"
            >
              {/* Supporting image - increased height and centered crop */}
              <div className="mb-6 overflow-hidden rounded-sm flex-shrink-0 aspect-video md:aspect-auto">
                <img
                  src={item.image}
                  alt="ZIZI sculpture in home interior"
                  className="w-full h-48 md:h-56 object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="mb-4 md:mb-6 overflow-hidden">
                <span className="text-4xl md:text-5xl text-gray-200 font-serif leading-none block">"</span>
                <p className="text-lg md:text-xl text-gray-800 font-serif leading-tight -mt-2 group-hover:text-black transition-colors line-clamp-4">
                  {item.quote}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-auto flex-shrink-0">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;