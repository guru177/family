import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hero Slider APIs
export const fetchHeroSlides = () => api.get('/hero-slider');
export const saveHeroSlide = (formData) => api.post('/hero-slider', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteHeroSlide = (id) => api.delete(`/hero-slider/${id}`);
export const updateHeroOrder = (orders) => api.put('/hero-slider/reorder', { orders });

// Gallery APIs
export const fetchGalleryItems = () => api.get('/gallery');
export const createGalleryItem = (formData) => api.post('/gallery', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateGalleryItem = (id, formData) => api.put(`/gallery/${id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);

// Banner APIs
export const fetchBanners = () => api.get('/banners');
export const createBanner = (formData) => api.post('/banners', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteBanner = (id) => api.delete(`/banners/${id}`);

// Announcement APIs
export const fetchAnnouncements = () => api.get('/announcements');
export const fetchAnnouncementById = (id) => api.get(`/announcements/${id}`);
export const fetchAnnouncementBySlug = (slug) => api.get(`/announcements/slug/${slug}`);
export const saveAnnouncement = (formData) => api.post('/announcements', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);
export const updateAnnouncementStatus = (id, status) => api.patch(`/announcements/${id}/status`, { status });

// Scrolling Banner APIs (Text messages)
export const fetchScrollingMessages = () => api.get('/scrolling-banner');
export const addScrollingMessage = (message) => api.post('/scrolling-banner', { message });
export const deleteScrollingMessage = (id) => api.delete(`/scrolling-banner/${id}`);

export default api;
