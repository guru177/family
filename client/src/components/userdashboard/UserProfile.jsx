import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Users,
  Heart,
  Briefcase,
  Edit,
  Save,
} from "lucide-react";


/* ---------------- FIELD COMPONENT ---------------- */

const Field = ({ label, field, icon: Icon, editMode, value, handleChange }) => {

  const nonEditable = ["familyId", "membershipType"];

  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
        {label}
      </label>

      {editMode && !nonEditable.includes(field) ? (
        <input
          value={value || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#146c43]"
        />
      ) : (
        <div className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-[#0a1910] font-semibold flex items-center gap-3">
          {Icon && <Icon size={16} className="text-[#2f6b54]/70 shrink-0" />}
          {value || "-"}
        </div>
      )}
    </div>
  );
};



/* ---------------- SECTION COMPONENT ---------------- */

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-10 h-10 rounded-2xl bg-[#e8f0ea] flex items-center justify-center">
        <Icon size={18} className="text-[#2f6b54]" />
      </span>
      <h4 className="font-extrabold text-[#0a1910]">{title}</h4>
    </div>
    {children}
  </div>
);



/* ---------------- MAIN COMPONENT ---------------- */

const UserProfile = () => {

  const dummyRegistration = useMemo(
    () => ({
      fullName: "Guruprasad",
      gender: "Male",
      dob: "1998-06-12",
      phone: "+91 98765 43210",
      email: "guruprasad@example.com",

      familyName: "Nair Family",
      fatherName: "Raghavan Nair",
      motherName: "Saraswathi Nair",
      spouseName: "",
      familyMembersCount: 5,
      isFamilyHead: "Yes",
      familyId: "FAM-4821",

      houseNumber: "12B / Anugraha",
      streetArea: "Green Meadows",
      cityVillage: "Kozhikode",
      district: "Kozhikode",
      state: "Kerala",
      pincode: "673001",

      membershipType: "Member",
      branchUnit: "North Zone",
      occupation: "Software Engineer",
      bloodGroup: "O+",
    }),
    []
  );

  const storedData = useMemo(() => {
    try {
      const raw = localStorage.getItem("registrationData");
      return raw ? JSON.parse(raw) : dummyRegistration;
    } catch {
      return dummyRegistration;
    }
  }, [dummyRegistration]);

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(storedData);
  const [editData, setEditData] = useState(storedData);

  const handleChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    setProfileData(editData);
    localStorage.setItem("registrationData", JSON.stringify(editData));
    setEditMode(false);
  };

  const startEditing = () => {
    setEditData(profileData);
    setEditMode(true);
  };

  const data = editMode ? editData : profileData;

  const fullName = profileData.fullName || "User";
  const isHead = (profileData.isFamilyHead || "").toLowerCase() === "yes";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-6 py-8 md:px-10 md:py-10"
    >

      {/* Header */}
      <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-8">

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1910]">
            My Profile
          </h2>
          <p className="text-[#0a1910]/60 text-sm">
            Manage and update your personal details.
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={startEditing}
            className="flex items-center gap-2 bg-[#146c43] text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={saveProfile}
            className="flex items-center gap-2 bg-[#0a1910] text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            <Save size={16} />
            Save Changes
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#e8f0ea] mx-auto flex items-center justify-center mb-4">
            <User size={40} className="text-[#2f6b54]/40" />
          </div>

          <h3 className="text-xl font-extrabold text-[#0a1910]">{fullName}</h3>

          <p className="text-sm font-bold uppercase text-[#2f6b54] mt-1">
            {isHead ? "Family Head" : "Member"}
          </p>

          <div className="mt-6 space-y-3">
            <Field label="Family ID" field="familyId" icon={Home} editMode={editMode} value={data.familyId} handleChange={handleChange}/>
            <Field label="Membership Type" field="membershipType" icon={Heart} editMode={editMode} value={data.membershipType} handleChange={handleChange}/>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">

          <Section title="Personal Information" icon={User}>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name" field="fullName" icon={User} editMode={editMode} value={data.fullName} handleChange={handleChange}/>
              <Field label="Gender" field="gender" icon={User} editMode={editMode} value={data.gender} handleChange={handleChange}/>
              <Field label="Date of Birth" field="dob" icon={User} editMode={editMode} value={data.dob} handleChange={handleChange}/>
              <Field label="Mobile Number" field="phone" icon={Phone} editMode={editMode} value={data.phone} handleChange={handleChange}/>
              <Field label="Email Address" field="email" icon={Mail} editMode={editMode} value={data.email} handleChange={handleChange}/>
            </div>
          </Section>

          <Section title="Family Information" icon={Users}>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Family Name" field="familyName" icon={Home} editMode={editMode} value={data.familyName} handleChange={handleChange}/>
              <Field label="Father Name" field="fatherName" icon={User} editMode={editMode} value={data.fatherName} handleChange={handleChange}/>
              <Field label="Mother Name" field="motherName" icon={User} editMode={editMode} value={data.motherName} handleChange={handleChange}/>
              <Field label="Spouse Name" field="spouseName" icon={User} editMode={editMode} value={data.spouseName} handleChange={handleChange}/>
            </div>
          </Section>

          <Section title="Address Details" icon={MapPin}>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="House Name" field="houseNumber" icon={Home} editMode={editMode} value={data.houseNumber} handleChange={handleChange}/>
              <Field label="Street / Area" field="streetArea" icon={MapPin} editMode={editMode} value={data.streetArea} handleChange={handleChange}/>
              <Field label="District" field="district" icon={MapPin} editMode={editMode} value={data.district} handleChange={handleChange}/>
              <Field label="State" field="state" icon={MapPin} editMode={editMode} value={data.state} handleChange={handleChange}/>
              <Field label="Pincode" field="pincode" icon={MapPin} editMode={editMode} value={data.pincode} handleChange={handleChange}/>
            </div>
          </Section>

          <Section title="Community Details" icon={Heart}>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Branch / Unit" field="branchUnit" icon={Home} editMode={editMode} value={data.branchUnit} handleChange={handleChange}/>
              <Field label="Occupation" field="occupation" icon={Briefcase} editMode={editMode} value={data.occupation} handleChange={handleChange}/>
              <Field label="Blood Group" field="bloodGroup" icon={Heart} editMode={editMode} value={data.bloodGroup} handleChange={handleChange}/>
            </div>
          </Section>

        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;