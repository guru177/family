import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import images
import bg1 from '../../assets/img/hero1.jpg';
import bg2 from '../../assets/img/hero2.jpg';
import bg3 from '../../assets/img/hero3.jpg';

const UpcomingEvents = () => {
  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs mb-4 inline-block border-b-2 border-[#b8db6e] pb-1">Stay Updated</h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#050505]">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">Events</span>
          </h2>
        </div>
        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all rounded-full shadow-lg h-fit"
          >
            View All Community News
          </motion.button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Large Card (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#b8db6e]/10 group flex flex-col h-full"
        >
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
            <img src={bg2} alt="Featured Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-6 left-6 z-20 bg-[#b8db6e] text-[#0a1910] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              Featured Event
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col flex-grow bg-white relative z-20 -mt-6 mx-4 rounded-t-3xl border-t border-[#b8db6e]/20">
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-[#050505] mb-4 leading-tight group-hover:text-[#b8db6e] transition-colors">
              Grand Annual Family Reunion | 4 Days of Celebration
            </h3>
            <p className="text-[#050505]/70 leading-relaxed mb-6 font-body text-base md:text-lg">
              Join us for the most anticipated event of the year! We are bringing together all branches of the family for a massive four-day celebration filled with traditional ceremonies, games, knowledge sharing, and feasts.
            </p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#050505]/5 text-sm font-bold text-[#050505]/50">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#b8db6e]" /> July 15-18, 2026</span>
              <span>•</span>
              <span>Grand Heritage Resort</span>
            </div>
          </div>
        </motion.div>

        {/* Stacked List Cards (Right) */}
        <div className="flex flex-col gap-6">
          {[
            { title: "New Medical Assistance Fund Launched for Seniors", date: "May 10, 2026", tag: "Community Support", img: bg3 },
            { title: "Scholarship Applications Now Open for Fall", date: "April 28, 2026", tag: "Education", img: bg1 },
            { title: "Monthly Virtual Catch-up: Meet the Newcomers", date: "April 15, 2026", tag: "Virtual Event", img: bg2 },
            { title: "Monthly Virtual Catch-up: Meet the Newcomers", date: "April 15, 2026", tag: "Virtual Event", img: bg2 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.04)] border border-[#b8db6e]/10 flex group cursor-pointer hover:shadow-[0_10px_30px_rgba(184,219,110,0.15)] transition-all h-[140px]"
            >
              <div className="w-1/3 min-w-[120px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5 flex flex-col justify-center w-2/3 border-l border-[#050505]/5">
                <div className="text-[10px] font-bold text-[#b8db6e] uppercase tracking-wider mb-2">{item.tag}</div>
                <h4 className="text-sm md:text-base font-extrabold text-[#050505] leading-snug group-hover:text-[#b8db6e] transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="text-xs text-[#050505]/40 font-semibold mt-3 mt-auto">{item.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
