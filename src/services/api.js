import axios from 'axios';
import { getToken } from '../hooks/useAuthProvider';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const c = config;
  const token = getToken();
  if (token) {
    c.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
