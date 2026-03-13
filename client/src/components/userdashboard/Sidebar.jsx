import React from 'react';
import { Heart, Home, User, Users, Megaphone, Calendar, Image, HandHeart, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const activeKey =
    pathname.startsWith('/dashboard/profile')
      ? 'profile'
      : pathname.startsWith('/dashboard/family')
        ? 'family'
        : pathname.startsWith('/dashboard/donations')
          ? 'donations'
          : pathname.startsWith('/dashboard')
            ? 'dashboard'
            : 'dashboard';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userDisplayName');
    navigate('/login');
  };

  return (
    <aside className="w-full md:w-[280px] bg-[#f3f6f3] border-r border-black/5 flex flex-col">
      <div className="px-6 py-5 flex items-center gap-2">
        <Heart size={18} className="text-[#2f6b54]" fill="currentColor" />
        <span className="font-heading font-extrabold tracking-widest text-[#0a1910]">FAMILY</span>
      </div>

      <div className="px-4 space-y-2">
        <SidebarItem icon={Home} label="Dashboard" to="/dashboard" active={activeKey === 'dashboard'} />
        <SidebarItem icon={User} label="Profile" to="/dashboard/profile" active={activeKey === 'profile'} />
        <SidebarItem icon={Users} label="Family Members" to="/dashboard/family" active={activeKey === 'family'} />
        <SidebarItem
          icon={Megaphone}
          label="Announcements"
          to="/announcements"
          active={pathname === '/announcements'}
          badge={3}
        />
        <SidebarItem icon={Calendar} label="Events" to="/events" active={pathname === '/events'} />
        <SidebarItem icon={Image} label="Gallery" to="/gallery" active={pathname === '/gallery'} />
        <SidebarItem icon={HandHeart} label="Donations" to="/donation" active={pathname === '/donation'} />
      </div>

      <div className="mt-6 px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#0a1910]/70 hover:bg-black/5 transition-colors"
        >
          <span className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center">
            <LogOut size={18} className="text-[#2f6b54]" />
          </span>
          Log Out
        </button>
      </div>

      <div className="mt-auto px-4 pb-5">
        <div className="bg-gradient-to-br from-[#2f6b54] to-[#1f5a46] rounded-2xl p-4 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">Community Support</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <HandHeart size={18} className="text-white" />
            </span>
            <div>
              <p className="font-bold">Need Help?</p>
              <p className="text-xs text-white/70">We’re here for you</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/donation')}
            className="mt-4 w-full bg-white text-[#0a1910] font-bold uppercase tracking-widest text-xs py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow"
          >
            Make Donation
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

