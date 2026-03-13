import React from 'react';
import { Bell, ChevronRight, Search, Calendar, Users, Megaphone, HandHeart, Heart } from 'lucide-react';

const stats = [
  { label: 'Total Members', value: '245', icon: Users },
  { label: 'Upcoming', value: '3', icon: Calendar },
  { label: 'New Announcements', value: '2+', icon: Megaphone },
  { label: 'Your Donations', value: '₹ 0', icon: HandHeart, accent: true },
];

const announcements = [
  {
    day: '15',
    month: 'APRIL',
    title: 'Annual Family Picnic',
    desc: 'Join us for a day of fun, food, family activities at our annual picnic gathering.',
  },
  {
    day: '20',
    month: 'APRIL',
    title: "Ramya & Suraj's Wedding",
    desc: 'Congratulations to Ramya and Suraj! Join us in celebrating their wedding.',
  },
  {
    day: '25',
    month: 'APRIL',
    title: 'Community Blood Donation Drive',
    desc: "Let's make a difference together by donating blood and saving lives.",
  },
];

const donations = [
  { date: 'April 10, 2024', category: 'Community Development', amount: '₹ 2000', status: 'Approved' },
  { date: 'April 10, 2024', category: 'Charity Support', amount: '₹ 1000', status: 'Pending' },
  { date: 'April 10, 2024', category: 'Event Sponsorship', amount: '₹ 2250', status: 'Approved' },
];

const Badge = ({ children, tone }) => {
  const styles =
    tone === 'approved'
      ? 'bg-[#2f6b54] text-white'
      : 'bg-[#f4d7a8] text-[#8a5a14]';
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${styles}`}>
      {children}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, accent }) => {
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-4 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          accent ? 'bg-[#2f6b54]' : 'bg-[#e8f0ea]'
        }`}
      >
        <Icon size={22} className={accent ? 'text-white' : 'text-[#2f6b54]'} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-[#0a1910]/50">{label}</p>
        <p className="text-lg font-extrabold text-[#0a1910] truncate">{value}</p>
      </div>
    </div>
  );
};

const DashboardHome = ({ displayName = 'User' }) => {
  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a1910]/40" />
            <input
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#2f6b54]"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button className="w-11 h-11 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center">
            <Bell size={18} className="text-[#0a1910]/60" />
          </button>
          <div className="flex items-center gap-3 bg-white border border-black/5 shadow-sm rounded-2xl px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-[#e8f0ea] flex items-center justify-center">
              <Heart size={18} className="text-[#2f6b54]" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-[#0a1910]">{displayName}</p>
              <p className="text-[11px] font-semibold text-[#0a1910]/50">Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome + stats */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0a1910]">
          Welcome back, <span className="text-[#0a1910]">{displayName}!</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} accent={s.accent} />
          ))}
        </div>
      </div>

      {/* Announcements + Events */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Latest announcements */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-[#0a1910]">Latest Announcements</h2>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="divide-y divide-black/5">
              {announcements.map((a) => (
                <div key={a.title} className="p-4 flex items-start gap-4">
                  <div className="w-14 shrink-0 rounded-2xl bg-[#f2f4f2] border border-black/5 p-2 text-center">
                    <p className="text-[10px] font-bold text-[#0a1910]/40">{a.month}</p>
                    <p className="text-lg font-extrabold text-[#0a1910]">{a.day}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#0a1910]">{a.title}</p>
                    <p className="text-sm text-[#0a1910]/60 mt-1">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        <div>
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#0a1910]">Upcoming Events</h2>
              <button className="text-sm font-semibold text-[#0a1910]/60 hover:text-[#2f6b54] inline-flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-[#f2f4f2] border border-black/5 p-4">
              <p className="text-sm font-extrabold text-[#0a1910]">Cultural Evening Celebration</p>
              <p className="text-xs text-[#0a1910]/60 mt-1">April 20; Community Hall</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs font-semibold text-[#0a1910]/60">Sunday | Devi</p>
                <button className="px-4 py-2 rounded-xl bg-[#2f6b54] text-white text-xs font-bold">
                  Register
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white border border-black/5 p-4 flex items-center gap-4">
              <div className="w-14 shrink-0 rounded-2xl bg-[#f2f4f2] border border-black/5 p-2 text-center">
                <p className="text-[10px] font-bold text-[#0a1910]/40">APRIL</p>
                <p className="text-lg font-extrabold text-[#0a1910]">15</p>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#0a1910]">Annual Family Picnic</p>
                <p className="text-sm text-[#0a1910]/60">Green Meadows Park</p>
              </div>
              <div className="ml-auto text-xs font-semibold text-[#0a1910]/50">3 days left</div>
            </div>

            <button className="mt-4 w-full text-sm font-semibold text-[#0a1910]/60 hover:text-[#2f6b54] flex items-center justify-end gap-1">
              View Calendar <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Donation history + gallery */}
      <div className="grid grid-cols-1 xl:grid-cols-1">
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#0a1910]">Donation History</h2>
            <button className="text-sm font-semibold text-[#0a1910]/60 hover:text-[#2f6b54] inline-flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-bold text-[#0a1910]/50 border-b border-black/5">
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={`${d.date}-${d.amount}`} className="border-b border-black/5 last:border-b-0">
                    <td className="py-3 pr-4 text-[#0a1910]/70 font-semibold">{d.date}</td>
                    <td className="py-3 pr-4 text-[#0a1910] font-semibold">{d.category}</td>
                    <td className="py-3 pr-4 text-[#0a1910] font-extrabold">{d.amount}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={d.status === 'Approved' ? 'approved' : 'pending'}>{d.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default DashboardHome;

