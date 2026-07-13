import { Language, GalleryItem } from '../types';
import { Eye, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryTabProps {
  lang: Language;
  galleryItems: GalleryItem[];
}

export default function GalleryTab({ lang, galleryItems }: GalleryTabProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = galleryItems;

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const prevIndex = selectedPhotoIndex === 0 ? filteredItems.length - 1 : selectedPhotoIndex - 1;
    setSelectedPhotoIndex(prevIndex);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const nextIndex = selectedPhotoIndex === filteredItems.length - 1 ? 0 : selectedPhotoIndex + 1;
    setSelectedPhotoIndex(nextIndex);
  };

  const t = {
    en: {
      heading: 'Life at the Ministry',
      tagline: 'Capturing the heart of the community in worship, service, and warm gatherings.',
      categoryLabel: 'Category',
    },
    am: {
      heading: 'የአገልግሎቱ ሕይወት',
      tagline: 'የማህበረሰቡን ልብ በአምልኮ፣ በአገልግሎት እና በደማቅ የህብረት ጊዜያት ውስጥ ማንጸባረቅ።',
      categoryLabel: 'ዓይነት',
    }
  }[lang];

  return (
    <div id="gallery-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto space-y-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>



      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            id={`gallery-item-${item.id}`}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="relative rounded-3xl overflow-hidden group cursor-zoom-in shadow-md block break-inside-avoid border border-gray-100/30"
          >
            <img
              src={item.coverUrl}
              referrerPolicy="no-referrer"
              alt={lang === 'en' ? item.title.en : item.title.am}
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <div className="p-1.5 w-8 h-8 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-tertiary-fixed mb-1.5">
                {item.category}
              </span>
              <h3 className="font-serif text-base font-bold leading-snug">
                {lang === 'en' ? item.title.en : item.title.am}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Slideshow Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
          <motion.div
            id="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-container/95 z-[150] flex flex-col items-center justify-center p-6"
          >
            {/* Close Button */}
            <button
              id="lightbox-close-btn"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Control */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrevPhoto}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image & Description Content Card */}
            <div className="max-w-4xl w-full flex flex-col items-center gap-6 relative">
              <motion.img
                key={filteredItems[selectedPhotoIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[selectedPhotoIndex].coverUrl}
                referrerPolicy="no-referrer"
                alt="Enlarged gallery view"
                className="max-h-[60vh] md:max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Text Area */}
              <div className="text-center text-white max-w-2xl px-4 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-tertiary-fixed font-bold">
                  {filteredItems[selectedPhotoIndex].category}
                </span>
                <h2 className="font-serif text-lg md:text-2xl font-bold leading-tight text-white">
                  {lang === 'en' ? filteredItems[selectedPhotoIndex].title.en : filteredItems[selectedPhotoIndex].title.am}
                </h2>
                {filteredItems[selectedPhotoIndex].description && (
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                    {lang === 'en' ? filteredItems[selectedPhotoIndex].description.en : filteredItems[selectedPhotoIndex].description.am}
                  </p>
                )}
                <div className="flex items-center justify-center gap-1.5 text-white/55 text-[10px] font-mono pt-2">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>
                    {selectedPhotoIndex + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Control */}
            <button
              id="lightbox-next-btn"
              onClick={handleNextPhoto}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
