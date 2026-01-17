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
    image: "/uploaded_image_0_1768224388234.png"
  },
  {
    quote: "Clean, bold, and beautifully made. Feels like something from a gallery.",
    author: "Daniel Reid",
    image: "/uploaded_image_1_1768224388234.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-cream relative overflow-hidden flex flex-col min-h-screen md:h-full">
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col">
        <h2 className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-gray-400 text-center mb-8 md:mb-12 flex-shrink-0">
          Collector Notes
        </h2>

        <div className="flex md:grid md:grid-cols-3 gap-8 md:gap-12 overflow-x-auto md:overflow-visible scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-auto flex flex-col group snap-center"
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
              <div className="border-t border-gray-200 pt-4 mt-4 md:mt-auto flex-shrink-0">
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