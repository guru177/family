import React, { useState, useEffect } from "react";
import {
    Heart, Search, Eye, CheckCircle2, XCircle, Clock,
    X, Download, UploadCloud, IndianRupee, User, Phone,
    Mail, MapPin, Tag, Calendar, FileText, Hash, MessageSquare,
    Plus, Pencil, Trash2, Settings,
} from "lucide-react";

/* ── localStorage keys ── */
const LS_KEY = "admin_donations";
const LS_CAT_KEY = "admin_donation_categories";

/* ── Default categories ── */
const DEFAULT_CATEGORIES = [
    "General Fund (Greatest Need)",
    "Scholarship Fund",
    "Emergency Assistance",
    "Annual Reunion Fund",
];

/* ── Mock data — matches 4-step donation wizard data model ── */
const INITIAL_DONATIONS = [
    {
        id: "DON-1049",
        donorName: "Anil Kumar",
        phone: "+91 98765 43210",
        email: "anil.kumar@email.com",
        city: "Kochi",
        category: "Scholarship Fund",
        amount: 5000,
        transactionId: "TXN238129381203",
        paymentDate: "2026-05-10",
        message: "For the bright future of our children.",
        remarks: "",
        proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
        status: "Pending",
        submittedOn: "2026-05-10",
    },
    {
        id: "DON-0921",
        donorName: "Priya Sharma",
        phone: "+91 91234 56789",
        email: "priya.sharma@email.com",
        city: "Kochi",
        category: "Emergency Assistance",
        amount: 2000,
        transactionId: "TXN983432100023",
        paymentDate: "2025-12-05",
        message: "Hoping this helps someone in need.",
        remarks: "Urgent",
        proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
        status: "Verified",
        submittedOn: "2025-12-05",
    },
    {
        id: "DON-0683",
        donorName: "Vijay Nair",
        phone: "+91 94400 12345",
        email: "vijay.nair@email.com",
        city: "Thiruvananthapuram",
        category: "Annual Reunion Fund",
        amount: 1000,
        transactionId: "TXN112344008821",
        paymentDate: "2025-07-15",
        message: "",
        remarks: "",
        proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
        status: "Verified",
        submittedOn: "2025-07-15",
    },
    {
        id: "DON-0512",
        donorName: "Deepa Menon",
        phone: "+91 99876 54321",
        email: "deepa.menon@email.com",
        city: "Kochi",
        category: "General Fund (Greatest Need)",
        amount: 10000,
        transactionId: "TXN567890123456",
        paymentDate: "2026-03-01",
        message: "For the community.",
        remarks: "Bank transfer",
        proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
        status: "Rejected",
        submittedOn: "2026-03-01",
    },
    {
        id: "DON-0411",
        donorName: "Sunil Rajan",
        phone: "+91 88001 99999",
        email: "sunil.rajan@email.com",
        city: "Thrissur",
        category: "Scholarship Fund",
        amount: 500,
        transactionId: "TXN100000234567",
        paymentDate: "2026-02-20",
        message: "",
        remarks: "",
        proofImage: "",
        status: "Pending",
        submittedOn: "2026-02-20",
    },
];

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
    const map = {
        Verified: { cls: "bg-emerald-50 text-emerald-600", icon: <CheckCircle2 size={11} /> },
        Pending: { cls: "bg-orange-50 text-orange-500", icon: <Clock size={11} /> },
        Rejected: { cls: "bg-red-50 text-red-500", icon: <XCircle size={11} /> },
    };
    const s = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${s.cls}`}>
            {s.icon} {status}
        </span>
    );
};

/* ── Detail / Proof modal ── */
const DonationModal = ({ donation: d, onClose, onVerify, onReject }) => {
    if (!d) return null;
    const Field = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} className="text-slate-400" />
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-0.5">{label}</p>
                <p className="text-slate-700 font-semibold text-sm">{value || <span className="text-slate-300 italic">—</span>}</p>
            </div>
        </div>
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg leading-tight">Donation Details</h2>
                        <p className="text-slate-400 text-xs">{d.id} · Submitted: {d.submittedOn}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={d.status} />
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                    {/* Amount highlight */}
                    <div className="flex items-center justify-between bg-[#0f3d2e] rounded-2xl px-6 py-4">
                        <div>
                            <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-0.5">Donation Amount</p>
                            <p className="text-white text-3xl font-extrabold">₹{d.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-0.5">Category</p>
                            <p className="text-white text-sm font-bold">{d.category}</p>
                        </div>
                    </div>

                    {/* Donor details */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Donor Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Field icon={User} label="Full Name" value={d.donorName} />
                            <Field icon={Phone} label="Phone" value={d.phone} />
                            <Field icon={Mail} label="Email" value={d.email} />
                            <Field icon={MapPin} label="City" value={d.city} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50" />

                    {/* Payment details */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Payment Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Field icon={Hash} label="Transaction ID" value={d.transactionId} />
                            <Field icon={Calendar} label="Payment Date" value={d.paymentDate} />
                            <Field icon={Tag} label="Category" value={d.category} />
                            <Field icon={FileText} label="Remarks" value={d.remarks} />
                        </div>
                        {d.message && (
                            <div className="mt-4">
                                <Field icon={MessageSquare} label="Message from Donor" value={d.message} />
                            </div>
                        )}
                    </div>

                    {/* Payment Proof Image */}
                    <div className="border-t border-slate-50 pt-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Payment Proof</h3>
                        {d.proofImage ? (
                            <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                <img src={d.proofImage} alt="Payment proof" className="w-full max-h-64 object-contain" />
                                <a href={d.proofImage} target="_blank" rel="noreferrer"
                                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow text-slate-500 hover:text-emerald-600 transition-colors">
                                    <Download size={14} />
                                </a>
                            </div>
                        ) : (
                            <div className="rounded-xl border-2 border-dashed border-slate-100 bg-slate-50 py-10 flex flex-col items-center text-slate-300 gap-2">
                                <UploadCloud size={24} />
                                <p className="text-xs font-semibold">No proof uploaded</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
                    <button onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-100 transition-colors">
                        Close
                    </button>
                    {d.status === "Pending" && (
                        <button onClick={() => onReject(d.id)}
                            className="px-5 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2">
                            <XCircle size={14} /> Reject
                        </button>
                    )}
                    {d.status !== "Verified" && (
                        <button onClick={() => onVerify(d.id)}
                            className="px-5 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2"
                            style={{ background: "linear-gradient(135deg, #064e3b, #0f7a55)" }}>
                            <CheckCircle2 size={14} /> Verify & Approve
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Category Manager Modal ── */
const CategoryManagerModal = ({ categories, onClose, onSave }) => {
    const [list, setList] = useState([...categories]);
    const [editing, setEditing] = useState(null); // { index, val }
    const [newCat, setNewCat] = useState("");

    const add = () => {
        if (!newCat.trim() || list.includes(newCat.trim())) return;
        setList([...list, newCat.trim()]);
        setNewCat("");
    };

    const remove = (idx) => {
        setList(list.filter((_, i) => i !== idx));
    };

    const startEdit = (idx) => {
        setEditing({ index: idx, val: list[idx] });
    };

    const saveEdit = () => {
        if (!editing.val.trim() || list.includes(editing.val.trim())) {
            setEditing(null);
            return;
        }
        const next = [...list];
        next[editing.index] = editing.val.trim();
        setList(next);
        setEditing(null);
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-800 text-lg">Manage Categories</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Add new */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="New category name..."
                            value={newCat}
                            onChange={(e) => setNewCat(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && add()}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 text-black"
                        />
                        <button onClick={add} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* List */}
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {list.map((cat, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 group">
                                {editing?.index === i ? (
                                    <input
                                        autoFocus
                                        value={editing.val}
                                        onChange={(e) => setEditing({ ...editing, val: e.target.value })}
                                        onBlur={saveEdit}
                                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                        className="flex-1 bg-white border border-emerald-400 rounded px-2 py-0.5 text-sm outline-none"
                                    />
                                ) : (
                                    <span className="flex-1 text-sm text-slate-600 font-medium">{cat}</span>
                                )}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(i)} className="p-1.5 text-slate-400 hover:text-emerald-600">
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => remove(i)} className="p-1.5 text-slate-400 hover:text-red-500">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                    <button
                        onClick={() => { onSave(list); onClose(); }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Main Page ── */
const AdminDonations = () => {
    const [donations, setDonations] = useState(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            return stored ? JSON.parse(stored) : INITIAL_DONATIONS;
        } catch {
            return INITIAL_DONATIONS;
        }
    });
    const [categories, setCategories] = useState(() => {
        try {
            const stored = localStorage.getItem(LS_CAT_KEY);
            return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
        } catch {
            return DEFAULT_CATEGORIES;
        }
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [selected, setSelected] = useState(null);
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);

    /* Persist */
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(donations));
    }, [donations]);

    useEffect(() => {
        localStorage.setItem(LS_CAT_KEY, JSON.stringify(categories));
    }, [categories]);

    /* Counts */
    const counts = {
        All: donations.length,
        Pending: donations.filter((d) => d.status === "Pending").length,
        Verified: donations.filter((d) => d.status === "Verified").length,
        Rejected: donations.filter((d) => d.status === "Rejected").length,
    };

    const totalVerified = donations
        .filter((d) => d.status === "Verified")
        .reduce((sum, d) => sum + d.amount, 0);

    const totalPending = donations
        .filter((d) => d.status === "Pending")
        .reduce((sum, d) => sum + d.amount, 0);

    /* Filter */
    const filtered = donations.filter((d) => {
        const q = search.toLowerCase();
        const matchSearch =
            d.donorName.toLowerCase().includes(q) ||
            d.id.toLowerCase().includes(q) ||
            d.transactionId.toLowerCase().includes(q) ||
            d.email.toLowerCase().includes(q);
        const matchStatus = statusFilter === "All" || d.status === statusFilter;
        const matchCategory = categoryFilter === "All" || d.category === categoryFilter;
        return matchSearch && matchStatus && matchCategory;
    });

    /* Actions */
    const handleVerify = (id) => {
        setDonations((prev) =>
            prev.map((d) => (d.id === id ? { ...d, status: "Verified" } : d))
        );
        setSelected((prev) => prev && prev.id === id ? { ...prev, status: "Verified" } : prev);
    };

    const handleReject = (id) => {
        setDonations((prev) =>
            prev.map((d) => (d.id === id ? { ...d, status: "Rejected" } : d))
        );
        setSelected((prev) => prev && prev.id === id ? { ...prev, status: "Rejected" } : prev);
    };

    return (
        <>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800">Donations</h1>
                        <p className="text-slate-400 mt-1 text-sm">Verify payment proofs and manage donation records</p>
                    </div>
                    {counts.Pending > 0 && (
                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl">
                            <Clock size={15} className="text-orange-500" />
                            <span className="text-orange-600 font-bold text-sm">{counts.Pending} Pending Verification</span>
                        </div>
                    )}
                </div>

                {/* Summary stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Donations", val: donations.length, icon: Heart, cls: "text-pink-500", bg: "bg-pink-50" },
                        { label: "Verified Amount", val: `₹${totalVerified.toLocaleString()}`, icon: CheckCircle2, cls: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Pending Amount", val: `₹${totalPending.toLocaleString()}`, icon: Clock, cls: "text-orange-500", bg: "bg-orange-50" },
                        { label: "Pending Count", val: counts.Pending, icon: Clock, cls: "text-orange-500", bg: "bg-orange-50" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                                <s.icon size={18} className={s.cls} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">{s.label}</p>
                                <p className="text-xl font-extrabold text-slate-800">{s.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search + Filters */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center flex-wrap">
                    {/* Search */}
                    <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 min-w-48">
                        <Search size={15} className="text-slate-300 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by donor, ID, transaction..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="flex items-center gap-2 shrink-0">
                        {["All", "Pending", "Verified", "Rejected"].map((s) => (
                            <button key={s} onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === s ? "bg-[#0f3d2e] text-white shadow" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                    }`}>
                                {s} <span className="opacity-60">({counts[s] ?? donations.filter(d => d.status === s).length})</span>
                            </button>
                        ))}
                    </div>

                    {/* Category filter */}
                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 outline-none focus:border-emerald-300 transition-colors shrink-0"
                        >
                            <option value="All">All Categories</option>
                            {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <button
                            onClick={() => setIsCatModalOpen(true)}
                            className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Manage Categories"
                        >
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[60px_2fr_1.2fr_1fr_1fr_1fr_140px] gap-3 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-300">
                        <span>Proof</span>
                        <span>Donor</span>
                        <span>Category</span>
                        <span>Amount</span>
                        <span>Trans.ID</span>
                        <span className="text-right">Status</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="py-14 text-center text-slate-300 text-sm font-semibold">
                            No donations found.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {filtered.map((d) => (
                                <div key={d.id}
                                    className="grid grid-cols-[60px_2fr_1.2fr_1fr_1fr_1fr_140px] gap-3 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors">

                                    {/* Proof thumbnail */}
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                        {d.proofImage ? (
                                            <img src={d.proofImage} alt="proof" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <UploadCloud size={14} className="text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Donor */}
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{d.donorName}</p>
                                        <p className="text-slate-400 text-xs">{d.id} · {d.submittedOn}</p>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <p className="text-slate-600 text-xs font-semibold leading-snug">{d.category}</p>
                                    </div>

                                    {/* Amount */}
                                    <div>
                                        <p className="font-extrabold text-slate-800 text-sm">₹{d.amount.toLocaleString()}</p>
                                        <p className="text-slate-400 text-xs">{d.paymentDate}</p>
                                    </div>

                                    {/* Transaction ID */}
                                    <div>
                                        <p className="text-slate-500 text-xs font-mono truncate max-w-[120px]">{d.transactionId}</p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-end">
                                        <StatusBadge status={d.status} />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-center gap-1.5">
                                        <button onClick={() => setSelected(d)}
                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold transition-colors"
                                            title="View Details">
                                            <Eye size={13} /> View
                                        </button>
                                        <button onClick={() => handleVerify(d.id)}
                                            disabled={d.status === "Verified"}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Verify">
                                            <CheckCircle2 size={13} />
                                        </button>
                                        <button onClick={() => handleReject(d.id)}
                                            disabled={d.status !== "Pending"}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Reject">
                                            <XCircle size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Detail Modal */}
            <DonationModal
                donation={selected}
                onClose={() => setSelected(null)}
                onVerify={handleVerify}
                onReject={handleReject}
            />

            {/* Category Manager Modal */}
            {isCatModalOpen && (
                <CategoryManagerModal
                    categories={categories}
                    onClose={() => setIsCatModalOpen(false)}
                    onSave={setCategories}
                />
            )}
        </>
    );
};

export default AdminDonations;