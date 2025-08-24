import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("liveconnect-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("liveconnect-theme", theme);
    set({ theme });
  },
}));
