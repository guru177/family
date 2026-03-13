import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const AnnouncementCard = ({ news, index }) => {
  const resolveImage = (img) => {
    if (!img) return null;
    if (typeof img === 'string' && img.startsWith('/uploads')) return `http://localhost:5000${img}`;
    return img;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(20,108,67,0.08)] hover:-translate-y-1 border border-[#146c43]/5 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Section */}
      <Link to={`/announcements/${news.slug}`} className="w-full relative overflow-hidden aspect-video block">
        <div className="absolute inset-0 bg-[#0a1910]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
        <img
          src={resolveImage(news.image)}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/50">
          <span className="text-[#146c43] font-bold text-[10px] uppercase tracking-[0.2em]">{news.category}</span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[#050505]/50 text-xs font-bold uppercase tracking-widest mb-4">
          <Clock size={14} className="text-[#b8db6e]" />
          <span>{news.date}</span>
        </div>

        <Link to={`/announcements/${news.slug}`} className="group/title">
          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#050505] mb-4 leading-snug group-hover/title:text-[#146c43] transition-colors line-clamp-2">
            {news.title}
          </h3>
        </Link>

        <p className="text-[#050505]/70 text-base leading-relaxed font-body mb-8 line-clamp-3">
          {news.excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-[#146c43]/10">
          <Link
            to={`/announcements/${news.slug}`}
            className="inline-flex items-center gap-2 text-[#146c43] font-bold uppercase tracking-widest text-xs group/link"
          >
            Read Full Story
            <div className="bg-[#146c43]/10 p-1.5 rounded-full text-[#146c43] group-hover/link:bg-[#146c43] group-hover/link:text-white transition-colors">
              <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default AnnouncementCard;
