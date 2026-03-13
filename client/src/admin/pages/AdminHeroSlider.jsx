import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Type, 
  ImageIcon, 
  Save, 
  Play, 
  Settings, 
  Layout, 
  ChevronDown, 
  ChevronUp,
  Upload,
  Monitor,
  Smartphone,
  Maximize,
  X
} from 'lucide-react';
import HeroSlider from '../../components/layout/HeroSlider';

// Import default images to use as placeholders/defaults
import bg1 from '../../assets/img/hero1.jpg';
import bg2 from '../../assets/img/hero2.jpg';
import bg3 from '../../assets/img/hero3.jpg';

const AdminHeroSlider = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Family Reunion",
      subtitle: "Connect",
      description: "Celebrate our heritage and create lasting memories at our annual family gathering. A time to bond, share stories, and grow together.",
      image: bg1,
    },
    {
      id: 2,
      title: "Community Impact",
      subtitle: "Purpose",
      description: "Join hands as we support each other through our community initiatives. Together, we build a stronger and more vibrant future for everyone.",
      image: bg2,
    },
    {
      id: 3,
      title: "Honoring Legacy",
      subtitle: "History",
      description: "Remember the roots that keep us grounded. Discover the journey of our ancestors and the timeless values that define us today.",
      image: bg3,
    }
  ]);

  const [autoPlayInterval, setAutoPlayInterval] = useState(8000);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSlideId, setExpandedSlideId] = useState(1);
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [isFullView, setIsFullView] = useState(false);

  const handleSlideChange = (id, field, value) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      handleSlideChange(id, 'image', imageUrl);
    }
  };

  // handleAddSlide and handleRemoveSlide removed as per requirement

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Hero Slider settings saved successfully! (Frontend only demo)');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Hero Slider Management</h1>
          <p className="text-slate-400 mt-1 text-sm">Customize the homepage cinematic slider, text content, and animations</p>
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

      <div className="grid grid-cols-1 2xl:grid-cols-5 gap-6">
        {/* Editor Side */}
        <div className="2xl:col-span-2 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* General Settings */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={18} className="text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-lg">Rotation Settings</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-500 mb-1.5">Auto-play Interval (ms)</label>
                <input
                  type="number"
                  value={autoPlayInterval}
                  onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none text-slate-600 font-medium focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="mt-6 flex items-center gap-1.5 px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm shrink-0">
                <Play size={16} /> {(autoPlayInterval / 1000).toFixed(1)}s
              </div>
            </div>
          </div>

          {/* Slides List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Layout size={18} className="text-emerald-600" />
                Slides ({slides.length})
              </h2>
            </div>

            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 ${expandedSlideId === slide.id ? 'border-emerald-200 shadow-md ring-1 ring-emerald-50' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}
                >
                  {/* Slide Header (Summary) */}
                  <div 
                    className="flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => setExpandedSlideId(expandedSlideId === slide.id ? null : slide.id)}
                  >
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img src={slide.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mb-1">Slide {index + 1}</p>
                      <h3 className="font-bold text-slate-700 truncate text-sm">{slide.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedSlideId === slide.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedSlideId === slide.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-slate-50 space-y-4">
                          {/* Image Upload */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Slide Image</label>
                            <div className="relative group">
                              <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                                <img src={slide.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Slide preview" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <label className="cursor-pointer bg-white text-slate-800 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-[#b8db6e] transition-colors">
                                    <Upload size={14} /> Change Image
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(slide.id, e)} />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Subtitle */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Subtitle</label>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-1 pr-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                              <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Play size={14} className="text-emerald-500" />
                              </div>
                              <input 
                                type="text"
                                value={slide.subtitle}
                                onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                                className="flex-1 bg-transparent py-2.5 outline-none text-sm font-bold text-slate-600"
                                placeholder="Subtitle (History, Connect, etc.)"
                              />
                            </div>
                          </div>

                          {/* Title */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Main Title</label>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-1 pr-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                              <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Type size={14} className="text-emerald-500" />
                              </div>
                              <input 
                                type="text"
                                value={slide.title}
                                onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                                className="flex-1 bg-transparent py-2.5 outline-none text-sm font-bold text-slate-600 uppercase"
                                placeholder="Main Cinematic Title"
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium pl-1 italic">Note: The title is automatically split into two lines after the first word.</p>
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                            <textarea 
                              value={slide.description}
                              onChange={(e) => handleSlideChange(slide.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none text-sm font-medium text-slate-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                              placeholder="Brief description of the slide content..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="2xl:col-span-3">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-4 md:p-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <div>
                  <h2 className="font-bold text-slate-800 text-xl">Cinematic Live Preview</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Real-time simulation of the homepage Hero section</p>
                </div>
              </div>
              
              <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${previewMode === 'desktop' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Monitor size={14} /> Desktop
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${previewMode === 'mobile' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
              </div>

              <button 
                onClick={() => setIsFullView(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold text-xs hover:bg-emerald-100 transition-all"
              >
                <Maximize size={14} /> Full View
              </button>
            </div>
            
            <div className={`flex-1 flex items-center justify-center bg-slate-50/50 rounded-[32px] border border-slate-100 p-4 md:p-8 min-h-[400px]`}>
              <div 
                className={`relative overflow-hidden border border-slate-200 shadow-2xl bg-[#050505] transition-all duration-500 ease-in-out group ${
                  previewMode === 'mobile' 
                    ? 'w-[375px] h-[667px] rounded-[40px] border-[10px] border-slate-800' 
                    : 'w-full aspect-video rounded-[32px]'
                }`}
              >
                {!isFullView && (
                  <div className="w-full h-full transform scale-[1] origin-center">
                    <HeroSlider 
                      sliderData={slides} 
                      autoPlayInterval={autoPlayInterval} 
                      forceMobile={previewMode === 'mobile'}
                    />
                  </div>
                )}

                {/* Preview UI Overlay */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b8db6e]" />
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                    {previewMode === 'desktop' ? 'Desktop View' : 'Mobile View'}
                  </span>
                </div>

                {previewMode === 'mobile' && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50" />
                )}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                 <h4 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
                   <Play size={14} /> Auto-Rotation Active
                 </h4>
                 <p className="text-xs text-emerald-800/70 font-medium leading-relaxed">
                   The preview cycles through your slides every <strong>{(autoPlayInterval / 1000).toFixed(1)} seconds</strong>. 
                 </p>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                 <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                   <Layout size={14} /> Full View Tip
                 </h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">
                   Click <strong>Full View</strong> to see the slider in its true cinematic scale. Use the toggle to ensure content is centered on mobile.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full View Cinematic Modal */}
      <AnimatePresence>
        {isFullView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <div className="absolute top-8 right-8 z-[110] flex items-center gap-4">
               {/* Device Toggle in Full View */}
               <div className="flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${previewMode === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                >
                  <Monitor size={14} /> Desktop
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${previewMode === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
              </div>

              <button 
                onClick={() => setIsFullView(false)}
                className="p-4 bg-white/10 hover:bg-red-500/20 text-white hover:text-white rounded-full transition-all border border-white/10 backdrop-blur-md group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="w-full h-full flex items-center justify-center p-0 md:p-12 overflow-hidden">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 className={`relative shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-700 ease-in-out ${
                   previewMode === 'mobile' 
                     ? 'w-[375px] h-[667px] md:h-[812px] rounded-[60px] border-[12px] border-slate-900 ring-4 ring-white/5' 
                     : 'w-full h-full'
                 }`}
               >
                 <HeroSlider 
                    sliderData={slides} 
                    autoPlayInterval={autoPlayInterval} 
                    forceMobile={previewMode === 'mobile'}
                  />
                 
                 {previewMode === 'mobile' && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-50" />
                 )}
               </motion.div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[4px]">Full Cinematic Preview Mode</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHeroSlider;
