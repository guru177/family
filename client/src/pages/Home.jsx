import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Facebook, ArrowRight, MapPin, Youtube } from 'lucide-react';
import CallToAction from '../components/layout/CallToAction';
import ImageBanner from '../components/imagebanner/ImageBanner';
import UpcomingEvents from '../components/events/UpcomingEvents';
import ScrollingBanner from '../components/announcements/ScrollingBanner';
import HeroSlider from '../components/layout/HeroSlider';

// WhatsApp icon moved to HeroSlider



const Counter = ({ from, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};



import bg1 from '../assets/img/hero1.jpg';
import bg2 from '../assets/img/hero2.jpg';
import bg3 from '../assets/img/hero3.jpg';

// sliderData moved to HeroSlider
import banner from '../assets/img/banner.jpg';
import CommunityGallery from '../components/gallery/CommunityGallery';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full overflow-x-hidden bg-[#050505]">
      <HeroSlider />

      {/* --- NEW CONTENT SECTIONS --- */}
      <div className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-24 px-6 md:px-20 relative z-10 w-full overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[-20%] w-[50%] h-[50%] bg-[#b8db6e]/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[-20%] w-[50%] h-[50%] bg-[#4faea6]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-9xl mx-auto space-y-32">

          {/* About Section - Redesigned */}
          <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center max-w-9xl mx-auto">

            {/* Left side: Image and Flowing Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              {/* Main Image Container */}
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[100px] rounded-br-none overflow-hidden shadow-2xl z-10 group mt-10 md:mt-0">
                <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                <img src={bg2} alt="Community Experts" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>

              {/* Floating Tab 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white text-[#0a1910] px-4 md:px-6 py-3 md:py-4 rounded-xl flex items-center gap-4 z-20 shadow-2xl border border-[#b8db6e]/20"
              >
                <div className="w-2 h-8 bg-[#b8db6e] rounded-full shadow-[0_0_15px_rgba(184,219,110,0.5)]" />
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold"><Counter from={0} to={500} />+</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#0a1910]/60">Members</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -10, 0]
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  type: "spring",
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
                className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-10 bg-white text-[#0a1910] w-36 h-36 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center p-4 md:p-6 z-20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.05),_10px_10px_30px_rgba(0,0,0,0.05)] border-4 border-white"
              >
                <div className="text-[#b8db6e] mb-1 md:mb-2 drop-shadow-sm scale-75 md:scale-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div className="text-xl md:text-3xl font-extrabold md:mb-1"><Counter from={0} to={8} />+</div>
                <div className="text-[8px] md:text-[10px] uppercase font-bold text-center leading-tight opacity-70">Years<br />Community<br />Trust</div>
                {/* Decorative leaf shape behind badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -left-8 md:-left-12 bottom-2 md:bottom-4 w-16 h-16 md:w-24 md:h-24 bg-[#b8db6e] rounded-tl-full rounded-br-full -z-10 opacity-60"
                />
              </motion.div>
            </motion.div>

            {/* Right side: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 md:order-2 text-[#050505] relative"
            >
              <div className="flex flex-col gap-6">
                <div className="inline-block border-b-2 border-[#b8db6e] pb-1 w-max">
                  <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs">
                    Who We Are
                  </h3>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] tracking-tight m-0">
                  United as a<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">
                    family community
                  </span><br />
                  supporting each other
                </h2>

                <p className="text-[#050505]/70 text-base leading-relaxed font-body mt-4 max-w-lg">
                  Our family community platform brings members together to stay connected,
                  celebrate traditions, and support one another. Through events,
                  announcements, and shared memories, we strengthen our bond and ensure
                  that every member remains informed and involved in our community
                  activities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-8">

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex gap-4 items-start cursor-default group"
                  >
                    <div className="text-white bg-[#b8db6e] p-2 rounded-lg mt-1 shrink-0 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>

                    <span className="font-bold text-sm leading-tight mt-1 group-hover:text-[#b8db6e] transition-colors">
                      Community Events<br />
                      & Family Gatherings
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex gap-4 items-start cursor-default group"
                  >
                    <div className="text-white bg-[#b8db6e] p-2 rounded-lg mt-1 shrink-0 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>

                    <span className="font-bold text-sm leading-tight mt-1 group-hover:text-[#b8db6e] transition-colors">
                      Member Directory<br />
                      & Community Support
                    </span>
                  </motion.div>

                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-full w-max mt-2 shadow-[0_10px_20px_rgba(10,25,16,0.2)]"
                >
                  Explore Community
                </motion.button>
              </div>
            </motion.div>
          </section>

          {/* Full Width Image Banner Component */}
          <ImageBanner />

          {/* Upcoming Events Component */}
          <UpcomingEvents />

          {/* Community Gallery Component */}
          <CommunityGallery setSelectedImage={setSelectedImage} />

          {/* --- NEW SECTION: Donation / Support --- */}
          <section className="mb-32 px-4 md:px-0 max-w-9xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              {/* Left Side: Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative py-12"
              >
                {/* Main Image */}
                <div className="relative w-[85%] md:w-[80%] aspect-square md:aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl z-10 isolate group">
                  <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                  <img src={bg2} alt="Community Support" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>

                {/* Overlapping Secondary Image */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute -bottom-4 right-0 md:-bottom-8 md:-right-8 w-[65%] md:w-[60%] aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl z-20 border-[8px] md:border-[12px] border-white group"
                >
                  <img src={bg3} alt="Community Member" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </motion.div>

                {/* Floating Stat Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  className="absolute top-4 right-4 md:top-8 md:-right-4 bg-[#0a1910] text-white px-6 py-8 md:px-8 md:py-10 rounded-[24px] rounded-br-[8px] md:rounded-tl-[30px] md:rounded-tr-[30px] md:rounded-bl-[30px] md:rounded-br-[8px] shadow-2xl z-30"
                >
                  <div className="text-3xl md:text-5xl font-extrabold text-[#b8db6e] mb-1 md:mb-2 flex items-center">
                    <Counter from={0} to={25} duration={2} />+
                  </div>
                  <div className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold opacity-80 leading-tight">
                    Years of<br />Legacy
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side: Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col text-[#050505] mt-8 md:mt-0"
              >
                <div className="inline-block border-b-2 border-[#b8db6e] pb-1 w-max mb-6">
                  <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs">
                    Community Support
                  </h3>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] tracking-tight mb-6">
                  One of the fastest ways<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">
                    to make an impact
                  </span>
                </h2>

                <p className="text-[#050505]/70 text-base md:text-lg leading-relaxed font-body mb-8 max-w-lg">
                  Contributions from members like you form the foundation of our community projects. Your support enables us to organize events, provide educational scholarships, and assist families in need. Together, we can make a lasting difference.
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-[#0a1910] text-sm tracking-widest uppercase mb-4">Donation Initiatives:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {[
                      "Emergency Assistance",
                      "Education Funds",
                      "Annual Gatherings",
                      "Community Upgrades"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-[#b8db6e]/20 p-1.5 rounded-full text-[#0a1910]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="font-bold text-sm text-[#050505]/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] px-8 py-4 md:px-10 font-bold uppercase tracking-widest text-xs transition-all rounded-full w-max shadow-[0_10px_20px_rgba(10,25,16,0.2)] flex items-center justify-center gap-3 group mt-4"
                >
                  Make a Donation
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* --- NEW SECTION: Call to Action --- */}
          <CallToAction />

        </div>
      </div>

      {/* --- Glassmorphic Lightbox Popup --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 backdrop-blur-xl bg-black/80"
            onClick={() => setSelectedImage(null)}
          >
            {/* Prominent Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-24 right-4 md:top-24 md:right-8 bg-white hover:bg-[#b8db6e] text-[#050505] p-3 md:p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all z-[60] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="hidden md:block font-bold text-sm tracking-widest uppercase pl-2">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-[85vh] rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-black flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
                style={{ maxHeight: 'calc(85vh - 80px)' }}
              />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-white font-heading font-extrabold text-2xl md:text-3xl tracking-tight">
                  {selectedImage.alt}
                </h3>
                <p className="text-white/60 font-body text-sm mt-2">
                  Community Gallery Collection
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
