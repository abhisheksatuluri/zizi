import React from 'react';
import Footer from './Footer';

// Data structure for the inspiration sections
const inspirationSections = [
  {
    id: 'london',
    title: "London Heritage",
    subtitle: "Timeless Elegance & Royal Charm",
    bgColor: "bg-[#fbfaf8]",
    theme: "light",
    images: [
      { url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop", label: "Regent Street" },
      { url: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1000&auto=format&fit=crop", label: "Notting Hill" },
      { url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1000&auto=format&fit=crop", label: "Westminster" },
      { url: "https://images.unsplash.com/photo-1560969680-e37456d253f5?q=80&w=1000&auto=format&fit=crop", label: "Chelsea Homes" },
      { url: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1000&auto=format&fit=crop", label: "Bond Street" },
      { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop", label: "Mayfair" }
    ]
  },
  {
    id: 'paris',
    title: "Parisian Chic",
    subtitle: "Art, Architecture & L'Art de Vivre",
    bgColor: "bg-white",
    theme: "light",
    images: [
      { url: "https://images.unsplash.com/photo-1492136344046-866c85e0bf04?q=80&w=1000&auto=format&fit=crop", label: "The Iron Lady" },
      { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop", label: "Haussmann" },
      { url: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=1000&auto=format&fit=crop", label: "Le Louvre" },
      { url: "https://images.unsplash.com/photo-1520939817895-060bdaf4de1e?q=80&w=1000&auto=format&fit=crop", label: "Café Culture" },
      { url: "https://images.unsplash.com/photo-1549144511-6099e7dab550?q=80&w=1000&auto=format&fit=crop", label: "Metro Style" },
      { url: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1000&auto=format&fit=crop", label: "Seine River" }
    ]
  },
  {
    id: 'italy-summer',
    title: "Italian Summer",
    subtitle: "Amalfi Coast & Mediterranean Blues",
    bgColor: "bg-[#f4f4f4]",
    theme: "light",
    images: [
      { url: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=1000&auto=format&fit=crop", label: "Positano" },
      { url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1000&auto=format&fit=crop", label: "Cinque Terre" },
      { url: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=1000&auto=format&fit=crop", label: "Capri" },
      { url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop", label: "Amalfi" },
      { url: "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1000&auto=format&fit=crop", label: "Vespa Life" },
      { url: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca9d4?q=80&w=1000&auto=format&fit=crop", label: "Riviera Blue" }
    ]
  },
  {
    id: 'urban-europe',
    title: "Urban Grandeur",
    subtitle: "Milan, Venice & Historic Stones",
    bgColor: "bg-white",
    theme: "light",
    images: [
      { url: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=1000&auto=format&fit=crop", label: "Milan Galleria" },
      { url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1000&auto=format&fit=crop", label: "Venice Canals" },
      { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop", label: "Rome Colosseum" },
      { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop", label: "Historic Streets" },
      { url: "https://images.unsplash.com/photo-1525081905268-fc0f46e97c72?q=80&w=1000&auto=format&fit=crop", label: "Florence Art" },
      { url: "https://images.unsplash.com/photo-1548625361-9f2cb428131c?q=80&w=1000&auto=format&fit=crop", label: "Architecture" }
    ]
  },
  {
    id: 'luxury-life',
    title: "High Altitude",
    subtitle: "Alpine Escapes & Monaco Glitz",
    bgColor: "bg-[#f0f0f0]",
    theme: "light",
    images: [
      { url: "https://images.unsplash.com/photo-1518182170546-0766aa63a14b?q=80&w=1000&auto=format&fit=crop", label: "Monaco Harbor" },
      { url: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=1000&auto=format&fit=crop", label: "Alpine Peaks" },
      { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop", label: "Monte Carlo" },
      { url: "https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1000&auto=format&fit=crop", label: "Chalet Views" },
      { url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1000&auto=format&fit=crop", label: "Yacht Life" },
      { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop", label: "Grand Hotel" }
    ]
  }
];

const Inspiration: React.FC = () => {
  return (
    <>
      {inspirationSections.map((section, index) => (
        <div 
          key={section.id}
          // Changed padding to ensure bottom images aren't cut off by browser chrome
          className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col pt-24 md:pt-32 px-6 md:px-12 pb-24 md:pb-32 ${section.bgColor}`}
          style={{ zIndex: (index + 1) * 10 }}
          data-section-name={section.title}
          data-theme={section.theme}
        >
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-10 flex-shrink-0 animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-serif text-black tracking-tight">{section.title}</h1>
            <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mt-2 md:mt-4">
              {section.subtitle}
            </p>
          </div>
          
          {/* Image Grid */}
          <div className="flex-1 w-full max-w-[1400px] mx-auto min-h-0">
            {/* Added grid-rows to strictly enforce items fitting in the container without overflow */}
            <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-2 md:gap-6 h-full">
              {section.images.map((img, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className={`relative overflow-hidden group w-full h-full rounded-sm ${
                    'bg-gray-200'
                  }`}
                >
                  <img 
                    src={img.url} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                    alt={img.label} 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase drop-shadow-md">
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* --- FOOTER --- */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]" 
        style={{ zIndex: (inspirationSections.length + 1) * 10 }}
        data-section-name="Connect"
        data-theme="dark"
      >
        <Footer />
      </div>
    </>
  );
};

export default Inspiration;