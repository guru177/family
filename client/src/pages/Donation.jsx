import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Heart, CheckCircle2, Building2, Wallet, QrCode, UploadCloud, Info, ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/layout/CallToAction';
import HeroSection from '../components/layout/HeroSection';
import banner from '../assets/img/hero1.jpg'; // Using existing banner for hero background

const Donation = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe', // Mock logged in 
    phone: '+1 234 567 8900', // Mock logged in
    email: 'jane@example.com', // Mock logged in
    city: '',
    category: 'General Fund (Greatest Need)',
    amount: 1000,
    customAmount: '',
    message: '',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    remarks: '',
    proofImage: null
  });

  const presetAmounts = [500, 1000, 2000, 5000, 10000];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePresetClick = (amount) => {
    setFormData(prev => ({ ...prev, amount: amount, customAmount: '' }));
  };

  const handleCustomAmountChange = (e) => {
    setFormData(prev => ({ ...prev, customAmount: e.target.value, amount: null }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, proofImage: URL.createObjectURL(file) }));
    }
  };

  const currentDonationAmount = formData.amount || formData.customAmount || 0;

  // Animation variants for step transitions
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fdf9] overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <HeroSection
        badgeText="Support Our Legacy"
        title="Make An"
        highlightedTitle="Impact"
        description="Explore the cherished moments, grand reunions, and everyday connections that make our family community special."
        image={banner}
      />

      {/* --- WIZARD CONTENT SECTION --- */}
      <section className="bg-gradient-to-b from-[#f8fdf9] to-[#ffffff] text-[#050505] py-16 px-4 md:px-8 lg:px-20 relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 relative">

          {/* LEFT COLUMN: Context & How It Helps (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-10 lg:pt-16 order-2 lg:order-1 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block border-b-2 border-[#b8db6e] pb-1 w-max mb-6">
                <h3 className="text-[#0a1910] font-bold tracking-[3px] uppercase text-xs">
                  Why Give?
                </h3>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-[1.1] tracking-tight mb-6">
                Investing in <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1910] to-[#b8db6e]">
                  our future
                </span>
              </h2>
              <p className="text-[#050505]/70 text-base font-body leading-relaxed mb-8 max-w-lg">
                The Family Portal is powered entirely by the generosity of members like you. 100% of your tax-deductible donation goes directly into our community initiatives, ensuring we can continue building our shared heritage.
              </p>
            </motion.div>

            {/* Impact Cards */}
            <div className="flex flex-col gap-6 w-full lg:max-w-md">
              {[
                { title: "Scholarship Fund", desc: "Funding higher education for our promising youth.", icon: <Building2 size={24} /> },
                { title: "Emergency Relief", desc: "Immediate financial assistance for families in crisis.", icon: <Heart size={24} /> },
                { title: "Annual Gathering", desc: "Offsetting costs for our yearly family reunions.", icon: <Wallet size={24} /> }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-[#b8db6e]/20 flex gap-5 items-start group hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0a1910] text-[#b8db6e] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a1910] text-lg mb-1">{item.title}</h4>
                    <p className="text-[#050505]/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-[#b8db6e]/10 rounded-2xl border border-[#b8db6e]/30 mt-4 w-full lg:max-w-md">
              <p className="font-bold text-[#0a1910] text-sm mb-2">Transparency Promise</p>
              <p className="text-[#050505]/70 text-xs text-balance">We provide annual financial reports detailing exactly how community funds were utilized across all designated categories.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Step Wizard (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col order-1 lg:order-2 w-full max-w-2xl mx-auto lg:mx-0">

            {/* Progress Indicator */}
            <div className="mb-12 flex justify-center items-center gap-2 md:gap-4 relative z-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300 ${step === i ? 'bg-[#b8db6e] text-[#0a1910] shadow-[0_0_15px_rgba(184,219,110,0.5)] scale-110' :
                    step > i ? 'bg-[#0a1910] text-[#b8db6e]' : 'bg-white border-2 border-black/10 text-black/40'
                    }`}>
                    {step > i ? <CheckCircle2 size={16} /> : i}
                  </div>
                  {i < 4 && (
                    <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 rounded-full transition-colors duration-300 ${step > i ? 'bg-[#0a1910]' : 'bg-black/10'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 relative overflow-hidden flex flex-col min-h-[500px]">
              {/* Decorative background element */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#b8db6e]/10 rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {/* --- STEP 1: DONATION FORM --- */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-12 relative z-10 w-full flex-1 flex flex-col"
                  >
                    <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0a1910] mb-8">
                      Donation Details
                    </h3>

                    <div className="flex flex-col gap-8 flex-1">

                      {/* Amount & Category */}
                      <div className="p-6 rounded-2xl bg-[#f8fdf9] border border-[#b8db6e]/30">
                        <h4 className="font-bold text-[#0a1910] mb-4 text-sm uppercase tracking-widest">Select Amount</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handlePresetClick(amount)}
                              className={`py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${formData.amount === amount
                                ? 'bg-[#0a1910] border-[#0a1910] text-[#b8db6e] shadow-lg'
                                : 'bg-white border-black/10 text-[#0a1910] hover:border-[#b8db6e] hover:bg-[#b8db6e]/5'
                                }`}
                            >
                              ₹{amount}
                            </button>
                          ))}
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a1910] font-bold text-lg">₹</span>
                            <input
                              type="number"
                              name="customAmount"
                              placeholder="Custom"
                              value={formData.customAmount}
                              onChange={handleCustomAmountChange}
                              className={`w-full py-4 pl-8 pr-4 rounded-xl font-bold text-lg outline-none transition-all duration-300 border-2 ${formData.customAmount
                                ? 'bg-[#0a1910] border-[#0a1910] text-[#b8db6e] shadow-lg'
                                : 'bg-white border-black/10 text-[#0a1910] hover:border-[#b8db6e] focus:border-[#b8db6e]'
                                }`}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] ml-2">Donation Category</label>
                          <div className="relative">
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="w-full bg-white border-2 border-black/10 focus:border-[#b8db6e] text-[#050505] text-sm rounded-xl px-4 py-4 outline-none transition-all shadow-sm appearance-none cursor-pointer font-bold"
                            >
                              <option>General Fund (Greatest Need)</option>
                              <option>Scholarship Fund</option>
                              <option>Emergency Assistance</option>
                              <option>Annual Reunion Fund</option>
                            </select>
                            <ArrowDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0a1910] pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Donor Information */}
                      <div>
                        <h4 className="font-bold text-[#0a1910] text-sm tracking-widest uppercase mb-4">Basic Details</h4>

                        {/* Note about member autofill */}
                        <div className="bg-[#b8db6e]/20 text-[#0a1910] p-3 rounded-xl text-xs font-semibold flex items-start gap-2 mb-4 border border-[#b8db6e]/30">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <span>Since you are logged in, we have auto-filled your member details. You can edit them if needed.</span>
                          <input type="hidden" name="memberId" value="MEMB-8492" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="bg-black/5 border-2 border-transparent focus:border-[#b8db6e] focus:bg-white text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="bg-black/5 border-2 border-transparent focus:border-[#b8db6e] focus:bg-white text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="bg-black/5 border-2 border-transparent focus:border-[#b8db6e] focus:bg-white text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Place / City</label>
                            <input type="text" name="city" placeholder="E.g., New York, NY" value={formData.city} onChange={handleInputChange} className="bg-black/5 border-2 border-transparent focus:border-[#b8db6e] focus:bg-white text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Message (Optional)</label>
                          <textarea rows="3" name="message" placeholder="Leave a note with your donation..." value={formData.message} onChange={handleInputChange} className="bg-black/5 border-2 border-transparent focus:border-[#b8db6e] focus:bg-white text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all resize-none" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-black/10 flex flex-col md:flex-row gap-4 justify-between items-center w-full">
                      <Link to="/" className="text-black/60 font-bold uppercase tracking-widest text-xs hover:text-black transition-colors px-6 py-4">Cancel</Link>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => currentDonationAmount > 0 && setStep(2)}
                        disabled={!currentDonationAmount}
                        className={`w-full md:w-auto px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-xl shadow-lg flex items-center justify-center gap-2 ${currentDonationAmount ? 'bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f]' : 'bg-black/10 text-black/40 cursor-not-allowed shadow-none'
                          }`}
                      >
                        Continue to Payment <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 2: PAYMENT INSTRUCTIONS --- */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-12 relative z-10 w-full flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-8 text-[#0a1910]">
                      <button onClick={() => setStep(1)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><ArrowLeft size={24} /></button>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold">Payment Instructions</h3>
                    </div>

                    <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full">

                      {/* Summary Card */}
                      <div className="bg-[#b8db6e] p-6 rounded-2xl w-full mb-8 text-center text-[#0a1910] shadow-[0_10px_30px_rgba(184,219,110,0.4)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={100} /></div>
                        <p className="font-bold tracking-widest uppercase text-xs opacity-70 mb-1 relative z-10">Donation Summary</p>
                        <h4 className="text-4xl md:text-5xl font-extrabold font-heading mb-2 relative z-10">₹{currentDonationAmount}</h4>
                        <p className="font-bold text-sm relative z-10">{formData.fullName} • {formData.category}</p>
                      </div>

                      {/* QR Code Section */}
                      <div className="bg-white border-2 border-[#b8db6e]/30 rounded-[30px] p-8 md:p-10 w-full flex flex-col md:flex-row items-center gap-8 shadow-xl">
                        <div className="w-48 h-48 bg-black/5 rounded-xl border border-black/10 flex items-center justify-center shrink-0 relative overflow-hidden group">
                          {/* Placeholder for actual QR */}
                          <QrCode size={100} className="text-[#0a1910] opacity-80" />
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="font-bold text-xs uppercase tracking-widest text-black">Mock QR Code</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 text-center md:text-left">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#0a1910] opacity-60 mb-1">Official UPI ID</p>
                            <div className="bg-[#f8fdf9] px-4 py-2 rounded-lg border border-black/10 font-bold text-[#0a1910] inline-block tracking-wider">
                              familyportal@bank
                            </div>
                          </div>

                          <div className="text-sm text-black/70 flex flex-col gap-2">
                            <p className="font-bold text-black border-b border-black/10 pb-1 w-max">Instructions:</p>
                            <ul className="list-disc pl-4 space-y-1 text-left flex flex-col gap-1">
                              <li>Scan the QR code using any UPI app.</li>
                              <li>Pay the exact donation amount.</li>
                              <li className="text-[#0a1910] font-bold">Take a screenshot of the payment confirmation.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-black/10 flex justify-end w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        className="w-full md:w-auto px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-xl shadow-[0_10px_20px_rgba(10,25,16,0.2)] bg-[#0a1910] text-[#b8db6e] hover:bg-[#142f1f] flex items-center justify-center gap-2"
                      >
                        I Have Completed Payment <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 3: UPLOAD PROOF --- */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-12 relative z-10 w-full flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-8 text-[#0a1910]">
                      <button onClick={() => setStep(2)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><ArrowLeft size={24} /></button>
                      <h3 className="text-2xl md:text-3xl font-heading font-extrabold">Upload Payment Proof</h3>
                    </div>

                    <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col gap-6">

                      <div
                        className={`w-full border-2 border-dashed rounded-[30px] p-8 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all ${formData.proofImage ? 'border-[#b8db6e] bg-[#f8fdf9]' : 'border-black/20 hover:border-[#b8db6e] hover:bg-black/5'}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input type="file" ref={fileInputRef} className="hidden" accept=".jpg,.png,.jpeg" onChange={handleFileChange} />

                        {formData.proofImage ? (
                          <div className="flex flex-col items-center gap-4 w-full">
                            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg border-2 border-[#b8db6e]">
                              <img src={formData.proofImage} alt="Proof Preview" className="w-full h-full object-cover" />
                            </div>
                            <p className="font-bold text-sm text-[#0a1910]">Screenshot Uploaded Successfully</p>
                            <span className="text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black">Click to change</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-black/5 text-[#0a1910] flex items-center justify-center mb-2">
                              <UploadCloud size={32} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#0a1910] text-lg mb-1">Click to Upload or Drag & Drop</h4>
                              <p className="text-black/50 text-xs font-bold uppercase tracking-widest">Supported formats: JPG, PNG, JPEG</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="bg-[#f8fdf9] border border-[#b8db6e]/30 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Transaction ID / UTR Number *</label>
                          <input type="text" name="transactionId" placeholder="E.g., 238129381203" value={formData.transactionId} onChange={handleInputChange} className="bg-white border-2 border-black/10 focus:border-[#b8db6e] text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-sm" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Payment Date *</label>
                            <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleInputChange} className="bg-white border-2 border-black/10 focus:border-[#b8db6e] text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-sm" required />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#0a1910] opacity-70 ml-2">Remarks (Optional)</label>
                            <input type="text" name="remarks" placeholder="Any additional notes" value={formData.remarks} onChange={handleInputChange} className="bg-white border-2 border-black/10 focus:border-[#b8db6e] text-[#050505] text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-sm" />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-black/10 flex justify-end w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (formData.transactionId && formData.paymentDate) setStep(4);
                          else alert("Please enter Transaction ID and Date");
                        }}
                        disabled={!formData.transactionId || !formData.paymentDate}
                        className={`w-full md:w-auto px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all rounded-xl shadow-lg flex items-center justify-center gap-2 ${formData.transactionId && formData.paymentDate ? 'bg-[#b8db6e] text-[#0a1910] hover:bg-[#a5c95d]' : 'bg-black/10 text-black/40 cursor-not-allowed shadow-none'
                          }`}
                      >
                        Submit Donation Proof
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 4: SUCCESS --- */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-12 relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-24 h-24 bg-gradient-to-br from-[#b8db6e] to-[#8db247] rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(184,219,110,0.6)] mb-8"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>

                    <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0a1910] mb-4">
                      Thank You for Your Contribution
                    </h3>
                    <p className="text-black/60 max-w-lg mx-auto text-base md:text-lg mb-10 leading-relaxed font-semibold">
                      Your donation request has been submitted successfully.<br />
                      Our team will verify the payment and update the status soon.
                    </p>

                    <div className="bg-[#f8fdf9] border border-[#b8db6e]/30 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-md mb-10 text-left relative overflow-hidden">
                      {/* Watermark icon */}
                      <FileCheck size={120} className="absolute -right-8 -bottom-8 text-black/[0.03] pointer-events-none" />

                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">Donor Name</span>
                          <span className="font-bold text-sm text-[#0a1910]">{formData.fullName}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">Amount</span>
                          <span className="font-bold text-sm text-[#b8db6e] bg-[#0a1910] px-2 py-0.5 rounded w-max">₹{currentDonationAmount}</span>
                        </div>
                        <div className="flex flex-col col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">Donation Type</span>
                          <span className="font-bold text-sm text-[#0a1910]">{formData.category}</span>
                        </div>
                        <div className="flex flex-col col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">Date Submitted</span>
                          <span className="font-bold text-sm text-[#0a1910]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                      <Link to="/">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all rounded-xl border-2 border-black/10 hover:border-[#0a1910] text-[#0a1910]"
                        >
                          Back to Home
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <CallToAction />

    </div>
  );
};

export default Donation;
