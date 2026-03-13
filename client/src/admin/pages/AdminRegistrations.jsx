import React, { useState } from "react";
import {
    Search, CheckCircle2, XCircle, Clock, Eye, X,
    User, Phone, Mail, MapPin, Users,
    Home, Shield,
} from "lucide-react";
import { MEMBERS_DATA } from "./AdminMembers";

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
    const map = {
        Approved: { cls: "bg-emerald-50 text-emerald-600", icon: <CheckCircle2 size={12} /> },
        Pending:  { cls: "bg-orange-50 text-orange-500",   icon: <Clock size={12} /> },
        Rejected: { cls: "bg-red-50 text-red-500",         icon: <XCircle size={12} /> },
    };
    const s = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${s.cls}`}>
            {s.icon} {status}
        </span>
    );
};

const Field = ({ label, value }) => (
    <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-0.5">{label}</p>
        <p className="text-slate-700 font-semibold text-sm">{value || <span className="text-slate-300 italic">—</span>}</p>
    </div>
);

/* ── Detail Modal popup ── */
const DetailModal = ({ member: m, onClose, onApprove, onReject }) => {
    if (!m) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <img src={m.profilePhoto} alt={m.fullName} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" />
                        <div>
                            <h2 className="font-bold text-slate-800 text-lg leading-tight">{m.fullName}</h2>
                            <p className="text-slate-400 text-xs">{m.familyId} · Registered: {m.joinedDate}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                        <X size={16} />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                    {/* Personal */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <User size={13} /> Personal Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <Field label="Full Name"     value={m.fullName} />
                            <Field label="Gender"        value={m.gender} />
                            <Field label="Date of Birth" value={m.dob} />
                            <Field label="Phone"         value={m.phone} />
                            <Field label="Email"         value={m.email} />
                            <Field label="Blood Group"   value={m.bloodGroup} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50" />

                    {/* Family */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <Users size={13} /> Family Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <Field label="Family Name"   value={m.familyName} />
                            <Field label="Family ID"     value={m.familyId} />
                            <Field label="Father's Name" value={m.fatherName} />
                            <Field label="Mother's Name" value={m.motherName} />
                            <Field label="Spouse"        value={m.spouseName} />
                            <Field label="Family Head"   value={m.isFamilyHead} />
                            <Field label="Total Members" value={m.familyMembersCount} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50" />

                    {/* Address */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <MapPin size={13} /> Address
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <Field label="House No."     value={m.houseNumber} />
                            <Field label="Street / Area" value={m.streetArea} />
                            <Field label="City/Village"  value={m.cityVillage} />
                            <Field label="District"      value={m.district} />
                            <Field label="State"         value={m.state} />
                            <Field label="Pincode"       value={m.pincode} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50" />

                    {/* Community */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <Shield size={13} /> Community & Account
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <Field label="Membership"  value={m.membershipType} />
                            <Field label="Branch/Unit" value={m.branchUnit} />
                            <Field label="Occupation"  value={m.occupation} />
                            <Field label="Username"    value={m.username} />
                            <Field label="Login Email" value={m.loginEmail} />
                        </div>
                    </div>

                </div>

                {/* Footer action buttons */}
                <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
                    <button onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-100 transition-colors">
                        Close
                    </button>
                    <button onClick={() => onReject(m.id)}
                        className="px-5 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2">
                        <XCircle size={14} /> Reject
                    </button>
                    <button onClick={() => onApprove(m.id)}
                        className="px-5 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2"
                        style={{ background: "linear-gradient(135deg, #064e3b, #0f7a55)" }}>
                        <CheckCircle2 size={14} /> Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Main Page ── */
const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState(
        MEMBERS_DATA.map((m) => ({ ...m }))
    );
    const [search, setSearch]         = useState("");
    const [statusFilter, setStatusFilter] = useState("Pending");
    const [selectedMember, setSelectedMember] = useState(null);

    const filtered = registrations.filter((m) => {
        const q = search.toLowerCase();
        const matchSearch =
            m.fullName.toLowerCase().includes(q) ||
            m.familyId.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q) ||
            m.phone.includes(q);
        const matchStatus = statusFilter === "All" || m.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const counts = {
        All:      registrations.length,
        Pending:  registrations.filter((m) => m.status === "Pending").length,
        Approved: registrations.filter((m) => m.status === "Approved").length,
        Rejected: registrations.filter((m) => m.status === "Rejected").length,
    };

    const handleApprove = (id) => {
        setRegistrations((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status: "Approved" } : m))
        );
        setSelectedMember(null);
    };

    const handleReject = (id) => {
        setRegistrations((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status: "Rejected" } : m))
        );
        setSelectedMember(null);
    };

    return (
        <>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800">Registrations</h1>
                        <p className="text-slate-400 mt-1 text-sm">Review and approve or reject new member registrations</p>
                    </div>
                    {counts.Pending > 0 && (
                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl">
                            <Clock size={15} className="text-orange-500" />
                            <span className="text-orange-600 font-bold text-sm">{counts.Pending} Pending Review</span>
                        </div>
                    )}
                </div>

                {/* Search + Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 w-full">
                        <Search size={15} className="text-slate-300 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name, Family ID, email, phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {["All", "Pending", "Approved", "Rejected"].map((s) => (
                            <button key={s} onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    statusFilter === s
                                        ? "bg-[#0f3d2e] text-white shadow"
                                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                }`}>
                                {s} <span className="opacity-60">({counts[s]})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_180px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-300">
                        <span>Applicant</span>
                        <span>Contact</span>
                        <span>Membership</span>
                        <span className="text-right">Status</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="py-14 text-center text-slate-300 text-sm font-semibold">
                            No registrations found.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {filtered.map((m) => (
                                <div key={m.id}
                                    className="grid grid-cols-[2fr_1.5fr_1fr_1fr_180px] gap-4 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors">

                                    {/* Applicant info */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img src={m.profilePhoto} alt={m.fullName}
                                            className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100" />
                                        <div className="min-w-0">
                                            <p className="font-bold text-slate-800 text-sm truncate">{m.fullName}</p>
                                            <p className="text-slate-400 text-xs">{m.familyId} · {m.joinedDate}</p>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium truncate">{m.phone}</p>
                                        <p className="text-slate-400 text-xs truncate">{m.email}</p>
                                    </div>

                                    {/* Membership */}
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">{m.membershipType}</p>
                                        <p className="text-slate-400 text-xs">{m.branchUnit}</p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-end">
                                        <StatusBadge status={m.status} />
                                    </div>

                                    {/* 3 Action buttons */}
                                    <div className="flex items-center justify-center gap-1.5">
                                        <button onClick={() => setSelectedMember(m)}
                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold transition-colors"
                                            title="View Details">
                                            <Eye size={13} /> Details
                                        </button>
                                        <button onClick={() => handleApprove(m.id)}
                                            disabled={m.status === "Approved"}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Approve">
                                            <CheckCircle2 size={14} />
                                        </button>
                                        <button onClick={() => handleReject(m.id)}
                                            disabled={m.status === "Rejected"}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Reject">
                                            <XCircle size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Detail popup */}
            <DetailModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </>
    );
};

export default AdminRegistrations;