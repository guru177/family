import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Users } from 'lucide-react';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';

import banner from '../assets/img/banner.jpg';
import bg1 from '../assets/img/hero1.jpg';

const EventDetail = () => {
   const { id } = useParams();

   // In a real app we would fetch the event by ID. Here we use dummy data.
   const event = {
      id: id || 1,
      title: "Grand Annual Family Reunion 2026",
      date: "July 15, 2026",
      time: "10:00 AM - 10:00 PM",
      location: "Heritage Resort & Gardens, 123 Family Lane, Greenville",
      category: "Reunion",
      description: "Join us for the most anticipated event of the year! We are bringing together all branches of the family for a massive four-day celebration filled with traditional ceremonies, games, knowledge sharing, and feasts. \n\nThe event will start early on Thursday morning with a welcome breakfast and registration, followed by our opening ceremony honoring our elders. The weekend will feature inter-family sports tournaments, a talent show, and our much-loved recipe exchange. We will conclude on Sunday with a grand feast and the annual family photo.",
      image: bg1,
      agenda: [
         { time: "10:00 AM", title: "Welcome & Registration", desc: "Collect your nametags and welcome bags." },
         { time: "12:00 PM", title: "Opening Ceremony", desc: "A brief history and honoring of elders." },
         { time: "02:00 PM", title: "Family Picnic & Games", desc: "Outdoor activities for all ages." },
         { time: "06:00 PM", title: "Grand Dinner", desc: "Buffet style dinner featuring family recipes." }
      ]
   };

   return (
      <div className="w-full overflow-x-hidden bg-[#050505] min-h-screen flex flex-col">

         <HeroSection
            badgeText={event.category}
            title="Event"
            highlightedTitle="Details"
            description={event.title}
            image={banner}
         />

         <div className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-16 md:py-24 relative z-10 w-full flex-grow">
            <div className="max-w-9xl mx-auto px-6 md:px-12 flex flex-col gap-12 lg:gap-16">

               {/* Back button */}
               <div className="relative z-10">
                  <Link to="/events" className="inline-flex items-center gap-3 text-[#146c43] font-bold text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
                     <div className="bg-[#146c43]/10 p-2 rounded-full">
                        <ArrowLeft size={16} />
                     </div>
                     Back to Events
                  </Link>
               </div>

               <div className="grid lg:grid-cols-3 gap-12 items-start relative z-10">

                  {/* Left Column - Main Details */}
                  <div className="lg:col-span-2 space-y-12">

                     {/* Main Image */}
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl relative"
                     >
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
                           <span className="text-[#146c43] font-bold text-xs uppercase tracking-[0.2em]">{event.category}</span>
                        </div>
                     </motion.div>

                     {/* Title and Description */}
                     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#050505] mb-6 leading-tight">
                           {event.title}
                        </h1>
                        <div className="prose prose-lg text-[#050505]/70 font-body mb-10 whitespace-pre-line">
                           {event.description}
                        </div>
                     </motion.div>

                     {/* Event Agenda */}
                     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#146c43]/5">
                        <h3 className="text-2xl font-heading font-extrabold text-[#050505] mb-8 flex items-center gap-4">
                           <div className="w-1.5 h-8 bg-[#b8db6e] rounded-full" />
                           Event Agenda
                        </h3>
                        <div className="space-y-8 relative">
                           <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-[#146c43]/10" />
                           {event.agenda.map((item, i) => (
                              <div key={i} className="flex gap-6 relative">
                                 <div className="w-6 h-6 rounded-full bg-white border-4 border-[#146c43] shadow-sm z-10 shrink-0 mt-1" />
                                 <div>
                                    <div className="text-[#146c43] font-bold text-sm tracking-widest uppercase mb-1">{item.time}</div>
                                    <h4 className="text-lg font-bold text-[#050505] mb-1">{item.title}</h4>
                                    <p className="text-[#050505]/60 text-sm font-body">{item.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>

                  </div>

                  {/* Right Column - Sticky Sidebar */}
                  <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-8">

                     {/* Info Card */}
                     <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#146c43]/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#146c43] to-[#b8db6e]" />

                        <h3 className="text-xl font-heading font-extrabold text-[#050505] mb-6">Event Details</h3>

                        <div className="space-y-6">
                           <div className="flex items-start gap-4">
                              <div className="bg-[#146c43]/10 p-3 rounded-2xl text-[#146c43] shrink-0">
                                 <Calendar size={20} />
                              </div>
                              <div>
                                 <p className="text-[#050505]/50 text-xs font-bold uppercase tracking-widest mb-1">Date</p>
                                 <p className="text-[#050505] font-semibold">{event.date}</p>
                              </div>
                           </div>

                           <div className="flex items-start gap-4">
                              <div className="bg-[#146c43]/10 p-3 rounded-2xl text-[#146c43] shrink-0">
                                 <Clock size={20} />
                              </div>
                              <div>
                                 <p className="text-[#050505]/50 text-xs font-bold uppercase tracking-widest mb-1">Time</p>
                                 <p className="text-[#050505] font-semibold">{event.time}</p>
                              </div>
                           </div>

                           <div className="flex items-start gap-4">
                              <div className="bg-[#146c43]/10 p-3 rounded-2xl text-[#146c43] shrink-0">
                                 <MapPin size={20} />
                              </div>
                              <div>
                                 <p className="text-[#050505]/50 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                                 <p className="text-[#050505] font-semibold">{event.location}</p>
                              </div>
                           </div>
                        </div>

                     </motion.div>

                  </div>

               </div>
            </div>

         </div>
      </div>
   );
};

export default EventDetail;
