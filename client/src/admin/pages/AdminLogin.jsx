import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, LogIn, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    // ── Hardcoded credentials (swap with API call later) ──
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username) {
            setError('Username field cannot be empty');
            return;
        }
        if (!formData.password) {
            setError('Password field cannot be empty');
            return;
        }

        // Check credentials
        if (
            formData.username === ADMIN_CREDENTIALS.username &&
            formData.password === ADMIN_CREDENTIALS.password
        ) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('adminUsername', formData.username);
            window.location.href = '/admin/dashboard';
        } else {
            setError('Wrong Password!!');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e8f5ee 40%, #c8ebd8 70%, #a8dfc0 100%)',
            }}
        >
            {/* Subtle bg blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0f3d2e 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #b8db6e 0%, transparent 70%)' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-7xl mx-4 rounded-3xl overflow-hidden shadow-2xl flex"
                style={{ minHeight: '740px' }}
            >
                {/* ── LEFT PANEL ── */}
                <div
                    className="hidden md:flex flex-col justify-between p-10 w-[52%] relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(155deg, #0f3d2e 0%, #155c40 50%, #1a7a55 100%)',
                    }}
                >
                    {/* Decorative circles */}
                    <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full opacity-10 border-[2px] border-white" />
                    <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full opacity-10 border-[2px] border-white" />
                    <div className="absolute bottom-[-80px] left-[-50px] w-56 h-56 rounded-full opacity-10 border-[2px] border-[#b8db6e]" />

                    {/* Logo */}
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                            style={{ background: '#b8db6e', color: '#0a1910' }}>
                            FC
                        </div>
                        <span className="text-white font-bold text-lg tracking-wide">Family Community</span>
                    </div>

                    {/* Illustration — Desk / Clock SVG */}
                    <div className="flex-1 flex items-center justify-center relative z-10 py-8">
                        {/* Decorative illustration */}
                        <svg viewBox="0 0 300 220" className="w-full max-w-xs opacity-90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Clock */}
                            <circle cx="150" cy="55" r="38" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                            <circle cx="150" cy="55" r="30" fill="white" fillOpacity="0.08" />
                            <line x1="150" y1="55" x2="150" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="150" y1="55" x2="164" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="150" cy="55" r="3" fill="white" />
                            {/* Desk surface */}
                            <rect x="30" y="155" width="240" height="10" rx="5" fill="white" fillOpacity="0.25" />
                            {/* Monitor */}
                            <rect x="100" y="100" width="100" height="55" rx="6" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
                            <rect x="106" y="106" width="88" height="43" rx="3" fill="white" fillOpacity="0.1" />
                            <rect x="140" y="155" width="20" height="6" fill="white" fillOpacity="0.2" />
                            {/* Chair */}
                            <rect x="58" y="110" width="55" height="45" rx="8" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
                            <rect x="63" y="105" width="45" height="12" rx="6" fill="white" fillOpacity="0.2" />
                            <line x1="68" y1="155" x2="63" y2="175" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                            <line x1="103" y1="155" x2="108" y2="175" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                            <line x1="63" y1="175" x2="108" y2="175" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                            {/* Lamp */}
                            <line x1="218" y1="155" x2="218" y2="110" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                            <line x1="218" y1="110" x2="200" y2="95" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                            <ellipse cx="195" cy="92" rx="14" ry="8" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                            {/* Screen lines */}
                            <line x1="115" y1="118" x2="165" y2="118" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="115" y1="126" x2="155" y2="126" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="115" y1="134" x2="148" y2="134" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Mug */}
                            <rect x="48" y="146" width="20" height="15" rx="3" fill="white" fillOpacity="0.18" />
                            <path d="M68 151 Q76 151 76 158 Q76 161 68 161" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>

                    {/* Bottom text */}
                    <div className="relative z-10">
                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Secure Admin Area</p>
                        <h2 className="text-white text-xl font-bold leading-snug">
                            Manage your community<br />
                            <span style={{ color: '#b8db6e' }}>with full control.</span>
                        </h2>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">

                    {/* Header bar */}
                    <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gray-100">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #0f3d2e, #1a7a55)' }}>
                            <ShieldCheck size={17} className="text-white" />
                        </div>
                        <span className="text-gray-700 font-bold text-base tracking-wide">Dashboard Login</span>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-red-500 text-xs font-semibold mb-4"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-extrabold tracking-tight"
                            style={{ color: '#0f3d2e' }}>
                            WELCOME BACK
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Give your best report today!</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Username */}
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#1a7a55] transition-all bg-gray-50/60">
                            <User size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-300 font-medium"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#1a7a55] transition-all bg-gray-50/60">
                            <Lock size={18} className="text-gray-400 shrink-0" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-300 font-medium tracking-widest"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <p className="text-xs text-right" style={{ color: '#1a7a55' }}>
                            <span className="cursor-pointer hover:underline font-semibold">Forgot Password?</span>
                        </p>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold uppercase tracking-widest shadow-lg transition-all"
                            style={{
                                background: 'linear-gradient(135deg, #0f3d2e 0%, #1a7a55 100%)',
                                boxShadow: '0 4px 20px rgba(15,61,46,0.35)',
                            }}
                        >
                            <LogIn size={17} />
                            Login to My Account
                        </motion.button>

                    </form>

                    <p className="text-gray-300 text-xs text-center mt-8 font-medium">
                        © {new Date().getFullYear()} Family Community Portal · Admin Access Only
                    </p>

                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;