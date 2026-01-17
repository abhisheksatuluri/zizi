import React from 'react';
import Footer from './Footer';

const AboutPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-[#fbfaf8] pt-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Page Header */}
                <div className="mb-16 md:mb-24">
                    <h1 className="text-6xl md:text-9xl font-serif text-black tracking-tight mb-8">
                        About ZIZI
                    </h1>
                    <div className="w-full h-[1px] bg-black/10"></div>
                </div>

                {/* Hero Image */}
                <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative bg-gray-200 mb-24">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <img
                        src="/uploaded_image_0_1768222568614.jpg"
                        alt="ZIZI Art - Desk with Turtles"
                        className="w-full h-full object-cover saturate-[0.85] hover:saturate-100 transition-all duration-1000"
                    />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2">Our Story</p>
                        <p className="font-serif text-3xl md:text-4xl">Est. 2024</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-32 mb-32">
                    {/* Left Column: Vision Title */}
                    <div className="w-full md:w-1/3">
                        <div className="sticky top-40">
                            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
                                Our Vision
                            </h2>
                            <p className="font-serif text-3xl md:text-4xl text-black leading-tight">
                                Blending global inspiration with modern design.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: The Story */}
                    <div className="w-full md:w-2/3 space-y-12 text-gray-600 font-light text-lg md:text-xl leading-relaxed">
                        <p>
                            At ZIZI, we're redefining contemporary art by blending global inspiration with modern design. Art is a universal language, and our goal is to create bold, thought-provoking pieces that resonate everywhere and perfect for any space.
                        </p>
                        <p>
                            From Ibiza's sunny shores to Dubai's skyline, London's historic streets to Parisian romance, our travels fuel our creativity. Each city adds its unique vibe, culture, and energy, inspiring us to craft art that captures diverse stories and aesthetics.
                        </p>
                        <p>
                            We create striking artworks that elevate any environment, from limited editions to custom pieces. Our focus is on authenticity, innovation, and making a statement.
                        </p>
                        <div className="border-l-2 border-black pl-8 py-2">
                            <p className="text-black font-medium font-serif italic text-2xl">
                                "ZIZI is more than art it's a movement celebrating global creativity through contemporary expression."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secondary Imagery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="flex flex-col space-y-4">
                        <img
                            src="/uploaded_image_1_1768222568614.jpg"
                            className="w-full h-[60vh] object-cover saturate-[0.85] hover:saturate-100 transition-all duration-1000"
                            alt="Inspiration - Turtle One"
                        />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Global Inspiration</span>
                    </div>
                    <div className="flex flex-col space-y-4 md:mt-32">
                        <img
                            src="/uploaded_image_2_1768222568614.jpg"
                            className="w-full h-[60vh] object-cover saturate-[0.85] hover:saturate-100 transition-all duration-1000"
                            alt="Design - Turtle Two"
                        />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Modern Design</span>
                    </div>
                </div>

            </div>

            {/* Footer attached to the bottom of the page */}
            <Footer />
        </div>
    );
};

export default AboutPage;