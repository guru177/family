import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Users, Info, ArrowUpRight } from 'lucide-react';
import img1 from '../../assets/img/hero1.jpg';
import img2 from '../../assets/img/hero2.jpg';
import img3 from '../../assets/img/hero3.jpg';
import img4 from '../../assets/img/banner.jpg';

const personalitiesData = [
  {
    id: 1,
    name: "Eleanor Vance",
    years: "1924 - 2008",
    role: "Matriarch & Founder",
    description: "Laid the foundation of our family values and started the tradition of the grand annual gathering that keeps us united today.",
    image: img1
  },
  {
    id: 2,
    name: "Arthur Pendelton",
    years: "1930 - 2012",
    role: "Community Pillar",
    description: "A visionary who established the first family education fund, ensuring that no member's potential would go unrealized due to financial constraints.",
    image: img2
  },
  {
    id: 3,
    name: "Beatrice Sterling",
    years: "1935 - 2018",
    role: "Keeper of Stories",
    description: "Dedicated her life to documenting our heritage, preserving recipes, stories, and photographs that would otherwise have been lost to time.",
    image: img3
  },
  {
    id: 4,
    name: "Samuel Vance",
    years: "1942 - 2021",
    role: "Philanthropist",
    description: "Expanded our family's charitable outreach globally, teaching generations the importance of giving back to the wider community.",
    image: img4
  }
];

const GreatPersonalities = () => {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      className="bg-[#f8fdf9] py-24 md:py-32 relative w-[100vw] ml-[50%] -translate-x-1/2 overflow-hidden z-20"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#146c43]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b8db6e]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: 'radial-gradient(#146c43 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-9xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border-b-2 border-[#146c43] pb-1 mb-6"
          >
            <h3 className="text-[#0a1910] font-bold tracking-[4px] uppercase text-xs sm:text-sm">
              Honoring Our Legacy
            </h3>
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1, duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-[#050505] leading-tight tracking-tight"
          >
            Great <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146c43] to-[#8eb543]">Personalities</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="mt-6 text-[#050505]/60 max-w-2xl mx-auto font-body text-base lg:text-lg"
          >
             The pillars of our family whose wisdom, sacrifices, and love continue to shape our generations.
          </motion.p>
        </div>

        {/* Grid Layout matching reference style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {personalitiesData.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-[24px] shadow-[0_5px_15px_rgba(0,0,0,0.03)] border border-[#146c43]/5 overflow-hidden flex flex-col hover:shadow-[0_20px_40px_rgba(20,108,67,0.12)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image Container with Square Aspect Ratio (1:1) */}
              <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                 <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                 />
                 
                 {/* Gradient overlay to smoothly blend image into the white content area */}
                 <div className="absolute bottom-[-1px] left-0 w-full h-1/4 bg-gradient-to-t from-white to-transparent mix-blend-normal z-10" />

                 {/* Years Badge */}
                 <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm transition-transform duration-300">
                    <span className="text-[#050505]/70 font-bold text-[10px] md:text-xs font-heading tracking-[0.2em] leading-none">
                        {person.years}
                    </span>
                 </div>
                 
                 {/* Hover Glow Ring (subtle) */}
                 <div className="absolute inset-0 border-4 border-[#146c43]/0 group-hover:border-[#146c43]/10 rounded-[24px] rounded-b-none transition-colors duration-500 z-30 pointer-events-none" />
              </div>

              {/* Text Info Container - Always Visible, No massive empty space */}
              <div className="p-6 md:p-8 flex flex-col items-start bg-white relative z-20 -mt-2">
                 
                 {/* Decorative Light Green Line */}
                 <div className="w-8 h-[2px] bg-[#b8db6e] mb-3 group-hover:w-16 group-hover:bg-[#146c43] transition-all duration-300" />
                 
                 {/* Name */}
                 <h4 className="text-xl md:text-2xl font-heading font-extrabold text-[#050505] mb-1 group-hover:text-[#146c43] transition-colors duration-300">
                    {person.name}
                 </h4>
                 
                 {/* Role */}
                 <p className="text-[#4faea6] group-hover:text-[#146c43]/80 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300">
                    {person.role}
                 </p>

                 {/* Sliding Description on Hover - elegant reveal without creating static blank space */}
                 <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out w-full origin-top">
                     <div className="overflow-hidden">
                         <p className="text-[#050505]/60 text-sm leading-relaxed font-body mt-4 pb-2 border-t border-[#146c43]/10 pt-4">
                           {person.description}
                         </p>
                     </div>
                 </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GreatPersonalities;
