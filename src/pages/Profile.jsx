import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Navbar from "../components/header/Navbar";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const { showToast } = useToast();
  const [name, setName] = useState(authUser.admin.name);

  const handleSave = () => {
    if (!name.trim()) {
      showToast({ type: "red", message: "Nama tidak boleh kosong!" });
      return;
    }

    const updatedUser = {
      ...authUser,
      admin: { ...authUser.admin, name },
    };

    setAuthUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    showToast({ type: "green", message: "Nama berhasil diperbarui!" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Edit Profil
          </h1>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
