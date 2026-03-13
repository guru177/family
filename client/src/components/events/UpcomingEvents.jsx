import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../services/api';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEvents();
        // Only show published events, sorted by date (newest first)
        const published = res.data
          .filter(e => e.status === 'Published')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4); // Take up to 4 events
        setEvents(published);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const resolveImage = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=600';
    if (typeof img === 'string' && img.startsWith('/uploads')) return `http://localhost:5000${img}`;
    return img;
  };

  if (loading) {
    return (
      <section className="mb-24 flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-[#b8db6e]/20 border-t-[#b8db6e] rounded-full animate-spin" />
      </section>
    );
  }

  if (events.length === 0) return null;

  const featuredEvent = events[0];
  const listEvents = events.slice(1);

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
            View All Events
          </motion.button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Large Card (Left) */}
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#b8db6e]/10 group flex flex-col h-full"
          >
            <Link to={`/events/${featuredEvent.slug}`} className="flex flex-col h-full">
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={resolveImage(featuredEvent.image)} 
                  alt={featuredEvent.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-6 left-6 z-20 bg-[#b8db6e] text-[#0a1910] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {featuredEvent.category || 'Featured Event'}
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow bg-white relative z-20 -mt-6 mx-4 rounded-t-3xl border-t border-[#b8db6e]/20">
                <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-[#050505] mb-4 leading-tight group-hover:text-[#b8db6e] transition-colors">
                  {featuredEvent.title}
                </h3>
                <p className="text-[#050505]/70 leading-relaxed mb-6 font-body text-base md:text-lg line-clamp-2">
                  {featuredEvent.description}
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#050505]/5 text-sm font-bold text-[#050505]/50">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#b8db6e]" /> 
                    {new Date(featuredEvent.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="truncate">{featuredEvent.location}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Stacked List Cards (Right) */}
        <div className="flex flex-col gap-6">
          {listEvents.map((item, i) => (
            <Link key={item._id} to={`/events/${item.slug}`}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.04)] border border-[#b8db6e]/10 flex group cursor-pointer hover:shadow-[0_10px_30px_rgba(184,219,110,0.15)] transition-all h-[140px]"
              >
                <div className="w-1/3 min-w-[120px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
                  <img src={resolveImage(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5 flex flex-col justify-center w-2/3 border-l border-[#050505]/5">
                  <div className="text-[10px] font-bold text-[#b8db6e] uppercase tracking-wider mb-2">{item.category}</div>
                  <h4 className="text-sm md:text-base font-extrabold text-[#050505] leading-snug group-hover:text-[#b8db6e] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="text-xs text-[#050505]/40 font-semibold mt-3 mt-auto">
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
