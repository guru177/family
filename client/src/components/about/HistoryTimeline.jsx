import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const historyData = [
  {
    year: '1979',
    title: 'Chapter one',
    description: 'Our family community was officially founded in 1979 as a small gathering. Today, it connects hundreds of members and offers a diverse range of support systems worldwide.'
  },
  {
    year: '1996',
    title: 'Chapter two',
    description: 'The first grand family reunion was established in 1996. The annual gathering size rapidly grew from 50 close relatives to over 200 participants.'
  },
  {
    year: '2008-2018',
    title: 'Chapter three',
    description: 'Our community was awarded the Excellence in Community Service award three times, recognizing our strong support networks and charitable initiatives for members.'
  },
  {
    year: '2023',
    title: 'Chapter four',
    description: 'We launched the unified digital portal to keep the global family connected, sharing milestones, events, and memories instantly across borders.'
  }
];

const HistoryTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const carTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-gradient-to-b from-[#0a1910] via-[#0f2418] to-[#0a1910] text-white py-24 md:py-32 relative w-[100vw] ml-[50%] -translate-x-1/2 overflow-hidden shadow-2xl z-20 rounded-[40px] md:rounded-[80px]">
      {/* Abstract Glowing Orbs for Glassmorphism Context */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#b8db6e]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#b8db6e]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#4faea6]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        {/* Title */}
        <div className="text-center mb-24 md:mb-32 relative">
           <motion.div initial={{opacity: 0, y: -20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="inline-block bg-white/5 border border-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 shadow-xl">
             <h3 className="text-[#b8db6e] font-bold tracking-[4px] uppercase text-xs sm:text-sm">Our Journey</h3>
           </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-white">History</span>
          </h2>
        </div>

        <div className="relative pt-12 pb-24 md:pt-16 md:pb-32">
          {/* Central Lines */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2 backdrop-blur-sm" />
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-[#b8db6e] to-[#4faea6] transform md:-translate-x-1/2 origin-top rounded-full z-10 shadow-[0_0_15px_rgba(184,219,110,0.5)]"
            style={{ scaleY: scrollYProgress, bottom: 0 }}
          />

          {/* Moving Cart / Car Icon */}
          <motion.div
            className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            style={{ top: carTop }}
          >
            <div className="w-16 h-[80px] bg-white/10 backdrop-blur-xl rounded-full flex flex-col items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-white/30 pt-[2px]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full opacity-50" />
              <svg width="32" height="42" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <rect x="6" y="8" width="20" height="24" rx="4" fill="#b8db6e" />
                <rect x="3" y="11" width="3" height="7" rx="1.5" fill="#0a1910" />
                <rect x="26" y="11" width="3" height="7" rx="1.5" fill="#0a1910" />
                <rect x="3" y="22" width="3" height="7" rx="1.5" fill="#0a1910" />
                <rect x="26" y="22" width="3" height="7" rx="1.5" fill="#0a1910" />
                <path d="M16 4 L16 8" stroke="#b8db6e" strokeWidth="3" strokeLinecap="round" />
                <rect x="10" y="2" width="12" height="5" rx="2" fill="white" />
                 {/* Internal Cart details */}
                 <rect x="10" y="12" width="12" height="16" rx="2" fill="#0a1910" />
                 <circle cx="16" cy="20" r="3" fill="#b8db6e" />
                 <path d="M16 23 L16 28" stroke="#0a1910" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* Timeline Items */}
          <div className="space-y-28 md:space-y-48 relative z-10 font-body">
            {historyData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-center w-full group py-4 md:py-0">
                  
                  {/* MOBILES Dot & Connector */}
                  <div className="md:hidden absolute left-8 w-6 h-[2px] bg-gradient-to-r from-[#b8db6e] to-transparent top-10 z-10" />
                  <div className="md:hidden absolute left-8 transform -translate-x-1/2 top-10 mt-[-5px] w-4 h-4 rounded-full bg-[#b8db6e] border-[3px] border-[#0a1910] shadow-[0_0_15px_rgba(184,219,110,0.6)] z-20" />
                  
                  {/* DESKTOP Dot & Connector */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#b8db6e] border-4 border-[#0a1910] shadow-[0_0_20px_rgba(184,219,110,0.6)] z-20 transition-transform duration-300 group-hover:scale-125 group-hover:bg-white" />
                  <div className={`hidden md:block absolute top-[8px] h-[2px] bg-gradient-to-r ${isEven ? 'from-transparent to-[#b8db6e]/50 right-1/2 w-24' : 'from-[#b8db6e]/50 to-transparent left-1/2 w-24'} z-10`} />

                  {/* LEFT PANEL */}
                  <div className={`w-full md:w-1/2 relative min-h-[120px] ${isEven ? 'hidden md:flex flex-col items-end pr-20 lg:pr-32' : 'flex flex-col pl-20 md:pl-0 md:pr-20 lg:pr-32 items-start md:items-end md:text-right text-left'}`}>
                    {isEven ? (
                      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true, margin: "-100px" }} transition={{duration: 0.6, type: "spring"}} className="flex items-center justify-end w-full">
                        <h3 className="text-5xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 drop-shadow-2xl mb-0 tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.year}
                        </h3>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true, margin: "-100px" }} transition={{duration: 0.6}} className="w-full relative">
                        {/* Glassmorphic Card */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                          <h3 className="text-3xl font-heading font-extrabold text-[#b8db6e] mb-4 md:hidden drop-shadow-md">{item.year}</h3>
                          <h4 className="text-white font-extrabold text-2xl lg:text-3xl mb-4 font-heading leading-tight flex flex-col md:items-end">
                            {item.title}
                            <div className="w-12 h-1 bg-[#b8db6e] rounded-full mt-3 opacity-50 group-hover:opacity-100 transition-opacity md:ml-auto" />
                          </h4>
                          <p className="text-white/70 leading-relaxed font-body text-base lg:text-lg">
                              {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* RIGHT PANEL */}
                  <div className={`w-full md:w-1/2 relative min-h-[120px] ${isEven ? 'flex flex-col pl-20 md:pl-20 lg:pl-32 items-start text-left mt-8 md:mt-0' : 'hidden md:flex flex-col items-start pl-20 lg:pl-32'}`}>
                    {isEven ? (
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true, margin: "-100px" }} transition={{duration: 0.6}} className="w-full relative">
                        {/* Glassmorphic Card */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                          {/* Fake year placement for mobile layout consistency */}
                          <div className="md:hidden mb-4">
                             <h3 className="text-3xl font-heading font-extrabold text-[#b8db6e] drop-shadow-md">{item.year}</h3>
                          </div>
                          <h4 className="text-white font-extrabold text-2xl lg:text-3xl mb-4 font-heading leading-tight flex flex-col">
                            {item.title}
                            <div className="w-12 h-1 bg-[#b8db6e] rounded-full mt-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-white/70 leading-relaxed font-body text-base lg:text-lg">
                              {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true, margin: "-100px" }} transition={{duration: 0.6, type: "spring"}} className="flex items-center justify-start w-full">
                        <h3 className="text-5xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-white to-white/20 drop-shadow-2xl mb-0 tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.year}
                        </h3>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
