import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin, Users, Briefcase, Heart, Home, Shield, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import { MEMBERS_DATA } from "./AdminMembers";

/* ── helper components ── */
const Section = ({ icon: Icon, title, color = "#0f3d2e", children }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-50"
            style={{ borderLeftWidth: 4, borderLeftColor: color }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={16} style={{ color }} />
            </div>
            <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
        </div>
        <div className="px-6 py-5">{children}</div>
    </div>
);

const Field = ({ label, value }) => (
    <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-0.5">{label}</p>
        <p className="text-slate-700 font-semibold text-sm">{value || <span className="text-slate-300 italic">—</span>}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const map = {
        Approved: { cls: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <CheckCircle2 size={13} /> },
        Pending: { cls: "bg-orange-50 text-orange-500 border-orange-100", icon: <Clock size={13} /> },
        Rejected: { cls: "bg-red-50 text-red-500 border-red-100", icon: <XCircle size={13} /> },
    };
    const s = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${s.cls}`}>
            {s.icon} {status}
        </span>
    );
};

const AdminMemberDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const m = MEMBERS_DATA.find((x) => x.id === id);

    if (!m) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-slate-400 font-semibold">Member not found.</p>
                <button onClick={() => navigate("/admin/members")} className="text-emerald-600 font-bold text-sm underline">
                    Back to Members
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-9xl">

            {/* Back button */}
            <button
                onClick={() => navigate("/admin/members")}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold transition-colors group"
            >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                Back to Members
            </button>

            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                    src={m.profilePhoto}
                    alt={m.fullName}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h1 className="text-2xl font-extrabold text-slate-800">{m.fullName}</h1>
                        <StatusBadge status={m.status} />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        {m.familyId} · {m.membershipType} · {m.branchUnit}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400 font-semibold">
                        <span className="flex items-center gap-1"><Mail size={12} />{m.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} />{m.phone}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} />Joined: {m.joinedDate}</span>
                    </div>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 shrink-0">
                    <button className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors">
                        Approve
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">
                        Reject
                    </button>
                </div>
            </div>

            {/* 4-section grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* ── Personal Info ── */}
                <Section icon={User} title="Personal Information" color="#0f3d2e">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Field label="Full Name" value={m.fullName} />
                        <Field label="Gender" value={m.gender} />
                        <Field label="Date of Birth" value={m.dob} />
                        <Field label="Blood Group" value={m.bloodGroup} />
                        <Field label="Occupation" value={m.occupation} />
                        <Field label="Username" value={m.username} />
                    </div>
                </Section>

                {/* ── Family Info ── */}
                <Section icon={Users} title="Family Information" color="#1a7a55">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Field label="Family / House Name" value={m.familyName} />
                        <Field label="Family ID" value={m.familyId} />
                        <Field label="Father's Name" value={m.fatherName} />
                        <Field label="Mother's Name" value={m.motherName} />
                        <Field label="Spouse Name" value={m.spouseName} />
                        <Field label="Family Members" value={m.familyMembersCount} />
                        <Field label="Family Head" value={m.isFamilyHead} />
                    </div>
                </Section>

                {/* ── Address ── */}
                <Section icon={MapPin} title="Address Details" color="#4faea6">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Field label="House No." value={m.houseNumber} />
                        <Field label="Street / Area" value={m.streetArea} />
                        <Field label="City / Village" value={m.cityVillage} />
                        <Field label="District" value={m.district} />
                        <Field label="State" value={m.state} />
                        <Field label="Pincode" value={m.pincode} />
                    </div>
                </Section>

                {/* ── Community / Login ── */}
                <Section icon={Shield} title="Community & Account" color="#b8db6e">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Field label="Membership Type" value={m.membershipType} />
                        <Field label="Branch / Unit" value={m.branchUnit} />
                        <Field label="Blood Group" value={m.bloodGroup} />
                        <Field label="Status" value={m.status} />
                        <Field label="Login Email" value={m.loginEmail} />
                        <Field label="Joined On" value={m.joinedDate} />
                    </div>
                </Section>

            </div>

            {/* ── Family Members added in User Dashboard ── */}
            <Section icon={Home} title={`Family Members (${m.familyMembers.length})`} color="#f59e0b">
                {m.familyMembers.length === 0 ? (
                    <p className="text-slate-300 text-sm italic">No family members added yet.</p>
                ) : (
                    <div className="space-y-4">
                        {/* Table header */}
                        <div className="grid grid-cols-5 text-xs font-semibold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-50">
                            <span>Name</span>
                            <span>Relation</span>
                            <span>Date of Birth</span>
                            <span>Blood Group</span>
                            <span>Occupation</span>
                        </div>
                        {m.familyMembers.map((fm, i) => (
                            <div key={i} className="grid grid-cols-5 gap-2 items-center py-2 border-b border-slate-50 last:border-0">
                                <span className="font-semibold text-slate-700 text-sm">{fm.name}</span>
                                <span className="text-slate-500 text-sm">{fm.relation}</span>
                                <span className="text-slate-500 text-sm">{fm.dob}</span>
                                <span className="text-slate-500 text-sm">{fm.bloodGroup}</span>
                                <span className="text-slate-500 text-sm">{fm.occupation || "—"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </Section>

        </div>
    );
};

export default AdminMemberDetail;
