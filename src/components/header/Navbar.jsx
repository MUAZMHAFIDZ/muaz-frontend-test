import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import ThemeToggle from "../button/ThemeToggle";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow relative z-50">
      {/* Topbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Kiri */}
        <div className="flex items-center gap-3">
          {/* Burger (mobile only) */}
          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <span className="text-2xl font-bold">×</span>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Home
            </Link>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="min-w-[150px] px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition text-left truncate"
            >
              {authUser.admin.name}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 min-w-[150px] bg-white dark:bg-gray-800 shadow-md rounded z-10 overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between py-6 px-4 space-y-4">
          <div className="space-y-2 w-full">
            <ThemeToggle />
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Home
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Profile
            </Link>
          </div>

          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="block w-full mt-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay hitam saat drawer aktif */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
