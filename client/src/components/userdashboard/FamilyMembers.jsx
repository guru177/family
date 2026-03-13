import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, MoreVertical, Trash2, UserPlus, X } from 'lucide-react';

const STORAGE_KEY = 'familyMembers';

const defaultMembers = [
  {
    id: 'mem-1',
    name: 'Jane Doe',
    relation: 'Spouse',
    age: 42,
    role: 'Admin',
    phone: '+91 90000 00001',
    email: 'jane@example.com',
    gender: 'Female',
    dob: '1984-04-10',
    bloodGroup: 'A+',
    occupation: 'Teacher',
    notes: 'Primary contact for family events.',
  },
  {
    id: 'mem-2',
    name: 'Michael Doe',
    relation: 'Son',
    age: 18,
    role: 'Member',
    phone: '+91 90000 00002',
    email: 'michael@example.com',
    gender: 'Male',
    dob: '2007-08-21',
    bloodGroup: 'O+',
    occupation: 'Student',
    notes: '',
  },
  {
    id: 'mem-3',
    name: 'Emma Doe',
    relation: 'Daughter',
    age: 15,
    role: 'Member',
    phone: '+91 90000 00003',
    email: 'emma@example.com',
    gender: 'Female',
    dob: '2010-01-15',
    bloodGroup: 'B+',
    occupation: 'Student',
    notes: '',
  },
  {
    id: 'mem-4',
    name: 'Robert Doe',
    relation: 'Father',
    age: 75,
    role: 'Elder',
    phone: '+91 90000 00004',
    email: 'robert@example.com',
    gender: 'Male',
    dob: '1950-12-03',
    bloodGroup: 'AB+',
    occupation: 'Retired',
    notes: 'Requires wheelchair assistance for large events.',
  },
];

const roleBadgeClass = (role) =>
  `inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
    role === 'Admin'
      ? 'bg-[#b8db6e]/30 text-[#0a1910]'
      : role === 'Elder'
        ? 'bg-purple-100 text-purple-700'
        : 'bg-gray-100 text-gray-600'
  }`;

