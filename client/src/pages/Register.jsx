import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Lock, Mail, Phone, ArrowRight, CheckCircle2, Home, Users, MapPin, Heart, Briefcase, Camera } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({ 
    // Step 1: Personal Info
    fullName: '', 
    gender: 'Male',
    dob: '',
    phone: '',
    email: '', 
    profilePhoto: null,

    // Step 2: Family Info
    familyName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    familyMembersCount: 1,
    isFamilyHead: 'No',
    familyId: 'FAM-' + Math.floor(1000 + Math.random() * 9000),

    // Step 3: Address Details
    houseNumber: '',
    streetArea: '',
    cityVillage: '',
    district: '',
    state: '',
    pincode: '',

    // Step 4: Community Details
    membershipType: 'Member',
    branchUnit: '',
    occupation: '',
    bloodGroup: 'A+',

    // Step 5: Login Credentials
    username: '',
    loginEmail: '', // Usually same as email
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePhoto: URL.createObjectURL(file) }));
    }
  };

  const nextStep = () => {
    // Basic validation could go here
    setStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const registrationData = {
        ...formData,
        loginEmail: formData.loginEmail || formData.email,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      if (formData.fullName) {
        localStorage.setItem('userDisplayName', formData.fullName);
      }
    } catch {
      // ignore localStorage failures (private mode / storage full)
    }
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center p-4 py-20 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4faea6]/20 blur-[150px] rounded-full pointer-events-none fixed" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#b8db6e]/20 blur-[150px] rounded-full pointer-events-none fixed" />
      
      <div className="relative z-10 w-full max-w-3xl mt-12 md:mt-20">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        {/* Progress Indicator */}
        <div className="mb-8 flex justify-between items-center relative z-20 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm hidden md:flex">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-white/10 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-[#b8db6e] to-[#4faea6] transition-all duration-500"
                    style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-20 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${step === i ? 'bg-gradient-to-r from-[#b8db6e] to-[#4faea6] text-[#0a1910] shadow-[0_0_15px_rgba(184,219,110,0.5)] scale-125' :
                    step > i ? 'bg-[#b8db6e] text-[#0a1910]' : 'bg-[#0a1910] border-2 border-white/20 text-white/40'
                  }`}>
                  {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
                <span className={`text-[9px] uppercase tracking-widest font-bold whitespace-nowrap ${step === i ? 'text-white' : 'text-white/40'}`}>
                    {i === 1 ? 'Personal' : i === 2 ? 'Family' : i === 3 ? 'Address' : i === 4 ? 'Community' : 'Login'}
                </span>
              </div>
            ))}
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4faea6]/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="p-6 md:p-10 flex-1 flex flex-col">
              <div className="mb-8 text-center relative z-10">
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2 tracking-tight">
                  {isSubmitted ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-[#4faea6]">
                      Thank you for registering
                    </span>
                  ) : (
                    <>
                      Join the{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8db6e] to-[#4faea6]">
                        Family
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-white/50 text-sm font-bold uppercase tracking-widest">
                  {isSubmitted ? "Your details are under admin verification" : `Step ${step} of 5`}
                </p>
              </div>

              {!isSubmitted && (
                <AnimatePresence mode="wait">
                {/* --- STEP 1: PERSONAL INFO --- */}
                {step === 1 && (
                  <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 relative z-10 flex-1">
                    
                    <div className="flex justify-center mb-4">
                        <div 
                            className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 bg-black/40 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#b8db6e] transition-colors group relative"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {formData.profilePhoto ? (
                                <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-white/40 group-hover:text-[#b8db6e] flex flex-col items-center">
                                    <Camera size={24} />
                                    <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Photo</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" accept=".jpg,.png,.jpeg" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Full Name *</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="e.g. John Doe" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer">
                                <option className="bg-[#050505]">Male</option>
                                <option className="bg-[#050505]">Female</option>
                                <option className="bg-[#050505]">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Date of Birth *</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all [color-scheme:dark]" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Mobile Number *</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="+91 00000 00000" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Email Address *</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="name@example.com" />
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 2: FAMILY INFO --- */}
                {step === 2 && (
                  <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 relative z-10 flex-1">
                    
                    <div className="flex items-center gap-3 mb-2 p-4 bg-[#b8db6e]/10 border border-[#b8db6e]/20 rounded-xl">
                        <Users className="text-[#b8db6e]" size={24} />
                        <div>
                            <h3 className="font-bold text-[#b8db6e] text-sm">Family Identification</h3>
                            <p className="text-white/60 text-xs">Help us connect you with your lineage.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Family / House Name *</label>
                            <div className="relative">
                                <Home size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <input type="text" name="familyName" value={formData.familyName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="e.g. The Smiths / Villa Name" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Father's Name *</label>
                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Father's full name" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Mother's Name *</label>
                            <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Mother's full name" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Spouse Name (Optional)</label>
                            <input type="text" name="spouseName" value={formData.spouseName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Spouse full name" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">No. of Family Members</label>
                            <input type="number" min="1" name="familyMembersCount" value={formData.familyMembersCount} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Are you the Family Head?</label>
                            <select name="isFamilyHead" value={formData.isFamilyHead} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer">
                                <option className="bg-[#050505]">No</option>
                                <option className="bg-[#050505]">Yes</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Family ID (Auto-Generated)</label>
                            <input type="text" name="familyId" value={formData.familyId} readOnly className="w-full bg-black/20 border border-white/5 text-white/50 text-sm rounded-xl px-4 py-3 outline-none cursor-not-allowed font-mono" />
                        </div>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 3: ADDRESS --- */}
                {step === 3 && (
                  <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 relative z-10 flex-1">
                    
                    <div className="flex items-center gap-3 mb-2 p-4 bg-[#4faea6]/10 border border-[#4faea6]/20 rounded-xl">
                        <MapPin className="text-[#4faea6]" size={24} />
                        <div>
                            <h3 className="font-bold text-[#4faea6] text-sm">Location Details</h3>
                            <p className="text-white/60 text-xs">Used for sending event invitations and updates.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">House Name / Number *</label>
                            <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Flat No. / House Name" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Street / Area *</label>
                            <input type="text" name="streetArea" value={formData.streetArea} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Locality / Landmark" />
                        </div>

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">City / Village *</label>
                            <input type="text" name="cityVillage" value={formData.cityVillage} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="Town / City" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">District *</label>
                            <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">State *</label>
                            <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" />
                        </div>

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Pincode / Zip Code *</label>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" />
                        </div>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 4: COMMUNITY INFO --- */}
                {step === 4 && (
                  <motion.div key="step4" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6 relative z-10 flex-1">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Membership Type *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                {['Member', 'Family Member', 'Youth Member', 'Senior Member'].map((type) => (
                                    <div 
                                        key={type}
                                        onClick={() => setFormData({...formData, membershipType: type})}
                                        className={`px-3 py-4 rounded-xl border cursor-pointer transition-all text-center text-xs font-bold uppercase tracking-widest ${formData.membershipType === type ? 'bg-[#b8db6e] border-[#b8db6e] text-[#0a1910] shadow-[0_0_15px_rgba(184,219,110,0.3)]' : 'bg-black/40 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/5'}`}
                                    >
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Branch / Unit</label>
                            <input type="text" name="branchUnit" value={formData.branchUnit} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="e.g. North Zone / Default" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Occupation / Profession</label>
                            <div className="relative">
                                <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20" placeholder="e.g. Engineer, Business" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">Blood Group</label>
                            <div className="relative">
                                <Heart size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all appearance-none cursor-pointer">
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                        <option key={bg} className="bg-[#050505]">{bg}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 5: LOGIN CREDENTIALS --- */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-6 relative z-10 flex-1"
                  >
                    <div className="flex items-center gap-3 mb-2 p-4 bg-white/10 border border-white/10 rounded-xl">
                      <Lock className="text-white" size={24} />
                      <div>
                        <h3 className="font-bold text-white text-sm">Account Secure Setup</h3>
                        <p className="text-white/60 text-xs">These will be your credentials to log in.</p>
                      </div>
                    </div>

                    <form id="registerForm" className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">
                          Username (Optional)
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                          />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20"
                            placeholder="user123"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">
                          Login Email *
                        </label>
                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                          />
                          <input
                            type="email"
                            name="loginEmail"
                            value={formData.loginEmail || formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">
                            Password *
                          </label>
                          <div className="relative">
                            <Lock
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                            />
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20 tracking-widest"
                              placeholder="••••••••"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-white/70 ml-2">
                            Confirm Password *
                          </label>
                          <div className="relative">
                            <Lock
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                            />
                            <input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full bg-black/40 border border-white/10 focus:border-[#b8db6e] text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-white/20 tracking-widest"
                              placeholder="••••••••"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              )}

              {isSubmitted && (
                <motion.div
                  key="submitted"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-4 items-center justify-center text-center relative z-10 flex-1 py-8"
                >
                  <CheckCircle2 className="text-[#b8db6e]" size={48} />
                  <p className="text-white/80 text-sm md:text-base max-w-md">
                    Thank you for registering. Your account details have been submitted and are currently{" "}
                    <span className="font-semibold text-[#b8db6e]">under admin verification</span>. Once your
                    registration is approved, you will receive an{" "}
                    <span className="font-semibold">email notification</span>.
                  </p>
                  <p className="text-white/50 text-xs md:text-sm">
                    You can now safely close this page or proceed to the login screen once approved.
                  </p>
                </motion.div>
              )}

          </div>
          
          {/* Navigation Buttons placed outside the inner padding for full width, but contained within card */}
          <div className="p-6 md:p-10 border-t border-white/5 bg-black/20 flex flex-col md:flex-row justify-between items-center z-10 gap-4 mt-auto">
            {!isSubmitted ? (
              <>
                <div className="order-2 md:order-1 w-full md:w-auto">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="w-full md:w-auto px-6 py-4 font-bold uppercase tracking-widest text-xs transition-all rounded-xl border border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={16} /> Previous Step
                    </button>
                  )}
                </div>

                <div className="order-1 md:order-2 w-full md:w-auto flex flex-1 justify-end">
                  {step < 5 ? (
                    <button
                      onClick={nextStep}
                      className="w-full md:w-auto px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all rounded-xl shadow-lg bg-white text-[#0a1910] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ml-auto"
                    >
                      Continue Details <ArrowRight size={16} />
                    </button>
                  ) : (
                    <motion.button
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        const form = document.getElementById("registerForm");
                        if (form.reportValidity()) {
                          handleSubmit(e);
                        }
                      }}
                      className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#b8db6e] to-[#4faea6] text-[#0a1910] font-bold uppercase tracking-widest text-xs rounded-xl shadow-[0_0_20px_rgba(184,219,110,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      Complete Registration
                      {isHovered && <ArrowRight size={16} />}
                    </motion.button>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/60 text-xs md:text-sm">
                  Your registration is submitted and waiting for admin approval.
                </p>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-[#0a1910] font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  Go to Login
                </Link>
              </div>
            )}
          </div>

        </div>

        <div className="mt-8 text-center pb-12">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider">
              Already have an account?{" "}
              <Link to="/login" className="text-[#b8db6e] hover:text-white transition-colors underline decoration-[#b8db6e]/30 underline-offset-4 ml-1">
                Sign in
              </Link>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
