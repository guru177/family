import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';

// Example imagery
import banner from '../assets/img/banner.jpg';
import bg1 from '../assets/img/hero1.jpg';
import bg2 from '../assets/img/hero2.jpg';
import bg3 from '../assets/img/hero3.jpg';

const eventsData = [
  {
    id: 1,
    title: "Grand Annual Family Reunion 2026",
    date: "July 15, 2026",
    time: "10:00 AM - 10:00 PM",
    location: "Heritage Resort & Gardens",
    category: "Reunion",
    description: "Join us for the most anticipated event of the year! We are bringing together all branches of the family for a massive celebration filled with traditional ceremonies, games, knowledge sharing, and feasts.",
    image: bg1
  },
  {
    id: 2,
    title: "Youth Leadership Workshop",
    date: "August 22, 2026",
    time: "09:00 AM - 04:00 PM",
    location: "Community Center Hall",
    category: "Education",
    description: "A day dedicated to empowering the next generation. Features guest speakers from within the family sharing their career journeys, leadership skills, and financial literacy basics.",
    image: bg2
  },
  {
    id: 3,
    title: "Autumn Heritage Festival",
    date: "October 10, 2026",
    time: "03:00 PM - 08:00 PM",
    location: "Westwood Park",
    category: "Cultural",
    description: "Celebrate our roots with authentic family recipes, storytelling sessions by our elders, and cultural performances. A perfect evening to honor our shared history.",
    image: bg3
  },
  {
    id: 4,
    title: "Winter Charity Gala & Auction",
    date: "December 05, 2026",
    time: "06:00 PM - 11:30 PM",
    location: "Grand Plaza Hotel",
    category: "Charity",
    description: "Our annual fundraising event to support the community education fund and emergency assistance programs. Enjoy a formal dinner, live entertainment, and charity auction.",
    image: banner
  },
  {
    id: 5,
    title: "Spring Virtual Meet & Greet",
    date: "April 18, 2027",
    time: "11:00 AM - 01:00 PM",
    location: "Online (Zoom)",
    category: "Virtual",
    description: "Can't make it in person? Join our biannual virtual catch-up to welcome new family members, celebrate recent milestones, and stay connected globally.",
    image: bg2
  },
  {
    id: 6,
    title: "Founders' Memorial Service",
    date: "May 25, 2027",
    time: "10:00 AM - 12:00 PM",
    location: "Family Memorial Gardens",
    category: "Memorial",
    description: "A solemn gathering to pay respects and remember the founding members of our modern family community, followed by a shared brunch.",
    image: bg1
  }
];

const Events = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#050505] min-h-screen flex flex-col">
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

          {/* EVENTS GRID - 3 Cards in a row on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {eventsData.slice(0, visibleCount).map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {visibleCount < eventsData.length && (
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

        </div>
      </div>
    </div>
  );
};

export default Events;
