import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();
  const { showToast } = useToast();

  const logout = () => {
    setIsPending(true);
    setError(null);

    try {
      // Simulasi logout lokal
      localStorage.removeItem("user");
      setAuthUser(null);

      showToast({ type: "green", message: "Berhasil logout" });
    } catch (err) {
      const msg = err.message || "Terjadi kesalahan saat logout";
      showToast({ type: "red", message: msg });
      setError(msg);
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};

export default useLogout;
