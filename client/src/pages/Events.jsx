import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';
import { fetchEvents } from '../services/api';

// Example imagery
import banner from '../assets/img/banner.jpg';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEvents();
        // Only show published events, sorted by date (newest first)
        const published = res.data
          .filter(e => e.status === 'Published')
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(published);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#ffffff] min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection
        badgeText="Community Gatherings"
        title="Upcoming"
        highlightedTitle="Events"
        description="Stay connected, celebrate milestones, and create lasting memories together."
        image={banner}
      />

      <div className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-24 px-6 md:px-20 relative z-10 w-full overflow-hidden flex-grow">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[-20%] w-[50%] h-[50%] bg-[#146c43]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[-20%] w-[50%] h-[50%] bg-[#b8db6e]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-9xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10">
            <div>
              <h3 className="text-[#146c43] font-bold tracking-[3px] uppercase text-xs mb-4 inline-block border-b-2 border-[#146c43]/30 pb-1">
                Our Calendar
              </h3>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#050505]">
                Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146c43] to-[#8eb543]">Schedule</span>
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#146c43]/20 border-t-[#146c43] rounded-full animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 bg-white/50 backdrop-blur rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No upcoming events at the moment. Stay tuned!</p>
            </div>
          ) : (
            <>
              {/* EVENTS GRID - 3 Cards in a row on Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
                {events.slice(0, visibleCount).map((event, index) => (
                  <EventCard key={event._id} event={event} index={index} />
                ))}
              </div>

              {visibleCount < events.length && (
                <div className="mt-16 text-center relative z-10">
                  <motion.button
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border-2 border-[#146c43] text-[#146c43] hover:bg-[#146c43] hover:text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-full shadow-lg"
                  >
                    Load More Events
                  </motion.button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
      <CallToAction />
    </div>
  );
};

export default Events;
