import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to, active = false, badge }) => {
  return (
    <Link
      to={to}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
        active ? 'bg-[#2f6b54] text-white' : 'text-[#0a1910]/70 hover:bg-black/5'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            active ? 'bg-white/15' : 'bg-black/5'
          }`}
        >
          <Icon size={18} className={active ? 'text-white' : 'text-[#2f6b54]'} />
        </span>
        {label}
      </span>

      {typeof badge !== 'undefined' && badge !== null && (
        <span className="min-w-6 h-6 px-2 rounded-full bg-[#e74c3c] text-white text-xs font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default SidebarItem;

