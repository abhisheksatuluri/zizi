import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

// --- TYPES ---
interface InstagramMedia {
    id: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string; // NEW
}

// --- CONFIGURATION ---
// STRICT: Token is only accessed here.
// FAIL SILENTLY: If missing or invalid, component simply stays in fallback mode.
const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '';

// --- MUSEUM GRADE FALLBACK ---
// These high-res local assets are used if:
// 1. No token is provided (Default state)
// 2. The API fetch fails or rate limits
// 3. The token expires
const FALLBACK_POSTS: InstagramMedia[] = [
    {
        id: 'fallback-1',
        media_type: 'IMAGE',
        media_url: '/zizi-webp/collector-dior-eloise.webp',
        permalink: 'https://www.instagram.com/zizi__designs/',
        caption: 'The art of detail. Each curve of the Éloise sculpture reflects hours of dedicated craftsmanship. #ZiziDesigns #LuxuryArt'
    },
    {
        id: 'fallback-2',
        media_type: 'IMAGE',
        media_url: '/zizi-webp/collector-fendi-vittoria.webp',
        permalink: 'https://www.instagram.com/zizi__designs/',
        caption: 'Golden hour with Vittoria. The way light plays across these surfaces is intentional and endless.'
    },
    {
        id: 'fallback-3',
        media_type: 'IMAGE',
        media_url: '/zizi-webp/collector-lv-aurele.webp',
        permalink: 'https://www.instagram.com/zizi__designs/',
        caption: 'Aurèle in Mono. A bold statement piece for the modern collector. Now available online.'
    },
    {
        id: 'fallback-4',
        media_type: 'IMAGE',
        media_url: '/zizi-webp/dior-eloise-hero.webp',
        permalink: 'https://www.instagram.com/zizi__designs/',
        caption: 'Studio days. Working on the final polish for the Spring Collection. #BehindTheScenes'
    }
];

const InstagramArchive: React.FC = () => {
    // Initialize with fallback immediately to ensure zero layout shift
    const [media, setMedia] = useState<InstagramMedia[]>(FALLBACK_POSTS);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchInstagramMedia = async () => {
            // 1. Silent Pre-check: If no token, do absolutely nothing. Stay on fallback.
            if (!INSTAGRAM_TOKEN) return;

            try {
                // 2. Data Fetch
                const response = await fetch(
                    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${INSTAGRAM_TOKEN}&limit=4`
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.length > 0) {
                        // 3. Success: Update state to live data
                        // Slice ensures we respect the 4-item grid constraint
                        setMedia(data.data.slice(0, 4));
                        setIsLive(true);
                    }
                }
                // 4. API Error: Do nothing. Catch block handles logs or silence.

            } catch (error) {
                // 5. Silent Failure:
                // Do NOT log the token.
                // Do NOT show error UI to user.
                // Simply stay on fallback.
                if (import.meta.env.DEV) {
                    console.warn('ZIZI Instagram: Silent fallback triggered (API/Network/Parse error).');
                }
            }
        };

        fetchInstagramMedia();
    }, []);

    return (
        <section className="w-full bg-[#f4f4f4] relative flex flex-col justify-center items-center py-16 md:py-24 px-4 md:px-12 overflow-hidden min-h-screen md:h-full">
            <div className="max-w-[1600px] w-full mx-auto flex flex-col justify-center">
                <div className="flex flex-col items-center text-center mb-8 md:mb-16 shrink-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-4">
                        Instagram
                    </h2>
                    <a
                        href="https://www.instagram.com/zizi__designs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-black transition-colors duration-300"
                    >
                        @zizi__designs
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full max-w-6xl mx-auto">
                    {media.map((item) => (
                        <a
                            key={item.id}
                            href={item.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square bg-gray-200 overflow-hidden cursor-pointer w-full"
                        >
                            <img
                                src={item.media_type === 'VIDEO' ? (item.thumbnail_url || item.media_url) : item.media_url}
                                alt={item.caption || "Zizi Archive Moment"}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Cinematic Overlay - Darkens slightly on hover to make text pop */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700 ease-out" />

                            {/* Caption Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-white/90 font-serif text-[10px] md:text-xs tracking-wide leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                                    {item.caption || "A moment from the archive."}
                                </p>
                            </div>

                            {/* Hover Icon (Top Right to avoid text) */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramArchive;
