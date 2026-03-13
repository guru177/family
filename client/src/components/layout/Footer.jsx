import React from 'react';
import { Heart, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6 md:px-12 border-t border-black/5 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.02)] mt-4 relative z-10 w-full">
      <div className="max-w-9xl mx-auto flex flex-col gap-12 px-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Logo, Description, Socials */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3 font-heading font-extrabold text-[#0a1910] text-xl">
              <div className="bg-[#0a1910] p-2 rounded-lg text-[#b8db6e]">
                <Heart size={20} className="fill-current" />
              </div>
              <span className="tracking-tight">Family Portal</span>
            </div>
            <p className="text-[#050505]/60 text-sm leading-relaxed font-body">
              Our family community platform brings members together to stay connected, celebrate traditions, and support one another across generations.
            </p>
            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="text-[#0a1910] hover:text-[#b8db6e] transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-[#0a1910] hover:text-[#b8db6e] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-[#0a1910] hover:text-[#b8db6e] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-[#0a1910] hover:text-[#b8db6e] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0a1910] text-sm tracking-widest uppercase mb-2">Community</h4>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Events & RSVPs</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Member Directory</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Announcements</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Donations</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0a1910] text-sm tracking-widest uppercase mb-2">Resources</h4>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Heritage Center</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Family Tree</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Scholarships</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Help Center</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0a1910] text-sm tracking-widest uppercase mb-2">Portal</h4>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">About Us</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Careers</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Contact Admin</a>
              <a href="#" className="text-[#050505]/60 hover:text-[#b8db6e] text-sm font-medium transition-colors">Partners</a>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Line & Copyright */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#050505]/50 text-xs font-semibold">
            &copy; {new Date().getFullYear()} Family Community Portal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-[#050505]/50 hover:text-[#b8db6e] text-xs font-semibold transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-[#050505]/50 hover:text-[#b8db6e] text-xs font-semibold transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-[#050505]/50 hover:text-[#b8db6e] text-xs font-semibold transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
