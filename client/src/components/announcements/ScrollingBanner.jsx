import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_NOTIFICATIONS = [
  "✨ Welcome to the official Family Portal! Connect, Share, and Grow together. ✨",
  "📅 Save the Date: Next Grand Family Reunion on July 15th, 2026! 📅",
  "🌟 New Community Project: Education Scholarship Fund launched. 🌟",
  "📜 Discover your roots in our updated 'Heritage' section. 📜",
  "🤝 Help us reach our donation goal for the upcoming community center. 🤝"
];

const ScrollingBanner = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('admin_scrolling_banner');
        if (saved) {
            const data = JSON.parse(saved);
            if (data && data.length > 0) {
                setMessages(data);
                return;
            }
        }
        setMessages(DEFAULT_NOTIFICATIONS);
    }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden py-4 backdrop-blur-xl bg-black/20 border-t border-white/10 z-40">
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear"
        }}
      >
        {[...messages, ...messages, ...messages].map((text, i) => (
          <span key={i} className="text-white/90 text-[13px] font-medium tracking-[2px] uppercase flex items-center gap-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingBanner;
