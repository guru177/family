import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Facebook, ArrowRight, Youtube } from 'lucide-react';
import ScrollingBanner from '../announcements/ScrollingBanner';

// Move image imports to local component or pass as props if reusable
import bg1 from '../../assets/img/hero1.jpg';
import bg2 from '../../assets/img/hero2.jpg';
import bg3 from '../../assets/img/hero3.jpg';

const WhatsApp = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

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

const sliderDataDefault = [
  {
    id: 1,
    title: "Family Reunion",
    subtitle: "Connect",
    description: "Celebrate our heritage and create lasting memories at our annual family gathering. A time to bond, share stories, and grow together.",
    image: bg1,
    location: "Annual Meetup"
  },
  {
    id: 2,
    title: "Community Impact",
    subtitle: "Purpose",
    description: "Join hands as we support each other through our community initiatives. Together, we build a stronger and more vibrant future for everyone.",
    image: bg2,
    location: "Global Family"
  },
  {
    id: 3,
    title: "Honoring Legacy",
    subtitle: "History",
    description: "Remember the roots that keep us grounded. Discover the journey of our ancestors and the timeless values that define us today.",
    image: bg3,
    location: "Heritage Roots"
  }
];

const HeroSlider = ({ sliderData = sliderDataDefault, autoPlayInterval = 8000, forceMobile = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset index if data changes to avoid out of bounds
    setCurrentIndex(0);
  }, [sliderData.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderData.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [sliderData.length, autoPlayInterval]);

  const currentSlide = sliderData[currentIndex] || sliderData[0];

  return (
    <div className="relative h-screen w-full overflow-hidden group">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img src={currentSlide.image} alt={currentSlide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Social Sidebar */}
        <div className={`${forceMobile ? 'hidden' : 'hidden md:flex'} absolute left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-20 items-center`}>
          <div className="w-px h-24 bg-white/50 mb-4" />
          <a href="#" className="text-white opacity-60 hover:opacity-100 transition-opacity"><WhatsApp size={20} /></a>
          <a href="#" className="text-white opacity-60 hover:opacity-100 transition-opacity"><Facebook size={20} /></a>
          <a href="#" className="text-white opacity-60 hover:opacity-100 transition-opacity"><Youtube size={20} /></a>
        </div>

        {/* Hero Content */}
        <div className={`absolute ${forceMobile ? 'top-[45%] left-[5%] max-w-[90%]' : 'top-[45%] md:top-1/2 left-[5%] md:left-[10%] max-w-[90%] md:max-w-[600px]'} -translate-y-1/2 z-10`}>
          <motion.div
            key={`content-${currentSlide.id}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className={`font-heading font-extrabold leading-none mb-4 uppercase tracking-tighter ${forceMobile ? 'text-5xl mt-12' : 'text-5xl md:text-8xl mt-12 md:mt-0'}`}>
              {currentSlide.title.split(' ')[0]}<br />{currentSlide.title.split(' ').slice(1).join(' ')}
            </h1>
            <div className={`flex items-center gap-4 font-light mb-6 ${forceMobile ? 'text-xl' : 'text-xl md:text-3xl'}`}>
              <h2 className="uppercase tracking-widest">{currentSlide.subtitle}</h2>
              <div className={`h-0.5 bg-white ${forceMobile ? 'w-8' : 'w-8 md:w-12'}`} />
            </div>
            <p className={`text-white/70 leading-relaxed mb-8 md:mb-10 font-body ${forceMobile ? 'text-sm' : 'text-sm md:text-base'}`}>
              {currentSlide.description}
            </p>
            <button className={`flex items-center gap-4 bg-white text-black font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 ${forceMobile ? 'px-6 py-4 text-sm' : 'px-6 md:px-10 py-4 md:py-5 text-sm md:text-base'}`}>
              Explore <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Thumbnail Previews */}
        <div className={`${forceMobile ? 'hidden' : 'hidden md:flex'} absolute bottom-[15%] right-[10%] gap-4 z-20`}>
          {sliderData.map((item, index) => (
            <div
              key={`thumb-${item.id}`}
              className={`w-32 h-44 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border-2 ${index === currentIndex ? 'border-white -translate-y-3 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Vertical Slider Indicator */}
        <div className={`${forceMobile ? 'hidden' : 'hidden md:flex'} absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-20`}>
          <div className="w-px h-24 bg-white/20" />
          <span className="vertical-rl text-[10px] uppercase tracking-[4px] text-white/40 rotate-180">
            {currentSlide.title}
          </span>
          <div className="w-px h-24 bg-white/20" />
        </div>

        <ScrollingBanner />

        <style dangerouslySetInnerHTML={{
          __html: `
        .vertical-rl {
          writing-mode: vertical-rl;
        }
      `}} />
      </div>
  );
};

export default HeroSlider;
