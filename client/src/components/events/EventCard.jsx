import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

const EventCard = ({ event, index }) => {
  const resolveImage = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=600';
    if (typeof img === 'string' && img.startsWith('/uploads')) return `http://localhost:5000${img}`;
    return img;
  };

  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#146c43]/5 hover:shadow-[0_20px_40px_rgba(20,108,67,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Header */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1910]/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
        <img
          src={resolveImage(event.image)}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-5 transition-transform duration-500 group-hover:-translate-y-1 left-5 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/50">
          <span className="text-[#146c43] font-bold text-[10px] uppercase tracking-[0.2em]">{event.category}</span>
        </div>

        {/* Elegant fade bottom */}
        <div className="absolute bottom-[-2px] left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* Content Body */}
      <div className="p-8 flex flex-col flex-grow relative z-20 -mt-6 bg-white rounded-t-[32px]">

        {/* Date Badge intersecting image and content */}
        <div className="absolute -top-12 right-6 bg-[#146c43] text-white w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-xl border-4 border-white transform group-hover:rotate-6 transition-transform duration-300">
          <span className="text-xl font-extrabold leading-none">{day}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-1 opacity-90">{month}</span>
        </div>

        <h3 className="text-2xl font-heading font-extrabold text-[#050505] mb-4 mt-2 group-hover:text-[#146c43] transition-colors line-clamp-2 leading-tight">
          {event.title}
        </h3>

        {/* Info Row */}
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="flex items-center gap-3 text-[#050505]/60 text-sm font-semibold">
            <Calendar size={16} className="text-[#b8db6e]" />
            <span>{eventDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-3 text-[#050505]/60 text-sm font-semibold">
              <Clock size={16} className="text-[#b8db6e]" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-[#050505]/60 text-sm font-semibold">
            <MapPin size={16} className="text-[#b8db6e]" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="text-[#050505]/70 text-sm leading-relaxed font-body mb-8 line-clamp-3">
          {event.description}
        </p>

        {/* Footer / CTA - Stays at bottom */}
        <div className="mt-auto pt-6 border-t border-[#146c43]/10 flex items-center justify-between">
          <Link
            to={`/events/${event.slug}`}
            className="text-[#146c43] font-bold uppercase tracking-widest text-xs flex items-center gap-2 group/link"
          >
            Event Details
            <div className="bg-[#146c43]/10 p-1.5 rounded-full text-[#146c43] group-hover/link:bg-[#146c43] group-hover/link:text-white transition-colors">
              <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default EventCard;
