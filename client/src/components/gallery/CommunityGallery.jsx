import React from 'react';
import { motion } from 'framer-motion';

// Image imports
import bg1 from '../../assets/img/hero1.jpg';
import bg2 from '../../assets/img/hero2.jpg';
import bg3 from '../../assets/img/hero3.jpg';
import banner from '../../assets/img/banner.jpg';

const defaultImages = [bg1, banner, bg2, bg3, banner, bg1];

const CommunityGallery = ({ setSelectedImage, images = defaultImages }) => {
  return (
    <section className="mb-24 px-4 md:px-0 max-w-9xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs mb-4 inline-block border-b-2 border-[#b8db6e] pb-1">Memories</h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#050505]">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">Gallery</span>
        </h2>
      </div>

      {/* Desktop Layout - Clean 3-Column Grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {images.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all aspect-[4/3]"
          >
            <div className="absolute inset-0 bg-[#0a1910]/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-bold tracking-widest uppercase text-xs drop-shadow-md bg-white/10 px-6 py-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View Memory</span>
            </div>
            <img src={item.src} alt={item.alt || `Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden columns-2 gap-4 space-y-4">
        {images.slice(0, 6).map((item, i) => (
          <motion.div
            key={`mobile-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all break-inside-avoid w-full"
          >
            <div className="absolute inset-0 bg-[#0a1910]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-bold tracking-widest uppercase text-xs drop-shadow-md bg-white/10 px-4 py-2 rounded-full border border-white/20">View</span>
            </div>
            <img src={item.src} alt={item.alt || `Mobile Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block" />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12 md:mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] px-10 py-4 md:px-12 md:py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-full shadow-[0_10px_20px_rgba(10,25,16,0.2)]"
        >
          View More
        </motion.button>
      </div>
    </section>
  );
};

export default CommunityGallery;
