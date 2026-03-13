import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Layout, 
  ChevronDown, 
  ChevronUp,
  Upload,
  Type
} from 'lucide-react';

// Import default images to use as placeholders/defaults
import bg1 from '../../assets/img/hero1.jpg';
import bg2 from '../../assets/img/hero2.jpg';
import bg3 from '../../assets/img/hero3.jpg';
import banner from '../../assets/img/banner.jpg';

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, src: bg1, alt: "Family Reunion 2025" },
    { id: 2, src: banner, alt: "Annual Meetup" },
    { id: 3, src: bg2, alt: "Community Project" },
    { id: 4, src: bg3, alt: "Heritage Celebration" },
    { id: 5, src: banner, alt: "Holiday Gala" },
    { id: 6, src: bg1, alt: "Summer Picnic" }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(1);

  const handleItemChange = (id, field, value) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      handleItemChange(id, 'src', imageUrl);
    }
  };

  const handleAddImage = () => {
    const newId = galleryItems.length > 0 ? Math.max(...galleryItems.map(i => i.id)) + 1 : 1;
    const newItem = {
      id: newId,
      src: bg1, 
      alt: "New Gallery Image"
    };
    setGalleryItems([...galleryItems, newItem]);
    setExpandedItemId(newId);
  };

  const handleRemoveImage = (id) => {
    const itemToRemove = galleryItems.find(i => i.id === id);
    if (itemToRemove.src && itemToRemove.src.startsWith('blob:')) {
      URL.revokeObjectURL(itemToRemove.src);
    }
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Gallery settings saved! The gallery will automatically adjust to 3 images per row.');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Unified Gallery Manager</h1>
          <p className="text-slate-400 mt-1 text-sm">Control images for the 3-column community gallery</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f3d2e] text-white font-bold hover:bg-[#1a6348] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/10"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Layout size={18} className="text-emerald-600" />
            <h2 className="font-bold text-slate-800">Gallery Items ({galleryItems.length})</h2>
          </div>
          <button 
            onClick={handleAddImage}
            className="flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-900/10"
          >
            <Plus size={16} /> Add New Image
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="transition-all">
              <div 
                className={`flex items-center gap-6 p-6 cursor-pointer hover:bg-slate-50/50 ${expandedItemId === item.id ? 'bg-emerald-50/30' : ''}`}
                onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
              >
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={item.src} className="w-full h-full object-cover" alt="" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Item {index + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Automatic Layout
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-700 truncate">{item.alt}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemoveImage(item.id); }}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="p-2.5 text-slate-300 bg-white border border-slate-100 rounded-xl shadow-sm">
                    {expandedItemId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedItemId === item.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50/30"
                  >
                    <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Image Upload */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Image Source</label>
                        <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-white p-2">
                          <img src={item.src} className="w-full h-48 object-cover rounded-xl" alt="Preview" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                            <p className="text-white text-[10px] font-bold uppercase tracking-widest text-center">High resolution recommended</p>
                            <label className="cursor-pointer bg-white text-slate-800 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#b8db6e] transition-all transform translate-y-2 group-hover:translate-y-0">
                              <Upload size={14} /> Upload New Photo
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alt Text / Description</label>
                          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all shadow-sm">
                            <div className="bg-emerald-50 p-2.5 rounded-lg">
                              <Type size={16} className="text-emerald-600" />
                            </div>
                            <input 
                              type="text"
                              value={item.alt}
                              onChange={(e) => handleItemChange(item.id, 'alt', e.target.value)}
                              className="flex-1 bg-transparent py-2 outline-none text-sm font-bold text-slate-600"
                              placeholder="Describe this memory..."
                            />
                          </div>
                        </div>

                        <div className="p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block mb-2">Layout Sync</span>
                          <p className="text-xs text-emerald-800/60 leading-relaxed font-medium">
                            This image will appear in a clean, automatic 3-column grid on both the Homepage and full Gallery page. No manual layout adjustment needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="bg-[#0f4d38] rounded-3xl p-8 text-emerald-50 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <Layout size={32} />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-1">Simplified 3-Column Grid</h4>
            <p className="text-emerald-100/70 text-sm max-w-2xl">
              Manual grid spans have been removed to ensure a clean, consistent 3-column layout everywhere. The images will automatically flow and adjust to fill the rows.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default AdminGallery;