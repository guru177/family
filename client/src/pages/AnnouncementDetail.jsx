import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Printer, Bookmark, AlertCircle } from 'lucide-react';
import CallToAction from '../components/layout/CallToAction';

import bg3 from '../assets/img/hero3.jpg';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from localStorage
    const saved = localStorage.getItem('admin_announcements');
    if (saved) {
      const announcements = JSON.parse(saved);
      const found = announcements.find(a => a.id === parseInt(id) || a.id === id);
      if (found) {
        setArticle(found);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#f8fdf9] flex items-center justify-center pt-32">
        <div className="w-12 h-12 border-4 border-[#146c43]/20 border-t-[#146c43] rounded-full animate-spin"></div>
    </div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8fdf9] flex flex-col items-center justify-center pt-32 px-6">
        <AlertCircle size={48} className="text-slate-300 mb-4" />
        <h1 className="text-2xl font-extrabold text-[#0a1910] mb-2">Announcement Not Found</h1>
        <p className="text-slate-500 mb-8">The article you are looking for doesn't exist or has been removed.</p>
        <Link to="/announcements" className="bg-[#146c43] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-[#146c43]/20">
          Back to Announcements
        </Link>
      </div>
    );
  }

  // Helper to render content blocks
  const renderContent = () => {
    if (!article.content || !Array.isArray(article.content)) return null;

    return article.content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} 
               className={`${index === 0 ? 'first-letter:text-7xl first-letter:font-heading first-letter:font-extrabold first-letter:text-[#146c43] first-letter:float-left first-letter:mr-4 first-letter:mt-2' : ''} text-lg md:text-xl leading-relaxed mb-8 text-[#050505]/80 font-serif`}>
              {block.value}
            </p>
          );
        
        case 'heading':
          return (
            <h3 key={index} className="text-2xl md:text-3xl font-heading font-extrabold text-[#050505] mb-6 mt-12">
              {block.value}
            </h3>
          );

        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-[#146c43] pl-6 md:pl-10 my-12 py-2 italic">
              <p className="text-2xl md:text-3xl font-heading font-medium text-[#0a1910] leading-snug">
                "{block.value}"
              </p>
              {block.footer && (
                <footer className="mt-4 text-sm font-bold uppercase tracking-widest text-[#146c43]">
                  — {block.footer}
                </footer>
              )}
            </blockquote>
          );

        case 'list':
          return (
            <div key={index} className="bg-[#f8fdf9] border border-[#146c43]/10 p-8 md:p-10 rounded-3xl my-12 shadow-sm">
              <ul className="list-disc list-inside space-y-3 text-[#050505]/70 font-body text-base md:text-lg">
                {block.value.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className="w-full bg-[#f8fdf9] min-h-screen flex flex-col pt-24 md:pt-32 font-body">

      {/* Top Navigation Bar for Reading */}
      <div className="w-full border-b border-[#050505]/5 bg-white sticky top-20 z-40 hidden md:block shadow-sm">
        <div className="max-w-9xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/announcements" className="flex items-center gap-2 text-[#050505]/60 hover:text-[#146c43] font-semibold text-sm transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-[#146c43] transition-colors"><Bookmark size={18}/></button>
            <button className="text-slate-400 hover:text-[#146c43] transition-colors"><Share2 size={18}/></button>
            <button className="text-slate-400 hover:text-[#146c43] transition-colors" onClick={() => window.print()}><Printer size={18}/></button>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-9xl mx-auto px-6 py-12 md:py-16 w-full">

        {/* Newspaper Header */}
        <header className="mb-10 md:mb-14 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#146c43] pb-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-[#050505]/60 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              <span className="text-[#146c43] font-extrabold">{article.category}</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center justify-center md:justify-start gap-1"><Clock size={12} /> {article.readTime || '5 min read'}</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#050505]/40">
              Published: {article.date}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-[#050505] leading-[1.1] tracking-tight mb-8"
          >
            {article.title}
          </motion.h1>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#146c43]/10 flex items-center justify-center text-[#146c43] font-extrabold text-xl shadow-inner border border-[#146c43]/20 uppercase">
              {article.author ? article.author.charAt(0) : 'A'}
            </div>
            <div className="text-left">
              <div className="font-extrabold text-[#050505] text-sm md:text-base">{article.author || 'Family Admin'}</div>
              <div className="text-xs text-[#050505]/50 font-semibold uppercase tracking-widest">Official Press</div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {article.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-video md:aspect-[21/9] rounded-xl md:rounded-3xl overflow-hidden mb-12 shadow-xl border border-[#050505]/5"
          >
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* Newspaper Body Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose-lg max-w-none text-[#050505]"
        >
          {renderContent()}
        </motion.article>

        <hr className="my-16 border-[#050505]/10" />

      </main>

      <CallToAction />
    </div>
  );
};

export default AnnouncementDetail;
