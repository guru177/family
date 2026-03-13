import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

export default api;
