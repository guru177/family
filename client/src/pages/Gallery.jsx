import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, X } from 'lucide-react';
import axios from 'axios';
import CallToAction from '../components/layout/CallToAction';
import HeroSection from '../components/layout/HeroSection';

// Existing local images
import bg1 from '../assets/img/hero1.jpg';
import bg2 from '../assets/img/hero2.jpg';
import bg3 from '../assets/img/hero3.jpg';
import banner from '../assets/img/banner.jpg';

const defaultGalleryImages = [
  { src: bg1, alt: "Family Reunion 2025", span: "md:col-span-2 md:row-span-2" },
  { src: bg2, alt: "Community Project", span: "col-span-1" },
  { src: bg3, alt: "Heritage Celebration", span: "col-span-1" },
  { src: banner, alt: "Annual Meetup", span: "md:col-span-2" },
  { src: bg2, alt: "Charity Drive", span: "col-span-1" },
  { src: bg1, alt: "Summer Picnic", span: "col-span-1" },
  { src: bg3, alt: "Award Ceremony", span: "md:col-span-2" },
  { src: banner, alt: "Holiday Gala", span: "col-span-1" },
  { src: bg1, alt: "Workshop", span: "col-span-1" },
  { src: bg1, alt: "Workshop", span: "col-span-1" },
  { src: bg1, alt: "Workshop", span: "col-span-1" }
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/gallery');
        setImages(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  // Pagination Logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full min-h-screen bg-[#f8fdf9] overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <HeroSection 
        badgeText="Our Memories"
        title="Our"
        highlightedTitle="Journey"
        description="Explore the cherished moments, grand reunions, and everyday connections that make our family community special."
        image={bg1}
      />

      {/* --- GALLERY SECTION --- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 relative z-10 w-full max-w-9xl mx-auto">

        {/* Gallery Grid - Clean 3-Column */}
        {loading ? (
          <div className="col-span-1 md:col-span-3 py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#b8db6e]/20 border-t-[#b8db6e] rounded-full animate-spin mb-4" />
            <p className="text-[#0a1910]/40 font-medium">Loading memories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentImages.map((image, index) => (
              <motion.div
                key={image._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image)}
                className="relative rounded-[40px] overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500 aspect-[4/3]"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0a1910]/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-bold tracking-widest uppercase text-xs drop-shadow-md bg-white/10 px-6 py-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Full Image
                  </span>
                </div>

                <img
                  src={image.src.startsWith('http') || image.src.startsWith('blob') || image.src.startsWith('/uploads') ? (image.src.startsWith('/uploads') ? `http://localhost:5000${image.src}` : image.src) : image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* --- PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentPage === 1
                ? 'bg-black/5 text-black/30 cursor-not-allowed'
                : 'bg-white text-[#0a1910] hover:bg-[#b8db6e] shadow-md'
                }`}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentPage === i + 1
                  ? 'bg-[#0a1910] text-[#b8db6e] shadow-lg scale-110'
                  : 'bg-white text-[#0a1910] hover:bg-[#b8db6e] hover:shadow-md'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentPage === totalPages
                ? 'bg-black/5 text-black/30 cursor-not-allowed'
                : 'bg-white text-[#0a1910] hover:bg-[#b8db6e] shadow-md'
                }`}
            >
              &gt;
            </button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] bg-[#b8db6e]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-[#4faea6]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* --- CALL TO ACTION --- */}
      <CallToAction />

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-2xl bg-[#0a1910]/95"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 bg-white/10 hover:bg-[#b8db6e] text-white hover:text-[#0a1910] p-4 rounded-full transition-colors z-[110] flex items-center justify-center group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-[85vh] rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-black flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src.startsWith('http') || selectedImage.src.startsWith('blob') || selectedImage.src.startsWith('/uploads') ? (selectedImage.src.startsWith('/uploads') ? `http://localhost:5000${selectedImage.src}` : selectedImage.src) : selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
                style={{ maxHeight: 'calc(85vh - 80px)' }}
              />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-white font-heading font-extrabold text-2xl md:text-3xl tracking-tight">
                  {selectedImage.alt}
                </h3>
                <p className="text-white/60 font-body text-sm mt-2">
                  Family Portal Gallery Collection
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
