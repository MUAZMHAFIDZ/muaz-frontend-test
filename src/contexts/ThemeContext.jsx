import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const THEME_KEY = "theme-mode";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "system";
  });

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

    localStorage.setItem(THEME_KEY, theme);

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
