import React, { useState, useEffect } from "react";
import {
    Megaphone, Plus, Search, Eye, Pencil, Trash2, X,
    EyeOff, FileText, CheckCircle2, Clock, UploadCloud,
    User, Tag, Calendar, ChevronRight, MessageSquare,
    Save, GripVertical, AlertCircle, Quote, List, Type, ArrowUp, ArrowDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── localStorage keys ── */
const LS_ANNOUNCEMENTS = "admin_announcements";
const LS_BANNER = "admin_scrolling_banner";

const CATEGORIES = ["Community Support", "Education", "Virtual Event", "Heritage"];

const INITIAL_ANNOUNCEMENTS = [
    {
        id: 1,
        title: "New Medical Assistance Fund Launched for Seniors",
        date: "2026-05-10",
        category: "Community Support",
        author: "Foundation Board",
        readTime: "4 min read",
        excerpt: "We are incredibly proud to announce the launch of our new Medical Assistance Fund dedicated to providing comprehensive healthcare support for the elderly members of our family network.",
        content: [
            { type: "paragraph", value: "We are incredibly proud to announce the launch of our new Medical Assistance Fund dedicated to providing comprehensive healthcare support for the elderly members of our family network. This initiative has been in development for over a year and represents our continued commitment to honoring and caring for those who paved the way for us." },
            { type: "paragraph", value: "The fund aims to alleviate the financial burden of unexpected medical expenses for members aged 65 and above. By pooling community resources, the foundation will now be able to cover significant portions of hospital bills, prescription medications, and specialized treatments that are not fully covered by standard insurance plans." },
            { type: "blockquote", value: "A society is measured by how it treats its elderly. This fund ensures that our elders receive the dignity, care, and peace of mind they absolutely deserve.", footer: "James M., Board President" },
            { type: "heading", value: "How the Fund Operates" },
            { type: "paragraph", value: "The distribution of funds will be managed by a newly appointed healthcare committee consisting of medical professionals and senior family representatives. This dedicated committee will review confidential applications on a monthly basis, ensuring that aid is distributed efficiently and fairly to those in critical need." },
            { type: "list", value: ["Applications open officially on June 1st, 2026.", "Members can apply via the secure portal under the 'Support' section.", "All medical inquiries strictly maintain doctor-patient confidentiality.", "For immediate emergency assistance, contact the 24/7 hotline directly."] }
        ],
        image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?w=800",
        status: "Published",
    }
];

const INITIAL_BANNER = [
    "✨ Welcome to the official Family Portal! Connect, Share, and Grow together. ✨",
    "📅 Save the Date: Next Grand Family Reunion on July 15th, 2026! 📅",
    "🌟 New Community Project: Education Scholarship Fund launched. 🌟"
];

const AdminAnnouncements = () => {
    // --- State ---
    const [announcements, setAnnouncements] = useState(() => {
        const saved = localStorage.getItem(LS_ANNOUNCEMENTS);
        return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    });

    const [bannerMessages, setBannerMessages] = useState(() => {
        const saved = localStorage.getItem(LS_BANNER);
        return saved ? JSON.parse(saved) : INITIAL_BANNER;
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState("announcements"); // announcements | banner

    // Modal Form State
    const [formData, setFormData] = useState({
        title: "",
        category: CATEGORIES[0],
        author: "",
        readTime: "",
        excerpt: "",
        content: [], // Array of { type, value, footer? }
        image: "",
        status: "Draft",
    });

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem(LS_ANNOUNCEMENTS, JSON.stringify(announcements));
    }, [announcements]);

    useEffect(() => {
        localStorage.setItem(LS_BANNER, JSON.stringify(bannerMessages));
    }, [bannerMessages]);

    // --- Handlers ---
    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                category: CATEGORIES[0],
                author: "Admin",
                readTime: "5 min read",
                excerpt: "",
                content: [{ type: 'paragraph', value: '' }],
                image: "",
                status: "Draft",
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title.trim()) return;

        // Cleanup empty blocks
        const cleanedContent = formData.content.filter(b => {
            if (b.type === 'list') return b.value.some(v => v.trim());
            return b.value.trim();
        });

        const submission = { ...formData, content: cleanedContent };

        if (editingItem) {
            setAnnouncements(prev => prev.map(a => a.id === editingItem.id ? { ...submission, id: a.id, date: a.date || new Date().toISOString().split('T')[0] } : a));
        } else {
            const newItem = {
                ...submission,
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
            };
            setAnnouncements(prev => [newItem, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    };

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
                        const readerWebp = new FileReader();
                        readerWebp.onloadend = () => {
                            resolve(readerWebp.result);
                        };
                        readerWebp.readAsDataURL(blob);
                    }, 'image/webp', 0.8);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            try {
                const webpBase64 = await convertToWebP(file);
                setFormData(prev => ({ ...prev, image: webpBase64 }));
            } catch (err) {
                console.error('Conversion error:', err);
                alert('Error processing image');
            }
        }
    };

    // --- Block Editor Handlers ---
    const addBlock = (index, type) => {
        const newBlocks = [...formData.content];
        const defaultValue = type === 'list' ? [''] : '';
        newBlocks.splice(index + 1, 0, { type, value: defaultValue });
        setFormData({ ...formData, content: newBlocks });
    };

    const updateBlock = (index, value, footer = null) => {
        const newBlocks = [...formData.content];
        newBlocks[index].value = value;
        if (footer !== null) newBlocks[index].footer = footer;
        setFormData({ ...formData, content: newBlocks });
    };

    const removeBlock = (index) => {
        const newBlocks = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: newBlocks });
    };

    const moveBlock = (index, direction) => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === formData.content.length - 1) return;
        const newBlocks = [...formData.content];
        const swapWith = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[swapWith]] = [newBlocks[swapWith], newBlocks[index]];
        setFormData({ ...formData, content: newBlocks });
    };

    // Banner Handlers
    const [newBannerMsg, setNewBannerMsg] = useState("");
    const handleAddBanner = () => {
        if (!newBannerMsg.trim()) return;
        setBannerMessages(prev => [...prev, newBannerMsg.trim()]);
        setNewBannerMsg("");
    };

    const handleRemoveBanner = (index) => {
        setBannerMessages(prev => prev.filter((_, i) => i !== index));
    };

    // --- Filtering ---
    const filteredAnnouncements = announcements.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || a.status === statusFilter;
        const matchesCategory = categoryFilter === "All" || a.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50/50 space-y-8 p-4 md:p-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0a1910] tracking-tight flex items-center gap-3">
                        <Megaphone className="text-[#146c43]" />
                        Communications
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Manage public announcements and the homecoming scrolling banner</p>
                </div>
                {activeTab === "announcements" && (
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#146c43] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#146c43]/20 hover:bg-[#0f5233] transition-all transform hover:-translate-y-0.5 active:scale-95"
                    >
                        <Plus size={20} />
                        Create Announcement
                    </button>
                )}
            </div>

            {/* Main Navigation Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit">
                <button
                    onClick={() => setActiveTab("announcements")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "announcements" ? "bg-[#146c43] text-white shadow-md" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                >
                    Announcements
                </button>
                <button
                    onClick={() => setActiveTab("banner")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "banner" ? "bg-[#146c43] text-white shadow-md" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                >
                    Scrolling Banner
                </button>
            </div>

            {activeTab === "announcements" ? (
                /* --- Announcements Section --- */
                <div className="space-y-6">
                    {/* Filters & Search */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-4 flex flex-col lg:flex-row gap-4 shadow-sm">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#146c43] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#146c43]/10 focus:border-[#146c43] transition-all"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:border-[#146c43] transition-all cursor-pointer"
                            >
                                <option value="All">All Categories</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                {["All", "Published", "Draft", "Hidden"].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === status ? "bg-white text-[#146c43] shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Announcements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredAnnouncements.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col ${item.status === "Hidden" ? "opacity-75 grayscale-[0.3]" : ""}`}
                                >
                                    {/* Image Preview */}
                                    <div className="aspect-[16/9] relative bg-slate-100 overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <FileText size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${item.status === 'Published' ? 'bg-emerald-500 text-white' :
                                                item.status === 'Draft' ? 'bg-orange-500 text-white' :
                                                    'bg-slate-500 text-white'
                                                }`}>
                                                {item.status === 'Published' ? <CheckCircle2 size={10} /> : item.status === 'Draft' ? <Clock size={10} /> : <EyeOff size={10} />}
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                                            <span>{item.date}</span>
                                            <span>{item.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-extrabold text-[#0a1910] leading-tight mb-3 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6 flex-grow">
                                            {item.excerpt}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#146c43]/10 hover:text-[#146c43] transition-colors"
                                                    title="Edit Announcement"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                    title="Delete Announcement"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                                                <button
                                                    onClick={() => handleStatusUpdate(item.id, "Published")}
                                                    className={`p-2 rounded-lg transition-all ${item.status === "Published" ? "bg-white text-[#146c43] shadow-sm" : "text-slate-300 hover:text-slate-500"}`}
                                                    title="Set as Published"
                                                >
                                                    <CheckCircle2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(item.id, "Draft")}
                                                    className={`p-2 rounded-lg transition-all ${item.status === "Draft" ? "bg-white text-orange-500 shadow-sm" : "text-slate-300 hover:text-slate-500"}`}
                                                    title="Set as Draft"
                                                >
                                                    <Clock size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(item.id, "Hidden")}
                                                    className={`p-2 rounded-lg transition-all ${item.status === "Hidden" ? "bg-white text-slate-600 shadow-sm" : "text-slate-300 hover:text-slate-500"}`}
                                                    title="Hide Announcement"
                                                >
                                                    <EyeOff size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredAnnouncements.length === 0 && (
                        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <AlertCircle size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-slate-800 font-extrabold text-xl mb-1">No announcements found</h3>
                            <p className="text-slate-400 font-medium">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            ) : (
                /* --- Scrolling Banner Section --- */
                <div className="max-w-9xl mx-auto space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-xl font-extrabold text-[#0a1910] mb-2">Homecoming Scrolling Banner</h2>
                        <p className="text-slate-500 font-medium text-sm mb-8">Add or remove spotlight messages that scroll across the top of the landing page.</p>

                        {/* Input Area */}
                        <div className="flex gap-3 mb-10">
                            <div className="flex-1 relative group">
                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#146c43] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter short banner message (e.g., Save the Date: reunion...)"
                                    value={newBannerMsg}
                                    onChange={(e) => setNewBannerMsg(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddBanner()}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#146c43]/10 focus:border-[#146c43] transition-all"
                                />
                            </div>
                            <button
                                onClick={handleAddBanner}
                                className="bg-[#146c43] text-white px-8 rounded-2xl font-bold flex items-center justify-center hover:bg-[#0f5233] transition-all"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {/* Message List */}
                        <div className="space-y-3">
                            <AnimatePresence initial={false}>
                                {bannerMessages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group"
                                    >
                                        <div className="text-slate-300 cursor-grab active:cursor-grabbing">
                                            <GripVertical size={18} />
                                        </div>
                                        <p className="flex-1 text-slate-700 font-semibold text-sm">{msg}</p>
                                        <button
                                            onClick={() => handleRemoveBanner(index)}
                                            className="opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {bannerMessages.length === 0 && (
                            <div className="py-12 text-center text-slate-300 text-sm font-bold border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                No messages in rotation.
                            </div>
                        )}
                    </div>

                    {/* Preview (Simulated) */}
                    <div className="p-8 bg-[#0a1910] rounded-3xl border border-white/5 relative overflow-hidden h-32 flex items-center">
                        <div className="absolute top-4 left-6 text-white/20 text-[10px] uppercase font-bold tracking-widest">Front-end Preview</div>
                        <div className="whitespace-nowrap flex gap-16 animate-marquee">
                            {bannerMessages.length > 0 ? (
                                [...bannerMessages, ...bannerMessages].map((msg, i) => (
                                    <span key={i} className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-4">
                                        {msg}
                                    </span>
                                ))
                            ) : (
                                <span className="text-white/30 font-bold text-sm tracking-widest italic flex items-center gap-4">
                                    Queue is empty...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- Announcement Create/Edit Modal --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl shadow-black/25"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 shrink-0 flex items-center justify-between bg-white z-10">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-[#0a1910] leading-tight flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-[#146c43]/10 flex items-center justify-center text-[#146c43]">
                                            <Megaphone size={20} />
                                        </div>
                                        {editingItem ? "Edit Announcement" : "Draft New Announcement"}
                                    </h2>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 ml-13">ID: {editingItem?.id || 'NEW ARTICLE'}</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="overflow-y-auto flex-1 px-8 py-8 space-y-8 bg-[#fafbfc]">
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                                    {/* Left Column: Metadata & Image */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#146c43] mb-2 block ml-1">Article Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="Enter headline..."
                                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-extrabold text-slate-800 outline-none focus:border-[#146c43] transition-all shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1 flex items-center gap-1.5"><UploadCloud size={12} /> Banner Image</label>
                                            <div
                                                onClick={() => document.getElementById('announcement-upload').click()}
                                                className="relative group cursor-pointer aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-white overflow-hidden hover:border-[#146c43] hover:bg-[#f8fdf9] transition-all flex flex-col items-center justify-center p-4 text-center"
                                            >
                                                {formData.image ? (
                                                    <>
                                                        <img src={formData.image} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                                        <div className="relative bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-xl group-hover:scale-110 transition-transform">
                                                            Change Image
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 group-hover:bg-white group-hover:text-[#146c43] transition-all">
                                                            <Plus size={24} />
                                                        </div>
                                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Click to upload image</p>
                                                    </>
                                                )}
                                                <input type="file" id="announcement-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Category</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:border-[#146c43] shadow-sm cursor-pointer"
                                                >
                                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Author</label>
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 shadow-sm cursor-pointer"
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Published">Published</option>
                                                <option value="Hidden">Hidden</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Excerpt (Summary)</label>
                                            <textarea
                                                rows={4}
                                                value={formData.excerpt}
                                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                placeholder="A short teaser..."
                                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-600 outline-none focus:border-[#146c43] resize-none shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Structured Block Editor */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#146c43] flex items-center gap-2">
                                                <FileText size={14} /> Structured Content Blocks
                                            </label>
                                            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                                <button onClick={() => addBlock(-1, 'paragraph')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#146c43]/10 text-[#146c43] text-[10px] font-bold uppercase tracking-wider hover:bg-[#146c43]/20 transition-colors">
                                                    <Type size={12} /> + Para
                                                </button>
                                                <button onClick={() => addBlock(-1, 'heading')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-100 transition-colors">
                                                    <ChevronRight size={12} /> + Headline
                                                </button>
                                                <button onClick={() => addBlock(-1, 'list')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
                                                    <List size={12} /> + List
                                                </button>
                                                <button onClick={() => addBlock(-1, 'blockquote')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors">
                                                    <Quote size={12} /> + Quote
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {formData.content.map((block, index) => (
                                                <div key={index} className="relative group/block bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-[#146c43]/30 transition-all">
                                                    {/* Block Header/Tools */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-100 italic">
                                                                {block.type}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity">
                                                            <button onClick={() => moveBlock(index, 'up')} className="p-1.5 rounded-md hover:bg-slate-50 text-slate-300 hover:text-[#146c43]"> <ArrowUp size={14} /> </button>
                                                            <button onClick={() => moveBlock(index, 'down')} className="p-1.5 rounded-md hover:bg-slate-50 text-slate-300 hover:text-[#146c43]"> <ArrowDown size={14} /> </button>
                                                            <button onClick={() => removeBlock(index)} className="p-1.5 rounded-md hover:bg-red-50 text-slate-300 hover:text-red-500"> <Trash2 size={14} /> </button>
                                                        </div>
                                                    </div>

                                                    {/* Block Input Routing */}
                                                    {block.type === 'paragraph' && (
                                                        <textarea
                                                            placeholder="Start typing your paragraph..."
                                                            value={block.value}
                                                            onChange={(e) => updateBlock(index, e.target.value)}
                                                            className="w-full text-sm font-medium text-slate-700 outline-none min-h-[80px] border-none resize-none px-1"
                                                            style={{ fontStyle: 'serif' }}
                                                        />
                                                    )}

                                                    {block.type === 'heading' && (
                                                        <input
                                                            placeholder="Main Headline..."
                                                            value={block.value}
                                                            onChange={(e) => updateBlock(index, e.target.value)}
                                                            className="w-full text-lg font-extrabold text-[#0a1910] outline-none border-b border-transparent focus:border-[#146c43]/20 pb-1"
                                                        />
                                                    )}

                                                    {block.type === 'blockquote' && (
                                                        <div className="space-y-3 pl-4 border-l-4 border-[#146c43]/20">
                                                            <textarea
                                                                placeholder="Important quote..."
                                                                value={block.value}
                                                                onChange={(e) => updateBlock(index, e.target.value, block.footer)}
                                                                className="w-full text-sm italic font-medium text-slate-700 outline-none border-none resize-none bg-transparent"
                                                            />
                                                            <input
                                                                placeholder="Author of the quote..."
                                                                value={block.footer || ""}
                                                                onChange={(e) => updateBlock(index, block.value, e.target.value)}
                                                                className="w-full text-[11px] font-bold uppercase tracking-widest text-[#146c43] outline-none bg-transparent"
                                                            />
                                                        </div>
                                                    )}

                                                    {block.type === 'list' && (
                                                        <div className="space-y-2">
                                                            {block.value.map((item, iIndex) => (
                                                                <div key={iIndex} className="flex gap-2 items-start group/li">
                                                                    <div className="w-4 h-4 rounded-full bg-[#146c43]/10 flex-shrink-0 mt-1 flex items-center justify-center text-[#146c43] text-[10px] font-bold">•</div>
                                                                    <input
                                                                        placeholder="List item..."
                                                                        value={item}
                                                                        onChange={(e) => {
                                                                            const newList = [...block.value];
                                                                            newList[iIndex] = e.target.value;
                                                                            updateBlock(index, newList);
                                                                        }}
                                                                        className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            const newList = block.value.filter((_, idx) => idx !== iIndex);
                                                                            updateBlock(index, newList);
                                                                        }}
                                                                        className="opacity-0 group-hover/li:opacity-100 p-1 text-slate-300 hover:text-red-400"
                                                                    >
                                                                        <X size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => updateBlock(index, [...block.value, ""])}
                                                                className="text-[#146c43] text-xs font-bold hover:underline flex items-center gap-1 mt-2"
                                                            >
                                                                <Plus size={12} /> Add point
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Inline Add Option */}
                                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/block:opacity-100 transition-opacity flex gap-1 z-10">
                                                        <button onClick={() => addBlock(index, 'paragraph')} className="w-6 h-6 rounded-full bg-white shadow border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#146c43] hover:scale-110 transition-all"><Type size={12} /></button>
                                                        <button onClick={() => addBlock(index, 'heading')} className="w-6 h-6 rounded-full bg-white shadow border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:scale-110 transition-all"><ChevronRight size={12} /></button>
                                                        <button onClick={() => addBlock(index, 'list')} className="w-6 h-6 rounded-full bg-white shadow border border-slate-100 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:scale-110 transition-all"><List size={12} /></button>
                                                        <button onClick={() => addBlock(index, 'blockquote')} className="w-6 h-6 rounded-full bg-white shadow border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:scale-110 transition-all"><Quote size={12} /></button>
                                                    </div>
                                                </div>
                                            ))}

                                            {formData.content.length === 0 && (
                                                <div className="py-12 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-300 italic text-sm">
                                                    No content added yet. Start with a paragraph!
                                                    <button onClick={() => addBlock(-1, 'paragraph')} className="px-4 py-2 bg-[#146c43] text-white rounded-xl not-italic font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#146c43]/10">Add First Block</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-5 border-t border-slate-100 bg-white shrink-0 flex items-center justify-between">
                                <div className="text-slate-300 text-xs font-bold uppercase tracking-widest hidden sm:block">
                                    Last Edited: {new Date().toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-3 ml-auto">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-[#146c43] text-white px-10 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#146c43]/20 hover:bg-[#0f5233] transition-all transform hover:-translate-y-0.5 active:scale-95"
                                    >
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: inline-flex;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default AdminAnnouncements;