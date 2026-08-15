import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  role: localStorage.getItem('role') || null,

  login: (token, email, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    set({ token, email, role });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    set({ token: null, email: null, role: null });
  },
}));

export default useAuthStore;