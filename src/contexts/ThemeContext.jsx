import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const THEME_KEY = "theme-mode"; // disimpan di localStorage

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "system";
  });

  // Terapkan tema ke <html>
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let effectiveTheme = theme;

      if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        effectiveTheme = prefersDark ? "dark" : "light";
      }

      if (effectiveTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    // Simpan ke localStorage
    localStorage.setItem(THEME_KEY, theme);

    // Listener perubahan OS theme (jika pilih "system")
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
