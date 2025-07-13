import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];

  const handleSelect = (value) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded z-10">
          {options.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                theme === value
                  ? "font-bold text-blue-600 dark:text-blue-400"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
