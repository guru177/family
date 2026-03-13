import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '../components/userdashboard/Sidebar';
import DashboardHome from '../components/userdashboard/DashboardHome';
import UserProfile from '../components/userdashboard/UserProfile';
import FamilyMembers from '../components/userdashboard/FamilyMembers';
import MyDonations from '../components/userdashboard/MyDonations';

const Dashboard = () => {
  const displayName = localStorage.getItem('userDisplayName') || 'User';

  return (
    <div className="w-full min-h-screen bg-[#f7f8f7] pt-30 pb-30">
      <div className="max-w-9xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[calc(100vh-100px)]">
          <DashboardSidebar />
          <main className="flex-1 bg-[#f7f8f7]">
            <Routes>
              <Route index element={<DashboardHome displayName={displayName} />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="family" element={<FamilyMembers />} />
              <Route path="donations" element={<MyDonations />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

