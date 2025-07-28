import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bank-management-backend-eight.vercel.app/api', // change to backend deployed URL later
});

// Attach token to requests
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
