import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ===== Schools =====
export const fetchSchools = (params = {}) =>
  api.get('/schools/', { params }).then(r => r.data);

export const fetchSchool = (slug) =>
  api.get(`/schools/${slug}/`).then(r => r.data);

export const fetchFeaturedSchools = () =>
  api.get('/schools/featured/').then(r => r.data);

export const fetchTopSchools = () =>
  api.get('/schools/top/').then(r => r.data);

export const postReview = (slug, data) =>
  api.post(`/schools/${slug}/review/`, data).then(r => r.data);

// ===== Meta =====
export const fetchDistricts = () =>
  api.get('/districts/').then(r => r.data);

export const fetchLanguages = () =>
  api.get('/languages/').then(r => r.data);

export const fetchFeatures = () =>
  api.get('/features/').then(r => r.data);

export const fetchStats = () =>
  api.get('/stats/').then(r => r.data);

// ===== Utils =====
export const formatPrice = (uzs) => {
  if (!uzs) return "Narx ko'rsatilmagan";
  return new Intl.NumberFormat('uz-UZ').format(uzs) + ' so\'m/oy';
};

export const gradeRange = (min, max) => {
  if (min === 0) return `Bog'chadan ${max}-sinfgacha`;
  return `${min}-${max}-sinf`;
};
