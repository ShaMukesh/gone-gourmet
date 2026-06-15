import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const brandService = {
  getAllBrands: () => api.get('/brands'),
  getBrandById: (id) => api.get(`/brands/${id}`)
};

export const cityService = {
  getCitiesByBrand: (brandId) => api.get(`/cities?brand=${brandId}`),
  getAllCities: () => api.get('/cities'),
  getCityById: (id) => api.get(`/cities/${id}`)
};

export const locationService = {
  getLocationsByBrandAndCity: (brandId, cityId) => 
    api.get(`/locations?brand=${brandId}&city=${cityId}`),
  getLocationById: (id) => api.get(`/locations/${id}`)
};

export const itemService = {
  getUnavailableItems: (brandId, locationId) => 
    api.post('/unavailable-items', {
      restaurant_brand: brandId,
      location: locationId
    })
};

export default api;
