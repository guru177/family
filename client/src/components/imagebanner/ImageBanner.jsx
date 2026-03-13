import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import banner from '../../assets/img/banner.jpg';

const ImageBanner = ({ images: pImages, autoPlayInterval = 5000 }) => {
  const images = (pImages && pImages.length > 0) ? pImages : [banner, banner, banner];
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const bannerTimer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => {
      clearInterval(bannerTimer);
    };
  }, [images.length, autoPlayInterval]);

  return (
    <section className="w-full mt-24 mb-32 max-w-9xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full aspect-[16/9] md:aspect-auto md:h-[600px] max-h-[600px] rounded-[40px] md:rounded-[80px] overflow-hidden shadow-2xl group flex items-center justify-center bg-transparent"
      >
        <div className="absolute inset-0 bg-[#0a1910]/10 z-20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

        <AnimatePresence>
          {images[bannerIndex] && (
            <motion.img
              key={bannerIndex}
              src={images[bannerIndex].startsWith('/uploads') ? `http://localhost:5000${images[bannerIndex]}` : images[bannerIndex]}
              alt={`Banner ${bannerIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover md:object-cover object-center"
            />
          )}
        </AnimatePresence>

        {/* Controllers */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBannerIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${bannerIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default ImageBanner;
