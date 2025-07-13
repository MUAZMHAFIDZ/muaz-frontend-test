import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import useApiUrl from "../hooks/useApiUrl";

const useLogout = () => {
  const { setAuthUser, authUser } = useAuthContext();
  const { showToast } = useToast();
  const apiUrl = useApiUrl();

  const logout = async () => {
    try {
      if (authUser.token) {
        const res = await fetch(`${apiUrl}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const json = await res.json();

        if (!res.ok || json.status !== "success") {
          throw new Error(json.message || "Gagal logout dari server");
        }
      }

      localStorage.removeItem("user");
      setAuthUser(null);
      showToast({ type: "green", message: "Berhasil logout" });
    } catch (err) {
      const msg = err.message || "Terjadi kesalahan saat logout";
      showToast({ type: "red", message: msg });
    }
  };

  return { logout };
};

export default useLogout;
