import React from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Calendar,
    HeartHandshake,
    Megaphone
} from "lucide-react";

const AdminSidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-6">

            <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

            <nav className="flex flex-col gap-5 text-sm">

                <Link to="/admin/dashboard" className="flex items-center gap-3">
                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <Link to="/admin/members" className="flex items-center gap-3">
                    <Users size={18} />
                    Members
                </Link>

                <Link to="/admin/registrations" className="flex items-center gap-3">
                    <ClipboardList size={18} />
                    Registrations
                </Link>

                <Link to="/admin/events" className="flex items-center gap-3">
                    <Calendar size={18} />
                    Events
                </Link>

                <Link to="/admin/donations" className="flex items-center gap-3">
                    <HeartHandshake size={18} />
                    Donations
                </Link>

                <Link to="/admin/announcements" className="flex items-center gap-3">
                    <Megaphone size={18} />
                    Announcements
                </Link>

            </nav>

        </div>
    );
};

export default AdminSidebar;