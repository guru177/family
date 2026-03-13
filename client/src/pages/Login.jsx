import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login for now
    localStorage.setItem('isLoggedIn', 'true');
    const email = (formData.email || '').trim();
    const fallbackName = email ? email.split('@')[0] : 'User';
    const displayName = fallbackName
      ? fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1)
      : 'User';
    localStorage.setItem('userDisplayName', displayName);
    window.location.href = '/dashboard'; 
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#b8db6e]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#4faea6]/20 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 md:p-10 shadow-2xl overflow-hidden relative">
          
          {/* Subtle glow inside card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8db6e]/30 blur-[60px] rounded-full pointer-events-none" />

          <div className="mb-10 text-center relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2 tracking-tight">
              Welcome <span className="text-[#b8db6e]">Back</span>
            </h1>
            <p className="text-white/50 text-sm font-bold uppercase tracking-widest">
              Access the Family Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <User size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] focus:bg-black/60 text-white text-sm rounded-xl pl-11 pr-4 py-4 outline-none transition-all placeholder:text-white/20 font-medium"
                  placeholder="name@family.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-[#b8db6e] hover:text-white transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] focus:bg-black/60 text-white text-sm rounded-xl pl-11 pr-4 py-4 outline-none transition-all placeholder:text-white/20 font-medium tracking-widest"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full bg-[#b8db6e] text-[#0a1910] font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(184,219,110,0.3)] hover:shadow-[0_0_30px_rgba(184,219,110,0.5)] transition-all flex justify-center items-center gap-2 overflow-hidden relative group"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Login Securely</span>
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="relative z-10"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <div className="mt-8 text-center bg-white/5 border border-white/5 p-4 rounded-xl">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider">
              New to the portal?{" "}
              <Link to="/register" className="text-[#b8db6e] hover:text-white transition-colors underline decoration-[#b8db6e]/30 underline-offset-4 ml-1">
                Create an account
              </Link>
            </p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
