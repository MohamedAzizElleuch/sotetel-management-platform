import api from './api';
import { jwtDecode } from 'jwt-decode';

// Register user
export const registerUser = async ({ name, email, password, role = 'client' }) => {
  const response = await api.post('/auth/register', { name, email, password, role });
  const token = response.data.token;

  const decoded = jwtDecode(token);
  const user = { id: decoded.id, role: decoded.role, token };

  // Save in sessionStorage instead of localStorage
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));

  return { token, user };
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.token;

  const decoded = jwtDecode(token);
  const user = { id: decoded.id, role: decoded.role, token };

  // Save in sessionStorage instead of localStorage
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));

  return { token, user };
};
