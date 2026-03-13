import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(() => !!localStorage.getItem('isLoggedIn'));
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donation', path: '/donation' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[100%] max-w-9xl z-[1000] px-4 md:px-0 mt-4 md:mt-0">
      <nav className="bg-black/50 backdrop-blur-2xl border border-white/10 border-b-2 border-b-white/20 rounded-[30px] md:rounded-b-[60px] md:rounded-t-none px-6 md:px-16 py-4 md:py-5 flex justify-between items-center transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-black/70 hover:border-white/20">
        <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 tracking-tighter">
          <Heart size={24} fill="currentColor" />
          <span className="font-heading uppercase tracking-widest">FAMILY</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-12 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-sm font-medium uppercase tracking-[2px] opacity-70 transition-opacity hover:opacity-100"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-6 items-center">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            >
              User Account
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-4 right-4 bg-black/95 backdrop-blur-3xl border border-white/10 flex flex-col items-center py-8 gap-6 md:hidden rounded-3xl shadow-2xl">
          <ul className="flex flex-col gap-6 list-none items-center text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium uppercase tracking-[3px] opacity-80 transition-opacity hover:opacity-100"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 items-center mt-4 w-[80%]">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="bg-white text-black text-lg py-3 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10 w-full text-center"
              >
                User Account
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity w-full text-center py-3 border border-white/20 rounded-full"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-white text-black text-lg py-3 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10 w-full text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
