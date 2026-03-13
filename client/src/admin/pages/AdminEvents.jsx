import React, { useState, useEffect } from "react";
import {
    Plus, Pencil, Trash2, EyeOff, Eye, FileText,
    Calendar, Clock, MapPin, Search, X, CheckCircle2,
    ChevronDown, Image as ImageIcon, AlignLeft, Tag,
} from "lucide-react";

/* ── Initial events data (mirrors frontend Events.jsx structure) ── */
const INITIAL_EVENTS = [
    {
        id: "1",
        title: "Grand Annual Family Reunion 2026",
        date: "2026-07-15",
        time: "10:00 AM - 10:00 PM",
        location: "Heritage Resort & Gardens",
        category: "Reunion",
        description: "Join us for the most anticipated event of the year! We are bringing together all branches of the family for a massive celebration filled with traditional ceremonies, games, knowledge sharing, and feasts.",
        image: "https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=600",
        status: "Published",
        agenda: [
            { time: "10:00 AM", title: "Welcome & Registration", desc: "Collect your nametags and welcome bags." },
            { time: "12:00 PM", title: "Opening Ceremony", desc: "A brief history and honoring of elders." },
            { time: "02:00 PM", title: "Family Picnic & Games", desc: "Outdoor activities for all ages." },
            { time: "06:00 PM", title: "Grand Dinner", desc: "Buffet style dinner featuring family recipes." },
        ],
    },
    {
        id: "2",
        title: "Youth Leadership Workshop",
        date: "2026-08-22",
        time: "09:00 AM - 04:00 PM",
        location: "Community Center Hall",
        category: "Education",
        description: "A day dedicated to empowering the next generation. Features guest speakers from within the family sharing their career journeys, leadership skills, and financial literacy basics.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
        status: "Published",
        agenda: [
            { time: "09:00 AM", title: "Welcome & Intro", desc: "Overview of the day's agenda." },
            { time: "10:00 AM", title: "Speaker Sessions", desc: "Guest speakers from the family." },
            { time: "02:00 PM", title: "Workshop", desc: "Hands-on leadership activities." },
        ],
    },
    {
        id: "3",
        title: "Autumn Heritage Festival",
        date: "2026-10-10",
        time: "03:00 PM - 08:00 PM",
        location: "Westwood Park",
        category: "Cultural",
        description: "Celebrate our roots with authentic family recipes, storytelling sessions by our elders, and cultural performances.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
        status: "Draft",
        agenda: [],
    },
    {
        id: "4",
        title: "Winter Charity Gala & Auction",
        date: "2026-12-05",
        time: "06:00 PM - 11:30 PM",
        location: "Grand Plaza Hotel",
        category: "Charity",
        description: "Our annual fundraising event to support the community education fund and emergency assistance programs.",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600",
        status: "Hidden",
        agenda: [],
    },
];

