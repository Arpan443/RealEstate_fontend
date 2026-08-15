import { create } from 'zustand';

const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',

  toggleTheme: () => {
    set((state) => {
      const newIsDark = !state.isDark;
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return { isDark: newIsDark };
    });
  },
}));

export default useThemeStore;