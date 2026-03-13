import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/layout/HeroSection';
import CallToAction from '../components/layout/CallToAction';
import HistoryTimeline from '../components/about/HistoryTimeline';
import GreatPersonalities from '../components/about/GreatPersonalities';
import banner from '../assets/img/banner.jpg';
import bg2 from '../assets/img/hero2.jpg';

const About = () => {
  return (
    <div className="w-full overflow-x-hidden bg-[#050505] min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection
        badgeText="Our Story"
        title="About"
        highlightedTitle="Us"
        description="Discover the history, values, and vision that unite our family community."
        image={banner}
      />

      {/* Main Content Sections */}
      <div className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-24 px-6 md:px-20 relative z-10 w-full overflow-hidden flex-grow">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[-20%] w-[50%] h-[50%] bg-[#b8db6e]/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[-20%] w-[50%] h-[50%] bg-[#4faea6]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-9xl mx-auto space-y-32">
          {/* Mission & Vision Section */}
          <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center max-w-9xl mx-auto">
            {/* Left side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[100px] rounded-br-none overflow-hidden shadow-2xl z-10 group mt-10 md:mt-0">
                <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                <img src={bg2} alt="Community Heritage" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
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
                    About Our Community
                  </h3>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] tracking-tight m-0">
                  Celebrating Our
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">
                    Heritage
                  </span> Community
                </h2>

                <p className="text-[#050505]/70 text-base leading-relaxed font-body mt-4 max-w-2xl">
                  Our family community is a place where generations come together to celebrate shared roots,
                  preserve traditions, and build meaningful relationships. Through this platform, we aim to
                  connect members across locations, share important updates, organize events, and create a
                  strong support system for every family member. We believe that by staying connected and
                  supporting each other, we can continue to grow as a united and thriving community for
                  generations to come.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="text-white bg-[#0a1910] p-3 rounded-xl mt-1 shrink-0 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8db6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-[#050505] leading-tight mb-2">Community First</h4>
                      <p className="text-sm text-[#050505]/60 leading-relaxed font-body">Prioritizing the well-being and connection of our members above all else.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="text-white bg-[#0a1910] p-3 rounded-xl mt-1 shrink-0 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8db6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-[#050505] leading-tight mb-2">Continuous Growth</h4>
                      <p className="text-sm text-[#050505]/60 leading-relaxed font-body">Fostering an environment that encourages learning, development, and shared success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* History / Values Section */}
          <section className="bg-[#0a1910] rounded-[40px] md:rounded-[80px] p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b8db6e]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h3 className="text-[#b8db6e] font-bold tracking-[3px] uppercase text-xs mb-4 inline-block border-b-2 border-[#b8db6e]/30 pb-1">Core Values</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight tracking-tight">
                What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-white">Drives</span> Us
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">
              {[
                {
                  title: "Integrity",
                  desc: "We believe in honest, transparent communication and actions that build lasting trust within our bonds."
                },
                {
                  title: "Compassion",
                  desc: "Empathy is at our core. We strive to support each other through challenges and celebrate our victories together."
                },
                {
                  title: "Resilience",
                  desc: "Standing strong together. Our history has taught us the importance of adapting and thriving through generational changes."
                }
              ].map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group"
                >
                  <div className="text-[#b8db6e] text-4xl mb-6 font-heading font-extrabold opacity-50 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mb-4 group-hover:text-[#b8db6e] transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-white/60 leading-relaxed font-body text-sm md:text-base group-hover:text-white/80 transition-colors">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* History Timeline Component */}
          <HistoryTimeline />

          {/* Great Personalities Component */}
          <GreatPersonalities />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default About;
