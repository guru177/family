import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Users, ClipboardList, Calendar, Heart,
    MoreHorizontal, Pencil, FileText,
} from "lucide-react";

/* ── Data (swap with API calls later) ── */
const STATS = [
    {
        title: "Total Members",
        val: "230",
        sub: "+12% this month",
        icon: Users,
        iconColor: "text-emerald-500",
        subColor: "text-emerald-500",
        dot: true,
        to: "/admin/members",
    },
    {
        title: "Pending Registrations",
        val: "7",
        sub: "Action Required",
        icon: ClipboardList,
        iconColor: "text-orange-400",
        subColor: "text-orange-500",
        dot: true,
        to: "/admin/registrations",
    },
    {
        title: "Upcoming Events",
        val: "3",
        sub: "View Schedule",
        icon: Calendar,
        iconColor: "text-blue-500",
        subColor: "text-blue-500",
        dot: true,
        to: "/admin/events",
    },
    {
        title: "Donations",
        val: "₹50,240",
        sub: "+8% this month",
        icon: Heart,
        iconColor: "text-red-400",
        subColor: "text-emerald-500",
        dot: true,
        to: "/admin/donations",
    },
];

const REGISTRATIONS = [
    { name: "Anil Kumar", rel: "Father", date: "21 Apr", status: "Pending", img: "https://i.pravatar.cc/150?u=1" },
    { name: "Priya Sharma", rel: "Wife", date: "20 Apr", status: "Approved", img: "https://i.pravatar.cc/150?u=2" },
    { name: "Vijay Nair", rel: "Son", date: "19 Apr", status: "Pending", img: "https://i.pravatar.cc/150?u=3" },
    { name: "Deepa Menon", rel: "Daughter", date: "18 Apr", status: "Approved", img: "https://i.pravatar.cc/150?u=4" },
];

const EVENTS = [
    { name: "Family Picnic", date: "15 Jun 2024", img: "https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=200" },
    { name: "Health Camp", date: "25 Jun 2024", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200" },
    { name: "Annual Meeting", date: "05 Jul 2024", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200" },
];

const ANNOUNCEMENTS = [
    { title: "Community Meet - July 7", status: "Published", time: "2 days ago" },
    { title: "Health Camp Reminder", status: "Published", time: "5 days ago" },
    { title: "New Year Celebration", status: "Draft", time: "1 week ago" },
];

const DONATIONS = [
    { name: "Sunil Rajan", amount: "₹5,000", time: "1 day ago", img: "https://i.pravatar.cc/150?u=11" },
    { name: "Meera Iyer", amount: "₹2,000", time: "3 days ago", img: "https://i.pravatar.cc/150?u=12" },
    { name: "Arjun Patil", amount: "₹1,500", time: "5 days ago", img: "https://i.pravatar.cc/150?u=13" },
];

/* ── Sub-components ── */

const StatusBadge = ({ status }) => {
    const approved = status === "Approved" || status === "Published";
    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${approved
                ? "bg-emerald-50 text-emerald-600"
                : "bg-orange-50 text-orange-500"
                }`}
        >
            <span className={`text-[8px] ${approved ? "text-emerald-500" : "text-orange-400"}`}>●</span>
            {status}
        </span>
    );
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

/* ── Main Component ── */
const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-400 mt-1 text-sm">Manage your family community efficiently</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((s, i) => (
                    <Card
                        key={i}
                        className="p-6 relative cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(s.to)}
                    >
                        <s.icon className={`${s.iconColor} mb-4`} size={30} strokeWidth={1.5} />
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{s.title}</p>
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{s.val}</h2>
                        <p className={`${s.subColor} text-xs font-semibold flex items-center gap-1`}>
                            {s.dot && <span className="text-[8px]">●</span>}
                            {s.sub}
                        </p>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-5 right-5 text-slate-200 hover:text-slate-400 transition-colors"
                        >
                            <MoreHorizontal size={18} />
                        </button>
                    </Card>
                ))}
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Recent Registrations */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="font-bold text-lg text-slate-800">Recent Registrations</h2>
                        <button
                            onClick={() => navigate("/admin/registrations")}
                            className="text-sm text-slate-400 hover:text-slate-600 font-semibold transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-4 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
                        <span>Name</span>
                        <span>Relation</span>
                        <span>Date</span>
                        <span className="text-right">Status</span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {REGISTRATIONS.map((p, i) => (
                            <div key={i} className="grid grid-cols-4 items-center py-3 px-1">
                                <div className="flex items-center gap-2.5">
                                    <img src={p.img} className="w-9 h-9 rounded-full object-cover shrink-0" alt={p.name} />
                                    <span className="font-semibold text-slate-700 text-sm truncate">{p.name}</span>
                                </div>
                                <span className="text-slate-400 text-sm">{p.rel}</span>
                                <span className="text-slate-400 text-sm">{p.date}</span>
                                <div className="flex items-center justify-end">
                                    <StatusBadge status={p.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Manage Events */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2
                            className="font-bold text-lg text-slate-800 cursor-pointer hover:text-emerald-700 transition-colors"
                            onClick={() => navigate("/admin/events")}
                        >
                            Manage Events
                        </h2>
                        <button
                            onClick={() => navigate("/admin/events")}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-bold"
                            style={{ background: "linear-gradient(135deg, #064e3b, #0f7a55)" }}
                        >
                            <span className="text-base leading-none">+</span> Add Event
                        </button>
                    </div>

                    <div className="space-y-4">
                        {EVENTS.map((ev, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={ev.img}
                                        className="w-16 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                                        alt={ev.name}
                                    />
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{ev.name}</p>
                                        <p className="text-slate-400 text-xs mt-0.5">{ev.date}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/admin/events")}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors"
                                >
                                    <Pencil size={14} className="text-slate-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Manage Announcements */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2
                            className="font-bold text-lg text-slate-800 cursor-pointer hover:text-emerald-700 transition-colors"
                            onClick={() => navigate("/admin/announcements")}
                        >
                            Manage Announcements
                        </h2>
                        <button
                            onClick={() => navigate("/admin/announcements")}
                            className="text-sm text-slate-400 hover:text-emerald-600 font-semibold flex items-center gap-1 transition-colors"
                        >
                            <span className="text-base leading-none">+</span> Add Announcement
                        </button>
                    </div>

                    <div className="space-y-4">
                        {ANNOUNCEMENTS.map((ann, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`w-2 h-2 rounded-full shrink-0 ${ann.status === "Published" ? "bg-emerald-500" : "bg-slate-300"
                                            }`}
                                    />
                                    <span className="font-semibold text-slate-700 text-sm">{ann.title}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StatusBadge status={ann.status} />
                                    <div className="flex items-center gap-1.5 text-slate-300 text-xs whitespace-nowrap">
                                        <FileText size={13} />
                                        {ann.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Donations */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2
                            className="font-bold text-lg text-slate-800 cursor-pointer hover:text-emerald-700 transition-colors"
                            onClick={() => navigate("/admin/donations")}
                        >
                            Recent Donations
                        </h2>
                        <button
                            onClick={() => navigate("/admin/donations")}
                            className="text-sm text-slate-400 hover:text-slate-600 font-semibold transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {DONATIONS.map((d, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={d.img} className="w-9 h-9 rounded-full object-cover" alt={d.name} />
                                    <span className="font-semibold text-slate-700 text-sm">{d.name}</span>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="text-emerald-600 font-extrabold">{d.amount}</span>
                                    <span className="text-slate-300 text-xs text-right whitespace-nowrap">{d.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default AdminDashboard;