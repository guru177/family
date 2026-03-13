import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, Save, Play, Settings, AlertCircle } from 'lucide-react';
import ImageBanner from '../../components/imagebanner/ImageBanner';
import { fetchBanners, createBanner, deleteBanner } from '../../services/api';

const AdminBanners = () => {
  const [images, setImages] = useState([]);
  const [banners, setBanners] = useState([]); // Store full banner objects from DB
  const [autoPlayInterval, setAutoPlayInterval] = useState(5000);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const { data } = await fetchBanners();
      setBanners(data);
      // Map to just src for the preview component
      setImages(data.map(b => b.src));
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading banners:', err);
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setIsSaving(true);
        try {
          const formData = new FormData();
          formData.append('image', file);
          await createBanner(formData);
          await loadBanners(); // Refresh list
        } catch (err) {
          console.error('Error uploading banner:', err);
          alert('Error uploading banner');
        } finally {
          setIsSaving(false);
        }
      } else {
        alert('Please select an image file (PNG, JPG, etc.)');
      }
    }
  };

  const handleRemoveImage = async (id) => {
    if (!window.confirm('Are you sure you want to remove this banner?')) return;
    
    try {
      await deleteBanner(id);
      await loadBanners();
    } catch (err) {
      console.error('Error removing banner:', err);
      alert('Error removing banner');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Banner Management</h1>
          <p className="text-slate-400 mt-1 text-sm">Upload homepage banners and customize rotation settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Settings & List */}
        <div className="xl:col-span-1 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings size={18} className="text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-lg">General Settings</h2>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-1.5">Auto-play Interval (ms)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={autoPlayInterval}
                  onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none text-slate-600 font-medium focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g. 5000"
                />
                <div className="flex items-center gap-1.5 px-3 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs shrink-0">
                  <Play size={14} /> {(autoPlayInterval / 1000).toFixed(1)}s
                </div>
              </div>
            </div>

            {/* Resolution Note */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">Upload Guide</p>
                <p className="text-[11px] text-amber-800/80 font-medium leading-relaxed">
                  For optimal display, please use images with a resolution of <span className="font-bold text-amber-900">1750 × 600</span> pixels.
                </p>
              </div>
            </div>
          </div>

          {/* Banner Images List */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-lg">Banner Images</h2>
            </div>

            <div className="relative">
              <input
                type="file"
                id="banner-upload"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="banner-upload"
                className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-slate-50 group-hover:bg-emerald-100 transition-colors mb-2">
                    <Plus size={24} className="text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-700">Upload New Banner</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</span>
                </div>
              </label>
            </div>

            <div className="space-y-3 mt-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 border-3 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Loading...</p>
                </div>
              ) : banners.map((img, idx) => (
                <div key={img._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                  <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                    <img src={`http://localhost:5000${img.src}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Slide {idx + 1}</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{img.src.split('/').pop()}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveImage(img._id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {!isLoading && banners.length === 0 && (
                <div className="text-center py-8 text-slate-300">
                  <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm font-medium">No images added</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="font-bold text-slate-800 text-lg">Live Preview</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-full">Frontend Component</span>
            </div>
            
            <div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center min-h-[400px]">
              <div className="w-full transform scale-90 origin-top">
                <ImageBanner images={images} autoPlayInterval={autoPlayInterval} />
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
               <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                 <span className="font-bold">Note:</span> This preview uses the actual `ImageBanner` component from your website. 
                 Changes reflect instantly as you upload or remove banners.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
