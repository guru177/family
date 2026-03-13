import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  badgeText, 
  title, 
  highlightedTitle, 
  description, 
  image 
}) => {
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden bg-[#050505]">
      {/* Background Image with Parallax & Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={image}
          alt="Hero background"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1910] via-[#0a1910]/70 to-transparent" />
      </div>

      {/* Floating Gradients */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#b8db6e]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-[#4faea6]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-12 md:mt-0"
        >
          {badgeText && (
            <span className="text-[#b8db6e] font-bold tracking-[4px] uppercase text-xs md:text-sm mb-6 inline-block border-b-2 border-[#b8db6e]/30 pb-2 drop-shadow-md">
              {badgeText}
            </span>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-6 leading-tight tracking-tighter uppercase drop-shadow-lg">
            {title} {highlightedTitle && <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-white">{highlightedTitle}</span>}
          </h1>

          {description && (
            <p className="text-white/70 text-base md:text-xl font-body max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
