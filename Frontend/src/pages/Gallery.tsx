import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const galleryImages = [
  { src: '/1.JPG', alt: "Morning mist over the gaushala", category: "Gaushala" },
  { src: '/2.JPG', alt: "Morning mist over the gaushala", category: "Gaushala" },
  { src: '/3.JPG', alt: "Herd of cows grazing in pasture", category: "Cows" },
  { src: '/4.JPG', alt: "Nutritious silage for cattle feed", category: "Cows" },
  { src: '/5.JPG', alt: "Morning mist over the gaushala", category: "Gaushala" },
  { src: '/6.JPG', alt: "Caring hands nurturing Gaumata", category: "Care" },
  { src: '/7.JPG', alt: "Sacred cow with traditional decorations", category: "Events" },
  { src: '/8.JPG', alt: "Caring hands nurturing Gaumata", category: "Care" },
  { src: '/9.JPG', alt: "Nutritious silage for cattle feed", category: "Feed" },
];

const categories = ["All", "Cows", "Feed", "Gaushala", "Care", "Events"];

import PageHero from "@/components/layout/PageHero";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : 0));
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0));

  return (
    <Layout>
      <PageHero
        title="Glimpses of Our"
        accentText="Sacred Work"
        subtitle="Our Gallery"
        description="Explore beautiful moments captured from our gaushalas, feeding programs, and the sacred cows we care for every day."
      />

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <span className="text-xs text-accent font-medium">{image.category}</span>
                      <p className="text-cream text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-sacred-brown/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-cream hover:text-accent transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 p-2 text-cream hover:text-accent transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img
              key={lightboxIndex}
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 p-2 text-cream hover:text-accent transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-6 text-center text-cream">
              <p className="font-medium">{filteredImages[lightboxIndex].alt}</p>
              <p className="text-sm text-cream/70">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
