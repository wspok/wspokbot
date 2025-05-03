import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "natural";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light", // Default theme
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "magical-garden-theme",
    }
  )
);

// CSS Variables for each theme
export const themeVariables = {
  light: {
    "--background": "#f8f5f2",
    "--primary": "#78a565",
    "--primary-hover": "#5d8047",
    "--secondary": "#b19cd9",
    "--secondary-hover": "#9a85c0",
    "--accent": "#ffcb77",
    "--text": "#4a6c39",
    "--canvas-bg": "#e9efd8",
  },
  dark: {
    "--background": "#2a3132",
    "--primary": "#5d8047",
    "--primary-hover": "#78a565",
    "--secondary": "#9a85c0",
    "--secondary-hover": "#b19cd9",
    "--accent": "#e5b66c",
    "--text": "#d7e8c5",
    "--canvas-bg": "#374245",
  },
  natural: {
    "--background": "#f0e6d7",
    "--primary": "#69975e",
    "--primary-hover": "#547a4a",
    "--secondary": "#a394c6",
    "--secondary-hover": "#8879a8",
    "--accent": "#e5b66c",
    "--text": "#4f6142",
    "--canvas-bg": "#e1d9c4",
  },
};

// Helper function to apply theme CSS variables to the document
export const applyTheme = (theme: Theme) => {
  const variables = themeVariables[theme];
  if (!variables) return;
  
  Object.entries(variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
