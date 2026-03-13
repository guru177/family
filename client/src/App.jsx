import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Donation from './pages/Donation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';

import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/layout/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminMembers from './admin/pages/AdminMembers';
import AdminMemberDetail from './admin/pages/AdminMemberDetail';
import AdminRegistrations from './admin/pages/AdminRegistrations';
import AdminEvents from './admin/pages/AdminEvents';
import AdminAnnouncements from './admin/pages/AdminAnnouncements';
import AdminGallery from './admin/pages/AdminGallery';
import AdminDonations from './admin/pages/AdminDonations';
import AdminMessages from './admin/pages/AdminMessages';
import AdminBanners from './admin/pages/AdminBanners';
import AdminHeroSlider from './admin/pages/AdminHeroSlider';

/* Protected Route guard */
const ProtectedAdmin = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* ── PUBLIC WEBSITE ── */}
        <Route
          path="/*"
          element={
            <div className="app">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/announcements/:id" element={<AnnouncementDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/donation" element={<Donation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* ── ADMIN LOGIN (public) ── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── ADMIN PANEL (protected, all share Sidebar + Topbar) ── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="dashboard"       element={<AdminDashboard />} />
          <Route path="members"         element={<AdminMembers />} />
          <Route path="members/:id"     element={<AdminMemberDetail />} />
          <Route path="registrations"   element={<AdminRegistrations />} />
          <Route path="events"          element={<AdminEvents />} />
          <Route path="announcements"   element={<AdminAnnouncements />} />
          <Route path="gallery"         element={<AdminGallery />} />
          <Route path="donations"       element={<AdminDonations />} />
          <Route path="messages"        element={<AdminMessages />} />
          <Route path="banners"         element={<AdminBanners />} />
          <Route path="hero"            element={<AdminHeroSlider />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;