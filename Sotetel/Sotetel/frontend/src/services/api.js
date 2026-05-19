import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // ✅ Let Vite proxy handle it
  withCredentials: true,
});

// 🔐 Automatically attach token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem('user')); // ✅ Using sessionStorage
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          console.error('🚫 Unauthorized: Please log in again.');
          break;
        case 403:
          console.error('⛔ Forbidden: Action not permitted.');
          break;
        case 404:
          console.error('🔍 Not Found: Check the request URL.');
          break;
        case 500:
          console.error('💥 Server Error: Try again later.');
          break;
        default:
          console.error('❌ API error:', response?.data || error.message);
      }
    } else {
      console.error('🌐 Network error: Check your connection.');
    }

    return Promise.reject(error);
  }
);

// 📩 Public: Contact form
export const sendContactMessage = (data) =>
  api.post('/messages', data); // ✅ Public endpoint

// 📨 Admin: Fetch all messages
export const fetchMessages = () =>
  api.get('/messages'); // ✅ Admin only

// ✉️ Admin: Send reply email
export const sendReplyEmail = (data) =>
  api.post('/messages/reply', data); // ✅ Admin-only route

export default api;