const FamilyMembers = () => {
  const [members, setMembers] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : defaultMembers;
    } catch {
      return defaultMembers;
    }
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openMenuForId, setOpenMenuForId] = useState(null);
  const menuRef = useRef(null);

  const emptyMember = useMemo(
    () => ({
      name: '',
      relation: '',
      age: '',
      role: 'Member',
      phone: '',
      email: '',
      gender: 'Male',
      dob: '',
      bloodGroup: 'A+',
      occupation: '',
      notes: '',
    }),
    []
  );
  const [newMember, setNewMember] = useState(emptyMember);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // ignore storage failures
    }
  }, [members]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!openMenuForId) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuForId(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [openMenuForId]);

  const openAdd = () => {
    setNewMember(emptyMember);
    setIsAddOpen(true);
  };

  const closeAdd = () => setIsAddOpen(false);
  const closeView = () => setIsViewOpen(false);

  const addMember = (e) => {
    e.preventDefault();
    const trimmedName = (newMember.name || '').trim();
    const trimmedRelation = (newMember.relation || '').trim();
    const ageNum = Number(newMember.age);
    if (!trimmedName || !trimmedRelation || !Number.isFinite(ageNum) || ageNum <= 0) return;

    const id = `mem-${Date.now()}`;
    setMembers((prev) => [
      {
        id,
        ...newMember,
        name: trimmedName,
        relation: trimmedRelation,
        age: ageNum,
      },
      ...prev,
    ]);
    setIsAddOpen(false);
  };

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setOpenMenuForId(null);
    if (selectedMember?.id === id) {
      setIsViewOpen(false);
      setSelectedMember(null);
    }
  };

  const viewMember = (member) => {
    setSelectedMember(member);
    setIsViewOpen(true);
    setOpenMenuForId(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#050505]/10 pb-6 mb-8 px-6 py-8 md:px-10 md:py-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0a1910]">Family Circle</h2>
          <p className="text-[#050505]/60 font-body text-sm mt-1">
            Manage accounts and profiles for your immediate family members.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#146c43] hover:bg-[#0a1910] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
        >
          <UserPlus size={16} />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#146c43]/10 shadow-sm">
  <div className="relative">

    <table className="w-full text-left border-collapse">

      {/* Table Header */}
      <thead>
        <tr className="bg-[#f8fdf9] border-b border-[#146c43]/10">
          <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">
            Name
          </th>

          <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">
            Relation
          </th>

          <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">
            Age
          </th>

          <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50">
            System Role
          </th>

          <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-[#050505]/50 text-right">
            Actions
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {members.map((member) => (
          <tr
            key={member.id}
            className="border-b border-[#146c43]/5 hover:bg-[#146c43]/[0.02] transition-colors"
          >
            {/* Name */}
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#146c43]/10 flex items-center justify-center text-[#146c43] font-bold text-xs uppercase">
                  {member.name?.charAt(0) || "?"}
                </div>

                <span className="font-bold text-[#050505] text-sm">
                  {member.name}
                </span>
              </div>
            </td>

            {/* Relation */}
            <td className="py-4 px-6 text-sm text-[#050505]/70 font-medium">
              {member.relation}
            </td>

            {/* Age */}
            <td className="py-4 px-6 text-sm text-[#050505]/70 font-medium">
              {member.age}
            </td>

            {/* Role */}
            <td className="py-4 px-6">
              <span className={roleBadgeClass(member.role)}>
                {member.role}
              </span>
            </td>

            {/* Actions */}
            <td className="py-4 px-6 text-right relative">

              <button
                onClick={() =>
                  setOpenMenuForId((prev) =>
                    prev === member.id ? null : member.id
                  )
                }
                className="text-[#050505]/40 hover:text-[#146c43] transition-colors p-2"
              >
                <MoreVertical size={16} />
              </button>

              {openMenuForId === member.id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 z-50 w-44 bg-white border border-black/10 rounded-xl shadow-xl"
                >
                  {/* View */}
                  <button
                    onClick={() => viewMember(member)}
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-[#0a1910] hover:bg-black/5 flex items-center gap-2"
                  >
                    <Eye size={16} className="text-[#146c43]" />
                    View Details
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete Member
                  </button>
                </div>
              )}

            </td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>
</div>

{/* Add Member Modal */}
{isAddOpen && (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40" onClick={closeAdd} />

    <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-[#0a1910]">Add Family Member</h3>
          <p className="text-sm text-[#0a1910]/60">
            Fill the member details and save.
          </p>
        </div>

        <button
          onClick={closeAdd}
          className="p-2 rounded-xl hover:bg-black/5 text-[#0a1910]/60"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={addMember} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Full Name *
            </label>
            <input
              value={newMember.name}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="e.g. Anil Kumar"
              required
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Relationship *
            </label>
            <input
              value={newMember.relation}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, relation: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="e.g. Father, Mother, Son"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Age *
            </label>
            <input
              type="number"
              min="1"
              value={newMember.age}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, age: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="e.g. 25"
              required
            />
          </div>

          {/* System Role */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              System Role
            </label>
            <select
              value={newMember.role}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, role: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#146c43]"
            >
              <option>Member</option>
              <option>Admin</option>
              <option>Elder</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Gender
            </label>
            <select
              value={newMember.gender}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, gender: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#146c43]"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={newMember.dob}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, dob: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#146c43]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Phone
            </label>
            <input
              value={newMember.phone}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, phone: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="+91 90000 00000"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Email
            </label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="name@example.com"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Blood Group
            </label>
            <select
              value={newMember.bloodGroup}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, bloodGroup: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#146c43]"
            >
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Occupation
            </label>
            <input
              value={newMember.occupation}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, occupation: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43]"
              placeholder="e.g. Business"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50 mb-2">
              Notes
            </label>
            <textarea
              value={newMember.notes}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, notes: e.target.value }))
              }
              className="w-full bg-[#f2f4f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-gray-500 placeholder:text-gray-500 outline-none focus:border-[#146c43] min-h-[90px]"
              placeholder="Any additional details..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={closeAdd}
            className="px-6 py-3 rounded-xl border border-black/10 text-[#0a1910]/70 font-bold uppercase tracking-widest text-xs hover:bg-black/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#146c43] hover:bg-[#0a1910] text-white font-bold uppercase tracking-widest text-xs transition-colors"
          >
            Save Member
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* View Details Modal */}
      {isViewOpen && selectedMember && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeView} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#0a1910]">Member Details</h3>
                <p className="text-sm text-[#0a1910]/60">{selectedMember.name}</p>
              </div>
              <button onClick={closeView} className="p-2 rounded-xl hover:bg-black/5 text-[#0a1910]/60">
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Relationship</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.relation}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Role</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.role}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Age</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.age}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Gender</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.gender || '-'}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Date of Birth</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.dob || '-'}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Blood Group</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.bloodGroup || '-'}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Phone</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.phone || '-'}</p>
                </div>
                <div className="bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Email</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.email || '-'}</p>
                </div>
                <div className="md:col-span-2 bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Occupation</p>
                  <p className="text-sm font-extrabold text-[#0a1910] mt-1">{selectedMember.occupation || '-'}</p>
                </div>
                <div className="md:col-span-2 bg-[#f2f4f2] border border-black/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0a1910]/50">Notes</p>
                  <p className="text-sm font-semibold text-[#0a1910] mt-1 whitespace-pre-wrap">
                    {selectedMember.notes || '-'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={() => deleteMember(selectedMember.id)}
                  className="px-6 py-3 rounded-xl border border-red-200 text-red-700 font-bold uppercase tracking-widest text-xs hover:bg-red-50 inline-flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Member
                </button>
                <button
                  type="button"
                  onClick={closeView}
                  className="px-6 py-3 rounded-xl bg-[#146c43] hover:bg-[#0a1910] text-white font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FamilyMembers;
