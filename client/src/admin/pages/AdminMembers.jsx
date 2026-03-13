import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Users, CheckCircle2, Clock, XCircle, Filter } from "lucide-react";

/* ── Mock data matching 5-step registration structure (swap with API later) ── */
export const MEMBERS_DATA = [
    {
        id: "1",
        // Step 1: Personal
        fullName: "Anil Kumar",
        gender: "Male",
        dob: "1980-04-15",
        phone: "+91 98765 43210",
        email: "anil.kumar@email.com",
        profilePhoto: "https://i.pravatar.cc/150?u=anil",
        // Step 2: Family
        familyName: "Kumar Villa",
        fatherName: "Rajan Kumar",
        motherName: "Sunita Kumar",
        spouseName: "Meena Kumar",
        familyMembersCount: 4,
        isFamilyHead: "Yes",
        familyId: "FAM-1042",
        // Step 3: Address
        houseNumber: "12A",
        streetArea: "MG Road, Vyttila",
        cityVillage: "Kochi",
        district: "Ernakulam",
        state: "Kerala",
        pincode: "682019",
        // Step 4: Community
        membershipType: "Member",
        branchUnit: "South Zone",
        occupation: "Engineer",
        bloodGroup: "O+",
        // Step 5: Login
        username: "anilkumar",
        loginEmail: "anil.kumar@email.com",
        // Meta
        status: "Approved",
        joinedDate: "2024-04-21",
        familyMembers: [
            { name: "Meena Kumar", relation: "Wife", dob: "1983-06-20", phone: "+91 98765 00001", bloodGroup: "A+", occupation: "Teacher" },
            { name: "Arjun Kumar", relation: "Son", dob: "2008-09-05", phone: "", bloodGroup: "O+", occupation: "Student" },
            { name: "Nisha Kumar", relation: "Daughter", dob: "2011-02-14", phone: "", bloodGroup: "B+", occupation: "Student" },
        ],
    },
    {
        id: "2",
        fullName: "Priya Sharma",
        gender: "Female",
        dob: "1990-07-22",
        phone: "+91 91234 56789",
        email: "priya.sharma@email.com",
        profilePhoto: "https://i.pravatar.cc/150?u=priya",
        familyName: "Sharma House",
        fatherName: "Dinesh Sharma",
        motherName: "Asha Sharma",
        spouseName: "Rohit Sharma",
        familyMembersCount: 3,
        isFamilyHead: "No",
        familyId: "FAM-2081",
        houseNumber: "5B",
        streetArea: "Panampilly Nagar",
        cityVillage: "Kochi",
        district: "Ernakulam",
        state: "Kerala",
        pincode: "682036",
        membershipType: "Family Member",
        branchUnit: "North Zone",
        occupation: "Doctor",
        bloodGroup: "B+",
        username: "priyasharma",
        loginEmail: "priya.sharma@email.com",
        status: "Approved",
        joinedDate: "2024-04-20",
        familyMembers: [
            { name: "Rohit Sharma", relation: "Husband", dob: "1987-11-30", phone: "+91 99001 23456", bloodGroup: "O-", occupation: "Business" },
        ],
    },
    {
        id: "3",
        fullName: "Vijay Nair",
        gender: "Male",
        dob: "1975-12-01",
        phone: "+91 94400 12345",
        email: "vijay.nair@email.com",
        profilePhoto: "https://i.pravatar.cc/150?u=vijay",
        familyName: "Nair Bhavanam",
        fatherName: "Govindan Nair",
        motherName: "Lekha Nair",
        spouseName: "Sindhu Nair",
        familyMembersCount: 5,
        isFamilyHead: "Yes",
        familyId: "FAM-3022",
        houseNumber: "TC 8/44",
        streetArea: "Kowdiar",
        cityVillage: "Thiruvananthapuram",
        district: "Thiruvananthapuram",
        state: "Kerala",
        pincode: "695003",
        membershipType: "Senior Member",
        branchUnit: "South Zone",
        occupation: "Retired",
        bloodGroup: "A-",
        username: "vijaynair",
        loginEmail: "vijay.nair@email.com",
        status: "Pending",
        joinedDate: "2024-04-19",
        familyMembers: [
            { name: "Sindhu Nair", relation: "Wife", dob: "1978-03-14", phone: "+91 94455 67890", bloodGroup: "B-", occupation: "Homemaker" },
            { name: "Rahul Nair", relation: "Son", dob: "2000-08-22", phone: "+91 70012 34567", bloodGroup: "A-", occupation: "Software Engineer" },
            { name: "Anu Nair", relation: "Daughter", dob: "2003-05-10", phone: "", bloodGroup: "O+", occupation: "Student" },
        ],
    },
    {
        id: "4",
        fullName: "Deepa Menon",
        gender: "Female",
        dob: "1988-03-08",
        phone: "+91 99876 54321",
        email: "deepa.menon@email.com",
        profilePhoto: "https://i.pravatar.cc/150?u=deepa",
        familyName: "Menon House",
        fatherName: "Suresh Menon",
        motherName: "Radha Menon",
        spouseName: "",
        familyMembersCount: 2,
        isFamilyHead: "Yes",
        familyId: "FAM-4051",
        houseNumber: "22",
        streetArea: "Thrikkakara",
        cityVillage: "Kochi",
        district: "Ernakulam",
        state: "Kerala",
        pincode: "682021",
        membershipType: "Youth Member",
        branchUnit: "East Zone",
        occupation: "Chartered Accountant",
        bloodGroup: "AB+",
        username: "deepamenon",
        loginEmail: "deepa.menon@email.com",
        status: "Approved",
        joinedDate: "2024-04-18",
        familyMembers: [],
    },
    {
        id: "5",
        fullName: "Sunil Rajan",
        gender: "Male",
        dob: "1972-09-17",
        phone: "+91 88001 99999",
        email: "sunil.rajan@email.com",
        profilePhoto: "https://i.pravatar.cc/150?u=sunil",
        familyName: "Rajan Vilas",
        fatherName: "Krishnan Rajan",
        motherName: "Kamala Rajan",
        spouseName: "Latha Sunil",
        familyMembersCount: 4,
        isFamilyHead: "Yes",
        familyId: "FAM-5099",
        houseNumber: "Palace Gate 3",
        streetArea: "Shastri Nagar",
        cityVillage: "Thrissur",
        district: "Thrissur",
        state: "Kerala",
        pincode: "680001",
        membershipType: "Member",
        branchUnit: "West Zone",
        occupation: "Business",
        bloodGroup: "O+",
        username: "sunilrajan",
        loginEmail: "sunil.rajan@email.com",
        status: "Rejected",
        joinedDate: "2024-04-17",
        familyMembers: [
            { name: "Latha Sunil", relation: "Wife", dob: "1975-12-01", phone: "+91 88002 11111", bloodGroup: "A+", occupation: "Homemaker" },
        ],
    },
];

