import React, { useState, useEffect } from 'react';
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
import { 
  fetchGalleryItems, 
  createGalleryItem, 
  updateGalleryItem,
  deleteGalleryItem 
} from '../../services/api';

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ file: null, preview: null, alt: '' });
  const [isAddingInModal, setIsAddingInModal] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const { data } = await fetchGalleryItems();
      setGalleryItems(data.map(item => ({ ...item, isModified: false })));
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setIsLoading(false);
    }
  };

  const handleItemChange = (id, field, value) => {
    setGalleryItems(galleryItems.map(item => 
      item._id === id ? { ...item, [field]: value, isModified: true } : item
    ));
  };

  const handleImageUpload = async (id, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setGalleryItems(galleryItems.map(item => 
        item._id === id ? { ...item, src: imageUrl, file, isModified: true } : item
      ));
    }
  };

  const handleAddImageInModal = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewItem({
        ...newItem,
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleSaveIndividual = async (id) => {
    const item = galleryItems.find(i => i._id === id);
    if (!item) return;

    console.log('Saving Individual Item ID:', id);
    setIsSaving(true);
    try {
      const formData = new FormData();
      if (item.file) {
        formData.append('image', item.file);
      } else {
        formData.append('src', item.src);
      }
      formData.append('alt', item.alt || '');
      
      await updateGalleryItem(item._id, formData);
      await loadGallery();
      alert('Memory updated selectively!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating memory');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNew = async () => {
    if (!newItem.file) return alert('Please select an image');
    
    setIsAddingInModal(true);
    try {
      const formData = new FormData();
      formData.append('image', newItem.file);
      formData.append('alt', newItem.alt);
      await createGalleryItem(formData);
      setIsModalOpen(false);
      setNewItem({ file: null, preview: null, alt: '' });
      await loadGallery();
    } catch (err) {
      alert('Error creating memory');
    } finally {
      setIsAddingInModal(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGalleryItem(id);
      setGalleryItems(galleryItems.filter(item => item._id !== id));
    } catch (err) {
      alert('Error deleting item');
    }
  };

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Gallery Manager</h1>
          <p className="text-slate-400 mt-1 text-sm">Organize community memories in a 4-column high-density grid</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <Layout size={20} />
            </div>
            <h2 className="font-bold text-slate-800 text-lg">Total Memories ({galleryItems.length})</h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-900/20"
          >
            <Plus size={18} /> Add New Memory
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Syncing Cloud Vault...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center gap-6 opacity-30 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                <ImageIcon size={48} className="text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-800 font-extrabold text-xl">No Memories Found</p>
                <p className="text-slate-400 text-sm">Your gallery is currently empty.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => (
                <div key={item._id} className="group relative bg-[#fcfdfe] rounded-[24px] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
                  {/* Image Card */}
                  <div className="aspect-square relative overflow-hidden bg-slate-200">
                    <img 
                      src={item.src.startsWith('http') || item.src.startsWith('blob') || item.src.startsWith('/uploads') ? (item.src.startsWith('/uploads') ? `http://localhost:5000${item.src}` : item.src) : item.src} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={item.alt} 
                    />
                    
                    {/* Status/Index Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Quick Delete */}
                    <button 
                      onClick={() => { if(window.confirm('Delete this memory?')) handleDelete(item._id); }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-xl shadow-xl transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Settings Panel */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <input 
                        type="text"
                        value={item.alt}
                        onChange={(e) => handleItemChange(item._id, 'alt', e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#b8db6e]/30 focus:border-[#b8db6e] transition-all"
                        placeholder="Memory caption..."
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="p-2 cursor-pointer bg-slate-50 border border-slate-100 hover:border-emerald-500 rounded-xl text-slate-400 hover:text-emerald-500 transition-all">
                        <Upload size={14} />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(item._id, e)} />
                      </label>
                      {item.isModified && (
                        <button 
                          onClick={() => handleSaveIndividual(item._id)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-900/10"
                        >
                          <Save size={12} /> Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add New Memory Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !isAddingInModal && setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h2 className="font-extrabold text-xl text-slate-800 flex items-center gap-2">
                  <Plus className="text-emerald-600" /> New Memory
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Upload Zone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Image</label>
                  {!newItem.preview ? (
                    <label className="flex flex-col items-center justify-center gap-4 w-full h-48 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all cursor-pointer group">
                      <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all">
                        <Upload size={24} />
                      </div>
                      <p className="text-xs font-bold text-slate-400 group-hover:text-emerald-700">Click to upload photo</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleAddImageInModal} />
                    </label>
                  ) : (
                    <div className="relative w-full h-48 rounded-[32px] overflow-hidden group">
                      <img src={newItem.preview} className="w-full h-full object-cover" alt="Preview" />
                      <button 
                        onClick={() => setNewItem({ ...newItem, file: null, preview: null })}
                        className="absolute top-4 right-4 p-2 bg-white/90 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Caption / Alt Text</label>
                  <input 
                    type="text"
                    value={newItem.alt}
                    onChange={(e) => setNewItem({ ...newItem, alt: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#b8db6e]/30 focus:border-[#b8db6e] transition-all"
                    placeholder="Briefly describe this memory..."
                  />
                </div>

                <button 
                  onClick={handleCreateNew}
                  disabled={!newItem.file || isAddingInModal}
                  className="w-full py-5 bg-[#0f3d2e] hover:bg-[#1a6348] text-[#b8db6e] font-extrabold rounded-[24px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/20 disabled:opacity-50"
                >
                  {isAddingInModal ? (
                    <div className="w-5 h-5 border-2 border-[#b8db6e]/30 border-t-[#b8db6e] rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {isAddingInModal ? 'Preserving Memory...' : 'Save Selectively'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Optimized Instruction */}
      <div className="bg-[#0f3d2e] rounded-[40px] p-10 text-emerald-50 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-16 h-16 bg-white/10 rounded-[20px] backdrop-blur-md flex items-center justify-center shrink-0">
            <Layout size={32} className="text-[#b8db6e]" />
          </div>
          <div>
            <h4 className="font-extrabold text-2xl mb-2">High-Density 4-Column Grid</h4>
            <p className="text-emerald-100/60 text-sm max-w-2xl leading-relaxed">
              Your gallery now supports a compact 4-column layout for maximum visibility. Multi-step saving is gone—simply save each memory individually for precise control.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8db6e]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default AdminGallery;