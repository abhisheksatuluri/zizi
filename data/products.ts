// Product data definition
export interface Product {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    price: string;
    category: string;
    description: string;
    summary: string;
    images: string[];
    galleryImages: string[];
    specs: {
        material: string;
        finish: string;
        dimensions: string;
        weight?: string;
        care: string;
        origin: string;
    };
    seo: {
        title: string;
        description: string;
    };
    imagePosition?: string;
}

export const products: Product[] = [
    {
        id: 1,
        slug: 'dior-eloise',
        title: 'Dior – Éloise',
        subtitle: 'Toile de Jouy — Signature Blue',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'A masterpiece of porcelain artistry, Éloise reinterprets the iconic Toile de Jouy pattern in signature blue. A collectible statement piece that bridges classic French elegance with contemporary sculptural form.',
        description: `
      <p>A masterpiece of balance and heritage, Éloise reinterprets the iconic Toile de Jouy motif through the lens of contemporary sculpture. The shell, crafted from high-density, kiln-fired porcelain, features the signature pastoral scenes in deep, resonant blue, meticulously applied to ensure a seamless narrative flow across the curvature of the form.</p>
      
      <p>The structural elements—limbs and head—are cast in a heavyweight alloy and finished with a mirror-polished 18k gold plating. This juxtaposition of the soft, matte porcelain against the sharp, reflective metal creates a dialogue between history and modernity, inviting the viewer to reconsider the boundaries of decorative art.</p>
      
      <p>As a collectible object, Éloise commands space with quiet confidence. It is designed to be curated within a refined interior, serving as a focal point on a mantle, a study in texture on a console, or an anchor in a minimalist shelving arrangement. Each piece undergoes a rigorous inspection to ensure the flawless integration of its material components.</p>
    `,
        images: [
            '/zizi-webp/dior-eloise-hero.webp',
            '/zizi-webp/dior-eloise.webp',
            '/zizi-webp/dior-eloise2.webp',
            '/zizi-webp/selected-dior-eloise.webp',
            '/zizi-webp/collector-dior-eloise.webp'
        ],
        galleryImages: [
            '/pdp-images/Dior Eloise/Dior Eloise 1.JPG',
            '/pdp-images/Dior Eloise/Dior Eloise 2.JPG',
            '/pdp-images/Dior Eloise/Dior Eloise 3.JPG',
            '/pdp-images/Dior Eloise/Dior Eloise 4.JPG',
            '/pdp-images/Dior Eloise/Dior Eloise 5.JPG'
        ],
        specs: {
            material: 'Fine Porcelain, 18k Gold-Plated Alloy',
            finish: 'Hand-Applied Toile de Jouy',
            dimensions: '28cm x 18cm x 14cm',
            care: 'Dust with a soft, dry archival cloth. Avoid chemicals.',
            origin: 'Designed in London, Finished in Portugal'
        },
        seo: {
            title: 'Dior Éloise — Luxury Designer Turtle Sculpture in Metal & Ceramic | Collectible Art Object',
            description: 'Discover Éloise, a luxury collectible turtle sculpture by ZIZI. Featuring a ceramic Toile de Jouy shell and gold metal body. A contemporary art object for the refined home.'
        }
    },
    {
        id: 2,
        slug: 'fendi-vittoria',
        title: 'Fendi – Vittoria',
        subtitle: 'Monogram Geometric — Verdant Green',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'Vittoria brings architectural precision to the organic form. Wrapped in a bold, verdant green geometric monogram, this sculpture is a study in modernist luxury and Italian-inspired design.',
        description: `
      <p>Vittoria is a bold statement of structural elegance, drawing inspiration from Italian high fashion and modernist architecture. The shell features a hypnotic, repeating geometric monogram pattern in a rich verdant green, strictly aligned to accentuate the curvature of the sculpture. This precise graphic treatment is balanced by the fluid, organic lines of the turtle's form, rendered in a brilliant gold finish.</p>
      
      <p>Perfect for the contemporary home, Vittoria brings a touch of maximalist glamour to any setting. Its vibrant colorway makes it an ideal focal point for a neutral living space or a complementary piece in a color-rich study. The weight and quality of the materials speak to a commitment to luxury craftsmanship.</p>
      
      <p>The ceramic shell is kiln-fired to achieve a glass-like hardness, providing a perfect canvas for the intricate decal work. The metallic elements are polished to a mirror shine, reflecting the environment and grounding the piece with a sense of substantial luxury.</p>
    `,
        images: [
            '/fendi-vittoria.jpeg',
            '/zizi-webp/fendi-vittoria(1).webp',
            '/zizi-webp/fendi.webp',
            '/zizi-webp/selected-fendi-vittoria.webp',
            '/zizi-webp/collector-fendi-vittoria.webp'
        ],
        galleryImages: [
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 1.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 2.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 3.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 4.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 5.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 6.JPG',
            '/pdp-images/Fendi Vittoria/Fendi Vittoria 7.JPG'
        ],
        specs: {
            material: 'High-Gloss Ceramic & Polished Brass Finish',
            finish: 'Geometric Monogram Pattern / Mirror Gold Polish',
            dimensions: 'Approx. 26cm x 17cm x 13cm',
            care: 'Wipe clean with a microfiber cloth.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Fendi Vittoria Turtle Sculpture | Luxury Green Monogram Art | ZIZI',
            description: 'Discover Vittoria by ZIZI. A luxury turtle sculpture featuring a verdant green geometric monogram. Modern Italian-inspired decor for the collector.'
        },
        imagePosition: 'center bottom'
    },
    {
        id: 3,
        slug: 'lv-aurele',
        title: 'Louis Vuitton (Gold) – Aurèle',
        subtitle: 'Monogram Luminous — 24k Gold Finish',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'The ultimate expression of opulence. Aurèle is bathed in a unified gold finish, featuring etched monogram detailing that catches the light. A radiant icon of luxury.',
        description: `
      <p>Aurèle represents the pinnacle of ZIZI's dedication to luxury materials and finish. This extraordinary sculpture is finished entirely in a radiant gold tone, creating a seamless, liquid-metal effect that is utterly captivating. The shell is subtly etched with a scattered monogram pattern, adding depth and texture without disrupting the glorious uniformity of the gold surface.</p>
      
      <p>Designed for those who appreciate unapologetic glamour, Aurèle transforms light into art. Placed near a window or under gallery lighting, the etched patterns create shifting shadows and highlights, giving the piece a life of its own. It is a substantial, heavy piece that feels as expensive as it looks.</p>
      
      <p>This sculpture is not merely a decorative item; it is a trophy of style. It pairs exceptionally well with dark woods, marble, and velvet textures, bringing a warm, metallic glow to refined interiors. A true collector's item that transcends trends.</p>
    `,
        images: [
            '/zizi-webp/lv-aurele.webp',
            '/zizi-webp/lv-aurele(1).webp',
            '/zizi-webp/lv-aurele-2.webp',
            '/zizi-webp/selected-lv-aurele.webp',
            '/zizi-webp/collector-lv-aurele.webp'
        ],
        galleryImages: [
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 1.JPG',
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 2.JPG',
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 3.JPG',
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 4.JPG',
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 5.JPG',
            '/pdp-images/Gold LV Aurele/Gold LV Aurele 6.JPG'
        ],
        specs: {
            material: 'Electroplated Art Resin Core',
            finish: 'High-Shine 24k Gold Effect / Etched Detailing',
            dimensions: 'Approx. 28cm x 19cm x 15cm',
            care: 'Handle with gloves to prevent fingerprints. Polish with soft cloth.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Louis Vuitton Gold Aurèle Sculpture | Luxury Monogram Decor | ZIZI',
            description: 'Shop Aurèle, the gold monogram turtle sculpture by ZIZI. Dimensions of light and luxury combined in a statement art piece.'
        }
    },
    {
        id: 4,
        slug: 'lv-benoit',
        title: 'Louis Vuitton (Bronze) – Benoît',
        subtitle: 'Monogram Deep — Statuary Bronze',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'Solid, grounded, and timeless. Benoît features a rich statuary bronze finish with deep-set monogram engravings. An understated classic for the masculine study or library.',
        description: `
      <p>Benoît offers a darker, more brooding take on luxury. Finished in a deep statuary bronze tone, this sculpture feels ancient yet undeniably modern. The monogram pattern is deeply engraved into the shell, creating a tactile surface that invites touch. Unlike its high-shine counterparts, Benoît absorbs light, glowing with a subtle, warm intensity.</p>
      
      <p>This piece is perfectly suited for sophisticated, masculine interiors—think mahogany libraries, leather-top desks, and industrial-chic lofts. It carries a gravitas and weight that anchors a vignette, making it an excellent paperweight or standalone sculptural object.</p>
      
      <p>The bronze finish is achieved through a multi-step plating process that ensures durability and depth of color. Over time, the piece maintains its rich hue, devoid of the patina of raw metal but possessing all of its visual character.</p>
    `,
        images: [
            '/zizi-webp/lv-benoit.webp',
            '/zizi-webp/lv-benoit-2.webp',
            '/zizi-webp/lv-benoit-2(1).webp'
        ],
        galleryImages: [
            '/pdp-images/Rose gold LV Banoit/Rose gold LV Banoit 1.JPG',
            '/pdp-images/Rose gold LV Banoit/Rose gold LV Banoit 2.JPG',
            '/pdp-images/Rose gold LV Banoit/Rose gold LV Banoit 3.JPG',
            '/pdp-images/Rose gold LV Banoit/Rose gold LV Banoit 4.JPG'
        ],
        specs: {
            material: 'Heavyweight Resin Composite',
            finish: 'Statuary Bronze Plating / Deep Engraving',
            dimensions: 'Approx. 28cm x 19cm x 15cm',
            care: 'Dust with dry cloth.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Louis Vuitton Bronze Benoît Sculpture | Dark Luxury Decor | ZIZI',
            description: 'Benoît by ZIZI. A statuary bronze turtle sculpture with deep monogram engraving. distinctive decor for the study or library.'
        }
    },
    {
        id: 5,
        slug: 'hermes-henrietta',
        title: 'Hermès – Henrietta',
        subtitle: 'Equine Heritage — Saddle Orange',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'A vibrant celebration of equestrian heritage. Henrietta dons the signature saddle orange, patterned with stylized horse motifs. Energetic, classic, and undeniably chic.',
        description: `
      <p>Henrietta is infused with the spirit of the equestrian lifestyle. The shell is enveloped in a vibrant, signature saddle orange, a color synonymous with luxury leather goods. Adorning this striking background is a pattern of stylized equine figures and carriage wheels, rendered in crisp detail. The glowing gold limbs provide a luxurious frame for this energetic design.</p>
      
      <p>This piece injects color and life into any room. It pairs beautifully with neutral palettes, acting as a "pop" of sophisticated color. Whether placed on a stack of art books or nestled in a white shelving unit, Henrietta draws the eye and sparks joy.</p>
      
      <p>The craftsmanship focuses on the vibrancy of the ceramic glaze, ensuring the orange hue remains color-true and luminous. The combination of the playful pattern and the serious, sculptural form captures the wit and whimsy at the heart of the ZIZI brand.</p>
    `,
        images: [
            '/zizi-webp/hermes-henrietta.webp',
            '/zizi-webp/hermes-henrietta(1).webp',
            '/zizi-webp/hermes-henrietta-2.webp'
        ],
        galleryImages: [
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 1.JPG',
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 2.JPG',
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 3.JPG',
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 4.JPG',
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 5.JPG',
            '/pdp-images/Hermes Henrietta/Hermes Henrietta 6.JPG'
        ],
        specs: {
            material: 'Glazed Ceramic & Gold Plate',
            finish: 'Signature Orange Glaze / Equine Decal',
            dimensions: 'Approx. 27cm x 17cm x 14cm',
            care: 'Wipe clean. Avoid direct sunlight significantly prolonged.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Hermès Henrietta Turtle Sculpture | Orange Equestrian Art | ZIZI',
            description: 'Henrietta by ZIZI. A luxury turtle sculpture in signature saddle orange with equestrian motifs. A vibrant, collectible art object.'
        }
    },
    {
        id: 6,
        slug: 'harrods-william',
        title: 'Harrods – William',
        subtitle: 'Heritage Green — Knightsbridge Edition',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'Regal and refined, William wears the deep, heritage green of London\'s most iconic department store. Gold accents highlight the architectural geometry of the shell.',
        description: `
      <p>William is a tribute to British luxury heritage. The deep, forest green of the shell evokes the awnings of Knightsbridge and the quiet elegance of private clubs. This rich base color is accented with fine gold grid lines that define the turtle's scutes, turning the biological form into something architectural and precise.</p>
      
      <p>This sculpture exudes a sense of old-world charm mixed with contemporary design. It is reserved, not shouting for attention, but rewarding close inspection with its flawless finish and deep, saturated color. It sits perfectly in traditional homes and modern apartments alike.</p>
      
      <p>The "William" edition is a nod to timeless style. The green glaze is applied thick for a depth that looks almost liquid, while the gold legs provide a sturdy, bright foundation that lifts the piece, giving it a sense of movement.</p>
    `,
        images: [
            '/zizi-webp/harrods-william.webp',
            '/zizi-webp/harrods-william-2.webp',
            '/zizi-webp/harrods-william-2(1).webp'
        ],
        galleryImages: [
            '/pdp-images/Harrods William/Harrods William 1.JPG',
            '/pdp-images/Harrods William/Harrods William 2.JPG',
            '/pdp-images/Harrods William/Harrods William 3.JPG',
            '/pdp-images/Harrods William/Harrods William 4.JPG',
            '/pdp-images/Harrods William/Harrods William 5.JPG'
        ],
        specs: {
            material: 'Ceramic & Metal Alloy',
            finish: 'Heritage Green Glaze / Gold Lining',
            dimensions: 'Approx. 29cm x 18cm x 15cm',
            care: 'Clean with soft cloth.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Harrods William Turtle Sculpture | Heritage Green Decor | ZIZI',
            description: 'Discover William by ZIZI. A heritage green turtle sculpture inspired by Knightsbridge luxury. Timeless British elegance for your home.'
        }
    },
    {
        id: 7,
        slug: 'fortnum-reginald',
        title: 'Fortnum & Mason – Reginald',
        subtitle: 'Royal Eau de Nil — Tea Salon Edition',
        price: '£575',
        category: 'Featured Sculpture',
        summary: 'Soft, whimsical, and elegant. Reginald features the distinctive Eau de Nil blue-green, pairing perfectly with afternoon tea settings and light, airy interiors.',
        description: `
      <p>Reginald captures the specific, beloved shade of Eau de Nil that has graced royal nurseries and tea salons for centuries. This soft, pale blue-green is soothing and sophisticated, creating a sense of calm luxury. The shell is kept relatively simple to let the unique color take center stage, complemented by the warm gold tones of the sculpture's body.</p>
      
      <p>This piece is a favorite for light, airy interiors, bringing a touch of spring freshness year-round. It works wonderfully as a table centerpiece or a bedside companion, offering a gentle pop of color that isn't overwhelming.</p>
      
      <p>Reginald is about subtle luxury. The finish is smooth and creamy, inviting touch. It is a piece that feels like a confection—delightful, sweet, and expertly made.</p>
    `,
        images: [
            '/zizi-webp/fm-reginald.webp',
            '/zizi-webp/fm-reginald(1).webp',
            '/zizi-webp/fm-reginald-2.webp',
            '/zizi-webp/fm-reginald-2(1).webp',
            '/zizi-webp/fm-reginald-2(2).webp'
        ],
        galleryImages: [
            '/pdp-images/Fortnum Reginald/Fortnum Reginald 1.JPG',
            '/pdp-images/Fortnum Reginald/Fortnum Reginald 2.JPG',
            '/pdp-images/Fortnum Reginald/Fortnum Reginald 3.JPG',
            '/pdp-images/Fortnum Reginald/Fortnum Reginald 4.JPG'
        ],
        specs: {
            material: 'Fine Porcelain & Gold Plate',
            finish: 'Eau de Nil Glaze / High Polish Gold',
            dimensions: 'Approx. 26cm x 17cm x 13cm',
            care: 'Hand clean only. Keep dry.',
            origin: 'Designed in London'
        },
        seo: {
            title: 'Fortnum & Mason Reginald Sculpture | Eau de Nil Decor | ZIZI',
            description: 'Reginald by ZIZI. A luxury turtle sculpture in royal Eau de Nil. The perfect whimsical accent for elegant, light-filled interiors.'
        }
    }
];

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(product => product.slug === slug);
};