const CATEGORIES = ["Reunion", "Education", "Cultural", "Charity", "Virtual", "Memorial", "Other"];

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
    const map = {
        Published: "bg-emerald-50 text-emerald-600",
        Draft:     "bg-orange-50 text-orange-500",
        Hidden:    "bg-slate-100 text-slate-400",
    };
    const icons = {
        Published: <CheckCircle2 size={11} />,
        Draft:     <FileText size={11} />,
        Hidden:    <EyeOff size={11} />,
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${map[status] || map.Draft}`}>
            {icons[status]} {status}
        </span>
    );
};

/* ── Empty form template ── */
const emptyForm = () => ({
    id: Date.now().toString(),
    title: "",
    date: "",
    time: "",
    location: "",
    category: "Reunion",
    description: "",
    image: "",
    status: "Draft",
    agenda: [],
});

/* ── Add/Edit Modal ── */
const EventModal = ({ event, onClose, onSave }) => {
    const [form, setForm] = useState(event ? { ...event } : emptyForm());
    const [agendaInput, setAgendaInput] = useState({ time: "", title: "", desc: "" });

    const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    const addAgendaItem = () => {
        if (!agendaInput.time || !agendaInput.title) return;
        setForm((p) => ({ ...p, agenda: [...p.agenda, { ...agendaInput }] }));
        setAgendaInput({ time: "", title: "", desc: "" });
    };

    const removeAgendaItem = (i) =>
        setForm((p) => ({ ...p, agenda: p.agenda.filter((_, idx) => idx !== i) }));

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <h2 className="font-bold text-slate-800 text-lg">
                        {event ? "Edit Event" : "Add New Event"}
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

                    {/* Title */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Event Title *</label>
                        <input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            placeholder="e.g. Grand Annual Family Reunion"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors"
                        />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Date *</label>
                            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Time</label>
                            <input value={form.time} onChange={(e) => set("time", e.target.value)}
                                placeholder="e.g. 10:00 AM - 06:00 PM"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors" />
                        </div>
                    </div>

                    {/* Location + Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Location *</label>
                            <input value={form.location} onChange={(e) => set("location", e.target.value)}
                                placeholder="Venue name or Online"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Category</label>
                            <input
                                type="text"
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                                placeholder="Category (e.g. Reunion)"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Event Image</label>
                        <div className="space-y-2">
                            {/* Preview */}
                            {form.image && (
                                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100">
                                    <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => set("image", "")}
                                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            )}
                            {/* File input */}
                            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group">
                                <ImageIcon size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                                <span className="text-sm text-slate-400 font-medium">
                                    {form.image ? "Change image..." : "Click to upload image"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file && file.type.startsWith('image/')) {
                                            const convertToWebP = (file) => {
                                                return new Promise((resolve, reject) => {
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(file);
                                                    reader.onload = (event) => {
                                                        const img = new Image();
                                                        img.src = event.target.result;
                                                        img.onload = () => {
                                                            const canvas = document.createElement('canvas');
                                                            canvas.width = img.width;
                                                            canvas.height = img.height;
                                                            const ctx = canvas.getContext('2d');
                                                            ctx.drawImage(img, 0, 0);
                                                            canvas.toBlob((blob) => {
                                                                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                                                                    type: 'image/webp',
                                                                    lastModified: Date.now()
                                                                });
                                                                resolve(webpFile);
                                                            }, 'image/webp', 0.8);
                                                        };
                                                        img.onerror = (err) => reject(err);
                                                    };
                                                    reader.onerror = (err) => reject(err);
                                                });
                                            };

                                            try {
                                                const webpFile = await convertToWebP(file);
                                                const imageUrl = URL.createObjectURL(webpFile);
                                                set("image", imageUrl);
                                            } catch (err) {
                                                console.error('Conversion error:', err);
                                                alert('Error processing image');
                                            }
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Description *</label>
                        <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                            rows={4} placeholder="Event description..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 transition-colors resize-none" />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Publish Status</label>
                        <div className="flex gap-2">
                            {["Published", "Draft", "Hidden"].map((s) => (
                                <button key={s} onClick={() => set("status", s)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        form.status === s
                                            ? "bg-[#0f3d2e] text-white border-[#0f3d2e]"
                                            : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                                    }`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Agenda builder */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Event Agenda</label>

                        {/* Existing items */}
                        {form.agenda.length > 0 && (
                            <div className="space-y-2 mb-3">
                                {form.agenda.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                                        <span className="text-emerald-600 font-bold text-xs w-16 shrink-0">{item.time}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-700 text-xs">{item.title}</p>
                                            {item.desc && <p className="text-slate-400 text-xs truncate">{item.desc}</p>}
                                        </div>
                                        <button onClick={() => removeAgendaItem(i)} className="text-slate-300 hover:text-red-400 transition-colors shrink-0">
                                            <X size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* New agenda row */}
                        <div className="grid grid-cols-[80px_1fr_1fr_36px] gap-2">
                            <input value={agendaInput.time} onChange={(e) => setAgendaInput((p) => ({ ...p, time: e.target.value }))}
                                placeholder="10:00 AM" className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-emerald-400" />
                            <input value={agendaInput.title} onChange={(e) => setAgendaInput((p) => ({ ...p, title: e.target.value }))}
                                placeholder="Session title" className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-emerald-400" />
                            <input value={agendaInput.desc} onChange={(e) => setAgendaInput((p) => ({ ...p, desc: e.target.value }))}
                                placeholder="Brief description" className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-emerald-400" />
                            <button onClick={addAgendaItem}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors">
                                <Plus size={15} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center shrink-0 bg-slate-50/50">
                    <div className="flex gap-2">
                        <button onClick={() => { set("status", "Draft"); setTimeout(() => onSave({ ...form, status: "Draft" }), 0); }}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <FileText size={13} /> Save as Draft
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-100 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => onSave(form)}
                            className="px-5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5"
                            style={{ background: "linear-gradient(135deg, #064e3b, #0f7a55)" }}>
                            <CheckCircle2 size={13} /> {form.status === "Draft" ? "Save Draft" : "Publish Event"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Delete confirm mini-modal ── */
const DeleteConfirm = ({ event, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-center mb-1">Delete Event?</h3>
            <p className="text-slate-400 text-sm text-center mb-6">
                "<span className="font-semibold text-slate-600">{event?.title}</span>" will be permanently removed.
            </p>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                    Delete
                </button>
            </div>
        </div>
    </div>
);

/* ── localStorage key ── */
const LS_KEY = "admin_events";

/* ── Main Page ── */
const AdminEvents = () => {
    const [events, setEvents] = useState(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            return stored ? JSON.parse(stored) : INITIAL_EVENTS;
        } catch {
            return INITIAL_EVENTS;
        }
    });
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [modalEvent, setModalEvent] = useState(null);   // null=closed, false=new, object=edit
    const [deleteTarget, setDeleteTarget] = useState(null);

    /* Persist to localStorage whenever events change */
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(events));
    }, [events]);

    /* Filtering */
    const filtered = events.filter((e) => {
        const q = search.toLowerCase();
        const matchSearch = e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
        const matchStatus = statusFilter === "All" || e.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const counts = {
        All:       events.length,
        Published: events.filter((e) => e.status === "Published").length,
        Draft:     events.filter((e) => e.status === "Draft").length,
        Hidden:    events.filter((e) => e.status === "Hidden").length,
    };

    /* Actions */
    const handleSave = (form) => {
        setEvents((prev) => {
            const idx = prev.findIndex((e) => e.id === form.id);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = form;
                return next;
            }
            return [form, ...prev];
        });
        setModalEvent(null);
    };

    const handleDelete = () => {
        setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    const toggleHide = (id) => {
        setEvents((prev) =>
            prev.map((e) =>
                e.id === id
                    ? { ...e, status: e.status === "Hidden" ? "Published" : "Hidden" }
                    : e
            )
        );
    };

    const setDraft = (id) => {
        setEvents((prev) =>
            prev.map((e) => (e.id === id ? { ...e, status: "Draft" } : e))
        );
    };

    return (
        <>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800">Events</h1>
                        <p className="text-slate-400 mt-1 text-sm">Manage community events — add, edit, publish, or archive</p>
                    </div>
                    <button
                        onClick={() => setModalEvent(false)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow"
                        style={{ background: "linear-gradient(135deg, #064e3b, #0f7a55)" }}
                    >
                        <Plus size={16} /> Add Event
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 w-full">
                        <Search size={15} className="text-slate-300 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by title, location, category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {["All", "Published", "Draft", "Hidden"].map((s) => (
                            <button key={s} onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    statusFilter === s ? "bg-[#0f3d2e] text-white shadow" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                }`}>
                                {s} <span className="opacity-60">({counts[s]})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Cards Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center text-slate-300 text-sm font-semibold shadow-sm">
                        No events found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map((ev) => (
                            <div key={ev.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all ${ev.status === "Hidden" ? "opacity-60 border-slate-100" : "border-slate-100 hover:shadow-md"}`}>

                                {/* Image */}
                                <div className="relative h-44 bg-slate-100 shrink-0">
                                    {ev.image ? (
                                        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon size={28} className="text-slate-200" />
                                        </div>
                                    )}
                                    {/* Status overlay badge */}
                                    <div className="absolute top-3 left-3">
                                        <StatusBadge status={ev.status} />
                                    </div>
                                    {/* Category badge */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        <span className="text-[#146c43] font-bold text-xs">{ev.category}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3 line-clamp-2">{ev.title}</h3>
                                    <div className="space-y-1.5 mb-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                                            <Calendar size={12} className="shrink-0" />
                                            <span>{ev.date}</span>
                                            {ev.time && <><span>·</span><Clock size={12} className="shrink-0" /><span>{ev.time}</span></>}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                                            <MapPin size={12} className="shrink-0" />
                                            <span className="truncate">{ev.location}</span>
                                        </div>
                                        {ev.agenda.length > 0 && (
                                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                <AlignLeft size={12} className="shrink-0" />
                                                <span>{ev.agenda.length} agenda items</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-slate-50">
                                        {/* Edit */}
                                        <button onClick={() => setModalEvent(ev)}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold transition-colors">
                                            <Pencil size={12} /> Edit
                                        </button>

                                        {/* Draft */}
                                        {ev.status !== "Draft" && (
                                            <button onClick={() => setDraft(ev.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 text-xs font-bold transition-colors">
                                                <FileText size={12} /> Draft
                                            </button>
                                        )}

                                        {/* Hide / Unhide */}
                                        <button onClick={() => toggleHide(ev.id)}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                                ev.status === "Hidden"
                                                    ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                                                    : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                                            }`}>
                                            {ev.status === "Hidden" ? <><Eye size={12} /> Show</> : <><EyeOff size={12} /> Hide</>}
                                        </button>

                                        {/* Delete */}
                                        <button onClick={() => setDeleteTarget(ev)}
                                            className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold transition-colors">
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {modalEvent !== null && (
                <EventModal
                    event={modalEvent === false ? null : modalEvent}
                    onClose={() => setModalEvent(null)}
                    onSave={handleSave}
                />
            )}

            {/* Delete confirm */}
            {deleteTarget && (
                <DeleteConfirm
                    event={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </>
    );
};

export default AdminEvents;