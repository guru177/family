import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, ExternalLink } from 'lucide-react';

const donationsData = [
  { id: "DON-1049", date: "May 10, 2026", fund: "Education Scholarship Fund", amount: "$150.00", status: "Completed" },
  { id: "DON-0921", date: "Dec 05, 2025", fund: "Winter Charity Gala", amount: "$200.00", status: "Completed" },
  { id: "DON-0683", date: "Jul 15, 2025", fund: "Annual Setup Fund", amount: "$100.00", status: "Completed" }
];

const MyDonations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#050505]/10 pb-6 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0a1910]">Donation History</h2>
          <p className="text-[#050505]/60 font-body text-sm mt-1">View your past contributions and download tax receipts.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#146c43] hover:bg-[#0a1910] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md">
          <CreditCard size={14} />
          New Donation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-[#f8fdf9] border border-[#146c43]/20 rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 mb-2">Lifetime Giving</div>
            <div className="text-3xl font-heading font-extrabold text-[#146c43]">$450.00</div>
         </div>
         <div className="bg-[#f8fdf9] border border-[#146c43]/20 rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 mb-2">Total Contributions</div>
            <div className="text-3xl font-heading font-extrabold text-[#0a1910]">3</div>
         </div>
         <div className="bg-[#f8fdf9] border border-[#146c43]/20 rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 mb-2">Last Donation</div>
            <div className="text-3xl font-heading font-extrabold text-[#0a1910]">May 10</div>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#146c43]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fdf9] border-b border-[#146c43]/10">
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">Trans. ID</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">Date</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">Fund Category</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 text-right">Amount</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 text-center">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donationsData.map((donation, idx) => (
                <tr key={idx} className="border-b border-[#146c43]/5 hover:bg-[#146c43]/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-[#050505]">{donation.id}</td>
                  <td className="py-4 px-6 text-sm text-[#050505]/70 font-medium">{donation.date}</td>
                  <td className="py-4 px-6 text-sm font-bold text-[#146c43]">{donation.fund}</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-[#050505] text-right">{donation.amount}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#050505]/40 hover:text-[#146c43] transition-colors p-2 inline-flex" title="Download Receipt">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default MyDonations;
