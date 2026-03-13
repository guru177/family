import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowDown } from 'lucide-react';
import banner from '../assets/img/banner.jpg'; // Using existing banner for hero background
import CallToAction from '../components/layout/CallToAction';
import HeroSection from '../components/layout/HeroSection';

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8fdf9] overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <HeroSection 
        badgeText="Get In Touch"
        title="Let's"
        highlightedTitle="Connect"
        description="Whether you have a question about upcoming events, need assistance with your membership, or just want to say hello, we're here for you."
        image={banner}
      />

      {/* --- CONTACT CONTENT SECTION --- */}
      <section className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-24 px-6 md:px-20 relative z-10 w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-[#b8db6e]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-9xl mx-auto">

          {/* Top Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[30px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#b8db6e]/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-[#0a1910] rounded-2xl flex items-center justify-center text-[#b8db6e] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#0a1910] mb-3">Our Location</h3>
              <p className="text-[#050505]/60 text-sm font-body leading-relaxed">
                123 Heritage Lane, Suite 400<br />Community Center District<br />New York, NY 10012
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[30px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#b8db6e]/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-[#0a1910] rounded-2xl flex items-center justify-center text-[#b8db6e] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#0a1910] mb-3">Email Us</h3>
              <p className="text-[#050505]/60 text-sm font-body leading-relaxed">
                admin@familyportal.com<br />support@familyportal.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-[30px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#b8db6e]/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-[#0a1910] rounded-2xl flex items-center justify-center text-[#b8db6e] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#0a1910] mb-3">Call Support</h3>
              <p className="text-[#050505]/60 text-sm font-body leading-relaxed">
                Mon-Fri from 8am to 5pm.<br />+1 (555) 000-0000
              </p>
            </motion.div>
          </div>

          <div className="border-t border-black/5 mb-24" />

          {/* Form & Image Section */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col"
            >
              <div className="inline-block border-b-2 border-[#b8db6e] pb-1 w-max mb-6">
                <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs">
                  Send a Message
                </h3>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-[1.1] tracking-tight mb-8">
                We'd love to <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">
                  hear from you
                </span>
              </h2>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] ml-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="bg-white border-2 border-transparent focus:border-[#b8db6e] text-[#050505] text-sm rounded-2xl px-6 py-4 outline-none transition-all shadow-[0_5px_15px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] ml-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="bg-white border-2 border-transparent focus:border-[#b8db6e] text-[#050505] text-sm rounded-2xl px-6 py-4 outline-none transition-all shadow-[0_5px_15px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] ml-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-white border-2 border-transparent focus:border-[#b8db6e] text-[#050505] text-sm rounded-2xl px-6 py-4 outline-none transition-all shadow-[0_5px_15px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] ml-2">Message</label>
                  <textarea
                    rows="5"
                    placeholder="How can we help you?"
                    className="bg-white border-2 border-transparent focus:border-[#b8db6e] text-[#050505] text-sm rounded-2xl px-6 py-4 outline-none transition-all shadow-[0_5px_15px_rgba(0,0,0,0.02)] resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all rounded-2xl shadow-[0_10px_20px_rgba(10,25,16,0.2)] mt-2"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Image Box */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-[4/5] lg:aspect-square rounded-[40px] overflow-hidden shadow-2xl group isolate"
            >
              {/* Overlay hover effect matching theme */}
              <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              <img
                src={banner}
                alt="Community Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Floating Decorative Element inside Image */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 z-20 shadow-xl border border-white/50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#b8db6e] rounded-full flex justify-center items-center text-[#0a1910] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0a1910] text-sm md:text-base leading-tight">Fast Response Time</p>
                    <p className="text-[#050505]/60 text-xs mt-1">We usually reply within 24 hours.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <CallToAction />

    </div>
  );
};

export default Contact;
