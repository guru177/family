import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="mt-16 mb-16 max-w-9xl mx-auto relative z-20 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-[40px] overflow-hidden shadow-2xl bg-[#ffffff] text-center px-6 py-12 md:py-12 isolate w-full"
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#142f1f] to-[#0a1910] -z-10" />

        {/* Decorative Blur Circles */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#b8db6e]/20 rounded-full blur-[80px] pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#b8db6e]/10 rounded-full blur-[80px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-[#b8db6e] font-bold tracking-[3px] uppercase text-xs mb-6 inline-block border-b-2 border-white/20 pb-1">
            Join Our Community
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-tight">
            Ready to be part of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-white">our growing family?</span>
          </h2>

          <p className="text-white/70 text-base md:text-xl font-body mb-12 max-w-2xl leading-relaxed">
            Connect with relatives, participate in events, and help us preserve our heritage for future generations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b8db6e] text-[#0a1910] hover:bg-white px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all rounded-full shadow-[0_10px_30px_rgba(184,219,110,0.3)] w-full sm:w-auto"
            >
              Become a Member
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-3 hover:text-[#b8db6e] transition-colors"
            >
              Contact Administration <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
