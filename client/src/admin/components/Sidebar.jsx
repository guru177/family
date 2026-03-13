import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Calendar,
    Heart,
    Megaphone,
    Settings,
    Layout,
    ChevronRight,
    LogOut,
    Image as ImageIcon,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
    { label: "Members", icon: Users, to: "/admin/members" },
    { label: "Registrations", icon: ClipboardList, to: "/admin/registrations" },
    { label: "Events", icon: Calendar, to: "/admin/events" },
    { label: "Donations", icon: Heart, to: "/admin/donations" },
    { label: "Announcements", icon: Megaphone, to: "/admin/announcements" },
    { label: "Banners", icon: ImageIcon, to: "/admin/banners" },
    { label: "Gallery", icon: ImageIcon, to: "/admin/gallery" },
    { label: "Hero Slider", icon: Layout, to: "/admin/hero" },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("adminUsername");
        navigate("/admin");
    };

    return (
        <div
            className="w-[240px] min-h-screen flex flex-col justify-between relative overflow-hidden"
            style={{
                background: "linear-gradient(175deg, #0a2e1f 0%, #0f3d2e 40%, #134d39 80%, #1a6348 100%)",
            }}
        >
            {/* Decorative bg circles */}
            <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full opacity-10 border border-[#b8db6e]" />
            <div className="absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full opacity-10 border border-white" />

            <div className="relative z-10">
                {/* Logo */}
                <div className="px-6 pt-7 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow"
                            style={{ background: "linear-gradient(135deg, #b8db6e, #4faea6)" }}
                        >
                            <span className="text-[#0a1910] font-black text-xs">FC</span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm leading-none">Family Community</p>
                            <p className="text-white/40 text-[11px] mt-0.5 font-semibold uppercase tracking-wide">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="px-3 pt-5 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-all group ${isActive
                                    ? "bg-white/15 text-white shadow-sm"
                                    : "text-white/60 hover:bg-white/8 hover:text-white"
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} strokeWidth={1.8} />
                                <span>{item.label}</span>
                            </div>
                            {item.hasArrow && (
                                <ChevronRight size={15} className="text-white/30 group-hover:text-white/60 transition-colors" />
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom: Admin info + logout */}
            <div className="relative z-10 px-3 pb-6 space-y-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-semibold"
                >
                    <LogOut size={16} />
                    Logout
                </button>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-3">
                    <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" alt="admin" />
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">Admin</p>
                        <p className="text-white/40 text-xs">Super Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;