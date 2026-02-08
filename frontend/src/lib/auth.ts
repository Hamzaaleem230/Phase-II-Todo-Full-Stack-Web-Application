import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: string;
  email: string;
}

export const setToken = (token: string, userId: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

export const getToken = () => localStorage.getItem('token');
export const getUserId = () => localStorage.getItem('userId');

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};