const StatusBadge = ({ status }) => {
    const map = {
        Approved:  { cls: "bg-emerald-50 text-emerald-600",  icon: <CheckCircle2 size={12} /> },
        Pending:   { cls: "bg-orange-50 text-orange-500",    icon: <Clock size={12} /> },
        Rejected:  { cls: "bg-red-50 text-red-500",          icon: <XCircle size={12} /> },
    };
    const s = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${s.cls}`}>
            {s.icon} {status}
        </span>
    );
};

const AdminMembers = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const approvedMembers = MEMBERS_DATA.filter((m) => m.status === "Approved");

    const filtered = approvedMembers.filter((m) => {
        const q = search.toLowerCase();
        const matchSearch =
            m.fullName.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q) ||
            m.phone.includes(q) ||
            m.familyId.toLowerCase().includes(q) ||
            m.district.toLowerCase().includes(q);
        return matchSearch;
    });

    const counts = {
        Approved: approvedMembers.length,
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Members</h1>
                    <p className="text-slate-400 mt-1 text-sm">View and manage all registered community members</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
                    <Users size={16} className="text-emerald-600" />
                    <span className="text-emerald-700 font-bold text-sm">{counts.Approved} Approved Members</span>
                </div>
            </div>

            {/* Search + Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center">

                {/* Search input */}
                <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 w-full">
                    <Search size={16} className="text-slate-300 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, Family ID, district..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium"
                    />
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                {/* Table header */}
                <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span>Member</span>
                    <span>Contact</span>
                    <span>Address</span>
                    <span>Membership</span>
                    <span className="text-right">Status</span>
                    <span />
                </div>

                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-slate-300 text-sm font-semibold">
                        No members found for "{search}"
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {filtered.map((m) => (
                            <div
                                key={m.id}
                                className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1fr_1fr_80px] gap-4 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors group"
                            >
                                {/* Member info */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={m.profilePhoto}
                                        alt={m.fullName}
                                        className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-800 text-sm truncate">{m.fullName}</p>
                                        <p className="text-slate-400 text-xs truncate">{m.familyId} · {m.gender}</p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div>
                                    <p className="text-slate-600 text-sm font-medium truncate">{m.phone}</p>
                                    <p className="text-slate-400 text-xs truncate">{m.email}</p>
                                </div>

                                {/* Address */}
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">{m.cityVillage}</p>
                                    <p className="text-slate-400 text-xs">{m.district}, {m.state}</p>
                                </div>

                                {/* Membership */}
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">{m.membershipType}</p>
                                    <p className="text-slate-400 text-xs">{m.branchUnit}</p>
                                </div>

                                {/* Status */}
                                <div className="flex justify-end">
                                    <StatusBadge status={m.status} />
                                </div>

                                {/* View button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => navigate(`/admin/members/${m.id}`)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#0f3d2e] hover:text-white text-slate-400 text-xs font-bold transition-all group-hover:border-emerald-200"
                                    >
                                        <Eye size={13} /> View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminMembers;