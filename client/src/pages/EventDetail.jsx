import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Users } from 'lucide-react';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';
import { fetchEventBySlug } from '../services/api';

import banner from '../assets/img/banner.jpg';

const EventDetail = () => {
   const { slug } = useParams();
   const [event, setEvent] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const loadEvent = async () => {
         try {
            const res = await fetchEventBySlug(slug);
            setEvent(res.data);
         } catch (err) {
            console.error('Error fetching event:', err);
            setError('Event not found');
         } finally {
            setLoading(false);
         }
      };
      loadEvent();
   }, [slug]);

   const resolveImage = (img) => {
      if (!img) return 'https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=1200';
      if (typeof img === 'string' && img.startsWith('/uploads')) return `http://localhost:5000${img}`;
      return img;
   };

   if (loading) {
      return (
         <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#146c43]/20 border-t-[#146c43] rounded-full animate-spin" />
         </div>
      );
   }

   if (error || !event) {
      return (
         <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
            <h2 className="text-3xl font-heading font-extrabold text-white mb-6">{error || 'Event not found'}</h2>
            <Link to="/events" className="bg-[#146c43] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">
               Back to Events
            </Link>
         </div>
      );
   }

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
                        <img src={resolveImage(event.image)} alt={event.title} className="w-full h-full object-cover" />
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
                     {event.agenda && event.agenda.length > 0 && (
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
                     )}

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
                                 <p className="text-[#050505] font-semibold">
                                    {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                 </p>
                              </div>
                           </div>

                           {event.time && (
                              <div className="flex items-start gap-4">
                                 <div className="bg-[#146c43]/10 p-3 rounded-2xl text-[#146c43] shrink-0">
                                    <Clock size={20} />
                                 </div>
                                 <div>
                                    <p className="text-[#050505]/50 text-xs font-bold uppercase tracking-widest mb-1">Time</p>
                                    <p className="text-[#050505] font-semibold">{event.time}</p>
                                 </div>
                              </div>
                           )}

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
         <CallToAction />
      </div>
   );
};

export default EventDetail;
