import React from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Calendar, ArrowRight, Bell } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#050505]/10 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0a1910]">Welcome back, John!</h2>
          <p className="text-[#050505]/60 font-body text-sm mt-1">Here's what's happening with your family network today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-[#146c43]/20 hover:border-[#146c43] text-[#146c43] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-sm">
          <Bell size={14} />
          Notifications
          <span className="bg-[#146c43] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1">3</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-gradient-to-br from-[#146c43] to-[#0a1910] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <Users size={24} className="text-[#b8db6e]" />
            </div>
            <div className="text-3xl font-heading font-extrabold mb-1">12</div>
            <div className="text-white/70 text-sm font-medium">Family Members</div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-[#146c43]/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <div className="bg-[#146c43]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-[#146c43]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#0a1910] mb-1">3</div>
            <div className="text-[#050505]/60 text-sm font-medium">Upcoming Events</div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-[#146c43]/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <div className="bg-[#146c43]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <CreditCard size={24} className="text-[#146c43]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#0a1910] mb-1">$450</div>
            <div className="text-[#050505]/60 text-sm font-medium">Total Donated</div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Next Event List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        
        {/* Recent Activity List */}
        <div className="bg-white rounded-2xl border border-[#146c43]/10 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-bold text-[#0a1910] text-lg">Recent Activity</h3>
            <button className="text-xs font-bold uppercase tracking-widest text-[#146c43] hover:text-[#0a1910] transition-colors">View All</button>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#146c43]/10 flex items-center justify-center shrink-0">
                <CreditCard size={16} className="text-[#146c43]" />
              </div>
              <div>
                <p className="text-[#050505] text-sm font-medium">Donation confirmed for <span className="font-bold text-[#146c43]">Education Fund</span>.</p>
                <p className="text-xs text-[#050505]/50 font-semibold mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#146c43]/10 flex items-center justify-center shrink-0">
                <Users size={16} className="text-[#146c43]" />
              </div>
              <div>
                <p className="text-[#050505] text-sm font-medium"><span className="font-bold text-[#146c43]">Sarah Doe</span> joined your family circle.</p>
                <p className="text-xs text-[#050505]/50 font-semibold mt-1">Yesterday</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#146c43]/10 flex items-center justify-center shrink-0">
                <Calendar size={16} className="text-[#146c43]" />
              </div>
              <div>
                <p className="text-[#050505] text-sm font-medium">You registered for <span className="font-bold text-[#146c43]">Grand Reunion 2026</span>.</p>
                <p className="text-xs text-[#050505]/50 font-semibold mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#146c43]/10 p-6 shadow-sm flex flex-col">
          <h3 className="font-heading font-bold text-[#0a1910] text-lg mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <button className="bg-[#f8fdf9] border border-[#146c43]/20 hover:border-[#146c43] hover:bg-[#146c43] hover:text-white text-[#146c43] rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group">
              <CreditCard size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Donate Now</span>
            </button>
            <button className="bg-[#f8fdf9] border border-[#146c43]/20 hover:border-[#146c43] hover:bg-[#146c43] hover:text-white text-[#146c43] rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group">
              <Users size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-center">Add Member</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default DashboardOverview;
