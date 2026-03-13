import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';

import bg1 from '../assets/img/hero1.jpg';
import bg2 from '../assets/img/hero2.jpg';
import bg3 from '../assets/img/hero3.jpg';

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "New Medical Assistance Fund Launched for Seniors",
    date: "2026-05-10",
    category: "Community Support",
    excerpt: "We are incredibly proud to announce the launch of our new Medical Assistance Fund dedicated to providing comprehensive healthcare support for the elderly members of our family network.",
    image: bg3,
    status: "Published"
  },
  {
    id: 2,
    title: "Scholarship Applications Now Open for Fall",
    date: "2026-04-28",
    category: "Education",
    excerpt: "The annual Family Education Foundation is now accepting applications for the Fall 2026 semester. Eligible students are encouraged to apply early to secure their grants.",
    image: bg1,
    status: "Published"
  },
  {
    id: 3,
    title: "Monthly Virtual Catch-up: Meet the Newcomers",
    date: "2026-04-15",
    category: "Virtual Event",
    excerpt: "Join us this weekend on Zoom as we welcome the newest additions to our extended family, sharing joyful stories and connecting across continents.",
    image: bg2,
    status: "Published"
  },
  {
    id: 4,
    title: "Heritage Restoration Project Completed",
    date: "2026-03-02",
    category: "Heritage",
    excerpt: "After months of careful planning and restoration work, the ancestral home's main hall has been fully restored to its former glory. View the full photo gallery inside.",
    image: bg1,
    status: "Published"
  }
];

import { fetchAnnouncements } from '../services/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const res = await fetchAnnouncements();
        setAnnouncements(res.data.filter(a => a.status === 'Published'));
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnnouncements();
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#ffffff] min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection
        badgeText="Latest Updates"
        title="Community"
        highlightedTitle="News"
        description="Stay informed about the latest announcements, achievements, and important notices from our family network."
        image={bg2}
      />

      <div className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-24 px-6 md:px-20 relative z-10 w-full flex-grow">
        {/* Background Gradients */}
        <div className="absolute top-0 right-[-20%] w-[50%] h-[50%] bg-[#b8db6e]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-9xl mx-auto z-10 relative">

          <div className="mb-16">
            <h3 className="text-[#146c43] font-bold tracking-[3px] uppercase text-xs mb-4 inline-block border-b-2 border-[#146c43]/30 pb-1">
              Press Release
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-[#050505]">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146c43] to-[#8eb543]">Headlines</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#146c43]/20 border-t-[#146c43] rounded-full animate-spin mb-4" />
              <p className="text-[#050505]/40 font-bold uppercase tracking-widest text-xs">Curating family stories...</p>
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {announcements.map((news, index) => (
                <AnnouncementCard key={news._id} news={news} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-medium">No announcements published at this time.</p>
            </div>
          )}

          {announcements.length > 4 && (
            <div className="mt-16 flex justify-center">
              <button className="bg-white border-2 border-[#146c43] text-[#146c43] hover:bg-[#146c43] hover:text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-full shadow-md">
                Load Older Articles
              </button>
            </div>
          )}

        </div>
      </div>
      <CallToAction />
    </div>
  );
};

export default Announcements;
